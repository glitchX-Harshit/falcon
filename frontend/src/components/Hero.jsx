import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal simulation
      gsap.from('.hero-heading-line', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
      });

      gsap.from('.hero-actions', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9
      });

      // Advanced Parallax Mask Reveal
      gsap.to('.img-parallax-mask', {
        scaleY: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        delay: 0.4
      });

      gsap.from('.hero-image img', {
        scale: 1.2,
        yPercent: 10,
        duration: 2,
        ease: 'power3.out',
        delay: 0.2
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container hover-trigger">
      <div style={styles.grid}>
        <div style={styles.content}>
          <h1 style={styles.heading}>
            <div style={{ overflow: 'hidden' }}><span className="hero-heading-line" style={{ display: 'block' }}>Trade Without Emotion.</span></div>
            <div style={{ overflow: 'hidden' }}><span className="hero-heading-line text-gradient" style={{ display: 'block' }}>Execute With Precision.</span></div>
          </h1>
          <p className="hero-sub" style={styles.subheading}>
            Falcon is a disciplined algorithmic trading engine built to remove human bias and operate with consistent logic 24/7.
          </p>
          <div className="hero-actions" style={styles.actions}>
            <Magnetic><button className="btn btn-primary" data-cursor="GO">Get Started</button></Magnetic>
            <Magnetic><button className="btn btn-secondary">View Architecture</button></Magnetic>
          </div>
        </div>
        <div className="hero-image" style={styles.imageContainer}>
          <div className="img-parallax-mask"></div>
          <div style={styles.glassImgWrapper} className="glass-panel">
            <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
              <img 
                src="/images/quant-light-chart.png" 
                alt="Falcon Trading Dashboard" 
                style={styles.image} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    paddingTop: '160px',
    paddingBottom: '80px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  heading: {
    fontSize: '4.5rem',
    lineHeight: '1.1',
    letterSpacing: '-0.03em'
  },
  subheading: {
    fontSize: '1.25rem',
    maxWidth: '480px',
    lineHeight: '1.6'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  imageContainer: {
    position: 'relative'
  },
  glassImgWrapper: {
    padding: '1rem',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.4)'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  }
};
