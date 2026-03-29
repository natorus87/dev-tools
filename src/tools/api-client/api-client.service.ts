export interface HeaderDef {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiRequest {
  method: string;
  url: string;
  headers: HeaderDef[];
  body: string;
  useProxy: boolean;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  timeMs: number;
  sizeBytes: number;
  headers: Record<string, string>;
  data: any;
  error?: string;
  isJson: boolean;
}

export async function executeApiRequest(req: ApiRequest): Promise<ApiResponse> {
  const t0 = performance.now();
  try {
    let targetUrl = req.url.trim();
    if (!targetUrl) throw new Error('URL is required');

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    if (req.useProxy) {
      targetUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    }

    const requestHeaders = new Headers();
    req.headers.forEach((h) => {
      if (h.enabled && h.key.trim()) {
        requestHeaders.append(h.key.trim(), h.value);
      }
    });

    const options: RequestInit = {
      method: req.method,
      headers: requestHeaders,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = req.body;
    }

    const response = await fetch(targetUrl, options);
    const timeMs = Math.round(performance.now() - t0);
    const status = response.status;
    const statusText = response.statusText;

    const respHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      respHeaders[key] = val;
    });

    const rawText = await response.text();
    const sizeBytes = new Blob([rawText]).size;

    let data = rawText;
    let isJson = false;
    try {
      if (rawText.trim()) {
        data = JSON.parse(rawText);
        isJson = true;
      }
    } catch {
      // Not JSON, keep as string
    }

    return {
      status,
      statusText: statusText || 'OK',
      timeMs,
      sizeBytes,
      headers: respHeaders,
      data,
      isJson,
    };
  } catch (err: any) {
    return {
      status: 0,
      statusText: 'Error',
      timeMs: Math.round(performance.now() - t0),
      sizeBytes: 0,
      headers: {},
      data: null,
      isJson: false,
      error: err.message || 'Fetch failed. (Check CORS or network connectivity)',
    };
  }
}
