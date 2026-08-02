// Central Export Hub for Database Interfaces & Models

// Export Interfaces
export * from './interfaces/customer.interface.js';
export * from './interfaces/agent.interface.js';
export * from './interfaces/call.interface.js';
export * from './interfaces/call-log.interface.js';
export * from './interfaces/ticket.interface.js';
export * from './interfaces/consultation.interface.js';
export * from './interfaces/note.interface.js';
export * from './interfaces/recording.interface.js';
export * from './interfaces/analytics.interface.js';
export * from './interfaces/queue.interface.js';

// Export Mongoose Models
export { CustomerModel } from './models/customer.model.js';
export { AgentModel } from './models/agent.model.js';
export { CallModel } from './models/call.model.js';
export { CallLogModel } from './models/call-log.model.js';
export { TicketModel } from './models/ticket.model.js';
export { ConsultationModel } from './models/consultation.model.js';
export { NoteModel } from './models/note.model.js';
export { RecordingModel } from './models/recording.model.js';
export { AnalyticsModel } from './models/analytics.model.js';
export { QueueModel } from './models/queue.model.js';
