import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Strategy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.strat-label',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.8, ease: 'back.out(2)',
        }
      );

      gsap.fromTo('.strat-text',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2,
        }
      );

      gsap.to('.strat-img-mask', {
        scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
        scaleY: 0, duration: 1.5, ease: 'power4.inOut',
      });

      gsap.fromTo('.strat-img img',
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 2, ease: 'power3.out',
        }
      );

      gsap.fromTo('.strat-tag',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.5,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const tags = ['Breakout', 'Mean Reversion', 'Momentum', 'Statistical Arbitrage'];

  return (
    <section ref={containerRef} style={styles.section} className="container" id="strategy">
      <div style={styles.grid}>
        <div style={styles.imageContainer}>
          <div className="strat-img-mask img-parallax-mask" />
          <div className="glass-panel" style={styles.glassImgWrapper}>
            <div className="strat-img" style={{ overflow: 'hidden', borderRadius: '14px' }}>
              <img src="/images/chart-breakout-light.png" alt="Strategy Breakout Chart" style={styles.image} />
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <span className="section-label strat-label">Strategy</span>
          <h2 className="strat-text" style={styles.heading}>
            Start Simple.<br />
            <span style={{ color: 'var(--color-text-tertiary)' }}>Scale Intelligently.</span>
          </h2>
          <p className="strat-text" style={styles.paragraph}>
            Falcon begins with a breakout strategy as its baseline.
            Every strategy is structured, testable, and replaceable — ensuring
            long-term adaptability as markets evolve.
          </p>
          <div style={styles.tags}>
            {tags.map((tag, i) => (
              <span key={i} className="strat-tag" style={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '5rem',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  heading: {
    fontSize: '3.2rem',
    lineHeight: 1.08,
    letterSpacing: '-0.03em',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.7,
    color: 'var(--color-text-secondary)',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  tag: {
    padding: '0.4rem 0.9rem',
    fontSize: '0.78rem',
    fontWeight: '600',
    borderRadius: '100px',
    background: 'var(--color-bg-alt)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.02em',
  },
  imageContainer: {
    position: 'relative',
  },
  glassImgWrapper: {
    padding: '0.75rem',
  },
  image: {
    width: '100%',
    display: 'block',
    objectFit: 'cover',
  },
};
