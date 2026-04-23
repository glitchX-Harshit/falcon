import React from 'react';
import { Shield, ArrowRight, MessageCircle, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={styles.footerWrapper} id="footer">
      <div style={styles.newsletterSection} className="container">
        <div className="glass-panel" style={styles.newsletterBox}>
          <div>
             <h3 style={styles.newsletterHeading}>Stay Sharp. Stay Systematic.</h3>
             <p style={styles.newsletterSub}>Join the Falcon mailing list for core engine updates.</p>
          </div>
          <div style={styles.inputGroup}>
             <input type="email" placeholder="Email Address" style={styles.input} />
             <button className="btn btn-primary" style={styles.joinBtn}>
                Join <ArrowRight size={16} />
             </button>
          </div>
        </div>
      </div>

      <div style={styles.footerContent}>
        <div className="container" style={styles.mainGrid}>
          <div style={styles.brandCol}>
            <div style={styles.logo}>
              <Shield size={32} color="var(--color-bg)" />
              <span style={styles.brand}>Falcon Engine</span>
            </div>
            <p style={styles.tagline}>Systematic architecture built for discipline.</p>
            <div style={styles.socials}>
               <a href="#" style={styles.socialIcon}><MessageCircle size={20}/></a>
               <a href="#" style={styles.socialIcon}><Mail size={20}/></a>
               <a href="#" style={styles.socialIcon}><Globe size={20}/></a>
            </div>
          </div>
          <div style={styles.linkGroup}>
             <h4 style={styles.linkTitle}>Product</h4>
             <a href="#" style={styles.link}>Architecture</a>
             <a href="#" style={styles.link}>Strategies</a>
             <a href="#" style={styles.link}>Pricing</a>
          </div>
          <div style={styles.linkGroup}>
             <h4 style={styles.linkTitle}>Resources</h4>
             <a href="#" style={styles.link}>Documentation</a>
             <a href="#" style={styles.link}>API Reference</a>
             <a href="#" style={styles.link}>Community</a>
          </div>
          <div style={styles.linkGroup}>
             <h4 style={styles.linkTitle}>Legal</h4>
             <a href="#" style={styles.link}>Privacy Policy</a>
             <a href="#" style={styles.link}>Terms of Service</a>
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
    marginTop: '6rem',
  },
  newsletterSection: {
    transform: 'translateY(50%)',
    position: 'relative',
    zIndex: 10
  },
  newsletterBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3rem 4rem',
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)'
  },
  newsletterHeading: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-heading)'
  },
  newsletterSub: {
    fontSize: '1rem',
    color: 'var(--color-text-secondary)'
  },
  inputGroup: {
    display: 'flex',
    gap: '1rem'
  },
  input: {
    padding: '1rem',
    width: '300px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    outline: 'none',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)'
  },
  joinBtn: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  footerContent: {
    background: '#0F172A',
    color: '#F8FAFC',
    paddingTop: '12rem', 
    paddingBottom: '2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  watermarkContainer: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
    pointerEvents: 'none',
    opacity: 0.03,
    zIndex: 0
  },
  watermark: {
    fontSize: '25vw',
    fontFamily: 'var(--font-heading)',
    lineHeight: 1,
    margin: 0,
    fontWeight: 900,
    whiteSpace: 'nowrap'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '4rem',
    position: 'relative',
    zIndex: 1,
    paddingBottom: '4rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  brand: {
    fontSize: '1.75rem',
    fontWeight: '700',
    letterSpacing: '-1px'
  },
  tagline: {
    color: '#94A3B8',
    fontSize: '1.1rem',
    maxWidth: '280px'
  },
  socials: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  socialIcon: {
    color: '#94A3B8',
    transition: 'color 0.3s ease'
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  linkTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#FFFFFF'
  },
  link: {
    color: '#94A3B8',
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '2rem',
    color: '#64748B',
    fontSize: '0.9rem',
    position: 'relative',
    zIndex: 1
  }
};
