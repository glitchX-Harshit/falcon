import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Database, Cpu, Anchor, Send, Save, ChevronRight } from 'lucide-react';

export default function ArchitectureFlow() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo('.arch-title',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 1, ease: 'power4.out',
        }
      );

      // Subtitle
      gsap.fromTo('.arch-subtitle',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.8, ease: 'power3.out', delay: 0.15,
        }
      );

      // Nodes stagger with bounce
      gsap.fromTo('.flow-node',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 0.9, stagger: 0.15, ease: 'back.out(1.7)', delay: 0.2,
        }
      );

      // Connector lines draw in
      gsap.fromTo('.flow-connector',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1,
          scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' },
          duration: 0.6, stagger: 0.15, delay: 0.5, ease: 'power2.inOut',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const nodes = [
    { name: "Market Data", icon: <Database size={22} />, color: '#2563EB' },
    { name: "Strategy Engine", icon: <Cpu size={22} />, color: '#7C3AED' },
    { name: "Risk Engine", icon: <Anchor size={22} />, color: '#F59E0B' },
    { name: "Execution", icon: <Send size={22} />, color: '#10B981' },
    { name: "Logging", icon: <Save size={22} />, color: '#EC4899' },
  ];

  return (
    <section ref={containerRef} style={styles.section} id="architecture">
      <div className="container">
        <div style={styles.header}>
          <span className="section-label">Architecture</span>
          <h2 style={styles.title} className="arch-title">Engineered for Consistency</h2>
          <p style={styles.subtitle} className="arch-subtitle">Every component works in harmony to deliver systematic execution</p>
        </div>

        <div style={styles.diagram}>
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className="flow-node-wrap" style={styles.nodeWrap}>
                <div className="flow-node" style={styles.node}>
                  <div style={{ ...styles.nodeIcon, background: `${node.color}12`, color: node.color }}>
                    {node.icon}
                  </div>
                  <div style={styles.nodeName}>{node.name}</div>
                  <div style={{ ...styles.nodeNumber, color: node.color }}>0{i + 1}</div>
                </div>
              </div>
              {i < nodes.length - 1 && (
                <div style={styles.connectorWrap}>
                  <div className="flow-connector" style={styles.connector}>
                    <ChevronRight size={14} color="var(--color-text-tertiary)" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '8rem 0',
    background: 'var(--color-bg-alt)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  title: {
    fontSize: '3rem',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--color-text-secondary)',
    maxWidth: '500px',
  },
  diagram: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '0',
  },
  nodeWrap: {
    position: 'relative',
  },
  node: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'var(--color-bg)',
    padding: '2rem 1.5rem',
    borderRadius: '18px',
    border: '1px solid var(--color-border)',
    minWidth: '140px',
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'default',
    boxShadow: 'var(--shadow-sm)',
  },
  nodeIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeName: {
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '-0.01em',
  },
  nodeNumber: {
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  connectorWrap: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.5rem',
  },
  connector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '2px',
    background: 'var(--color-border)',
    position: 'relative',
    transformOrigin: 'left',
  },
};
