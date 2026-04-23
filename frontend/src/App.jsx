import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Philosophy from './components/Philosophy';
import CoreFeatures from './components/CoreFeatures';
import ArchitectureFlow from './components/ArchitectureFlow';
import Strategy from './components/Strategy';
import Showcase from './components/Showcase';
import Future from './components/Future';
import CTA from './components/CTA';
import Footer from './components/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <TrustStrip />
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

export default App;
