// ============================================================================
// Google Search Provider Implementation
// ============================================================================

import type { ExternalWebSearchResult } from './types';

export class GoogleSearchProvider {
  readonly providerName = 'Google Custom Search';
  readonly isConfigured: boolean;
  private apiKey: string;
  private cx: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY || '';
    this.cx = import.meta.env.VITE_GOOGLE_SEARCH_CX || '';
    this.isConfigured = Boolean(this.apiKey && this.cx);
  }

  async searchWeb(query: string): Promise<ExternalWebSearchResult[]> {
    if (this.isConfigured) {
      try {
        const url = `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.items)) {
            return data.items.map((item: any) => ({
              title: item.title,
              snippet: item.snippet,
              link: item.link,
              sourceType: 'GOOGLE_SEARCH',
              retrievedAt: new Date().toISOString(),
              attribution: 'Google Custom Search API'
            }));
          }
        }
      } catch (err) {
        console.warn('Google Search API query failed:', err);
      }
    }

    // Default reference fallback
    return [
      {
        title: `${query} - External Search Reference`,
        snippet: `Public web search results for ${query}. Note: Search index snippets are external references and are not verified by LocalLens Verification Desk.`,
        link: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        sourceType: 'GOOGLE_SEARCH',
        retrievedAt: new Date().toISOString(),
        attribution: 'Google Search Index'
      }
    ];
  }
}
