import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';
import { ArrowUpRight, Play } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered word-level reveal on heading lines
      gsap.from('.hero-heading-line', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3
      });

      // Subtitle fade up
      gsap.from('.hero-sub', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.7
      });

      // CTA buttons stagger
      gsap.from('.hero-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.9
      });

      // Badge entrance
      gsap.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        delay: 0.2
      });

      // Image parallax mask reveal
      gsap.to('.hero-img-mask', {
        scaleY: 0,
        duration: 1.8,
        ease: 'power4.inOut',
        delay: 0.5
      });

      gsap.from('.hero-image-inner img', {
        scale: 1.3,
        duration: 2.5,
        ease: 'power3.out',
        delay: 0.3
      });

      // Floating badges animation
      gsap.to('.float-badge-1', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });

      gsap.to('.float-badge-2', {
        y: 12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });

      // Stats counter reveal
      gsap.from('.hero-stat', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.2
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={styles.section} className="hover-trigger">
      <div className="container" style={styles.wrapper}>
        <div style={styles.grid}>
          {/* LEFT: Content */}
          <div style={styles.content}>
            <div className="hero-badge" style={styles.badge}>
              <div style={styles.badgeDot} />
              <span>Algo Trading Engine v2.0</span>
            </div>

            <h1 style={styles.heading}>
              <div style={{ overflow: 'hidden' }}>
                <span className="hero-heading-line" style={{ display: 'block' }}>
                  Trade Without
                </span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <span className="hero-heading-line" style={{ display: 'block' }}>
                  Emotion.
                </span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <span className="hero-heading-line text-gradient" style={{ display: 'block' }}>
                  Execute With Precision.
                </span>
              </div>
            </h1>

            <p className="hero-sub" style={styles.subheading}>
              Falcon is a disciplined algorithmic trading engine built to remove human bias
              and operate with consistent logic — 24 hours a day, 7 days a week.
            </p>

            <div style={styles.actions}>
              <Magnetic>
                <button className="btn btn-primary hero-btn" data-cursor="GO">
                  Get Started <ArrowUpRight size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-secondary hero-btn">
                  <Play size={14} /> Watch Demo
                </button>
              </Magnetic>
            </div>

            {/* Mini Stats */}
            <div style={styles.statsRow}>
              <div className="hero-stat" style={styles.miniStat}>
                <span style={styles.miniStatNum}>99.7%</span>
                <span style={styles.miniStatLabel}>Uptime</span>
              </div>
              <div style={styles.statDivider} className="hero-stat" />
              <div className="hero-stat" style={styles.miniStat}>
                <span style={styles.miniStatNum}>&lt;2ms</span>
                <span style={styles.miniStatLabel}>Latency</span>
              </div>
              <div style={styles.statDivider} className="hero-stat" />
              <div className="hero-stat" style={styles.miniStat}>
                <span style={styles.miniStatNum}>24/7</span>
                <span style={styles.miniStatLabel}>Operation</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div style={styles.imageContainer}>
            <div className="hero-img-mask img-parallax-mask" />
            <div style={styles.glassImgWrapper} className="glass-panel">
              <div className="hero-image-inner" style={{ overflow: 'hidden', borderRadius: '14px' }}>
                <img
                  src="/images/quant-light-chart.png"
                  alt="Falcon Trading Dashboard"
                  style={styles.image}
                />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="float-badge-1" style={{ ...styles.floatBadge, top: '10%', right: '-20px' }}>
              <span style={styles.floatBadgeIcon}>⚡</span>
              <span style={styles.floatBadgeText}>Auto Execute</span>
            </div>
            <div className="float-badge-2" style={{ ...styles.floatBadge, bottom: '15%', left: '-24px' }}>
              <span style={styles.floatBadgeIcon}>🛡️</span>
              <span style={styles.floatBadgeText}>Risk Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    paddingTop: '140px',
    paddingBottom: '60px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  wrapper: {
    position: 'relative',
    zIndex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: '5rem',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    padding: '0.4rem 1rem 0.4rem 0.65rem',
    background: 'var(--color-bg-alt)',
    border: '1px solid var(--color-border)',
    borderRadius: '100px',
    width: 'fit-content',
    letterSpacing: '0.02em',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22C55E',
    boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.2)',
    animation: 'pulse 2s infinite',
  },
  heading: {
    fontSize: '4.2rem',
    lineHeight: 1.08,
    letterSpacing: '-0.04em',
  },
  subheading: {
    fontSize: '1.15rem',
    maxWidth: '480px',
    lineHeight: 1.7,
    color: 'var(--color-text-secondary)',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '1rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--color-border-light)',
  },
  miniStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  miniStatNum: {
    fontSize: '1.3rem',
    fontWeight: '800',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.02em',
  },
  miniStatLabel: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'var(--color-text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    background: 'var(--color-border)',
  },
  imageContainer: {
    position: 'relative',
  },
  glassImgWrapper: {
    padding: '0.75rem',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.5)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  floatBadge: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid var(--color-border-light)',
    zIndex: 20,
  },
  floatBadgeIcon: {
    fontSize: '1rem',
  },
  floatBadgeText: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: 'var(--color-text-primary)',
  },
};
