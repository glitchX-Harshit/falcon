import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Database, Cpu, Anchor, Send, Save } from 'lucide-react';

export default function ArchitectureFlow() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.flow-node', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });
      gsap.from('.flow-line', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
        width: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.2,
        ease: 'power2.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const nodes = [
    { name: "Market Data", icon: <Database /> },
    { name: "Strategy Engine", icon: <Cpu /> },
    { name: "Risk Engine", icon: <Anchor /> },
    { name: "Execution", icon: <Send /> },
    { name: "Logging", icon: <Save /> }
  ];

  return (
    <section ref={containerRef} style={styles.section} id="architecture">
      <div className="container">
        <h2 style={styles.title}>Engineered for Consistency</h2>
        <div style={styles.diagram}>
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className="flow-node" style={styles.node}>
                <div style={styles.nodeIcon}>{node.icon}</div>
                <div style={styles.nodeName}>{node.name}</div>
              </div>
              {i < nodes.length - 1 && (
                <div style={styles.lineContainer}>
                  <div className="flow-line" style={styles.line}></div>
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
    background: 'var(--color-bg-alt)'
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '6rem'
  },
  diagram: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  node: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    zIndex: 2,
    background: 'var(--color-bg)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    minWidth: '140px'
  },
  nodeIcon: {
    color: 'var(--color-text-primary)'
  },
  nodeName: {
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  lineContainer: {
    flex: 1,
    height: '2px',
    background: 'var(--color-border-light)',
    position: 'relative',
    margin: '0 -10px',
    zIndex: 1
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: 'var(--color-text-primary)',
    width: '100%'
  }
};
