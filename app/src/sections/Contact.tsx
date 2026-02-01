import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, Clock, Send, CheckCircle, MapPin } from 'lucide-react';
import { MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation with stagger
      const formElements = formRef.current?.querySelectorAll('.animate-item');
      if (formElements) {
        gsap.fromTo(
          formElements,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Details animation
      const detailElements = detailsRef.current?.querySelectorAll('.animate-item');
      if (detailElements) {
        gsap.fromTo(
          detailElements,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Contact cards entrance
      const cards = detailsRef.current?.querySelectorAll('.contact-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image reveal
      const imageWrapper = detailsRef.current?.querySelector('.image-wrapper');
      if (imageWrapper) {
        gsap.fromTo(
          imageWrapper,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageWrapper,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Success animation
      const successEl = formRef.current?.querySelector('.success-message');
      if (successEl) {
        gsap.fromTo(
          successEl,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        );
      }
    }, 1500);
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '0800 123 4567', href: 'tel:08001234567' },
    { icon: Mail, label: 'Email', value: 'hello@ukhaulage.co', href: 'mailto:hello@ukhaulage.co' },
    { icon: Clock, label: 'Hours', value: 'Mon-Fri 07:00-19:00', href: null },
    { icon: MapPin, label: 'Location', value: 'Birmingham, UK', href: null },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 lg:py-32 bg-off-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-industrial-blue/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-industrial-blue/[0.02] to-transparent" />
      </div>

      <div className="px-6 lg:px-[6vw] relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Form */}
          <div ref={formRef} className="flex-1 lg:max-w-xl">
            <span className="animate-item inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-steel-grey mb-6">
              <span className="w-8 h-px bg-industrial-blue" />
              Get in Touch
            </span>

            <h2 className="animate-item font-heading font-bold text-4xl sm:text-5xl text-charcoal mb-4">
              Let's talk
              <span className="text-industrial-blue"> logistics</span>
            </h2>

            <p className="animate-item text-steel-grey text-lg mb-10">
              Tell us about your transport needs. We'll get back to you within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="success-message bg-white rounded-2xl lg:rounded-3xl p-10 border border-charcoal/5 shadow-lg text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-charcoal mb-3">
                  Message sent!
                </h3>
                <p className="text-steel-grey">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="animate-item grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className={`text-sm font-medium transition-colors ${
                        focusedField === 'name' ? 'text-industrial-blue' : 'text-charcoal'
                      }`}
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white border-charcoal/10 rounded-xl h-14 px-5 focus:border-industrial-blue focus:ring-industrial-blue/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className={`text-sm font-medium transition-colors ${
                        focusedField === 'company' ? 'text-industrial-blue' : 'text-charcoal'
                      }`}
                    >
                      Company
                    </Label>
                    <Input
                      id="company"
                      placeholder="Your company"
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white border-charcoal/10 rounded-xl h-14 px-5 focus:border-industrial-blue focus:ring-industrial-blue/20 transition-all"
                    />
                  </div>
                </div>

                <div className="animate-item grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={`text-sm font-medium transition-colors ${
                        focusedField === 'email' ? 'text-industrial-blue' : 'text-charcoal'
                      }`}
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white border-charcoal/10 rounded-xl h-14 px-5 focus:border-industrial-blue focus:ring-industrial-blue/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className={`text-sm font-medium transition-colors ${
                        focusedField === 'phone' ? 'text-industrial-blue' : 'text-charcoal'
                      }`}
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white border-charcoal/10 rounded-xl h-14 px-5 focus:border-industrial-blue focus:ring-industrial-blue/20 transition-all"
                    />
                  </div>
                </div>

                <div className="animate-item space-y-2">
                  <Label
                    htmlFor="message"
                    className={`text-sm font-medium transition-colors ${
                      focusedField === 'message' ? 'text-industrial-blue' : 'text-charcoal'
                    }`}
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your transport needs..."
                    rows={5}
                    required
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-white border-charcoal/10 rounded-xl px-5 py-4 resize-none focus:border-industrial-blue focus:ring-industrial-blue/20 transition-all"
                  />
                </div>

                <MagneticButton
                  onClick={() => {}}
                  className="animate-item w-full bg-industrial-blue hover:bg-industrial-blue/90 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-industrial-blue/25 hover:shadow-xl hover:shadow-industrial-blue/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div ref={detailsRef} className="flex-1 lg:max-w-md">
            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="contact-card group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-charcoal/5 shadow-sm hover:shadow-lg hover:border-industrial-blue/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-industrial-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-industrial-blue/20 transition-colors">
                        <item.icon className="w-5 h-5 text-industrial-blue" />
                      </div>
                      <div>
                        <p className="text-xs text-steel-grey uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-semibold text-charcoal group-hover:text-industrial-blue transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-charcoal/5 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-industrial-blue/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-industrial-blue" />
                      </div>
                      <div>
                        <p className="text-xs text-steel-grey uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-semibold text-charcoal">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Office Image */}
            <div className="animate-item image-wrapper rounded-2xl lg:rounded-3xl overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/contact_office.jpg"
                  alt="UK Haulage office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-off-white font-medium">
                    Our headquarters in Birmingham
                  </p>
                  <p className="text-off-white/60 text-sm">
                    Serving the UK since 2010
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
