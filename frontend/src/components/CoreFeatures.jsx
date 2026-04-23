import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, Shield, Zap, Clock, Activity, FileText } from 'lucide-react';

export default function CoreFeatures() {
  const containerRef = useRef(null);

  const features = [
    { title: "Strategy Engine", desc: "Plug-and-play architecture for multiple trading strategies", icon: <Layers size={24} /> },
    { title: "Risk Engine", desc: "Strict position sizing and capital protection rules", icon: <Shield size={24} /> },
    { title: "Execution Engine", desc: "Seamless trade execution via MT5 integration", icon: <Zap size={24} /> },
    { title: "24/7 Operation", desc: "Runs continuously without human intervention", icon: <Clock size={24} /> },
    { title: "Portfolio Tracking", desc: "Real-time monitoring of trades and exposure", icon: <Activity size={24} /> },
    { title: "Logging System", desc: "Full traceability of every decision and trade", icon: <FileText size={24} /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="container" id="features">
      <h2 style={styles.title} className="section-title">Core Engine Capabilities</h2>
      <div style={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-panel" style={styles.card}>
            <div style={styles.iconWrapper}>{f.icon}</div>
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
    padding: '6rem 0'
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '4rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem'
  },
  card: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'transform 0.3s ease',
    cursor: 'default'
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'var(--color-bg-alt)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-primary)'
  },
  cardTitle: {
    fontSize: '1.25rem'
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5'
  }
};
