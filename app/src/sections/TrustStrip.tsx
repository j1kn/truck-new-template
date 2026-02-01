import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Shield, Phone, Award } from 'lucide-react';
import { TiltCard, CountUp } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated line reveal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        gsap.fromTo(
          stats,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation with 3D reveal
      const cards = cardsRef.current?.querySelectorAll('.trust-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 80,
            opacity: 0,
            rotateX: 15,
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 98, suffix: '%', label: 'On-Time Delivery' },
    { value: 10000, suffix: '+', label: 'Deliveries Made' },
    { value: 24, suffix: '/7', label: 'Support Available' },
  ];

  const trustItems = [
    {
      icon: Clock,
      title: 'Punctual',
      description: 'We hit the window you were promised.',
    },
    {
      icon: Shield,
      title: 'Insured',
      description: 'Full goods-in-transit cover as standard.',
    },
    {
      icon: Phone,
      title: 'Available 24/7',
      description: 'Support and dispatch when you need it.',
    },
    {
      icon: Award,
      title: 'Experienced',
      description: 'Drivers who know the roads and the rules.',
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 bg-off-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-industrial-blue/[0.02] to-transparent" />

      <div className="px-6 lg:px-[6vw] relative">
        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center lg:text-left">
              <div className="font-heading font-bold text-4xl lg:text-5xl text-charcoal mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="text-steel-grey text-sm lg:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Animated line */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-charcoal/20 to-transparent mb-16 lg:mb-24 origin-left"
        />

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-steel-grey mb-4">
              <span className="w-8 h-px bg-industrial-blue" />
              Built to Deliver
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight">
              On-time delivery.
              <br />
              <span className="text-steel-grey">Clear communication. No surprises.</span>
            </h2>
          </div>
          <p className="text-steel-grey max-w-sm lg:text-right">
            Every delivery backed by our promise of reliability and transparency.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {trustItems.map((item, index) => (
            <TiltCard
              key={index}
              className="trust-card"
              tiltStrength={8}
              glareEnabled={true}
            >
              <div className="h-full bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-charcoal/5 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-industrial-blue/10 to-industrial-blue/5 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="w-6 h-6 text-industrial-blue" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-steel-grey leading-relaxed">
                  {item.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
