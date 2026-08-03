import { OpenAIRealtimeClient } from '../infrastructure/openai-realtime.client.js';
import { CustomerService } from '../../customers/application/customer.service.js';
import { TicketService } from '../../tickets/application/ticket.service.js';
import { CallService } from '../../calls/application/call.service.js';
import { env } from '../../../config/env.config.js';
import { logger } from '../../../config/logger.config.js';

const customerService = new CustomerService();
const ticketService = new TicketService();
const callService = new CallService();

export class AIOrchestratorService {
  createSession(callSid: string, customerPhone: string) {
    const tools = [
      {
        type: 'function',
        name: 'lookup_customer_profile',
        description: 'Fetch customer details and account tier by phone number',
        parameters: {
          type: 'object',
          properties: { phone: { type: 'string' } },
          required: ['phone'],
        },
      },
      {
        type: 'function',
        name: 'create_support_ticket',
        description: 'Create a new support ticket in the CRM for the customer',
        parameters: {
          type: 'object',
          properties: {
            subject: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] },
          },
          required: ['subject', 'description'],
        },
      },
      {
        type: 'function',
        name: 'escalate_to_human_agent',
        description: 'Escalate the active call session to a human customer support representative',
        parameters: {
          type: 'object',
          properties: { reason: { type: 'string' } },
          required: ['reason'],
        },
      },
    ];

    const instructions = `You are a polite, highly helpful AI Customer Support Representative for an Enterprise CRM. 
Your goal is to assist callers with their queries, look up account information, resolve issues, or log support tickets.
Caller Phone Number: ${customerPhone}.
If the caller is frustrated or requests human assistance, invoke the escalate_to_human_agent tool immediately.`;

    const client = new OpenAIRealtimeClient({
      instructions,
      voice: env.OPENAI_VOICE,
      tools,
    });

    client.connect(
      async (event) => {
        if (event.type === 'response.audio_transcript.delta') {
          await callService.appendTranscriptChunk(callSid, 'SYSTEM_AI', event.delta);
        } else if (event.type === 'conversation.item.input_audio_transcription.completed') {
          await callService.appendTranscriptChunk(callSid, 'CUSTOMER', event.transcript);
        } else if (event.type === 'response.function_call_arguments.done') {
          await this.handleToolExecution(callSid, client, event.name, event.call_id, JSON.parse(event.arguments));
        }
      },
      (err) => {
        logger.error({ err, callSid }, 'OpenAI Realtime session error');
      }
    );

    return client;
  }

  private async handleToolExecution(callSid: string, client: OpenAIRealtimeClient, toolName: string, callId: string, args: any) {
    logger.info({ callSid, toolName, args }, '🛠️ Executing AI Tool');

    let result: any = { success: true };
    try {
      if (toolName === 'lookup_customer_profile') {
        const customer = await customerService.findOrCreateByPhone(args.phone);
        result = { id: customer._id, name: customer.name, phone: customer.phone, tier: customer.accountTier };
      } else if (toolName === 'create_support_ticket') {
        const customer = await customerService.findOrCreateByPhone(args.phone || 'Caller');
        const ticket = await ticketService.createTicket({
          customerId: customer._id.toString(),
          subject: args.subject,
          description: args.description,
          priority: args.priority,
          aiSummary: `Auto-generated ticket via AI call ${callSid}`,
        });
        result = { ticketNumber: ticket.ticketNumber, status: ticket.status };
      } else if (toolName === 'escalate_to_human_agent') {
        await callService.handoverCallToAgent(callSid, 'SYSTEM_AUTO_ASSIGN');
        result = { status: 'ESCALATED', message: 'Transferring to human queue' };
      }
    } catch (err: any) {
      result = { success: false, error: err.message };
    }

    client.sendToolOutput(callId, result);
  }
}
