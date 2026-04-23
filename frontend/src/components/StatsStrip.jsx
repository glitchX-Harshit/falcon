import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedCounter from './AnimatedCounter';

export default function StatsStrip() {
  const containerRef = useRef(null);
  const stats = [
    { value: 99.7, suffix: '%', label: 'System Uptime' },
    { value: 2, suffix: 'ms', label: 'Avg Latency' },
    { value: 500, suffix: '+', label: 'Strategies Tested' },
    { value: 24, suffix: '/7', label: 'Operation' },
  ];

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: els, start: 'top 90%', toggleActions: 'play none none none' }, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '5rem 0', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div className="stat-number"><AnimatedCounter end={stat.value} suffix={stat.suffix} trigger={containerRef} /></div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
