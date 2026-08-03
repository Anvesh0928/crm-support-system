import { env } from '../../../config/env.config.js';
import { logger } from '../../../config/logger.config.js';

export interface ConnectCallRequest {
  from: string;
  to: string;
  callerId: string;
  timeLimit?: number;
  timeOut?: number;
}

export class ExotelClientService {
  private readonly baseUrl: string;
  private readonly authHeader: string;
  private readonly maxRetries = 3;
  private readonly baseDelayMs = 200;

  constructor() {
    this.baseUrl = `https://${env.EXOTEL_SUBDOMAIN}/v1/Accounts/${env.EXOTEL_ACCOUNT_SID}`;
    const credentials = Buffer.from(`${env.EXOTEL_API_KEY}:${env.EXOTEL_API_TOKEN}`).toString('base64');
    this.authHeader = `Basic ${credentials}`;
  }

  /**
   * Exponential backoff retry wrapper for HTTP calls to Exotel API
   */
  private async executeWithRetry<T>(operation: () => Promise<T>, contextName: string): Promise<T> {
    let attempt = 0;
    while (attempt < this.maxRetries) {
      try {
        return await operation();
      } catch (err: any) {
        attempt++;
        const isRetryable = !err.status || err.status === 429 || (err.status >= 500 && err.status < 600);
        if (attempt >= this.maxRetries || !isRetryable) {
          logger.error({ err, attempt, contextName }, '❌ Exotel API Request Failed after max retries');
          throw err;
        }

        // Calculate Exponential Backoff Delay with random jitter
        const jitter = Math.floor(Math.random() * 100);
        const delay = Math.min(this.baseDelayMs * Math.pow(2, attempt) + jitter, 4000);
        logger.warn({ attempt, delay, contextName }, '⚠️ Exotel API Request transient failure. Retrying...');
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error(`Operation ${contextName} failed after retries`);
  }

  async connectCall(params: ConnectCallRequest) {
    return this.executeWithRetry(async () => {
      // Mock mode fallback when credentials are default/mock
      if (!env.EXOTEL_ACCOUNT_SID || env.EXOTEL_ACCOUNT_SID.startsWith('mock_')) {
        logger.info({ params }, '📞 Mock Exotel Outbound Call Initiated');
        return {
          CallSid: `exotel_mock_${Date.now()}`,
          Status: 'queued',
          From: params.from,
          To: params.to,
          DateCreated: new Date().toISOString(),
        };
      }

      const body = new URLSearchParams({
        From: params.from,
        To: params.to,
        CallerId: params.callerId,
        TimeLimit: (params.timeLimit || 3600).toString(),
        TimeOut: (params.timeOut || 30).toString(),
      });

      const res = await fetch(`${this.baseUrl}/Calls/connect.json`, {
        method: 'POST',
        headers: {
          Authorization: this.authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      if (!res.ok) {
        const errText = await res.text();
        const error: any = new Error(`Exotel API HTTP ${res.status}: ${errText}`);
        error.status = res.status;
        throw error;
      }

      const json: any = await res.json();
      return json.Call;
    }, 'ConnectCall');
  }

  async hangupCall(callSid: string) {
    return this.executeWithRetry(async () => {
      if (!env.EXOTEL_ACCOUNT_SID || env.EXOTEL_ACCOUNT_SID.startsWith('mock_')) {
        logger.info({ callSid }, '📞 Mock Exotel Call Terminated');
        return { CallSid: callSid, Status: 'completed' };
      }

      const res = await fetch(`${this.baseUrl}/Calls/${callSid}.json`, {
        method: 'POST',
        headers: {
          Authorization: this.authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ Status: 'completed' }),
      });

      if (!res.ok) {
        const errText = await res.text();
        const error: any = new Error(`Exotel Hangup HTTP ${res.status}: ${errText}`);
        error.status = res.status;
        throw error;
      }

      const json: any = await res.json();
      return json;
    }, 'HangupCall');
  }
}
