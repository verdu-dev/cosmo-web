import { Clock, Users, Heart, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Ahorra horas cada semana",
    description:
      "Recupera tu tiempo para lo que realmente importa: tus pacientes, tu familia, tu autocuidado. Nosotras nos ocupamos de tus redes sociales.",
  },
  {
    icon: Users,
    title: "Conecta con pacientes potenciales",
    description:
      "Atrae a las personas que realmente necesitan tu ayuda con contenido auténtico que refleja tu esencia y tu forma de trabajar.",
  },
  {
    icon: Heart,
    title: "Siente que tu marca digital por fin refleja quién eres",
    description:
      "Una presencia online auténtica, cuidada y coherente con tu forma de acompañar. Sin perder tu esencia en el camino.",
  },
  {
    icon: TrendingUp,
    title: "Haz crecer tu centro desde el conocimiento y sin agobios",
    description:
      "Crecimiento sostenible y consciente. Sin prisas, sin presión, pero con estrategia y propósito claro.",
  },
];

export default function Benefits() {
  return (
    <section
      id="beneficios"
      className="py-16 md:py-24 bg-gradient-to-br from-cosmos-beige via-white to-cosmos-beige"
    >
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-cosmos-petrol mb-4 font-bold">
            ¿Por qué <span className="text-petrol-400">delegar</span> tus redes
            sociales?
          </h2>
          <p className="text-neutral-600 text-xl">
            Recupera tu tiempo y potencia tu presencia digital
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
                src="/Management.jpg"
                alt="Organización y planificación profesional"
                className="size-full object-cover transform transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
