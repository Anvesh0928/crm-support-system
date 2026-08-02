export interface INotificationProvider {
  // Emits real-time notification events to connected agents and supervisors
  notify(channel: string, eventName: string, payload: Record<string, unknown>): Promise<void>;
}
