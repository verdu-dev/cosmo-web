import { getUTMData, getFBP, getFBC } from './utm-capture';

declare global {
  interface Window {
    fbq?: (command: string, eventNameOrPixelId: string, params?: Record<string, any>) => void;
    lintrk?: (track: string, data: Record<string, any>) => void;
    _linkedin_data_partner_ids?: string[];
  }
}

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID;

export const hasTrackingConsent = (): boolean => {
  const consentEnabled = import.meta.env.VITE_CONSENT_MODE_ENABLED === 'true';
  if (!consentEnabled) return true;
  
  const consent = localStorage.getItem('cookie_consent');
  return consent === 'granted';
};

export const initializeMetaPixel = () => {
  if (!META_PIXEL_ID || !hasTrackingConsent()) return;

  if (typeof window !== 'undefined' && !window.fbq) {
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    if (window.fbq) {
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
      console.log('[Meta Pixel] Initialized:', META_PIXEL_ID);
    }
  }
};

export const initializeLinkedInPixel = () => {
  if (!LINKEDIN_PARTNER_ID || !hasTrackingConsent()) return;

  if (typeof window !== 'undefined' && !window.lintrk) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `;
    document.head.appendChild(script);

    const pixelScript = document.createElement('script');
    pixelScript.type = 'text/javascript';
    pixelScript.async = true;
    pixelScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(pixelScript);

    console.log('[LinkedIn Pixel] Initialized:', LINKEDIN_PARTNER_ID);
  }
};

export const trackPageView = () => {
  if (!hasTrackingConsent()) return;

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'PageView');
    console.log('[Meta Pixel] PageView tracked');
  }
};

export const trackLead = (source: string) => {
  if (!hasTrackingConsent()) return;

  const utmData = getUTMData();
  const fbp = getFBP();
  const fbc = getFBC();
  const eventID = `${source}_${Date.now()}`;

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'Lead', {
      content_name: source,
      utm_source: utmData?.utm_source || '',
      utm_medium: utmData?.utm_medium || '',
      utm_campaign: utmData?.utm_campaign || '',
      utm_content: utmData?.utm_content || '',
      utm_term: utmData?.utm_term || '',
      landing_page: utmData?.landing_page || window.location.pathname,
      referrer: utmData?.referrer_url || '',
      fbp: fbp || '',
      fbc: fbc || '',
    }, { eventID: eventID });
    console.log('[Meta Pixel] Lead tracked:', source);
  }

  if (window.lintrk && LINKEDIN_PARTNER_ID) {
    window.lintrk('track', { conversion_id: LINKEDIN_PARTNER_ID });
    console.log('[LinkedIn Pixel] Lead tracked:', source);
  }
};
