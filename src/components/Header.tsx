import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 text-light transition-all duration-300 ${
        isScrolled
          ? "bg-petrol-400 shadow-md py-0"
          : "bg-transparent shadow-none py-2"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img
              src="/Cosmo_white.png"
              alt="Cosmo Logo"
              className={`w-auto cursor-pointer transition-all duration-300 ${
                isScrolled ? "h-7" : "h-[38px]"
              }`}
              onClick={() => scrollToSection("hero")}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-cosmos-terracotta transition-colors duration-200"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("Planes")}
              className="hover:text-cosmos-terracotta transition-colors duration-200"
            >
              Planes
            </button>
            <button
              onClick={() => scrollToSection("clientes")}
              className="hover:text-cosmos-terracotta transition-colors duration-200"
            >
              Nuestras clientas
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="cta-primary text-sm bg-petrol-700"
            >
              ¿Hablamos?
            </button>
          </nav>

          <button
            className="md:hidden p-2 hover:bg-petrol-700/80 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-petrol-400 absolute z-50 top-20 left-0 right-0 h-[calc(100vh-80px)]">
          <nav className="section-container py-6 flex flex-col space-y-4  h-full">
            <button
              onClick={() => scrollToSection("hero")}
              className="py-3 px-4 hover:bg-cosmos-terracotta/10 rounded-lg transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("Planes")}
              className="py-3 px-4 hover:bg-cosmos-terracotta/10 rounded-lg transition-colors"
            >
              Planes
            </button>
            <button
              onClick={() => scrollToSection("clientes")}
              className="py-3 px-4 hover:bg-cosmos-terracotta/10 rounded-lg transition-colors"
            >
              Nuestras clientas
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="cta-primary text-center bg-petrol-700"
            >
              ¿Hablamos?
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
