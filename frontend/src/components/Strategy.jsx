import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Strategy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.strat-text', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        x: -40, opacity: 0, duration: 1, stagger: 0.2
      });
      
      // Image Parallax Reveal
      gsap.to('.strat-img-mask', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        scaleY: 0, duration: 1.5, ease: 'power4.inOut'
      });
      gsap.from('.strat-img img', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        scale: 1.2, duration: 2, ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="strategy">
      <div style={styles.grid}>
        <div style={styles.imageContainer}>
          <div className="strat-img-mask img-parallax-mask"></div>
          <div className="glass-panel" style={styles.glassImgWrapper}>
             <div className="strat-img" style={{ overflow: 'hidden', borderRadius: '16px' }}>
                <img src="/images/chart-breakout-light.png" alt="Strategy Breakout Chart" style={styles.image} />
             </div>
          </div>
        </div>
        <div style={styles.content}>
          <h2 className="strat-text" style={styles.heading}>Start Simple. Scale Intelligently.</h2>
          <p className="strat-text" style={styles.paragraph}>
            Falcon begins with a breakout strategy as its baseline. 
            Every strategy is structured, testable, and replaceable, ensuring long-term adaptability.
          </p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '8rem 0' },
  grid: {
    display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'center'
  },
  content: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  heading: { fontSize: '3.5rem', lineHeight: 1.1 },
  paragraph: { fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' },
  imageContainer: {
    position: 'relative'
  },
  glassImgWrapper: {
    padding: '1rem'
  },
  image: {
    width: '100%', display: 'block', objectFit: 'cover'
  }
};
