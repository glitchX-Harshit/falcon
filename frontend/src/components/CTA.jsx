import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';
import { ArrowUpRight } from 'lucide-react';

export default function CTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current;
    if (!els) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: els, start: 'top 80%', toggleActions: 'play none none none' }, duration: 1, stagger: 0.15, ease: 'power4.out' }
      );
      gsap.to('.cta-glow', { x: 100, y: -50, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '4rem 0' }} className="container hover-trigger" id="cta">
      <div style={{ padding: '6rem 2rem', textAlign: 'center', background: '#0B0F1A', color: '#fff', borderRadius: '28px', position: 'relative', overflow: 'hidden' }}>
        <div className="cta-glow" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
        <div className="cta-glow" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', bottom: '-30%', right: '-10%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />
        <div className="cta-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', padding: '0.4rem 1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100 }}>Start Today</span>
          <h2 style={{ fontSize: '4rem', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.08 }}>Stop Trading<br/>Emotionally.</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: 450, lineHeight: 1.6 }}>Start building systems that execute with discipline, consistency, and precision.</p>
          <Magnetic>
            <button className="btn" data-cursor="GO" style={{ background: 'white', color: '#0B0F1A', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 700, borderRadius: 100, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', boxShadow: '0 10px 40px rgba(255,255,255,0.1)' }}>
              Launch Falcon <ArrowUpRight size={18} />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
