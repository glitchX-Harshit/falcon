import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, Shield, Zap, Clock, Activity, FileText } from 'lucide-react';

export default function CoreFeatures() {
  const containerRef = useRef(null);

  const features = [
    {
      title: "Strategy Engine",
      desc: "Plug-and-play architecture for multiple trading strategies with modular design",
      icon: <Layers size={22} />,
      accent: '#2563EB',
    },
    {
      title: "Risk Engine",
      desc: "Strict position sizing and capital protection rules enforced on every trade",
      icon: <Shield size={22} />,
      accent: '#7C3AED',
    },
    {
      title: "Execution Engine",
      desc: "Sub-millisecond trade execution via MT5 integration with zero slippage",
      icon: <Zap size={22} />,
      accent: '#F59E0B',
    },
    {
      title: "24/7 Operation",
      desc: "Runs continuously without human intervention across all market sessions",
      icon: <Clock size={22} />,
      accent: '#10B981',
    },
    {
      title: "Portfolio Tracking",
      desc: "Real-time monitoring of trades, exposure, and portfolio performance metrics",
      icon: <Activity size={22} />,
      accent: '#EC4899',
    },
    {
      title: "Logging System",
      desc: "Full traceability of every decision and trade for audit and optimization",
      icon: <FileText size={22} />,
      accent: '#06B6D4',
    },
  ];

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;

    const ctx = gsap.context(() => {
      // Section label
      gsap.fromTo('.feat-label',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.8, ease: 'back.out(2)',
        }
      );

      // Title
      gsap.fromTo('.feat-title',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1, ease: 'power4.out', delay: 0.15,
        }
      );

      // Cards stagger
      gsap.fromTo('.feature-card',
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.3,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="features">
      <div style={styles.header}>
        <span className="section-label feat-label">Capabilities</span>
        <h2 style={styles.title} className="feat-title">
          Core Engine<br />
          <span style={{ color: 'var(--color-text-tertiary)' }}>Capabilities</span>
        </h2>
      </div>

      <div style={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-panel" style={styles.card}>
            <div style={{ ...styles.iconWrapper, background: `${f.accent}10`, color: f.accent }}>
              {f.icon}
            </div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '3rem',
    letterSpacing: '-0.03em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  card: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
};
