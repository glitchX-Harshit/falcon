import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Future() {
  const containerRef = useRef(null);
  
  const bullets = [
    "Multi-strategy support",
    "Backtesting engine",
    "Performance analytics",
    "AI-based regime detection",
    "Advanced dashboard"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.future-item', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        opacity: 0, x: -20, duration: 0.6, stagger: 0.1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="future">
      <div style={styles.content}>
        <h2 style={styles.heading}>Built to Evolve</h2>
        <div style={styles.list}>
          {bullets.map((b, i) => (
             <div key={i} className="future-item" style={styles.item}>
               <ArrowRight size={20} color="var(--color-text-secondary)" />
               <span>{b}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '8rem 0', display: 'flex', justifyContent: 'center' },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' },
  heading: { fontSize: '3.5rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' },
  item: { display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }
};
