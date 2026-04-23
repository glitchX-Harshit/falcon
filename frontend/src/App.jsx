import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

export const LoadingContext = createContext(false);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <LoadingContext.Provider value={!loading}>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        {!loading && (
          <div className="app-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
            </Routes>
          </div>
        )}
      </LoadingContext.Provider>
    </BrowserRouter>
  );
}

export default App;
