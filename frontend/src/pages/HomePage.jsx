import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import StatsStrip from '../components/StatsStrip';
import Philosophy from '../components/Philosophy';
import CoreFeatures from '../components/CoreFeatures';
import ArchitectureFlow from '../components/ArchitectureFlow';
import Strategy from '../components/Strategy';
import Showcase from '../components/Showcase';
import Future from '../components/Future';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Smooth scroll for anchor links
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handleClick);

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <TrustStrip />
      <StatsStrip />
      <Philosophy />
      <CoreFeatures />
      <ArchitectureFlow />
      <Strategy />
      <Showcase />
      <Future />
      <CTA />
      <Footer />
    </div>
  );
}
