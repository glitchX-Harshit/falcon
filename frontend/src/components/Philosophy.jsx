import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-label',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.8, ease: 'back.out(2)',
        }
      );

      gsap.fromTo('.phil-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1.2, ease: 'power4.out', delay: 0.2,
        }
      );

      gsap.fromTo('.phil-text',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 1, ease: 'power3.out', delay: 0.4,
        }
      );

      gsap.fromTo('.phil-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1.5, ease: 'power3.inOut', delay: 0.3,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="philosophy">
      <div style={styles.content}>
        <span className="section-label phil-label">Philosophy</span>
        <h2 className="phil-heading" style={styles.heading}>
          Not Prediction.<br />
          <span style={{ color: 'var(--color-text-tertiary)' }}>Process.</span>
        </h2>
        <div className="phil-line" style={styles.line} />
        <p className="phil-text" style={styles.paragraph}>
          Falcon is not designed to chase accuracy. Markets are inherently uncertain.
          The real edge comes from disciplined execution, controlled risk management,
          and unwavering consistency over time. We engineer process, not prophecy.
        </p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '10rem 0 8rem',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  heading: {
    fontSize: '4rem',
    letterSpacing: '-0.04em',
    lineHeight: 1.08,
  },
  line: {
    width: '60px',
    height: '2px',
    background: 'var(--color-accent)',
    margin: '0.5rem 0',
    transformOrigin: 'center',
  },
  paragraph: {
    fontSize: '1.25rem',
    lineHeight: 1.7,
    color: 'var(--color-text-secondary)',
    fontWeight: '300',
  },
};
