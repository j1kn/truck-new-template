import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { TrustStrip } from './sections/TrustStrip';
import { Services } from './sections/Services';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { Process } from './sections/Process';
import { Coverage } from './sections/Coverage';
import { Testimonials } from './sections/Testimonials';
import { FinalCTA } from './sections/FinalCTA';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { CustomCursor, ScrollProgress } from './components/animations';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Simulate loading and hide after content is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Refresh ScrollTrigger after content is visible
      ScrollTrigger.refresh();
    }, 100);

    // Setup global snap for pinned sections (disabled for smoother scroll)
    // Can be re-enabled if needed

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-off-white">
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[200] bg-charcoal flex items-center justify-center transition-all duration-700 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-industrial-blue/20 border-t-industrial-blue rounded-full animate-spin mb-4" />
          <span className="font-heading font-bold text-xl text-off-white">UK Haulage</span>
        </div>
      </div>

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Custom Cursor (Desktop only) */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <WhyChooseUs />
        <Process />
        <Coverage />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
