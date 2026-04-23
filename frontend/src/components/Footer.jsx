import React, { useEffect, useRef } from 'react';
import { Shield, ArrowRight, Globe, MessageSquare, ExternalLink, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const els = footerRef.current;
    if (!els) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-newsletter',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: els, start: 'top 95%', toggleActions: 'play none none none' }, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo('.footer-col',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: els, start: 'top 90%', toggleActions: 'play none none none' }, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={styles.footerWrapper} id="footer">
      {/* Newsletter */}
      <div style={styles.newsletterSection} className="container">
        <div className="footer-newsletter glass-panel" style={styles.newsletterBox}>
          <div>
            <h3 style={styles.newsletterHeading}>Stay Sharp. Stay Systematic.</h3>
            <p style={styles.newsletterSub}>Join the Falcon mailing list for core engine updates.</p>
          </div>
          <div style={styles.inputGroup}>
            <input type="email" placeholder="Enter your email" style={styles.input} />
            <button className="btn btn-primary" style={styles.joinBtn}>
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={styles.footerContent}>
        <div className="container" style={styles.mainGrid}>
          <div className="footer-col" style={styles.brandCol}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>
                <Shield size={20} color="white" />
              </div>
              <span style={styles.brand}>Falcon</span>
            </div>
            <p style={styles.tagline}>
              Systematic architecture built for discipline. Trade without emotion, execute with precision.
            </p>
            <div style={styles.socials}>
              <a href="#" style={styles.socialIcon} aria-label="Social"><MessageSquare size={18} /></a>
              <a href="#" style={styles.socialIcon} aria-label="Website"><Globe size={18} /></a>
              <a href="#" style={styles.socialIcon} aria-label="External"><ExternalLink size={18} /></a>
              <a href="#" style={styles.socialIcon} aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div className="footer-col" style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>Product</h4>
            <a href="#features" style={styles.link}>Features</a>
            <a href="#architecture" style={styles.link}>Architecture</a>
            <a href="#strategy" style={styles.link}>Strategies</a>
            <a href="#" style={styles.link}>Pricing</a>
          </div>

          <div className="footer-col" style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>Resources</h4>
            <Link to="/blog" style={styles.link}>Blog</Link>
            <a href="#" style={styles.link}>Documentation</a>
            <a href="#" style={styles.link}>API Reference</a>
            <a href="#" style={styles.link}>Community</a>
          </div>

          <div className="footer-col" style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>Legal</h4>
            <a href="#" style={styles.link}>Privacy Policy</a>
            <a href="#" style={styles.link}>Terms of Service</a>
            <a href="#" style={styles.link}>Risk Disclosure</a>
          </div>
        </div>

        <div className="container" style={styles.bottomBar}>
          <span>© 2026 Falcon Systems, Inc.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footerWrapper: {
    position: 'relative',
    marginTop: '4rem',
  },
  newsletterSection: {
    transform: 'translateY(50%)',
    position: 'relative',
    zIndex: 10,
  },
  newsletterBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2.5rem 3rem',
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-xl)',
    borderRadius: '20px',
  },
  newsletterHeading: {
    fontSize: '1.6rem',
    marginBottom: '0.35rem',
    fontFamily: 'var(--font-heading)',
  },
  newsletterSub: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
  },
  inputGroup: {
    display: 'flex',
    gap: '0.75rem',
  },
  input: {
    padding: '0.85rem 1.25rem',
    width: '280px',
    borderRadius: '100px',
    border: '1.5px solid var(--color-border)',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.3s',
    background: 'var(--color-bg-alt)',
  },
  joinBtn: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    borderRadius: '100px',
  },
  footerContent: {
    background: '#0B0F1A',
    color: '#F8FAFC',
    paddingTop: '10rem',
    paddingBottom: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '3rem',
    position: 'relative',
    zIndex: 1,
    paddingBottom: '3rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: '1.4rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    fontFamily: 'var(--font-heading)',
  },
  tagline: {
    color: '#64748B',
    fontSize: '0.95rem',
    maxWidth: '300px',
    lineHeight: 1.6,
  },
  socials: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  socialIcon: {
    color: '#475569',
    transition: 'color 0.3s ease, transform 0.3s ease',
    display: 'flex',
    padding: '0.4rem',
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },
  linkTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'var(--font-sans)',
    marginBottom: '0.25rem',
    letterSpacing: '0.02em',
  },
  link: {
    color: '#64748B',
    fontSize: '0.88rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '1.5rem',
    color: '#475569',
    fontSize: '0.8rem',
    position: 'relative',
    zIndex: 1,
  },
};
