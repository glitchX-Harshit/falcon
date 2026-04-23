import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Showcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const images = [
    { src: '/images/quant-ui-1.png', label: 'Dashboard Overview' },
    { src: '/images/quant-ui-2.png', label: 'Strategy Builder' },
    { src: '/images/market-depth.png', label: 'Market Depth' },
    { src: '/images/quant-ui-1.png', label: 'Performance Analytics' },
  ];

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo('.showcase-title',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1, ease: 'power4.out',
        }
      );

      // Horizontal scroll scrub
      gsap.to(trackRef.current, {
        xPercent: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: els,
          start: 'top center',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Cards entrance
      gsap.fromTo('.showcase-slide',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} id="showcase">
      <div style={styles.header}>
        <span className="section-label">Interfaces</span>
        <h2 style={styles.title} className="showcase-title">Precision Interfaces</h2>
        <p style={styles.subtitle}>Every pixel is engineered for clarity and speed</p>
      </div>

      <div style={styles.carouselContainer}>
        <div ref={trackRef} style={styles.track}>
          {images.map((item, i) => (
            <div key={i} className="showcase-slide" style={styles.slide} data-cursor="VIEW">
              <div style={styles.slideInner}>
                <img src={item.src} alt={item.label} style={styles.image} />
              </div>
              <div style={styles.slideLabel}>
                <span style={styles.slideLabelNum}>0{i + 1}</span>
                <span style={styles.slideLabelText}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0 6rem',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  title: {
    fontSize: '3rem',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--color-text-secondary)',
  },
  carouselContainer: {
    width: '100%',
    display: 'flex',
    paddingLeft: '5vw',
  },
  track: {
    display: 'flex',
    gap: '1.5rem',
    width: 'max-content',
  },
  slide: {
    width: '550px',
    flexShrink: 0,
    cursor: 'none',
  },
  slideInner: {
    overflow: 'hidden',
    borderRadius: '16px',
    border: '1px solid var(--color-border-light)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  slideLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '1rem',
    paddingLeft: '0.25rem',
  },
  slideLabelNum: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-sans)',
  },
  slideLabelText: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
  },
};
