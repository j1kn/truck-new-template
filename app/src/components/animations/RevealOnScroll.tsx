import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'clip-up';
  duration?: number;
  delay?: number;
  start?: string;
  stagger?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
  stagger = 0,
  once = true,
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const childElements = stagger > 0 ? element.children : [element];

    const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
      'fade-up': {
        from: { y: 60, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      'slide-left': {
        from: { x: 80, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      'slide-right': {
        from: { x: -80, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      'scale-up': {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      },
      'clip-up': {
        from: { clipPath: 'inset(100% 0% 0% 0%)' },
        to: { clipPath: 'inset(0% 0% 0% 0%)' },
      },
    };

    const anim = animations[animation];

    gsap.set(childElements, anim.from);

    gsap.to(childElements, {
      ...anim.to,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, duration, delay, start, stagger, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
