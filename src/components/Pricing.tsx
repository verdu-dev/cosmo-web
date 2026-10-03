import { useTranslation } from "react-i18next";
import { Check, Sparkles } from "lucide-react";

const planIds = ["presencia", "conecta", "impulsa"] as const;

const planFeatureCounts: Record<string, number> = {
  presencia: 5,
  conecta: 5,
  impulsa: 4,
};

const highlightedPlan = "conecta";

interface Plan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  isHighlighted: boolean;
}

export default function Pricing() {
  const { t } = useTranslation();

  const Planes: Plan[] = planIds.map((id) => ({
    name: t(`pricing.plans.${id}.name`),
    subtitle: t(`pricing.plans.${id}.subtitle`),
    price: t(`pricing.plans.${id}.price`),
    features: Array.from(
      { length: planFeatureCounts[id] },
      (_, index) => t(`pricing.plans.${id}.features.${index}`),
    ),
    isHighlighted: id === highlightedPlan,
  }));

  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="Planes" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="text-center text-petrol-900 font-bold mb-4 max-w-2xl mx-auto">
          {t("pricing.title")}
        </h2>
        <p className="text-center text-xl text-neutral-600 mb-12 md:mb-16 max-w-3xl mx-auto">
          {t("pricing.intro")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12 mt-24">
          {Planes.map((Plan, index) => (
            // Container
            <div
              key={index}
              className={`relative rounded-3xl p-8 ${
                Plan.isHighlighted
                  ? "bg-petrol-400 text-light shadow-2xl scale-105 border-2 border-petrol-400"
                  : "bg-terracotta-50 shadow-lg"
              }`}
            >
              {Plan.isHighlighted && (
                // Badge
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-petrol-200 text-petrol-900 px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <Sparkles size={16} />
                    <span>{t("pricing.popularBadge")}</span>
                  </div>
                </div>
              )}

              <div className="space-y-6 flex flex-col h-full">
                <div>
                  {/* Title */}
                  <h3
                    className={`text-2xl font-heading ${
                      Plan.isHighlighted
                        ? "text-petrol-50"
                        : "text-cosmos-petrol-dark"
                    }`}
                  >
                    {Plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={`text-lg ${
                      Plan.isHighlighted
                        ? "text-petrol-100"
                        : "text-neutral-600"
                    }`}
                  >
                    {Plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div
                  className={`text-3xl font-bold ${
                    Plan.isHighlighted ? "text-petrol-50" : "text-petrol-900"
                  }`}
                >
                  {Plan.price}
                </div>

                {/* Features */}
                <ul className="space-y-4 !mb-12">
                  {Plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check
                        className={`flex-shrink-0 mt-1 ${
                          Plan.isHighlighted
                            ? "text-petrol-50"
                            : "text-petrol-900"
                        }`}
                        size={20}
                      />
                      <span
                        className={`text-lg ${
                          Plan.isHighlighted
                            ? "text-petrol-50"
                            : "text-petrol-900"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 !mt-auto ${
                    Plan.isHighlighted
                      ? "bg-white text-petrol-900 hover:bg-white/90"
                      : "bg-petrol-400 text-light hover:bg-opacity-90"
                  }`}
                >
                  {t("pricing.moreInfo")}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center italic text-neutral-600 !mt-20 mb-16 text-lg max-w-3xl mx-auto">
          {t("pricing.note")}
        </p>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-cosmos-terracotta/10 to-cosmos-petrol/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-4xl font-heading text-petrol-900 font-bold mb-4">
            {t("pricing.customPlan.title")}
          </h3>
          <p className="text-xl text-dark/80 mb-6">
            {t("pricing.customPlan.description")}
          </p>
          <button
            onClick={scrollToContact}
            className="bg-petrol-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-90 hover:scale-105"
          >
            {t("pricing.customPlan.button")}
          </button>
        </div>
      </div>
    </section>
  );
}