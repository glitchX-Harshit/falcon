import React from 'react';
import { ShieldCheck, Crosshair, Server, Activity } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    { text: "Built for systematic trading", icon: <Server size={18} /> },
    { text: "Risk-first architecture", icon: <ShieldCheck size={18} /> },
    { text: "Modular strategy engine", icon: <Crosshair size={18} /> },
    { text: "24/7 automated execution", icon: <Activity size={18} /> }
  ];

  // duplicate for marquee effect
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div style={styles.wrapper}>
      <div style={styles.marqueeContainer}>
        <div style={styles.marqueeTrack} className="marquee-animation">
          {marqueeItems.map((item, i) => (
            <div key={i} style={styles.item}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .marquee-animation {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    background: 'var(--color-bg-alt)',
    padding: '1.5rem 0',
    overflow: 'hidden'
  },
  marqueeContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  marqueeTrack: {
    display: 'flex',
    gap: '4rem',
    width: 'max-content'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap'
  }
};
