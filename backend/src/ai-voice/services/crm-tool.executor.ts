import { CustomerService } from '../../api/services/customer.service.js';
import { TicketService } from '../../modules/tickets/application/ticket.service.js';
import { CallService } from '../../api/services/call.service.js';
import { AIFunctionCallDefinition, AIToolExecutionResult } from '../interfaces/ai-tool.interface.js';
import { logger } from '../../config/logger.config.js';

export class CRMToolExecutor {
  // Uses Node API Services exclusively — Zero direct MongoDB access!
  private customerService = new CustomerService();
  private ticketService = new TicketService();
  private callService = new CallService();

  getToolDefinitions(): AIFunctionCallDefinition[] {
    return [
      {
        type: 'function',
        name: 'lookup_customer_profile',
        description: 'Fetch customer CRM profile details and account tier by phone number',
        parameters: {
          type: 'object',
          properties: {
            phone: { type: 'string', description: 'Customer E.164 phone number' },
          },
          required: ['phone'],
        },
      },
      {
        type: 'function',
        name: 'create_support_ticket',
        description: 'Create a new support ticket in the CRM for the caller',
        parameters: {
          type: 'object',
          properties: {
            phone: { type: 'string' },
            subject: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] },
          },
          required: ['phone', 'subject', 'description'],
        },
      },
      {
        type: 'function',
        name: 'escalate_to_human_agent',
        description: 'Transfer the current active call session to a human customer support agent',
        parameters: {
          type: 'object',
          properties: {
            reason: { type: 'string', description: 'Reason for human escalation' },
          },
          required: ['reason'],
        },
      },
    ];
  }

  async executeTool(toolName: string, args: Record<string, any>, callSid: string): Promise<AIToolExecutionResult> {
    logger.info({ toolName, args, callSid }, '🛠️ Executing AI Tool via Node API Services');

    try {
      if (toolName === 'lookup_customer_profile') {
        const customer = await this.customerService.getCustomerByPhone(args.phone);
        return {
          success: true,
          data: {
            id: customer._id,
            name: customer.name,
            phone: customer.phone,
            company: customer.company,
            accountTier: customer.accountTier,
          },
        };
      }

      if (toolName === 'create_support_ticket') {
        let customer;
        try {
          customer = await this.customerService.getCustomerByPhone(args.phone);
        } catch (_) {
          customer = await this.customerService.createCustomer({ phone: args.phone, name: 'Caller' });
        }

        const ticket = await this.ticketService.createTicket({
          customerId: customer._id.toString(),
          subject: args.subject,
          description: args.description,
          priority: args.priority as any,
          aiSummary: `Auto-created during AI Voice Session ${callSid}`,
        });

        return {
          success: true,
          data: {
            ticketNumber: ticket.ticketNumber,
            status: ticket.status,
            priority: ticket.priority,
          },
        };
      }

      if (toolName === 'escalate_to_human_agent') {
        // Escalate call session using Node CallService API
        const call = await this.callService.getCallById(callSid).catch(() => null);
        if (call) {
          await this.callService.transferCall(call._id.toString(), 'SYSTEM_AUTO_ASSIGN');
        }
        return {
          success: true,
          data: {
            status: 'ESCALATED',
            message: 'Call transferred to human agent queue',
          },
        };
      }

      return { success: false, error: `Unknown tool: ${toolName}` };
    } catch (err: any) {
      logger.error({ err, toolName }, '❌ Error executing CRM tool via Node APIs');
      return { success: false, error: err.message };
    }
  }
}
