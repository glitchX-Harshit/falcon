import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AnimatedCounter({ end, suffix = '', duration = 2, trigger }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger?.current || ref.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;
          }
        },
        onUpdate: () => {
          setCount(Math.round(obj.val));
        }
      });
    });

    return () => ctx.revert();
  }, [end, duration, trigger]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
