import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Route, Zap, Clock } from 'lucide-react';
import { MagneticButton, CountUp } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Coverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const routesRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map animation with draw effect
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.9 },
        {
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

      // Animated route paths
      const paths = mapRef.current?.querySelectorAll('.route-path');
      if (paths) {
        paths.forEach((path, index) => {
          const length = (path as SVGPathElement).getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            delay: index * 0.3 + 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }

      // City dots pulse animation
      const dots = mapRef.current?.querySelectorAll('.city-dot');
      if (dots) {
        dots.forEach((dot, index) => {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: index * 0.1 + 1,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: mapRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Continuous pulse
          gsap.to(dot, {
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          });
        });
      }

      // Content animation
      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats cards animation
      const stats = contentRef.current?.querySelectorAll('.stat-card');
      if (stats) {
        gsap.fromTo(
          stats,
          { y: 50, opacity: 0, rotateX: 10, transformPerspective: 1000 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stats[0],
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: MapPin, value: 50, suffix: '+', label: 'Depots Nationwide' },
    { icon: Route, value: 1000, suffix: '+', label: 'Routes Weekly' },
    { icon: Zap, value: 4, suffix: 'hr', label: 'Same-Day Available' },
    { icon: Clock, value: 98, suffix: '%', label: 'On-Time Rate' },
  ];

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="w-full py-24 lg:py-32 bg-off-white relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-industrial-blue/[0.02] via-transparent to-industrial-blue/[0.03]" />

      <div className="px-6 lg:px-[6vw] relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
          {/* Map */}
          <div ref={mapRef} className="flex-1 lg:max-w-lg">
            <div className="relative aspect-square">
              {/* Map glow effect */}
              <div className="absolute inset-0 bg-industrial-blue/10 rounded-full blur-3xl scale-75" />

              {/* UK Map SVG */}
              {/* UK Map Image */}
              <img
                src="/uk_map.png"
                alt="UK Coverage Map"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl filter contrast-125 saturate-150"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 lg:max-w-lg">
            <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-steel-grey mb-6">
              <span className="w-8 h-px bg-industrial-blue" />
              Coverage Area
            </span>

            <h2 className="animate-item font-heading font-bold text-4xl sm:text-5xl text-charcoal mb-6">
              Where we
              <span className="text-industrial-blue"> operate</span>
            </h2>

            <p className="animate-item text-steel-grey text-lg leading-relaxed mb-10">
              Nationwide coverage with regional expertise. From local runs to
              cross-border logistics, we keep your freight moving efficiently.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card group flex flex-col p-5 bg-white rounded-2xl border border-charcoal/5 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-industrial-blue/10 flex items-center justify-center mb-4 group-hover:bg-industrial-blue/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-industrial-blue" />
                  </div>
                  <span className="font-heading font-bold text-2xl text-charcoal">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  </span>
                  <span className="text-xs text-steel-grey mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <MagneticButton className="animate-item group inline-flex items-center gap-2 text-industrial-blue font-medium hover:gap-3 transition-all">
              <span>See all routes</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
