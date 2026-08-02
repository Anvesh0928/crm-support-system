import { IRecordingProvider } from '../interfaces/recording-provider.interface.js';

export class MockRecordingProvider implements IRecordingProvider {
  async getRecordingUrl(callSid: string): Promise<string> {
    // Generates a mock audio recording path URL
    return `/mock-recordings/${callSid}.mp3`;
  }
}
