import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
      .fromTo(
        linksRef.current?.querySelectorAll('.nav-link') || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current?.children || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active section detection
    const sections = ['services', 'coverage', 'process', 'contact'];
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Update active indicator position
  useEffect(() => {
    const indicator = activeIndicatorRef.current;
    const activeLink = linksRef.current?.querySelector(`[data-section="${activeSection}"]`);
    
    if (indicator && activeLink && activeSection) {
      const rect = activeLink.getBoundingClientRect();
      const parentRect = linksRef.current?.getBoundingClientRect();
      
      if (parentRect) {
        gsap.to(indicator, {
          x: rect.left - parentRect.left,
          width: rect.width,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    } else if (indicator) {
      gsap.to(indicator, { opacity: 0, duration: 0.2 });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Coverage', id: 'coverage' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-off-white/95 backdrop-blur-xl border-b border-charcoal/5 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              ref={logoRef}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`font-heading font-bold text-lg lg:text-xl tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-charcoal' : 'text-off-white'
              }`}
            >
              <span className="relative">
                UK Haulage
                <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-industrial-blue rounded-full" />
              </span>
            </button>

            {/* Desktop Navigation */}
            <div ref={linksRef} className="hidden lg:flex items-center gap-1 relative">
              {/* Active indicator */}
              <div
                ref={activeIndicatorRef}
                className="absolute bottom-0 h-0.5 bg-industrial-blue rounded-full opacity-0"
              />
              
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  data-section={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`nav-link relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isScrolled
                      ? activeSection === link.id
                        ? 'text-industrial-blue'
                        : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                      : activeSection === link.id
                      ? 'text-white'
                      : 'text-off-white/70 hover:text-off-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div ref={ctaRef} className="hidden lg:flex items-center gap-4">
              <a
                href="tel:08001234567"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal/70 hover:text-charcoal' : 'text-off-white/70 hover:text-off-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                0800 123 4567
              </a>
              <MagneticButton
                onClick={() => scrollToSection('contact')}
                className="bg-industrial-blue hover:bg-industrial-blue/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-industrial-blue/25 hover:shadow-xl hover:shadow-industrial-blue/30"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-charcoal hover:bg-charcoal/5' : 'text-off-white hover:bg-white/10'
              }`}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-[11px] rotate-45' : 'top-1.5'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[11px] w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-[11px] -rotate-45' : 'top-[18px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-4 right-4 bg-off-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="p-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left text-lg font-medium text-charcoal py-3 px-4 rounded-xl transition-all hover:bg-charcoal/5 ${
                    activeSection === link.id ? 'bg-industrial-blue/10 text-industrial-blue' : ''
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <hr className="border-charcoal/10 my-4" />
            <a
              href="tel:08001234567"
              className="flex items-center gap-3 text-charcoal font-medium py-3 px-4 rounded-xl hover:bg-charcoal/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-industrial-blue/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-industrial-blue" />
              </div>
              0800 123 4567
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 bg-industrial-blue hover:bg-industrial-blue/90 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
