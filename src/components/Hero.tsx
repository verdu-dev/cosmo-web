export default function Hero() {
  return (
    <section
      id="hero"
      className="relative py-12 min-h-svh sm:py-16 md:py-20 flex items-center lg:py-24 bg-terracotta-50"
    >
      <div className="absolute inset-0 bg-[url('/hero2.webp')] bg-cover bg-center blur-[2px] md:blur-none"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative section-container z-10 flex flex-col items-center max-w-6xl text-center">
        <h1 className="text-petrol-50 font-bold text-3xl sm:text-4xl md:text-[2.75rem] lg:text-6xl">
          Gestión de redes sociales para{" "}
          <span className="text-petrol-300">profesionales </span> de la salud y
          el bienestar
        </h1>

        <p className="text-petrol-100 mt-4 text-xl">
          Gestión de redes sociales para marcas que cuidan. En Cosmo Studio
          ayudamos a psicólogas, terapeutas y profesionales de la salud y el
          bienestar a construir una presencia digital estratégica, coherente y
          sostenible, para que tu marca crezca mientras ganas tiempo.
        </p>

        <div className="flex justify-center gap-4 mt-12">
          <a
            href="#problem-solution"
            className="cta-secondary text-dark px-12 py-4"
          >
            Más info
          </a>
          <a href="#contacto" className="cta-primary px-12 py-4">
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
