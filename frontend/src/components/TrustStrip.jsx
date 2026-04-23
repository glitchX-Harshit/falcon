import React from 'react';
import { ShieldCheck, Crosshair, Server, Activity } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    { text: "Built for systematic trading", icon: <Server size={16} /> },
    { text: "Risk-first architecture", icon: <ShieldCheck size={16} /> },
    { text: "Modular strategy engine", icon: <Crosshair size={16} /> },
    { text: "24/7 automated execution", icon: <Activity size={16} /> }
  ];

  // Quadruplicate for seamless loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div style={styles.wrapper}>
      <div style={styles.marqueeContainer}>
        <div style={styles.marqueeTrack} className="marquee-animation">
          {marqueeItems.map((item, i) => (
            <div key={i} style={styles.item}>
              <span style={styles.icon}>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .marquee-animation {
          animation: marquee 35s linear infinite;
        }
        .marquee-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    borderTop: '1px solid var(--color-border-light)',
    borderBottom: '1px solid var(--color-border-light)',
    background: 'var(--color-bg)',
    padding: '1.25rem 0',
    overflow: 'hidden'
  },
  marqueeContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  marqueeTrack: {
    display: 'flex',
    gap: '3.5rem',
    width: 'max-content'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--color-text-tertiary)',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
    transition: 'color 0.3s ease',
    cursor: 'default',
  },
  icon: {
    display: 'flex',
    opacity: 0.6,
  }
};
