import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check } from 'lucide-react';

export default function Future() {
  const containerRef = useRef(null);

  const roadmap = [
    { title: "Multi-strategy support", desc: "Run parallel strategies across different asset classes", done: false },
    { title: "Backtesting engine", desc: "Historical data simulation with detailed metrics", done: false },
    { title: "Performance analytics", desc: "Visual dashboards for PnL, drawdowns, and Sharpe ratio", done: true },
    { title: "AI-based regime detection", desc: "Adaptive strategy switching based on market conditions", done: false },
    { title: "Advanced dashboard", desc: "Real-time monitoring with institutional-grade UI", done: true },
  ];

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.future-label',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.8, ease: 'back.out(2)',
        }
      );

      gsap.fromTo('.future-heading',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1, ease: 'power4.out', delay: 0.15,
        }
      );

      gsap.fromTo('.future-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.3,
        }
      );

      gsap.fromTo('.future-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 1.5, ease: 'power3.inOut', delay: 0.2,
          transformOrigin: 'top',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="future">
      <div style={styles.grid}>
        <div style={styles.left}>
          <span className="section-label future-label">Roadmap</span>
          <h2 style={styles.heading} className="future-heading">
            Built to<br />
            <span style={{ color: 'var(--color-text-tertiary)' }}>Evolve</span>
          </h2>
          <p style={styles.description} className="future-heading">
            Our roadmap ensures Falcon stays ahead of the curve, with planned features that expand capability and intelligence.
          </p>
        </div>

        <div style={styles.right}>
          <div className="future-line" style={styles.timeline} />
          {roadmap.map((item, i) => (
            <div key={i} className="future-item" style={styles.item}>
              <div style={{
                ...styles.dot,
                background: item.done ? '#10B981' : 'var(--color-border)',
                boxShadow: item.done ? '0 0 0 4px rgba(16, 185, 129, 0.15)' : 'none',
              }}>
                {item.done && <Check size={10} color="white" />}
              </div>
              <div style={styles.itemContent}>
                <h4 style={styles.itemTitle}>{item.title}</h4>
                <p style={styles.itemDesc}>{item.desc}</p>
              </div>
              {item.done && (
                <span style={styles.doneBadge}>Live</span>
              )}
            </div>
          ))}
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
    gridTemplateColumns: '1fr 1.2fr',
    gap: '6rem',
    alignItems: 'start',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    position: 'sticky',
    top: '120px',
  },
  heading: {
    fontSize: '3.5rem',
    letterSpacing: '-0.03em',
  },
  description: {
    fontSize: '1.05rem',
    lineHeight: 1.7,
    color: 'var(--color-text-secondary)',
    maxWidth: '380px',
  },
  right: {
    position: 'relative',
    paddingLeft: '2rem',
  },
  timeline: {
    position: 'absolute',
    left: '11px',
    top: '8px',
    bottom: '8px',
    width: '2px',
    background: 'var(--color-border-light)',
    transformOrigin: 'top',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.25rem',
    padding: '1.5rem 0',
    borderBottom: '1px solid var(--color-border-light)',
    position: 'relative',
  },
  dot: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
    zIndex: 2,
  },
  itemContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  itemTitle: {
    fontSize: '1.05rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },
  itemDesc: {
    fontSize: '0.88rem',
    color: 'var(--color-text-tertiary)',
    lineHeight: 1.5,
  },
  doneBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#10B981',
    background: 'rgba(16, 185, 129, 0.1)',
    padding: '0.2rem 0.6rem',
    borderRadius: '100px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    flexShrink: 0,
    marginTop: '2px',
  },
};
