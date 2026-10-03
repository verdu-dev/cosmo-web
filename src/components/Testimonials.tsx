import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";

interface Client {
  name: string;
  type: string;
  image: string;
  instagramFeed: string;
  instagramUrl: string;
  growth: string;
  followers: string;
  description: string;
  highlights?: string[];
  highlightsTitle?: string;
}

interface ClientMeta {
  id: string;
  name: string;
  image: string;
  instagramFeed: string;
  instagramUrl: string;
}

// Structural client data (proper nouns + assets) that is identical in every
// locale; the translatable copy lives in the locale dictionaries.
const clientMeta: ClientMeta[] = [
  {
    id: "taktikum",
    name: "@taktikum",
    image: "https://placehold.co/300x300/E7DCC8/3E5C64?text=Cliente+1",
    instagramFeed: "/Taktikum.webp",
    instagramUrl: "https://www.instagram.com/taktikum/",
  },
  {
    id: "equazenes",
    name: "@equazenes",
    image: "https://placehold.co/300x300/E7DCC8/3E5C64?text=Cliente+2",
    instagramFeed: "/Equazenes.webp",
    instagramUrl: "https://www.instagram.com/equazenes/",
  },
  {
    id: "totterapia",
    name: "@totterapia",
    image: "https://placehold.co/300x300/E7DCC8/3E5C64?text=Cliente+3",
    instagramFeed: "/Totterapia.webp",
    instagramUrl: "https://www.instagram.com/totterapia/",
  },
  {
    id: "intuity",
    name: "@Intuity_Co",
    image: "https://placehold.co/300x300/E7DCC8/3E5C64?text=Cliente+4",
    instagramFeed: "/Intuity.webp",
    instagramUrl: "https://www.instagram.com/intuity_co/",
  },
];

// Carousel testimonial data (kept for the disabled/inactive carousel).
const testimonialImages = [
  "https://placehold.co/100x100/D9A382/FFFFFF?text=MG",
  "https://placehold.co/100x100/3E5C64/FFFFFF?text=LM",
  "https://placehold.co/100x100/C48F71/FFFFFF?text=AS",
];

const testimonialAuthors = ["María González", "Laura Martínez", "Ana Sánchez"];

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentClient, setCurrentClient] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showClientDetail, setShowClientDetail] = useState(false);

  const clients: Client[] = clientMeta.map((meta) => ({
    name: meta.name,
    type: t(`testimonials.clients.${meta.id}.type`),
    image: meta.image,
    instagramFeed: meta.instagramFeed,
    instagramUrl: meta.instagramUrl,
    growth: t(`testimonials.clients.${meta.id}.growth`),
    followers: t(`testimonials.clients.${meta.id}.followers`),
    description: t(`testimonials.clients.${meta.id}.description`),
    highlightsTitle: t(`testimonials.clients.${meta.id}.highlightsTitle`),
    highlights: [0, 1].map((index) =>
      t(`testimonials.clients.${meta.id}.highlights.${index}`),
    ),
  }));

  const testimonials = [0, 1, 2].map((index) => ({
    text: t(`testimonials.carousel.${index}.text`),
    author: testimonialAuthors[index],
    role: t(`testimonials.carousel.${index}.role`),
    image: testimonialImages[index],
  }));

  const nextClient = () => {
    setCurrentClient((prev) => (prev + 1) % clients.length);
  };

  const prevClient = () => {
    setCurrentClient((prev) => (prev - 1 + clients.length) % clients.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

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
        nextClient();
      } else {
        prevClient();
      }
    }
  };

  return (
    <section id="clientes" className="py-16 md:py-24 bg-terracotta-50">
      <div className="section-container">
        <h2 className="text-center text-petrol-900 font-bold mb-4">
          {t("testimonials.title")}
        </h2>
        <p className="text-center text-xl text-neutral-600 mb-12 md:mb-16 max-w-3xl mx-auto">
          {t("testimonials.intro")}
        </p>

        <div className="mb-16">
          <div
            className="relative max-w-5xl mx-auto touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-4xl font-heading text-petrol-900 mb-2">
                    {clients[currentClient].name}
                  </h3>
                  <p className="text-neutral-600 text-xl mb-4">
                    {clients[currentClient].type}
                  </p>

                  <div className="space-y-3 mt-6 mb-6 text-lg">
                    <div className="flex items-center space-x-3 text-petrol-900">
                      <TrendingUp className="text-petrol-900" size={20} />
                      <span className="font-medium">
                        {clients[currentClient].growth}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-petrol-900">
                      <Star className="text-petrol-900" size={20} />
                      <span className="font-medium">
                        {clients[currentClient].followers}
                      </span>
                    </div>
                  </div>

                  <p className="hidden md:block text-neutral-600 border-t border-neutral-200 pt-6 leading-relaxed text-lg">
                    {clients[currentClient].description}
                  </p>
                </div>

                <a
                  href={clients[currentClient].instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-1 md:order-2 relative group overflow-hidden rounded-2xl block cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmos-terracotta/20 to-cosmos-petrol/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="bg-white/90 rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-cosmos-petrol"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                  </div>
                  <img
                    src={clients[currentClient].instagramFeed}
                    alt={t("testimonials.feedAlt", {
                      name: clients[currentClient].name,
                    })}
                    className="rounded-2xl aspect-square shadow-lg w-full transform scale-[1.4] group-hover:scale-[1.45] transition-transform duration-500 object-cover"
                  />
                </a>
              </div>
            </div>

            <button
              onClick={prevClient}
              className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-petrol-400 hover:text-petrol-50 transition-all duration-200"
              aria-label={t("testimonials.prevClient")}
            >
              <ChevronLeft className="text-cosmos-petrol" size={24} />
            </button>

            <button
              onClick={nextClient}
              className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-petrol-400 hover:text-petrol-50 transition-all duration-200"
              aria-label={t("testimonials.nextClient")}
            >
              <ChevronRight className="text-cosmos-petrol" size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentClient(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentClient
                    ? "bg-petrol-400 w-8"
                    : "bg-terracotta-200"
                }`}
                aria-label={t("testimonials.viewClient", { number: index + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}