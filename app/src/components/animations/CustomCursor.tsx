import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant dot movement
      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });
    };

    // Smooth cursor following
    const updateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(updateCursor);
    };

    // Handle hover states
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute('data-cursor');
      
      setIsHovering(true);
      
      if (cursorType) {
        setCursorText(cursorType);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor], .service-card, .trust-card, .testimonial-card, input, textarea'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    requestAnimationFrame(updateCursor);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Re-bind hover listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor], .service-card, .trust-card, .testimonial-card, input, textarea'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference transition-transform duration-300 hidden lg:flex items-center justify-center ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-90' : ''}`}
        style={{
          width: cursorText ? '80px' : '40px',
          height: cursorText ? '80px' : '40px',
          marginLeft: cursorText ? '-40px' : '-20px',
          marginTop: cursorText ? '-40px' : '-20px',
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 border-white transition-all duration-300 flex items-center justify-center ${
            isHovering ? 'bg-white/10' : 'bg-transparent'
          }`}
        >
          {cursorText && (
            <span className="text-white text-xs font-medium uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[10001] mix-blend-difference hidden lg:block"
      />
    </>
  );
}
