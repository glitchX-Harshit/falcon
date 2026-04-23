import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-elem', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="philosophy">
      <div style={styles.content}>
        <h2 className="phil-elem" style={styles.heading}>Not Prediction. Process.</h2>
        <p className="phil-elem" style={styles.paragraph}>
          Falcon is not designed to chase accuracy. Markets are uncertain.
          The real edge comes from disciplined execution, controlled risk,
          and consistency over time.
        </p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  content: {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  heading: {
    fontSize: '3.5rem',
    letterSpacing: '-1px'
  },
  paragraph: {
    fontSize: '1.5rem',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
    fontWeight: '300'
  }
};
