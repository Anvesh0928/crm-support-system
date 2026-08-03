export interface RawExotelWebhookPayload {
  CallSid: string;
  From: string;
  To: string;
  CallStatus?: string;
  Direction?: string;
  Digits?: string;
  RecordingUrl?: string;
  Duration?: string;
  StartTime?: string;
  EndTime?: string;
  CustomField?: string;
  [key: string]: any;
}
