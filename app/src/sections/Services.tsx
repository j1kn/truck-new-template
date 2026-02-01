import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { TiltCard } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with split effect
      const headerElements = headerRef.current?.querySelectorAll('.animate-item');
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { y: 40, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
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

      // Cards animation with 3D reveal
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 100,
              opacity: 0,
              rotateY: -5,
              transformPerspective: 1200,
            },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.9,
              delay: index * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Image parallax for each card
          const img = card.querySelector('.card-image');
          if (img) {
            gsap.fromTo(
              img,
              { y: 30, scale: 1.1 },
              {
                y: -30,
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      image: '/services_general_haulage.jpg',
      title: 'General Haulage',
      description: 'Full and part loads across the UK with flexible scheduling.',
      tag: 'Most Popular',
    },
    {
      image: '/services_contract.jpg',
      title: 'Contract Transport',
      description: 'Dedicated capacity for regular runs and long-term partnerships.',
      tag: null,
    },
    {
      image: '/services_same_day.jpg',
      title: 'Same-Day / Urgent',
      description: 'When it absolutely has to be there today.',
      tag: 'Express',
    },
    {
      image: '/services_palletised.jpg',
      title: 'Palletised Freight',
      description: 'Standard and non-standard pallets handled with care.',
      tag: null,
    },
    {
      image: '/services_long_distance.jpg',
      title: 'Long-Distance',
      description: 'Regional and cross-country routes with real-time tracking.',
      tag: null,
    },
    {
      image: '/services_specialist.jpg',
      title: 'Specialist Support',
      description: 'Tailored planning for complex and oversized loads.',
      tag: 'Custom',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-24 lg:py-32 bg-off-white relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-industrial-blue/[0.02] to-transparent" />

      <div className="px-6 lg:px-[6vw] relative">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-steel-grey mb-6">
            <span className="w-8 h-px bg-industrial-blue" />
            Our Services
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="animate-item font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.1]">
              What we
              <span className="text-industrial-blue"> move</span>
            </h2>
            <p className="animate-item text-steel-grey text-lg max-w-md">
              Haulage and logistics designed around your deadlines, not ours.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <TiltCard
              key={index}
              className="service-card"
              tiltStrength={6}
              glareEnabled={true}
              scale={1.02}
            >
              <div className="group h-full bg-white rounded-2xl lg:rounded-3xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-52 lg:h-60 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="card-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Tag */}
                  {service.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-industrial-blue text-white text-xs font-medium rounded-full">
                        {service.tag}
                      </span>
                    </div>
                  )}

                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-charcoal" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-heading font-semibold text-xl lg:text-2xl text-charcoal mb-3 group-hover:text-industrial-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-steel-grey text-sm lg:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-industrial-blue font-medium text-sm group/btn">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
