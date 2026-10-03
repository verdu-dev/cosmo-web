import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center border-t border-petrol-500 py-10 bg-petrol-400">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 lg:flex-row">
        <img
          className="h-8 w-auto"
          src="/Cosmo_white.webp"
          alt={t("footer.logoAlt")}
        />

        <p className="text-center text-petrol-50">
          {t("footer.legal", { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}