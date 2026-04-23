import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Falcon Loading Screen
 * A cinematic intro: white screen, a black falcon silhouette soars in from
 * the side, swoops across, fills the screen, then fades away to reveal content.
 * A 0→100 counter ticks in the corner during the sequence.
 */

// Falcon SVG silhouette – a stylised bird of prey in flight
const FalconSVG = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Falcon silhouette – wings spread, diving pose */}
    <path d="
      M256 48
      C240 48 200 60 180 90
      C160 120 100 140 60 160
      C40 170 8 200 4 220
      C0 240 10 250 30 248
      C60 244 100 230 140 220
      C120 250 110 280 120 310
      C130 340 150 360 170 370
      C160 380 148 400 140 420
      C132 440 130 460 140 470
      C150 480 165 475 175 460
      C185 445 195 420 200 400
      C210 410 230 415 256 415
      C282 415 302 410 312 400
      C317 420 327 445 337 460
      C347 475 362 480 372 470
      C382 460 380 440 372 420
      C364 400 352 380 342 370
      C362 360 382 340 392 310
      C402 280 392 250 372 220
      C412 230 452 244 482 248
      C502 250 512 240 508 220
      C504 200 472 170 452 160
      C412 140 352 120 332 90
      C312 60 272 48 256 48Z
      M256 120
      C270 120 290 135 300 160
      C310 190 340 200 360 205
      C340 215 310 225 290 230
      C270 240 256 260 256 280
      C256 260 242 240 222 230
      C202 225 172 215 152 205
      C172 200 202 190 212 160
      C222 135 242 120 256 120Z
      M230 180
      C225 180 220 185 220 192
      C220 199 225 204 230 204
      C235 204 240 199 240 192
      C240 185 235 180 230 180Z
      M282 180
      C277 180 272 185 272 192
      C272 199 277 204 282 204
      C287 204 292 199 292 192
      C292 185 287 180 282 180Z
    " />
  </svg>
);

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef(null);
  const falconRef = useRef(null);
  const counterRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);
  const brandRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Prevent body scroll during loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });

    // Counter object for GSAP
    const counterObj = { val: 0 };

    // ── PHASE 1: Brand name fades in (0 → 0.4s) ──
    tl.from(brandRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    });

    // ── PHASE 2: Falcon flies in from the left, soaring across (0.3s → 1.8s) ──
    tl.fromTo(
      falconRef.current,
      {
        x: '-120vw',
        y: '20vh',
        scale: 0.4,
        rotation: -15,
        opacity: 0,
      },
      {
        x: '10vw',
        y: '-5vh',
        scale: 0.8,
        rotation: 5,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      },
      0.3
    );

    // Start the counter alongside the falcon flight
    tl.to(
      counterObj,
      {
        val: 40,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => setCount(Math.round(counterObj.val)),
      },
      0.3
    );

    // ── PHASE 3: Falcon swoops to center, grows larger (1.5s → 2.5s) ──
    tl.to(falconRef.current, {
      x: '0vw',
      y: '0vh',
      scale: 1.2,
      rotation: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 1.5);

    tl.to(
      counterObj,
      {
        val: 70,
        duration: 0.8,
        ease: 'power1.inOut',
        onUpdate: () => setCount(Math.round(counterObj.val)),
      },
      1.5
    );

    // ── PHASE 4: Falcon dives toward camera, filling the screen (2.3s → 3.3s) ──
    tl.to(falconRef.current, {
      scale: 30,
      rotation: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.in',
    }, 2.3);

    tl.to(
      counterObj,
      {
        val: 95,
        duration: 0.9,
        ease: 'power2.in',
        onUpdate: () => setCount(Math.round(counterObj.val)),
      },
      2.3
    );

    // ── PHASE 5: Screen fills black as falcon covers everything (3.0s) ──
    tl.to(fillRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.in',
    }, 2.9);

    // Hide the brand text & counter
    tl.to([brandRef.current, counterRef.current], {
      opacity: 0,
      duration: 0.3,
    }, 2.9);

    // ── PHASE 6: Counter hits 100, then everything fades away (3.2s → 4.0s) ──
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 0.3,
        ease: 'none',
        onUpdate: () => setCount(Math.round(counterObj.val)),
      },
      3.2
    );

    // Full overlay fades out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 3.5);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} style={styles.overlay}>
      {/* Black fill – used when the falcon covers everything */}
      <div ref={fillRef} style={styles.blackFill} />

      {/* Brand name */}
      <div ref={brandRef} style={styles.brand}>
        <span style={styles.brandText}>FALCON</span>
        <span style={styles.brandSub}>Trading Engine</span>
      </div>

      {/* Falcon silhouette */}
      <div ref={falconRef} style={styles.falconContainer}>
        <FalconSVG style={styles.falcon} />
      </div>

      {/* Counter */}
      <div ref={counterRef} style={styles.counter}>
        <span style={styles.counterNumber}>{String(count).padStart(3, '0')}</span>
        <div style={styles.progressBarTrack}>
          <div style={{ ...styles.progressBarFill, width: `${count}%` }} />
        </div>
      </div>

      {/* Subtle grid lines for premium feel */}
      <div style={styles.gridOverlay}>
        <div style={styles.gridLineH} />
        <div style={styles.gridLineV} />
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 10000,
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'all',
  },
  blackFill: {
    position: 'absolute',
    inset: 0,
    background: '#0B0F1A',
    opacity: 0,
    zIndex: 2,
  },
  brand: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    zIndex: 1,
  },
  brandText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '800',
    letterSpacing: '0.35em',
    color: '#0F172A',
    textTransform: 'uppercase',
  },
  brandSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    fontWeight: '400',
    letterSpacing: '0.15em',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  falconContainer: {
    position: 'absolute',
    zIndex: 3,
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    willChange: 'transform, opacity',
  },
  falcon: {
    width: '100%',
    height: '100%',
    color: '#0B0F1A',
    filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.15))',
  },
  counter: {
    position: 'absolute',
    bottom: '3rem',
    right: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
    zIndex: 4,
  },
  counterNumber: {
    fontFamily: "'Inter', monospace",
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    color: '#94A3B8',
    fontVariantNumeric: 'tabular-nums',
  },
  progressBarTrack: {
    width: '120px',
    height: '2px',
    background: '#E2E8F0',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: '#0F172A',
    borderRadius: '2px',
    transition: 'width 0.05s linear',
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  gridLineH: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    height: '1px',
    background: 'rgba(226, 232, 240, 0.5)',
  },
  gridLineV: {
    position: 'absolute',
    left: '50%',
    top: '10%',
    bottom: '10%',
    width: '1px',
    background: 'rgba(226, 232, 240, 0.5)',
  },
};
