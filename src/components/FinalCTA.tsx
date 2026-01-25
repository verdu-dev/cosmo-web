import { Mail, Instagram } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-petrol-700 text-light">
      <div className="section-container">
        <div>
          <h1 className="text-light font-bold">¿Hablamos?</h1>

          <a
            href="mailto:hola@cosmostudio.es"
            className="inline-flex items-center space-x-3 bg-white text-cosmos-petrol px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-lg"
          >
            <Mail size={21} />
            <span>CONTACTO</span>
          </a>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"></div>
        </div>
      </div>
    </section>
  );
}
