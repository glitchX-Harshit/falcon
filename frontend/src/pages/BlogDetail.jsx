import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from './BlogPage';

// Extended content for each blog post
const blogContent = {
  'why-algorithmic-trading': {
    sections: [
      {
        heading: 'The Shift from Discretionary to Systematic',
        text: 'The financial markets have undergone a fundamental transformation over the past decade. Where once human traders relied on gut instinct and pattern recognition, today\'s most successful operations run on algorithms that process market data, identify opportunities, and execute trades in milliseconds.\n\nThis isn\'t just a trend — it\'s an evolution. The data is clear: systematic trading strategies consistently outperform discretionary approaches over long time horizons. The reason is simple — algorithms don\'t experience fear, greed, or fatigue.',
      },
      {
        heading: 'Why Emotions are the Enemy',
        text: 'Every trader knows the feeling: a position moves against you, and instead of cutting losses, you hold on, hoping for a reversal. Or a winning trade tempts you to increase your position size beyond what your risk parameters allow.\n\nThese emotional responses are deeply human, but they\'re also systematically destructive to trading performance. Algorithmic systems eliminate this entirely by enforcing rules-based decision making at every step.',
      },
      {
        heading: 'The Falcon Approach',
        text: 'At Falcon, we believe that the best trading system is one that operates with complete discipline. Our engine is designed to execute strategies exactly as they\'re defined — no deviations, no exceptions, no emotional overrides.\n\nThis approach has allowed our users to achieve consistent returns with controlled drawdowns, something that\'s nearly impossible to maintain with manual trading over extended periods.',
      },
    ],
    quote: 'The goal is not to predict the future — it\'s to have a systematic edge and execute it with perfect discipline.',
  },
  'risk-management-essentials': {
    sections: [
      {
        heading: 'Position Sizing: The Foundation',
        text: 'The most overlooked aspect of trading is position sizing. Most traders focus on entry signals and ignore the question of how much to risk on each trade. At Falcon, position sizing is calculated dynamically based on account equity, volatility, and correlation with existing positions.',
      },
      {
        heading: 'Stop Losses: Non-Negotiable',
        text: 'Every trade executed by Falcon has a predefined stop loss. This isn\'t optional — it\'s hardcoded into the risk engine. The stop loss level is determined by market structure and volatility, ensuring that each trade has a defined maximum loss before entry.',
      },
      {
        heading: 'Capital Allocation & Correlation',
        text: 'Beyond individual trade risk, Falcon monitors portfolio-level exposure and correlation between positions. This prevents the common mistake of concentrating risk in correlated trades, which can lead to catastrophic drawdowns during market stress events.',
      },
    ],
    quote: 'Risk management isn\'t about avoiding losses — it\'s about ensuring that no single loss can take you out of the game.',
  },
  'building-breakout-strategy': {
    sections: [
      {
        heading: 'What is a Breakout Strategy?',
        text: 'A breakout strategy identifies key levels of support and resistance and enters positions when price breaks through these levels with conviction. The idea is simple: when price breaks out of a range, it often continues in that direction with momentum.',
      },
      {
        heading: 'Implementing in Falcon',
        text: 'Falcon\'s modular architecture makes implementing a breakout strategy straightforward. You define the lookback period for identifying ranges, the breakout threshold, and the risk parameters. The engine handles everything else — from data processing to execution.',
      },
      {
        heading: 'Optimization and Testing',
        text: 'Once your strategy is defined, Falcon\'s backtesting engine lets you test it against historical data. This includes detailed metrics like Sharpe ratio, maximum drawdown, win rate, and profit factor, giving you a comprehensive view of expected performance.',
      },
    ],
    quote: 'The best strategies are simple, robust, and adaptable. Complexity is the enemy of reliability.',
  },
};

// Default content for posts without detailed content
const defaultContent = {
  sections: [
    {
      heading: 'Understanding the Fundamentals',
      text: 'In the world of systematic trading, understanding the fundamentals is crucial. This article explores the key concepts and practical applications that every trader should know when building automated trading systems.',
    },
    {
      heading: 'Practical Applications',
      text: 'Theory without practice is meaningless. We walk through real-world examples and case studies that demonstrate how these concepts translate into actual trading performance and system design.',
    },
    {
      heading: 'Looking Ahead',
      text: 'The landscape of algorithmic trading is constantly evolving. We discuss emerging trends and technologies that will shape the future of systematic trading, from AI-driven analysis to decentralized execution.',
    },
  ],
  quote: 'Consistency beats brilliance. Build systems that execute with discipline.',
};

export default function BlogDetail() {
  const { slug } = useParams();
  const containerRef = useRef(null);

  const post = blogPosts.find(p => p.id === slug);
  const content = blogContent[slug] || defaultContent;

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.blog-detail-elem', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.blog-detail-cover', {
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from('.blog-detail-section', {
        scrollTrigger: { trigger: '.blog-detail-content', start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [slug]);

  if (!post) {
    return (
      <div ref={containerRef}>
        <Navbar />
        <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '60vh' }}>
          <h1>Post not found</h1>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <Navbar />
      <main className="blog-detail">
        <div className="container">
          {/* Back link */}
          <Link to="/blog" className="blog-detail-elem" style={styles.backLink}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Hero */}
          <div className="blog-detail-hero">
            <span className="blog-tag blog-detail-elem">{post.tag}</span>
            <h1 className="blog-detail-elem">{post.title}</h1>
            <div className="blog-detail-meta blog-detail-elem">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} /> {post.author}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={15} /> {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Cover */}
          <div className="blog-detail-cover">
            <img src={post.image} alt={post.title} />
          </div>

          {/* Content */}
          <div className="blog-detail-content">
            {content.sections.map((section, i) => (
              <div key={i} className="blog-detail-section">
                <h2>{section.heading}</h2>
                {section.text.split('\n\n').map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            ))}

            {content.quote && (
              <blockquote className="blog-detail-section">
                {content.quote}
              </blockquote>
            )}

            {/* Share */}
            <div className="blog-detail-section" style={styles.shareSection}>
              <span style={styles.shareLabel}>
                <Share2 size={16} /> Share this article
              </span>
              <div style={styles.shareButtons}>
                <button style={styles.shareBtn}>Twitter</button>
                <button style={styles.shareBtn}>LinkedIn</button>
                <button style={styles.shareBtn}>Copy Link</button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div style={styles.related}>
            <h3 style={styles.relatedTitle}>Related Articles</h3>
            <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {blogPosts.filter(p => p.id !== slug).slice(0, 3).map((rp) => (
                <Link to={`/blog/${rp.id}`} key={rp.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="blog-card">
                    <div className="blog-card-img">
                      <img src={rp.image} alt={rp.title} />
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-tag">{rp.tag}</span>
                      <h3>{rp.title}</h3>
                      <div className="blog-card-meta">
                        <span><Clock size={12} /> {rp.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
    marginBottom: '2rem',
    transition: 'color 0.3s',
    textDecoration: 'none',
  },
  shareSection: {
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--color-border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    fontSize: '0.95rem',
    color: 'var(--color-text-primary)',
  },
  shareButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  shareBtn: {
    padding: '0.5rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '100px',
    background: 'transparent',
    fontSize: '0.82rem',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-text-secondary)',
    transition: 'all 0.3s',
  },
  related: {
    marginTop: '6rem',
    paddingTop: '4rem',
    borderTop: '1px solid var(--color-border-light)',
  },
  relatedTitle: {
    fontSize: '1.8rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    marginBottom: '2rem',
  },
};
