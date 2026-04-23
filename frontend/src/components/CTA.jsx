import React from 'react';
import Magnetic from './Magnetic';

export default function CTA() {
  return (
    <section style={styles.section} className="container hover-trigger" id="cta">
      <div className="glass-panel" style={styles.box}>
        <h2 style={styles.heading}>Stop Trading Emotionally.</h2>
        <p style={styles.subheading}>Start building systems that execute with discipline.</p>
        <Magnetic>
           <button className="btn btn-primary" style={styles.btn} data-cursor="GO">Launch Falcon</button>
        </Magnetic>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '6rem 0' },
  box: {
    padding: '6rem 2rem',
    textAlign: 'center',
    background: 'var(--color-text-primary)', 
    color: 'var(--color-bg)',
    borderRadius: '24px'
  },
  heading: { fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--color-bg)' },
  subheading: { fontSize: '1.5rem', marginBottom: '3rem', color: '#9CA3AF', fontWeight: '300' },
  btn: {
    background: 'var(--color-bg)',
    color: 'var(--color-text-primary)',
    padding: '1rem 3rem',
    fontSize: '1.1rem'
  }
};
