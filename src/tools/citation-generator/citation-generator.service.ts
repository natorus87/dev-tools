export interface CitationSource {
  type: 'website' | 'book';
  authorFirst: string;
  authorLast: string;
  title: string;
  publisher: string;
  year: string;
  url: string;
  accessDate: string;
}

function formatAuthor(first: string, last: string, style: 'apa' | 'mla' | 'chicago'): string {
  const f = first.trim();
  const l = last.trim();
  if (!f && !l) return '';
  
  if (style === 'apa') {
    if (!f) return `${l}.`;
    return `${l}, ${f.charAt(0)}.`;
  } else {
    if (!f) return `${l}.`;
    return `${l}, ${f}.`;
  }
}

export function generateAPA(source: CitationSource): string {
  const author = formatAuthor(source.authorFirst, source.authorLast, 'apa');
  const date = source.year ? `(${source.year.trim()}).` : '(n.d.).';
  const title = source.title ? `*${source.title.trim()}*.` : '';
  const publisher = source.publisher ? `${source.publisher.trim()}.` : '';

  if (source.type === 'book') {
    return [author, date, title, publisher].filter(Boolean).join(' ');
  } else {
    const access = source.accessDate ? `Retrieved ${source.accessDate.trim()}, from ` : '';
    const url = source.url ? `${access}${source.url.trim()}` : '';
    return [author, date, title, publisher, url].filter(Boolean).join(' ');
  }
}

export function generateMLA(source: CitationSource): string {
  const author = formatAuthor(source.authorFirst, source.authorLast, 'mla');
  const title = source.type === 'book' ? `*${source.title.trim()}*.` : `"${source.title.trim()}."`;
  const publisher = source.publisher ? `${source.publisher.trim()},` : '';
  const date = source.year ? `${source.year.trim()}.` : '';
  
  if (source.type === 'book') {
    return [author, title, publisher, date].filter(Boolean).join(' ');
  } else {
    const url = source.url ? `${source.url.trim()}.` : '';
    const access = source.accessDate ? `Accessed ${source.accessDate.trim()}.` : '';
    return [author, title, publisher, date, url, access].filter(Boolean).join(' ');
  }
}

export function generateChicago(source: CitationSource): string {
  const author = formatAuthor(source.authorFirst, source.authorLast, 'chicago');
  const title = source.type === 'book' ? `*${source.title.trim()}*.` : `"${source.title.trim()}."`;
  const publisher = source.publisher ? `${source.publisher.trim()},` : '';
  const date = source.year ? `${source.year.trim()}.` : '';
  
  if (source.type === 'book') {
    return [author, title, publisher, date].filter(Boolean).join(' ');
  } else {
    const access = source.accessDate ? `Accessed ${source.accessDate.trim()}.` : '';
    const url = source.url ? `${source.url.trim()}.` : '';
    return [author, title, publisher, date, access, url].filter(Boolean).join(' ');
  }
}
