import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, TrendingUp, Shield, Cpu, BarChart3, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 'why-algorithmic-trading',
    title: 'Why Algorithmic Trading is the Future of Finance',
    excerpt: 'Discover how systematic approaches are replacing emotional decision-making in modern financial markets and why human traders are turning to algorithms.',
    tag: 'Industry',
    author: 'Falcon Team',
    date: 'Apr 20, 2026',
    readTime: '8 min read',
    image: '/images/quant-light-chart.png',
    featured: true,
    icon: <TrendingUp size={16} />,
  },
  {
    id: 'risk-management-essentials',
    title: 'The 5 Pillars of Risk Management in Algo Trading',
    excerpt: 'Position sizing, stop losses, and capital allocation — learn the fundamental risk controls every trading system needs.',
    tag: 'Education',
    author: 'Falcon Team',
    date: 'Apr 15, 2026',
    readTime: '6 min read',
    image: '/images/chart-breakout-light.png',
    icon: <Shield size={16} />,
  },
  {
    id: 'building-breakout-strategy',
    title: 'Building Your First Breakout Strategy with Falcon',
    excerpt: 'A step-by-step guide to implementing a simple but effective breakout strategy using Falcon\'s modular engine.',
    tag: 'Tutorial',
    author: 'Falcon Team',
    date: 'Apr 10, 2026',
    readTime: '12 min read',
    image: '/images/quant-ui-1.png',
    icon: <Cpu size={16} />,
  },
  {
    id: 'backtesting-vs-live',
    title: 'Backtesting vs Live Trading: Bridging the Gap',
    excerpt: 'Understanding the critical differences between simulated results and real-world execution, and how to minimize discrepancies.',
    tag: 'Deep Dive',
    author: 'Falcon Team',
    date: 'Apr 5, 2026',
    readTime: '10 min read',
    image: '/images/quant-ui-2.png',
    icon: <BarChart3 size={16} />,
  },
  {
    id: 'mean-reversion-explained',
    title: 'Mean Reversion Strategies: A Statistical Approach',
    excerpt: 'How to identify overbought and oversold conditions using statistical models and deploy mean reversion strategies effectively.',
    tag: 'Strategy',
    author: 'Falcon Team',
    date: 'Mar 28, 2026',
    readTime: '9 min read',
    image: '/images/market-depth.png',
    icon: <TrendingUp size={16} />,
  },
  {
    id: 'falcon-architecture-deep-dive',
    title: 'Inside Falcon\'s Architecture: How We Built a Reliable Trading Engine',
    excerpt: 'A technical deep dive into Falcon\'s modular architecture, from market data ingestion to trade execution and logging.',
    tag: 'Engineering',
    author: 'Falcon Team',
    date: 'Mar 20, 2026',
    readTime: '15 min read',
    image: '/images/quant-light-chart.png',
    icon: <BookOpen size={16} />,
  },
];

export { blogPosts };

export default function BlogPage() {
  const containerRef = useRef(null);
  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from('.blog-hero-elem', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
      });

      // Featured card
      gsap.from('.blog-featured-card', {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Blog cards stagger
      gsap.from('.blog-card', {
        scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' },
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <Navbar />
      <main className="blog-page container">
        {/* Blog Hero */}
        <div className="blog-hero">
          <span className="section-label blog-hero-elem">
            <BookOpen size={14} /> Blog & Insights
          </span>
          <h1 className="blog-hero-elem">
            Thoughts on<br />
            <span className="text-gradient">Systematic Trading</span>
          </h1>
          <p className="blog-hero-elem">
            Insights, tutorials, and deep dives into the world of algorithmic trading, strategy development, and financial engineering.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="blog-featured">
            <Link to={`/blog/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-featured-card">
                <div className="blog-featured-img">
                  <img src={featured.image} alt={featured.title} />
                </div>
                <div className="blog-featured-content">
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span className="blog-tag">{featured.tag}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>Featured</span>
                  </div>
                  <h2 style={{ fontSize: '2rem', lineHeight: 1.2, letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)', fontWeight: '800' }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                    {featured.excerpt}
                  </p>
                  <div className="blog-card-meta">
                    <span><User size={14} /> {featured.author}</span>
                    <span><Clock size={14} /> {featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                  <div className="read-more-link">
                    Read Article <ArrowRight size={16} className="arrow" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: '700', marginBottom: '0.5rem' }}>
            All Articles
          </h3>
          <div className="blog-grid">
            {rest.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-card">
                  <div className="blog-card-img">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-card-body">
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="blog-tag">{post.tag}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span><Clock size={12} /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
