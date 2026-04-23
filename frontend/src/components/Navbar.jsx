import React from 'react';
import { Shield } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  return (
    <nav style={styles.nav} className="glass-panel hover-trigger">
      <div style={styles.container} className="container">
        <Magnetic>
          <div style={styles.logo}>
            <Shield size={24} color="var(--color-text-primary)" />
            <span style={styles.brand}>Falcon</span>
          </div>
        </Magnetic>
        <div style={styles.links}>
          <Magnetic><a href="#features" style={styles.link}>Features</a></Magnetic>
          <Magnetic><a href="#architecture" style={styles.link}>Architecture</a></Magnetic>
          <Magnetic><a href="#strategy" style={styles.link}>Strategy</a></Magnetic>
        </div>
        <div style={styles.actions}>
          <Magnetic><button className="btn btn-secondary" style={{ marginRight: '1rem' }}>Login</button></Magnetic>
          <Magnetic><button className="btn btn-primary" data-cursor="GO">Get Started</button></Magnetic>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  brand: {
    fontSize: '1.25rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  links: {
    display: 'flex',
    gap: '2.5rem',
  },
  link: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
    display: 'inline-block',
    padding: '0.5rem'
  },
  actions: { display: 'flex' },
};
