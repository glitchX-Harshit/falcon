import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplitText({ children, className = '', delay = 0, trigger = null }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const text = el.textContent;
    el.innerHTML = '';

    // Split into words, then wrap each word in a span
    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';

      const innerSpan = document.createElement('span');
      innerSpan.textContent = word;
      innerSpan.style.display = 'inline-block';
      innerSpan.className = 'split-word';

      wordSpan.appendChild(innerSpan);
      el.appendChild(wordSpan);

      if (wi < words.length - 1) {
        const space = document.createTextNode('\u00A0');
        el.appendChild(space);
      }
    });

    const wordEls = el.querySelectorAll('.split-word');

    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        yPercent: 110,
        rotateX: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out',
        delay,
        ...(trigger ? {
          scrollTrigger: {
            trigger: trigger.current || el,
            start: 'top 85%',
          }
        } : {})
      });
    });

    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline' }}>
      {children}
    </span>
  );
}
