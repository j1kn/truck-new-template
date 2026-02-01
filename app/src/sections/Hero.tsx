import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Shield, Clock, Truck, ChevronDown } from 'lucide-react';
import { MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([labelRef.current, subheadlineRef.current, ctaRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(infoCardRef.current, { opacity: 0, x: 100 });
      gsap.set(bgRef.current?.querySelector('img'), { scale: 1.1 });

      // Master timeline for entrance
      const masterTl = gsap.timeline({ delay: 0.2 });

      // Background reveal
      masterTl.to(
        bgRef.current?.querySelector('img'),
        { scale: 1, duration: 1.5, ease: 'power2.out' },
        0
      );

      // Overlay gradient animation
      masterTl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        0.2
      );

      // Label entrance
      masterTl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.5
      );

      // Headline - word by word reveal with clip
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.set(words, { y: '100%', opacity: 0 });
        masterTl.to(
          words,
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.6
        );
      }

      // Subheadline
      masterTl.to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        1
      );

      // CTAs
      masterTl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        1.1
      );

      // Info card
      masterTl.to(
        infoCardRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        1.2
      );

      // Info card items stagger
      const infoItems = infoCardRef.current?.querySelectorAll('.info-item');
      if (infoItems) {
        gsap.set(infoItems, { opacity: 0, x: 30 });
        masterTl.to(
          infoItems,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          1.4
        );
      }

      // Scroll indicator
      masterTl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.6
      );

      // Continuous scroll indicator animation
      gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-arrow'), {
        y: 8,
        duration: 1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Scroll-driven parallax and exit
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.8,
          onLeaveBack: () => {
            gsap.set(
              [labelRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current],
              { x: 0, opacity: 1 }
            );
            gsap.set(infoCardRef.current, { x: 0, opacity: 1 });
            gsap.set(bgRef.current?.querySelector('img'), { scale: 1, y: 0 });
          },
        },
      });

      // Parallax on background image
      scrollTl.to(
        bgRef.current?.querySelector('img'),
        { y: '-15%', scale: 1.15, ease: 'none' },
        0
      );

      // Content exit with stagger
      scrollTl.to(
        labelRef.current,
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.to(
        headlineRef.current,
        { x: '-25vw', opacity: 0, ease: 'power2.in' },
        0.52
      );

      scrollTl.to(
        subheadlineRef.current,
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.54
      );

      scrollTl.to(
        ctaRef.current,
        { x: '-15vw', opacity: 0, ease: 'power2.in' },
        0.56
      );

      scrollTl.to(
        infoCardRef.current,
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.to(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const infoItems = [
    { icon: MapPin, text: 'Operating across the UK' },
    { icon: Shield, text: 'Fully insured & licensed' },
    { icon: Clock, text: '24/7 availability' },
    { icon: Truck, text: 'Modern fleet' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-charcoal"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img
          src="/hero_truck_v2.png"
          alt="Modern truck on UK motorway"
          className="w-full h-full object-cover will-change-transform"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/30"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[6vw]"
      >
        <div className="max-w-4xl">
          {/* Label */}
          <span
            ref={labelRef}
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-off-white/60 mb-8"
          >
            <span className="w-8 h-px bg-industrial-blue" />
            UK Transport & Logistics
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-off-white leading-[1] tracking-tight mb-8"
          >
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">Reliable</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">Trucking.</span>
            </span>
            <br />
            <span className="overflow-hidden inline-block">
              <span className="word inline-block text-industrial-blue">On</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block text-industrial-blue">Time.</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">Every</span>
            </span>{' '}
            <span className="overflow-hidden inline-block">
              <span className="word inline-block">Time.</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg lg:text-xl text-off-white/70 max-w-xl mb-10 leading-relaxed"
          >
            UK-wide transport solutions built for businesses that don't miss deadlines.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="group bg-industrial-blue hover:bg-industrial-blue/90 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-industrial-blue/30 hover:shadow-xl hover:shadow-industrial-blue/40"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection('services')}
              className="group border border-off-white/30 text-off-white hover:bg-off-white/10 font-medium px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
            >
              Our Services
              <ArrowRight className="w-4 h-4 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
            </MagneticButton>
          </div>
        </div>

        {/* Info Card */}
        <div
          ref={infoCardRef}
          className="hidden lg:block absolute right-[6vw] top-1/2 -translate-y-1/2 w-[32vw] max-w-md"
        >
          <div className="relative bg-charcoal/80 backdrop-blur-xl rounded-3xl p-8 border border-off-white/10 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-industrial-blue/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-1 bg-industrial-blue rounded-full" />
                <span className="text-off-white/60 text-sm font-medium">Why choose us</span>
              </div>
              
              <div className="space-y-4">
                {infoItems.map((item, index) => (
                  <div
                    key={index}
                    className="info-item group flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-off-white/5 cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-industrial-blue/10 flex items-center justify-center transition-all group-hover:bg-industrial-blue/20 group-hover:scale-110">
                      <item.icon className="w-5 h-5 text-industrial-blue" />
                    </div>
                    <span className="text-off-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Info Items */}
      <div className="lg:hidden absolute bottom-24 left-6 right-6 z-10">
        <div className="grid grid-cols-2 gap-3">
          {infoItems.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-charcoal/80 backdrop-blur-md rounded-xl px-4 py-3 border border-off-white/10"
            >
              <item.icon className="w-4 h-4 text-industrial-blue flex-shrink-0" />
              <span className="text-xs text-off-white/90 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-off-white/40 text-xs font-medium tracking-wider uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-off-white/20 flex items-start justify-center pt-2">
          <ChevronDown className="scroll-arrow w-4 h-4 text-off-white/40" />
        </div>
      </div>
    </section>
  );
}
