export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="py-16 md:py-24 bg-terracotta-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-petrol-900 font-bold">
            Sabemos que cuidar de otras, muchas veces significa descuidarte a ti
            misma.
          </h2>
          <p className="text-xl leading-relaxed text-neutral-600">
            Y que las redes sociales puede sentirse como otra obligación más.
            Por eso creamos <nobr>Cosmo Studio</nobr>: una agencia de gestión de
            redes sociales que entiende tu mundo y transforma tu presencia
            digital en un reflejo auténtico de lo que haces, sin que tengas que
            gestionarlo tú.
          </p>
          <div className="pt-8">
            <div className="inline-block px-8 py-4 bg-petrol-200 rounded-2xl">
              <p className="text-lg font-medium text-dark">
                Porque tu tiempo es valioso. Y tu mensaje, también.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-24 items-center mt-36 max-w-6xl mx-auto">
          <div className="space-y-4 sm:space-y-4.5 md:space-y-5 text-[15px] sm:text-base md:text-lg leading-relaxed">
            <h2 className="text-petrol-900 font-bold text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight ">
              Tu trabajo transforma vidas, tu{" "}
              <span className="text-petrol-300">presencia digital </span>{" "}
              también puede hacerlo.
            </h2>
            <p className="text-neutral-600 text-xl">
              Hola, soy Laia. He creado Cosmo para acompañar a personas y
              proyectos del mundo de la salud mental en sus redes sociales.
            </p>
            <p className="text-neutral-600 text-xl">
              Sé lo que significa cuidar de otros, sostener espacios seguros y
              acompañar procesos profundos. También sé que ese cuidado puede
              dejar poco espacio para ti.
            </p>
            <p className="text-neutral-600 text-xl">
              Estoy aquí para caminar contigo y cuidar tu presencia digital
              mientras tú cuidas de lo que realmente importa.
            </p>
          </div>

          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <img
              src="/Laia_Cosmo_Studio.jpg"
              alt="Laia trabajando en Cosmo Studio"
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
