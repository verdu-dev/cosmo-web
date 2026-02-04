import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  company: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Ignacio",
    company: "Trainer",
    text: "Trabajé con Laia durante un año y la experiencia fue excepcional. Destaca por su visión estratégica, su capacidad de análisis y, sobre todo, por su impecable ejecución. Más allá de lo profesional, es una persona muy cercana, con un profundo trabajo de desarrollo personal que se refleja directamente en la calidad de su trabajo y en cómo acompaña a los demás. Si está valorando contratarla, mi recomendación es clara: no lo dudes ni un segundo.",
  },
  {
    name: "Pablo Castells",
    company: "Intuity",
    text: "Treballar amb la Laia és un autèntic gust. Gràcies a ella hem pogut donar estructura i impuls a la nostra comunicació, guanyant fluïdesa, coherència i claredat. Ens ha acompanyat amb molta professionalitat en processos de màrqueting i publicitat, fent-ho tot fàcil i eficient. És una persona pragmàtica, responsable i molt compromesa amb el que fa. Es nota que hi posa el 100% i que cuida cada detall. Estem molt contents de seguir colaborant junts.",
  },
  {
    name: "Anna Olivella",
    company: "Taktikum",
    text: "Treballar amb la Laia ha estat molt fàcil i agradable des del principi. Ha sabut entendre des del primer moment què és Taktikum i com volíem comunicar-nos, respectant el to, els valors i la sensibilitat del projecte. És implicada, organitzada i té molt bon criteri a l'hora de crear contingut, sempre amb una mirada cuidada i coherent. Personalment ens aporta tranquil·litat, professionalitat i confiança, i això en un projecte com el nostre és clau.",
  },
  {
    name: "Bruno Raventós",
    company: "Equazen (By Vitae Health Innovation)",
    text: "Laia aporta una combinación genial de criterio estratégico y sensibilidad. Nos ha ayudado a comunicar con más precisión y a tomar mejores decisiones, siempre desde una mirada clara, práctica y alineada con nuestros valores. Una colaboración profesional y muy bien enfocada.",
  },
];

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);

  /* useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []); */

  // Swipe handlers
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum distance to be considered as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      } else {
        setCurrentReview(
          (prev) => (prev - 1 + reviews.length) % reviews.length,
        );
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-petrol-900 mb-4 font-bold">
            Qué dicen nuestras clientas
          </h2>
          <p className="text-neutral-600 mx-auto text-xl">
            Testimonios reales de profesionales que han transformado su
            presencia digital
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative rounded-2xl flex flex-col justify-center items-center shadow-2xl p-6 md:p-12 border border-petrol-100 aspect-[11/16] md:aspect-[16/8]">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 md:w-7 md:h-7 fill-petrol-400 text-petrol-400 mx-1"
                  />
                ))}
              </div>

              <div className="min-h-[200px] md:min-h-[160px] flex items-center justify-center">
                <p className="md:text-xl text-dark text-center leading-relaxed font-light italic transition-all duration-500">
                  {reviews[currentReview].text}
                </p>
              </div>

              <div className="mt-8 md:mt-12 text-center">
                <div className="inline-block">
                  {reviews[currentReview].name &&
                  reviews[currentReview].company ? (
                    <>
                      <h4 className="text-xl md:text-2xl font-semibold text-cosmos-petrol mb-1">
                        {reviews[currentReview].name}
                      </h4>
                      <p className="text-dark/60 text-sm md:text-base">
                        {reviews[currentReview].company}
                      </p>
                    </>
                  ) : reviews[currentReview].name ? (
                    <h4 className="text-xl md:text-2xl font-semibold text-cosmos-petrol">
                      {reviews[currentReview].name}
                    </h4>
                  ) : (
                    <h4 className="text-xl md:text-2xl font-semibold text-cosmos-petrol">
                      {reviews[currentReview].company}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 gap-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentReview
                    ? "w-12 h-3 bg-petrol-400"
                    : "w-3 h-3 bg-terracotta-200 hover:bg-petrol-400"
                }`}
                aria-label={`Ver review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
