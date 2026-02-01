import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';
import { TiltCard } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

      // Horizontal scroll for cards
      const cardsContainer = cardsContainerRef.current;
      if (cardsContainer) {
        const cards = cardsContainer.querySelectorAll('.testimonial-card');
        const totalWidth = cardsContainer.scrollWidth - window.innerWidth + 100;

        // Create horizontal scroll animation
        const scrollTween = gsap.to(cardsContainer, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 10%',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Update progress bar
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });

        // Cards entrance animation
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, rotateY: -10, transformPerspective: 1200 },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote:
        "They've transformed our logistics. What used to be our biggest headache is now our smoothest operation.",
      name: 'Sarah Collins',
      role: 'Operations Director',
      company: 'TechFlow Industries',
      image: '/testimonial_1.jpg',
      rating: 5,
    },
    {
      quote:
        'Clear updates, no chasing, and they actually answer the phone. Been with them three years and counting.',
      name: 'James Wright',
      role: 'Warehouse Manager',
      company: 'PackRight Solutions',
      image: '/testimonial_2.jpg',
      rating: 5,
    },
    {
      quote:
        "First logistics partner that delivers on their promises. 98% on-time delivery isn't a claim, it's their standard.",
      name: 'Emily Patel',
      role: 'Procurement Lead',
      company: 'Northern Foods Co',
      image: '/testimonial_3.jpg',
      rating: 5,
    },
    {
      quote:
        "Their same-day service has saved us countless times. When we need it there, they make it happen.",
      name: 'Michael Chen',
      role: 'Supply Chain Director',
      company: 'AutoParts Direct',
      image: '/testimonial_1.jpg',
      rating: 5,
    },
    {
      quote:
        "Switched from a major carrier and haven't looked back. Better service, better communication, fair pricing.",
      name: 'Laura Thompson',
      role: 'Logistics Manager',
      company: 'RetailMax UK',
      image: '/testimonial_2.jpg',
      rating: 5,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 lg:py-32 bg-off-white relative overflow-hidden"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-steel-grey mb-6">
            <span className="w-8 h-px bg-industrial-blue" />
            Client Stories
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="animate-item font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal">
              What clients
              <span className="text-industrial-blue"> say</span>
            </h2>

            <div className="animate-item flex flex-col items-start lg:items-end gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-industrial-blue text-industrial-blue"
                  />
                ))}
              </div>
              <p className="text-steel-grey text-sm">
                Rated 4.9/5 from 500+ reviews
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 h-1 bg-charcoal/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-industrial-blue rounded-full origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={cardsContainerRef}
        className="flex gap-6 lg:gap-8 px-6 lg:px-[6vw] pb-4"
      >
        {testimonials.map((testimonial, index) => (
          <TiltCard
            key={index}
            className="testimonial-card flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] max-w-md"
            tiltStrength={5}
            glareEnabled={true}
          >
            <div className="h-full bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-charcoal/5 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-industrial-blue/5 rounded-full blur-2xl" />

              {/* Quote icon */}
              <div className="relative mb-6">
                <div className="w-12 h-12 rounded-2xl bg-industrial-blue/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-industrial-blue" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-industrial-blue text-industrial-blue"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="relative z-10 font-heading font-medium text-lg lg:text-xl text-charcoal leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-charcoal/5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-off-white shadow-sm">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-steel-grey">{testimonial.role}</p>
                  <p className="text-xs text-industrial-blue font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}

        {/* Spacer for scroll end */}
        <div className="flex-shrink-0 w-8" />
      </div>
    </section>
  );
}
