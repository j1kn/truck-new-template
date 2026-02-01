import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text block animation with stagger
      const textElements = textRef.current?.querySelectorAll('.animate-item');
      if (textElements) {
        gsap.fromTo(
          textElements,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Benefits list with checkmark animation
      const benefits = benefitsRef.current?.querySelectorAll('li');
      if (benefits) {
        benefits.forEach((benefit, index) => {
          const check = benefit.querySelector('.check-icon');
          const text = benefit.querySelector('.benefit-text');

          gsap.fromTo(
            benefit,
            { x: -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: benefitsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Checkmark pop animation
          gsap.fromTo(
            check,
            { scale: 0, rotate: -180 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.5,
              delay: index * 0.08 + 0.3,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: benefitsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Image animation with clip-path reveal
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image parallax
      const img = imageRef.current?.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { y: 60, scale: 1.1 },
          {
            y: -60,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      // Caption animation
      const caption = imageRef.current?.querySelector('.caption');
      if (caption) {
        gsap.fromTo(
          caption,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    'Punctual delivery, every time',
    'Real-time tracking & updates',
    'Modern, well-maintained fleet',
    'Experienced professional drivers',
    'Transparent pricing, no hidden costs',
  ];

  return (
    <section ref={sectionRef} className="w-full py-24 lg:py-32 bg-off-white relative overflow-hidden">
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <div ref={textRef} className="flex-1 lg:max-w-xl">
            <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-steel-grey mb-6">
              <span className="w-8 h-px bg-industrial-blue" />
              The Difference
            </span>

            <h2 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-[1.15] mb-6">
              We plan routes like your business{' '}
              <span className="text-industrial-blue">depends on it</span>
              <br />
              <span className="text-steel-grey">because it does.</span>
            </h2>

            <p className="animate-item text-steel-grey text-lg leading-relaxed mb-10">
              From first quote to final mile, we focus on reliability, transparency,
              and communication. Every delivery is a promise kept.
            </p>

            {/* Benefits List */}
            <ul ref={benefitsRef} className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="check-icon w-6 h-6 rounded-full bg-industrial-blue/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-industrial-blue" />
                  </div>
                  <span className="benefit-text text-charcoal font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <MagneticButton
              className="animate-item group border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-off-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
            >
              Meet the team
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>

          {/* Image */}
          <div ref={imageRef} className="flex-1 lg:max-w-lg">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden">
              <div className="aspect-[4/5]">
                <img
                  src="/why_driver.jpg"
                  alt="Professional driver in modern truck cab"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption overlay */}
              <div className="caption absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-charcoal/90 backdrop-blur-xl rounded-2xl p-6 border border-off-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-industrial-blue/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-industrial-blue" />
                    </div>
                    <div>
                      <p className="text-off-white font-semibold">
                        Professional Drivers
                      </p>
                      <p className="text-off-white/60 text-sm">
                        Trained, vetted, and reliable
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-industrial-blue/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-industrial-blue/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
