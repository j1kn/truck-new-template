import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    const content = contentRef.current;
    if (!scroll || !content) return;

    // Only enable on desktop
    if (window.innerWidth < 1024) return;

    let scrollY = 0;
    let smoothY = 0;
    const ease = 0.1;

    // Set up the scroll container
    gsap.set(scroll, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
    });

    // Set body height to match content
    const setBodyHeight = () => {
      document.body.style.height = `${content.offsetHeight}px`;
    };

    setBodyHeight();

    // Smooth scroll animation
    const smoothScroll = () => {
      scrollY = window.scrollY;
      smoothY += (scrollY - smoothY) * ease;

      gsap.set(content, {
        y: -smoothY,
      });

      // Update ScrollTrigger
      ScrollTrigger.update();

      requestAnimationFrame(smoothScroll);
    };

    requestAnimationFrame(smoothScroll);

    // Update on resize
    window.addEventListener('resize', setBodyHeight);

    // Configure ScrollTrigger for smooth scroll
    ScrollTrigger.scrollerProxy(scroll, {
      scrollTop(value) {
        if (arguments.length) {
          smoothY = value as number;
        }
        return smoothY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: scroll });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', setBodyHeight);
      document.body.style.height = '';
    };
  }, []);

  return (
    <div ref={scrollRef}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
