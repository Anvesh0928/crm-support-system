import { AgentPresenceStore, AgentPresence } from '../infrastructure/agent-presence.store.js';
import { UserModel, IUserDocument } from '../../auth/infrastructure/user.model.js';
import { AgentStatus, UserRole } from '../../../shared/constants/enums.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';
import { getIO } from '../../../config/socket.config.js';

const presenceStore = new AgentPresenceStore();

export class AgentService {
  async setAgentStatus(agentId: string, status: AgentStatus, activeCallSid?: string) {
    const user = await UserModel.findById(agentId);
    if (!user) {
      throw new NotFoundError('Agent not found');
    }

    const presence = (await presenceStore.updateStatus(agentId, status, activeCallSid)) || {
      agentId,
      name: user.name,
      email: user.email,
      status,
      activeCallSid,
      updatedAt: new Date().toISOString(),
    };

    await presenceStore.setPresence(presence);

    try {
      const io = getIO();
      io.to('live_agents').emit('agent:status_changed', presence);
    } catch (_) {}

    return presence;
  }

  async getAllActiveAgents(): Promise<AgentPresence[]> {
    const presences = await presenceStore.getAllPresences();
    if (presences.length === 0) {
      // Seed with registered agents from DB if Redis is empty
      const dbAgents = await UserModel.find({ role: { $in: [UserRole.AGENT, UserRole.SUPERVISOR] } });
      
      // Explicitly type the mapped user document to satisfy strict TypeScript type checks
      const initialPresences: AgentPresence[] = dbAgents.map((agentUser: IUserDocument) => ({
        agentId: agentUser._id.toString(),
        name: agentUser.name,
        email: agentUser.email,
        status: AgentStatus.AVAILABLE,
        updatedAt: new Date().toISOString(),
      }));

      for (const presenceItem of initialPresences) {
        await presenceStore.setPresence(presenceItem);
      }
      return initialPresences;
    }
    return presences;
  }
}
