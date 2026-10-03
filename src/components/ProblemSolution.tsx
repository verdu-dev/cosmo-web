import { useTranslation } from "react-i18next";

export default function ProblemSolution() {
  const { t } = useTranslation();

  return (
    <section id="problem-solution" className="py-16 md:py-24 bg-terracotta-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-petrol-900 font-bold">
            {t("problemSolution.headline1")}
          </h2>
          <p className="text-xl leading-relaxed text-neutral-600">
            {t("problemSolution.introBefore")} <nobr>Cosmo Studio</nobr>
            {t("problemSolution.introAfter")}
          </p>
          <div className="pt-8">
            <div className="inline-block px-8 py-4 bg-petrol-200 rounded-2xl">
              <p className="text-lg font-medium text-dark">
                {t("problemSolution.quote")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-24 items-center mt-36 max-w-6xl mx-auto">
          <div className="space-y-4 sm:space-y-4.5 md:space-y-5 text-[15px] sm:text-base md:text-lg leading-relaxed">
            <h2 className="text-petrol-900 font-bold text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight ">
              {t("problemSolution.headline2Before")}
              <span className="text-petrol-300">
                {t("problemSolution.headline2Accent")}
              </span>
              {t("problemSolution.headline2After")}
            </h2>
            <p className="text-neutral-600 text-xl">
              {t("problemSolution.bioBefore")} <nobr>Cosmo Studio</nobr>
              {t("problemSolution.bioAfter")}
            </p>
            <p className="text-neutral-600 text-xl">
              {t("problemSolution.body2")}
            </p>
            <p className="text-neutral-600 text-xl">
              {t("problemSolution.body3")}
            </p>
          </div>

          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <img
              src="/Laia_Cosmo_Studio.webp"
              alt={t("problemSolution.imageAlt")}
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}