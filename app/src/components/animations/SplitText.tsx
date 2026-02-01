import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'fade-up' | 'fade-in' | 'slide-up' | 'blur-in';
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  triggerStart?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function SplitText({
  children,
  className = '',
  type = 'words',
  animation = 'fade-up',
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  trigger = true,
  triggerStart = 'top 85%',
  as: Component = 'div',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    // Split text into elements
    let elements: HTMLElement[] = [];

    if (type === 'chars') {
      const chars = children.split('');
      container.innerHTML = chars
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block split-char">${char}</span>`
        )
        .join('');
      elements = Array.from(container.querySelectorAll('.split-char'));
    } else if (type === 'words') {
      const words = children.split(' ');
      container.innerHTML = words
        .map((word) => `<span class="inline-block split-word overflow-hidden"><span class="inline-block split-word-inner">${word}</span></span>`)
        .join('<span class="inline-block">&nbsp;</span>');
      elements = Array.from(container.querySelectorAll('.split-word-inner'));
    } else {
      container.innerHTML = `<span class="inline-block split-line overflow-hidden"><span class="inline-block split-line-inner">${children}</span></span>`;
      elements = Array.from(container.querySelectorAll('.split-line-inner'));
    }

    // Animation variants
    const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
      'fade-up': {
        from: { y: '100%', opacity: 0 },
        to: { y: '0%', opacity: 1 },
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      'slide-up': {
        from: { y: '110%' },
        to: { y: '0%' },
      },
      'blur-in': {
        from: { opacity: 0, filter: 'blur(10px)' },
        to: { opacity: 1, filter: 'blur(0px)' },
      },
    };

    const anim = animations[animation];

    gsap.set(elements, anim.from);

    const animationConfig: gsap.TweenVars = {
      ...anim.to,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    };

    if (trigger) {
      gsap.to(elements, {
        ...animationConfig,
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.to(elements, animationConfig);
    }

    hasAnimated.current = true;
  }, [children, type, animation, stagger, duration, delay, trigger, triggerStart]);

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
}
