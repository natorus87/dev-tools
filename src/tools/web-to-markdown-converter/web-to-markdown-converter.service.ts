import TurndownService from 'turndown';

export interface WebToMarkdownResult {
  markdown: string;
  error?: string;
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

// Remove unnecessary tags like scripts, styles, etc.
turndownService.remove(['script', 'style', 'noscript', 'meta', 'head', 'link']);

export function convertHtmlToMarkdown(html: string): WebToMarkdownResult {
  try {
    if (!html.trim()) {
      return { markdown: '' };
    }
    const markdown = turndownService.turndown(html);
    return { markdown };
  } catch (error: any) {
    return { markdown: '', error: error.message || 'Failed to convert HTML' };
  }
}

export async function fetchAndConvertUrl(url: string): Promise<WebToMarkdownResult> {
  try {
    let targetUrl = url.trim();
    if (!targetUrl) return { markdown: '' };

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    // Use allorigins to bypass CORS
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.contents) {
      return convertHtmlToMarkdown(data.contents);
    }
    throw new Error('No content found at URL');
  } catch (error: any) {
    return { markdown: '', error: error.message || 'Failed to fetch and convert URL' };
  }
}
