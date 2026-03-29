export interface MailtoOptions {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
}

export function generateMailtoLink(options: MailtoOptions): string {
  const { to, cc, bcc, subject, body } = options;
  
  // Base mailto component
  let link = `mailto:${encodeURI(to.trim())}`;
  
  const params = new URLSearchParams();
  if (cc.trim()) params.set('cc', cc.trim());
  if (bcc.trim()) params.set('bcc', bcc.trim());
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);

  // URLSearchParams uses '+' for spaces, but RFC 6068 (mailto) strongly dictates '%20' for reliability across OS handlers
  const qs = params.toString().replace(/\+/g, '%20');
  
  if (qs) {
    link += `?${qs}`;
  }

  return link;
}

export function generateHtmlAnchor(href: string, text: string): string {
  const safeText = text.trim() || 'Send Email';
  return `<a href="${href}">${safeText}</a>`;
}
