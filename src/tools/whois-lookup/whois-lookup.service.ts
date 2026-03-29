export interface WhoisResult {
  domain: string;
  status: string[];
  nameservers: string[];
  events: Record<string, string>;
  registrar: string;
  rawJson: string;
}

export async function lookupDomain(domain: string): Promise<WhoisResult> {
  let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
  if (!cleanDomain) throw new Error('Please enter a valid domain name');

  try {
    const response = await fetch(`https://rdap.org/domain/${cleanDomain}`);
    
    if (!response.ok) {
       if (response.status === 404) {
         throw new Error(`Domain ${cleanDomain} not found or is unregistered.`);
       }
       throw new Error(`RDAP registry error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const events: Record<string, string> = {};
    if (Array.isArray(data.events)) {
       data.events.forEach((evt: any) => {
         if (evt.eventAction && evt.eventDate) {
           events[evt.eventAction] = new Date(evt.eventDate).toLocaleString();
         }
       });
    }

    const nameservers: string[] = [];
    if (Array.isArray(data.nameservers)) {
       data.nameservers.forEach((ns: any) => {
         if (ns.ldhName) nameservers.push(ns.ldhName.toLowerCase());
       });
    }

    let registrar = 'Unknown';
    if (Array.isArray(data.entities)) {
       const regEntity = data.entities.find((e: any) => e.roles && e.roles.includes('registrar'));
       if (regEntity && regEntity.vcardArray && regEntity.vcardArray.length > 1) {
         const vcardPayload = regEntity.vcardArray[1];
         if (Array.isArray(vcardPayload)) {
            const fnNode = vcardPayload.find((arr: any) => arr[0] === 'fn');
            if (fnNode && fnNode.length >= 4) {
               registrar = fnNode[3];
            }
         }
       }
    }

    return {
      domain: data.ldhName ? data.ldhName.toLowerCase() : cleanDomain,
      status: data.status || [],
      nameservers,
      events,
      registrar,
      rawJson: JSON.stringify(data, null, 2)
    };
  } catch(e: any) {
    if (e.message.includes('fetch')) {
      throw new Error('Network error. Unable to reach RDAP registry.');
    }
    throw e;
  }
}
