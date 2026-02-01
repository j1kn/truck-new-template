import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Panel reveal with clip-path
      gsap.fromTo(
        panelRef.current,
        {
          clipPath: 'inset(10% 10% 10% 10% round 24px)',
          opacity: 0,
          scale: 0.95,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panelRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Glow animation
      gsap.to(glowRef.current, {
        x: 100,
        y: -50,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Sparkles animation
      const sparkles = panelRef.current?.querySelectorAll('.sparkle');
      if (sparkles) {
        sparkles.forEach((sparkle, index) => {
          gsap.to(sparkle, {
            opacity: 0.3,
            scale: 1.2,
            duration: 2 + index * 0.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-24 bg-off-white">
      <div className="px-6 lg:px-[6vw]">
        <div
          ref={panelRef}
          className="relative bg-charcoal rounded-3xl lg:rounded-[2rem] overflow-hidden"
        >
          {/* Animated glow */}
          <div
            ref={glowRef}
            className="absolute -top-20 -left-20 w-96 h-96 bg-industrial-blue/30 rounded-full blur-[100px]"
          />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-industrial-blue/20 rounded-full blur-[80px]" />

          {/* Sparkle decorations */}
          <Sparkles className="sparkle absolute top-8 right-12 w-6 h-6 text-industrial-blue/20" />
          <Sparkles className="sparkle absolute top-1/3 right-1/4 w-4 h-4 text-industrial-blue/15" />
          <Sparkles className="sparkle absolute bottom-12 left-1/3 w-5 h-5 text-industrial-blue/20" />

          {/* Accent lines */}
          <div className="absolute top-0 left-8 lg:left-16 w-16 h-1.5 bg-industrial-blue rounded-b-full" />
          <div className="absolute top-0 left-28 lg:left-36 w-8 h-1 bg-industrial-blue/50 rounded-b-full" />

          <div
            ref={contentRef}
            className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 p-8 lg:p-16"
          >
            {/* Text */}
            <div className="flex-1 max-w-2xl">
              <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-off-white/40 mb-6">
                <span className="w-8 h-px bg-industrial-blue" />
                Ready to Ship?
              </span>

              <h2 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-off-white leading-tight mb-4">
                Let's move your freight
                <span className="text-industrial-blue"> without the headaches.</span>
              </h2>

              <p className="animate-item text-off-white/60 text-lg">
                Tell us what you're shipping. We'll handle the rest with reliability you can count on.
              </p>
            </div>

            {/* CTAs */}
            <div className="animate-item flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <MagneticButton
                onClick={scrollToContact}
                className="group bg-industrial-blue hover:bg-industrial-blue/90 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-industrial-blue/30 hover:shadow-xl hover:shadow-industrial-blue/40"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <a
                href="tel:08001234567"
                className="group flex items-center gap-3 text-off-white/70 hover:text-off-white transition-colors px-4 py-4"
              >
                <div className="w-10 h-10 rounded-xl bg-off-white/10 flex items-center justify-center group-hover:bg-off-white/15 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs text-off-white/40">Call us</span>
                  <span className="font-medium">0800 123 4567</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
