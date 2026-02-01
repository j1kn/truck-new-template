import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const items = inner.children;
    const totalWidth = inner.scrollWidth / 2;
    const duration = totalWidth / speed;

    const tween = gsap.to(inner, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration,
      ease: 'none',
      repeat: -1,
    });

    if (pauseOnHover) {
      container.addEventListener('mouseenter', () => tween.pause());
      container.addEventListener('mouseleave', () => tween.play());
    }

    return () => {
      tween.kill();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <div
        ref={innerRef}
        className="flex items-center gap-8 whitespace-nowrap"
        style={{ width: 'fit-content' }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
