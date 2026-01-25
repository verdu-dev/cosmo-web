import { useEffect } from 'react';
import { initializeMetaPixel, initializeLinkedInPixel } from '../utils/tracking';
import { captureUTMParams } from '../utils/utm-capture';

export default function PixelTracking() {
  useEffect(() => {
    captureUTMParams();
    
    initializeMetaPixel();
    initializeLinkedInPixel();
  }, []);

  return null;
}
