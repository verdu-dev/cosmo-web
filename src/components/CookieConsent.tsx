import { useState, useEffect } from "react";
import { setMarketingCookiesAfterConsent } from "../utils/utm-capture";
import {
  initializeMetaPixel,
  initializeLinkedInPixel,
} from "../utils/tracking";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const consentEnabled = import.meta.env.VITE_CONSENT_MODE_ENABLED === "true";

  useEffect(() => {
    if (!consentEnabled) return;

    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, [consentEnabled]);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setMarketingCookiesAfterConsent();
    initializeMetaPixel();
    initializeLinkedInPixel();
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "denied");
    setShowBanner(false);
  };

  if (!consentEnabled || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-cosmos-petrol/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-dark">
              Utilizamos cookies para mejorar tu experiencia y analizar el
              tráfico. Al hacer clic en "Aceptar", aceptas nuestro uso de
              cookies.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="px-6 py-2 text-sm font-medium text-cosmos-petrol bg-terracotta-50 hover:bg-terracotta-50/80 rounded-lg transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-medium text-white bg-petrol-700 hover:bg-petrol-700/90 rounded-lg transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
