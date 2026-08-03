export class ExotelXmlBuilder {
  /**
   * Generates Exotel response XML for IVR passthru & media streaming
   */
  static buildPassthruResponse(promptMessage: string, mediaStreamUrl?: string): string {
    if (mediaStreamUrl) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>${this.escapeXml(promptMessage)}</Say>
    <Stream url="${this.escapeXml(mediaStreamUrl)}" />
</Response>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>${this.escapeXml(promptMessage)}</Say>
</Response>`;
  }

  /**
   * Fallback XML response in case of system failures or service outages
   */
  static buildFallbackResponse(fallbackMessage = 'We are currently experiencing technical difficulties. Please stay on the line while we connect you to an agent.'): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>${this.escapeXml(fallbackMessage)}</Say>
    <Hangup />
</Response>`;
  }

  private static escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
