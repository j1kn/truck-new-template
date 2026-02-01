import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, ArrowUpRight, Linkedin, Twitter, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(
        footerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content stagger
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Coverage', id: 'coverage' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer ref={footerRef} className="w-full bg-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-industrial-blue/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-industrial-blue/5 rounded-full blur-[100px]" />
      </div>

      <div ref={contentRef} className="relative px-6 lg:px-[6vw] py-16 lg:py-20">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="animate-item max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-industrial-blue/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-industrial-blue" />
              </div>
              <span className="font-heading font-bold text-2xl text-off-white">
                UK Haulage
              </span>
            </div>
            <p className="text-off-white/50 leading-relaxed mb-6">
              Reliable UK-wide transport and logistics solutions for businesses
              that demand excellence. On time. Every time.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-off-white/5 flex items-center justify-center text-off-white/50 hover:bg-industrial-blue/20 hover:text-industrial-blue transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="animate-item">
            <h4 className="font-heading font-semibold text-off-white mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="group flex items-center gap-2 text-off-white/50 hover:text-off-white transition-colors text-left"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="animate-item">
            <h4 className="font-heading font-semibold text-off-white mb-6">
              Services
            </h4>
            <nav className="flex flex-col gap-4">
              {['General Haulage', 'Contract Transport', 'Same-Day Delivery', 'Palletised Freight'].map(
                (service) => (
                  <button
                    key={service}
                    onClick={() => scrollToSection('services')}
                    className="group flex items-center gap-2 text-off-white/50 hover:text-off-white transition-colors text-left"
                  >
                    <span>{service}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </button>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="animate-item">
            <h4 className="font-heading font-semibold text-off-white mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:08001234567"
                className="text-off-white/50 hover:text-industrial-blue transition-colors"
              >
                0800 123 4567
              </a>
              <a
                href="mailto:hello@ukhaulage.co"
                className="text-off-white/50 hover:text-industrial-blue transition-colors"
              >
                hello@ukhaulage.co
              </a>
              <p className="text-off-white/50">
                Birmingham, UK
              </p>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="animate-item h-px bg-gradient-to-r from-transparent via-off-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="animate-item flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-sm text-off-white/30">
            © 2026 UK Haulage. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="text-sm text-off-white/30 hover:text-off-white/60 transition-colors">
              Privacy Policy
            </button>
            <button className="text-sm text-off-white/30 hover:text-off-white/60 transition-colors">
              Terms of Service
            </button>
            <button className="text-sm text-off-white/30 hover:text-off-white/60 transition-colors">
              Cookie Settings
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-off-white/30 hover:text-off-white/60 transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-lg bg-off-white/5 flex items-center justify-center group-hover:bg-industrial-blue/20 transition-colors">
              <ArrowUpRight className="w-4 h-4 -rotate-45" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
