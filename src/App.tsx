import Header from "./components/Header";
import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PixelTracking from "./components/PixelTracking";
import CookieConsent from "./components/CookieConsent";
import { useAutoTracking } from "./hooks/useAutoTracking";
import Contact from "./components/Contact";

function App() {
  useAutoTracking();

  return (
    <div className="min-h-screen">
      <PixelTracking />
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Benefits />
        <Pricing />
        <Testimonials />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}

export default App;
