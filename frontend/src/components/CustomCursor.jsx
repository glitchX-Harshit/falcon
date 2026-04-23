import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    // Only run on non-touch devices
    if(window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
      gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      
      const fXTo = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3.out" });
      const fYTo = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3.out" });

      const onMouseMove = (e) => {
        xTo(e.clientX); yTo(e.clientY);
        fXTo(e.clientX); fYTo(e.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    });

    const updateHoverState = () => {
      const triggers = document.querySelectorAll('a, button, input, .magnetic-wrap, .feature-card, .hover-trigger, .slide-img');
      const onEnter = (e) => {
        setHovered(true);
        if (e.target.dataset.cursor) {
           setText(e.target.dataset.cursor);
        }
      };
      const onLeave = () => {
        setHovered(false);
        setText("");
      };

      triggers.forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });

      return () => {
        triggers.forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      };
    };

    // Need slight delay to wait for DOM elements
    const timeout = setTimeout(() => updateHoverState(), 500);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        style={{
           ...styles.dot, 
           transform: hovered ? 'scale(0.3)' : 'scale(1)',
           opacity: window.matchMedia("(pointer: coarse)").matches ? 0 : 1
        }} 
      />
      <div 
        ref={followerRef} 
        style={{
           ...styles.follower,
           transform: hovered ? (text ? 'scale(2.5)' : 'scale(1.5)') : 'scale(1)',
           backgroundColor: hovered ? (text ? 'var(--color-text-primary)' : 'rgba(17, 24, 39, 0.05)') : 'transparent',
           border: hovered ? 'none' : '1px solid var(--color-text-primary)',
           mixBlendMode: text ? 'normal' : 'difference',
           color: 'var(--color-bg)',
           opacity: window.matchMedia("(pointer: coarse)").matches ? 0 : 1
        }}
      >
        {hovered && text && <span style={styles.text}>{text}</span>}
      </div>
    </>
  );
}

const styles = {
  dot: {
    position: 'fixed', top: 0, left: 0, width: '8px', height: '8px',
    backgroundColor: 'var(--color-bg)', borderRadius: '50%',
    pointerEvents: 'none', zIndex: 9999, transition: 'transform 0.2s', mixBlendMode: 'difference'
  },
  follower: {
    position: 'fixed', top: 0, left: 0, width: '40px', height: '40px',
    borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.4s ease, background-color 0.4s, border 0.4s'
  },
  text: {
    fontSize: '5px', fontWeight: 'bold', letterSpacing: '1px'
  }
};
