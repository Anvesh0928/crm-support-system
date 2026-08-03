export interface IRecordingProvider {
  // Generates or retrieves an audio recording URL for a completed call
  getRecordingUrl(callSid: string): Promise<string>;
}
