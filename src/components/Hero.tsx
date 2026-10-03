import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative py-24 min-h-svh flex items-center bg-terracotta-50"
    >
      <div className="absolute inset-0 bg-[url('/hero2.webp')] bg-cover bg-center blur-[2px] md:blur-none"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative section-container z-10 flex flex-col items-center max-w-6xl text-center">
        <h1 className="text-petrol-50 font-bold text-3xl sm:text-4xl md:text-[2.75rem] lg:text-6xl">
          {t("hero.titleBefore")}
          <span className="text-petrol-300">{t("hero.titleAccent")}</span>
          {t("hero.titleAfter")}
        </h1>

        <p className="text-petrol-100 mt-4 text-lg md:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="flex justify-center gap-4 mt-12">
          <a
            href="#problem-solution"
            className="cta-secondary text-dark px-8 md:px-12 py-4"
          >
            {t("hero.ctaMore")}
          </a>
          <a href="#contacto" className="cta-primary px-8 md:px-12 py-4">
            {t("hero.ctaContact")}
          </a>
        </div>
      </div>
    </section>
  );
}