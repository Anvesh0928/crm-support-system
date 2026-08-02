import { ICallProvider } from './interfaces/call-provider.interface.js';
import { IAIProvider } from './interfaces/ai-provider.interface.js';
import { IRecordingProvider } from './interfaces/recording-provider.interface.js';
import { INotificationProvider } from './interfaces/notification-provider.interface.js';
import { MockCallProvider } from './mock/mock-call.provider.js';
import { MockAIProvider } from './mock/mock-ai.provider.js';
import { MockRecordingProvider } from './mock/mock-recording.provider.js';
import { MockNotificationProvider } from './mock/mock-notification.provider.js';
import { env } from '../config/env.config.js';

export class ProviderFactory {
  private static callProvider: ICallProvider;
  private static aiProvider: IAIProvider;
  private static recordingProvider: IRecordingProvider;
  private static notificationProvider: INotificationProvider;

  static getCallProvider(): ICallProvider {
    if (!this.callProvider) {
      const providerType = process.env.CALL_PROVIDER || 'mock';
      if (providerType === 'mock') {
        this.callProvider = new MockCallProvider();
      } else {
        // Default fallback to mock provider until Exotel hardware credentials are built
        this.callProvider = new MockCallProvider();
      }
    }
    return this.callProvider;
  }

  static getAIProvider(): IAIProvider {
    if (!this.aiProvider) {
      const providerType = process.env.AI_PROVIDER || 'mock';
      if (providerType === 'mock') {
        this.aiProvider = new MockAIProvider();
      } else {
        this.aiProvider = new MockAIProvider();
      }
    }
    return this.aiProvider;
  }

  static getRecordingProvider(): IRecordingProvider {
    if (!this.recordingProvider) {
      this.recordingProvider = new MockRecordingProvider();
    }
    return this.recordingProvider;
  }

  static getNotificationProvider(): INotificationProvider {
    if (!this.notificationProvider) {
      this.notificationProvider = new MockNotificationProvider();
    }
    return this.notificationProvider;
  }
}
