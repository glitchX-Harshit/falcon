import React, { useEffect, useRef, useState } from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Magnetic from './Magnetic';

export default function Navbar() {
  const navRef = useRef(null);
  const innerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate the inner content, NOT the fixed nav itself
    // This avoids GSAP leaving residual transforms on the fixed element
    if (!innerRef.current) return;
    gsap.fromTo(
      innerRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
        clearProps: 'transform',
      }
    );
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav
      ref={navRef}
      style={{
        ...styles.nav,
        ...(scrolled ? styles.navScrolled : {}),
      }}
      className="hover-trigger"
    >
      <div ref={innerRef} style={styles.inner} className="container">
        <Magnetic>
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>
              <Shield size={20} color="white" />
            </div>
            <span style={styles.brand}>Falcon</span>
          </Link>
        </Magnetic>

        <div style={styles.links}>
          {isHome ? (
            <>
              <a href="#features" className="nav-link">Features</a>
              <a href="#architecture" className="nav-link">Architecture</a>
              <a href="#strategy" className="nav-link">Strategy</a>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/#features" className="nav-link">Features</Link>
              <Link to="/#architecture" className="nav-link">Architecture</Link>
            </>
          )}
          <Link
            to="/blog"
            className="nav-link"
            style={location.pathname.startsWith('/blog') ? { color: 'var(--color-text-primary)' } : {}}
          >
            Blog
          </Link>
        </div>

        <div style={styles.actions}>
          <Magnetic>
            <button className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}>
              Login
            </button>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-primary" data-cursor="GO" style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}>
              Get Started <ArrowUpRight size={15} />
            </button>
          </Magnetic>
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
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid transparent',
    transition: 'background-color 0.4s ease, border-bottom 0.4s ease, box-shadow 0.4s ease',
  },
  navScrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderBottom: '1px solid var(--color-border-light)',
    boxShadow: '0 1px 20px rgba(15, 23, 42, 0.04)',
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '72px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: '1.2rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    fontFamily: 'var(--font-heading)',
  },
  links: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
};
