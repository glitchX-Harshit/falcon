import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Showcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const images = [
    '/images/quant-ui-1.png',
    '/images/quant-ui-2.png',
    '/images/market-depth.png',
    '/images/quant-ui-1.png',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} id="showcase">
      <div style={styles.header}>
        <h2 style={styles.title}>Precision Interfaces</h2>
      </div>
      <div style={styles.carouselContainer}>
        <div ref={trackRef} style={styles.track}>
          {images.map((src, i) => (
            <div key={i} style={styles.slide} className="glass-panel slide-img" data-cursor="VIEW">
              <img src={src} alt={`Showcase UI ${i + 1}`} style={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '6rem 0',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  title: {
    fontSize: '2.5rem'
  },
  carouselContainer: {
    width: '100%',
    display: 'flex',
    paddingLeft: '5vw'
  },
  track: {
    display: 'flex',
    gap: '2rem',
    width: 'max-content'
  },
  slide: {
    width: '600px',
    padding: '1rem',
    flexShrink: 0,
    cursor: 'none'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    display: 'block',
    pointerEvents: 'none'
  }
};
