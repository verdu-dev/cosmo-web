import { useEffect } from 'react';
import { trackLead } from '../utils/tracking';

export const useAutoTracking = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a[href]');
      
      if (!button) return;

      const buttonText = button.textContent?.trim() || '';
      const href = button.getAttribute('href') || '';
      
      let source = 'unknown';
      
      if (href.includes('wa.me') || href.includes('whatsapp')) {
        source = 'whatsapp_button';
      } else if (href.includes('mailto:')) {
        source = 'email_button';
      } else if (href.includes('instagram') || href.includes('linkedin')) {
        source = 'social_media_button';
      } else if (buttonText) {
        source = buttonText.toLowerCase().replace(/\s+/g, '_').substring(0, 50);
      }

      trackLead(source);
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
