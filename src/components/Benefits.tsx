import { useTranslation } from "react-i18next";
import {
  Clock,
  Users,
  Heart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface BenefitMeta {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const benefitsMeta: BenefitMeta[] = [
  {
    icon: Clock,
    titleKey: "benefits.items.horas.title",
    descriptionKey: "benefits.items.horas.description",
  },
  {
    icon: Users,
    titleKey: "benefits.items.pacientes.title",
    descriptionKey: "benefits.items.pacientes.description",
  },
  {
    icon: Heart,
    titleKey: "benefits.items.esencia.title",
    descriptionKey: "benefits.items.esencia.description",
  },
  {
    icon: TrendingUp,
    titleKey: "benefits.items.crecimiento.title",
    descriptionKey: "benefits.items.crecimiento.description",
  },
];

export default function Benefits() {
  const { t } = useTranslation();

  const benefits = benefitsMeta.map((meta) => ({
    icon: meta.icon,
    title: t(meta.titleKey),
    description: t(meta.descriptionKey),
  }));

  return (
    <section
      id="beneficios"
      className="py-16 md:py-24 bg-gradient-to-br from-cosmos-beige via-white to-cosmos-beige"
    >
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-cosmos-petrol mb-4 font-bold">
            {t("benefits.titleBefore")}
            <span className="text-petrol-400">{t("benefits.titleAccent")}</span>
            {t("benefits.titleAfter")}
          </h2>
          <p className="text-neutral-600 text-xl">{t("benefits.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex md:flex-row flex-col items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-petrol-700/10 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-petrol-400" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl text-neutral-600 font-semibold">
                          {benefit.title}
                        </h3>
                        <p className="text-neutral-600 text-lg">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(62,92,100,0.25)] transition-all duration-500 transform">
              <img
                src="/Management.webp"
                alt={t("benefits.imageAlt")}
                className="size-full object-cover transform transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}