export interface ExotelConfig {
  accountSid: string;
  apiKey: string;
  apiToken: string;
  subdomain: string;
  webhookSecret: string;
  maxRetryAttempts: number;
  baseRetryDelayMs: number;
}
