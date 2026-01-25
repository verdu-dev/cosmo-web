export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  li_fat_id?: string;
  referrer_url?: string;
  referrer_domain?: string;
  landing_page?: string;
}

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const hasMarketingConsent = (): boolean => {
  const consentEnabled = import.meta.env.VITE_CONSENT_MODE_ENABLED === 'true';
  if (!consentEnabled) return true;
  
  const consent = localStorage.getItem('cookie_consent');
  return consent === 'granted';
};

export const captureUTMParams = (): UTMData => {
  const params = new URLSearchParams(window.location.search);

  const fbclid = params.get('fbclid') || getCookie('_fbc') || undefined;

  const utmData: UTMData = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
    fbclid: fbclid,
    li_fat_id: params.get('li_fat_id') || undefined,
    referrer_url: document.referrer || undefined,
    referrer_domain: document.referrer ? new URL(document.referrer).hostname : undefined,
    landing_page: window.location.pathname,
  };

  sessionStorage.setItem('utm_data', JSON.stringify(utmData));

  if (hasMarketingConsent() && fbclid && !getCookie('_fbc')) {
    setCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`, 90);
  }

  return utmData;
};

export const getUTMData = (): UTMData | null => {
  const stored = sessionStorage.getItem('utm_data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('[UTM] Error parsing stored data:', e);
      return null;
    }
  }
  return null;
};

export const getFBP = (): string | null => {
  return getCookie('_fbp');
};

export const getFBC = (): string | null => {
  return getCookie('_fbc');
};

export const setMarketingCookiesAfterConsent = (): void => {
  const utmData = getUTMData();
  if (!utmData) return;

  if (hasMarketingConsent() && utmData.fbclid) {
    setCookie('_fbc', `fb.1.${Date.now()}.${utmData.fbclid}`, 90);
  }
};
