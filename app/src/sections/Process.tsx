import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Truck, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.querySelectorAll('.animate-item');
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Progress line animation
      gsap.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Step cards animation
      const steps = stepsRef.current?.querySelectorAll('.step-card');
      if (steps) {
        steps.forEach((step, index) => {
          const numberEl = step.querySelector('.step-number');
          const iconEl = step.querySelector('.step-icon');
          const contentEl = step.querySelector('.step-content');
          const imageEl = step.querySelector('.step-image');

          // Main card entrance
          gsap.fromTo(
            step,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stepsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Number count up effect
          if (numberEl) {
            gsap.fromTo(
              numberEl,
              { scale: 0, rotate: -90 },
              {
                scale: 1,
                rotate: 0,
                duration: 0.6,
                delay: index * 0.15 + 0.3,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: stepsRef.current,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          // Icon pulse
          if (iconEl) {
            gsap.fromTo(
              iconEl,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.5,
                delay: index * 0.15 + 0.4,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: stepsRef.current,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          // Image parallax
          if (imageEl) {
            const img = imageEl.querySelector('img');
            if (img) {
              gsap.fromTo(
                img,
                { y: 30, scale: 1.1 },
                {
                  y: -30,
                  scale: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: step,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                  },
                }
              );
            }
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Request a quote',
      description: 'Tell us the load, route, and timeline. We respond within hours.',
      image: '/step_1.jpg',
    },
    {
      number: '02',
      icon: Truck,
      title: 'We plan & dispatch',
      description: 'We schedule the right vehicle and driver for your needs.',
      image: '/step_2.jpg',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Delivery, confirmed',
      description: 'Proof of delivery and clear updates throughout the journey.',
      image: '/step_3.jpg',
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="w-full py-24 lg:py-32 bg-charcoal relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-industrial-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-industrial-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="px-6 lg:px-[6vw] relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-off-white/50 mb-6 justify-center">
            <span className="w-8 h-px bg-industrial-blue" />
            How it Works
            <span className="w-8 h-px bg-industrial-blue" />
          </span>
          <h2 className="animate-item font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-off-white mb-4">
            Three simple steps
          </h2>
          <p className="animate-item text-off-white/60 text-lg max-w-md mx-auto">
            From quote to delivery in the most efficient way possible.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Progress Line (desktop only) */}
          <div className="hidden lg:block absolute top-32 left-[15%] right-[15%]">
            <div className="h-px bg-off-white/10 relative">
              <div
                ref={progressLineRef}
                className="absolute inset-0 bg-gradient-to-r from-industrial-blue via-industrial-blue to-industrial-blue/50 origin-left"
              />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="step-card relative flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="relative mb-8">
                  <div className="step-number w-16 h-16 rounded-2xl bg-industrial-blue/20 flex items-center justify-center border border-industrial-blue/30">
                    <span className="font-heading font-bold text-2xl text-industrial-blue">
                      {step.number}
                    </span>
                  </div>
                  {/* Icon overlay */}
                  <div className="step-icon absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-industrial-blue flex items-center justify-center shadow-lg shadow-industrial-blue/30">
                    <step.icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="step-content mb-8">
                  <h3 className="font-heading font-semibold text-xl lg:text-2xl text-off-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-off-white/60 text-sm lg:text-base leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Thumbnail */}
                <div className="step-image w-full max-w-xs rounded-2xl overflow-hidden aspect-[4/3] border border-off-white/10">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Connector arrow (mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-industrial-blue/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
