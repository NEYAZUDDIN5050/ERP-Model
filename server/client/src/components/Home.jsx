import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Mail, Menu, X } from 'lucide-react';

const Home = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.4 + 0.1,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,160,255,${p.o})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(80,120,255,${0.12*(1-d/130)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'modules', label: 'Modules' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const modules = [
    { to: '/crm', title: 'CRM', desc: 'Manage customer relationships and boost sales pipelines.', icon: '🤝', accent: '#3b82f6' },
    { to: '/sales', title: 'Sales', desc: 'Track transactions, quotes, and revenue in real time.', icon: '📈', accent: '#10b981' },
    { to: '/finance', title: 'Finance', desc: 'Oversee P&L, invoicing, and financial reporting.', icon: '💰', accent: '#f59e0b' },
    { to: '/hr', title: 'HR & Payroll', desc: 'Streamline hiring, attendance, and payroll processing.', icon: '👥', accent: '#8b5cf6' },
    { to: '/inventory', title: 'Inventory', desc: 'Monitor stock levels, movements, and procurement.', icon: '📦', accent: '#ef4444' },
    { to: '/scm', title: 'Supply Chain', desc: 'Optimize logistics, vendors, and delivery workflows.', icon: '🚚', accent: '#06b6d4' },
  ];

  const stats = [
    { num: '12,000+', label: 'Active Users' },
    { num: '99.9%', label: 'Uptime SLA' },
    { num: '16', label: 'Modules' },
    { num: '4.9★', label: 'Avg Rating' },
  ];

  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-100ms response times with globally distributed infrastructure.' },
    { icon: '🔐', title: 'Enterprise Security', desc: 'SOC2 compliant, end-to-end encryption, and role-based access control.' },
    { icon: '📊', title: 'Real-Time Analytics', desc: 'Live dashboards and AI-powered insights across every department.' },
    { icon: '🔗', title: 'Seamless Integration', desc: 'Connect with 200+ tools including Slack, Stripe, and QuickBooks.' },
    { icon: '🌍', title: 'Multi-Region', desc: 'Deploy in your preferred region with full data residency control.' },
    { icon: '🛠️', title: 'Custom Workflows', desc: 'Build automated workflows without writing a single line of code.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
  const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #07060f;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.07);
          --text: #f0eeff;
          --muted: rgba(255,255,255,0.4);
          --accent: #6366f1;
          --accent2: #3b82f6;
          --font-display: 'Playfair Display', serif;
          --font-body: 'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        .home-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem;
          height: 70px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s;
        }
        .navbar.scrolled {
          background: rgba(7,6,15,0.88);
          backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 var(--border);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 700;
          background: linear-gradient(90deg, #c4b5fd, #93c5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          text-decoration: none;
          display: flex; align-items: center; gap: 10px;
        }
        .nav-logo-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 14px rgba(99,102,241,0.45);
          -webkit-text-fill-color: white;
        }

        .nav-links {
          display: flex; gap: 0.25rem; list-style: none;
        }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 0.85rem; font-weight: 400;
          color: var(--muted);
          padding: 0.45rem 1rem;
          border-radius: 50px;
          transition: color 0.25s, background 0.25s;
        }
        .nav-links button:hover { color: var(--text); background: rgba(255,255,255,0.06); }
        .nav-links button.active { color: var(--text); background: rgba(99,102,241,0.18); }

        .nav-cta {
          display: flex; gap: 0.75rem; align-items: center;
        }
        .btn-ghost {
          background: none; border: 1px solid var(--border);
          color: var(--muted); font-family: var(--font-body); font-size: 0.83rem;
          padding: 0.5rem 1.2rem; border-radius: 50px; cursor: pointer;
          text-decoration: none;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
        }
        .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          border: none; color: #fff; font-family: var(--font-body); font-size: 0.83rem; font-weight: 500;
          padding: 0.5rem 1.4rem; border-radius: 50px; cursor: pointer;
          text-decoration: none;
          box-shadow: 0 2px 14px rgba(99,102,241,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.5); }

        .mobile-menu-btn {
          display: none; background: none; border: none; color: var(--muted); cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .mobile-menu-btn { display: flex; }
        }

        .mobile-drawer {
          position: fixed; top: 70px; left: 0; right: 0;
          background: rgba(7,6,15,0.98); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 2rem 2rem;
          z-index: 99;
        }
        .mobile-drawer ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .mobile-drawer button { background: none; border: none; color: var(--muted); font-family: var(--font-body); font-size: 1rem; cursor: pointer; padding: 0.6rem 0; width: 100%; text-align: left; }
        .mobile-drawer .mobile-btns { display: flex; gap: 0.75rem; }
        .mobile-drawer .btn-ghost, .mobile-drawer .btn-primary { flex: 1; text-align: center; }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; overflow: hidden; padding: 0 1.5rem;
        }
        .hero-canvas { position: absolute; inset: 0; z-index: 0; }
        .hero-bg-orb {
          position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0;
        }
        .hero-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(99,102,241,0.15),transparent 70%); top: -150px; left: -150px; animation: orbA 16s ease-in-out infinite alternate; }
        .hero-orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(59,130,246,0.12),transparent 70%); bottom: -100px; right: -100px; animation: orbB 20s ease-in-out infinite alternate; }
        @keyframes orbA { from { transform: translate(0,0); } to { transform: translate(80px,60px); } }
        @keyframes orbB { from { transform: translate(0,0); } to { transform: translate(-60px,-40px); } }

        .hero-content { position: relative; z-index: 2; max-width: 820px; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3);
          color: #a5b4fc; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.4rem 1rem; border-radius: 50px; margin-bottom: 2rem;
        }
        .hero-badge-dot { width: 6px; height: 6px; background: #6366f1; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

        .hero-title {
          font-family: var(--font-display); font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 700; line-height: 1.1; color: #fff; margin-bottom: 1.5rem;
        }
        .hero-title .line2 {
          background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          background-size: 200%;
          animation: gradShift 4s ease-in-out infinite alternate;
        }
        @keyframes gradShift { from { background-position: 0%; } to { background-position: 100%; } }

        .hero-sub {
          font-size: 1.05rem; color: var(--muted); line-height: 1.8;
          max-width: 560px; margin: 0 auto 2.5rem;
        }

        .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 4rem; }
        .hero-btn-primary {
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          color: #fff; font-family: var(--font-body); font-size: 0.95rem; font-weight: 500;
          padding: 0.85rem 2.2rem; border-radius: 50px; border: none; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(99,102,241,0.55); }
        .hero-btn-secondary {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
          color: var(--text); font-family: var(--font-body); font-size: 0.95rem;
          padding: 0.85rem 2.2rem; border-radius: 50px; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.25s, border-color 0.25s;
        }
        .hero-btn-secondary:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.22); }

        .hero-stats {
          display: flex; gap: 2.5rem; justify-content: center; flex-wrap: wrap;
          padding: 1.5rem 2.5rem;
          background: rgba(255,255,255,0.03); border: 1px solid var(--border);
          border-radius: 20px; backdrop-filter: blur(10px);
        }
        .hero-stat-num { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: #fff; }
        .hero-stat-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-top: 2px; }

        .scroll-hint {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--muted); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; z-index: 2;
        }
        .scroll-arrow {
          width: 20px; height: 20px; border-right: 1.5px solid rgba(255,255,255,0.2); border-bottom: 1.5px solid rgba(255,255,255,0.2);
          transform: rotate(45deg);
          animation: scrollBounce 1.8s ease-in-out infinite;
        }
        @keyframes scrollBounce { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(5px)} }

        /* ── SECTION SHARED ── */
        .section { padding: 7rem 1.5rem; position: relative; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-eyebrow {
          font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--accent); font-weight: 500; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .section-eyebrow::before { content:''; display:inline-block; width:20px; height:1px; background: var(--accent); }
        .section-title {
          font-family: var(--font-display); font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; color: #fff; margin-bottom: 1rem; line-height: 1.2;
        }
        .section-desc { font-size: 0.95rem; color: var(--muted); line-height: 1.8; max-width: 520px; }

        /* ── FEATURES ── */
        .features-section { background: rgba(255,255,255,0.015); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .features-header { text-align: center; margin-bottom: 4rem; }
        .features-header .section-desc { margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .feature-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          cursor: default;
        }
        .feature-card:hover {
          border-color: rgba(99,102,241,0.35); background: rgba(99,102,241,0.05);
          transform: translateY(-4px);
        }
        .feature-icon-wrap {
          width: 48px; height: 48px;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.2);
          border-radius: 14px; display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 1.2rem;
        }
        .feature-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem; }
        .feature-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

        /* ── MODULES ── */
        .modules-wrapper { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.25rem; margin-top: 3.5rem; }
        .module-card {
          position: relative; border-radius: 18px; padding: 2rem;
          background: var(--surface); border: 1px solid var(--border);
          text-decoration: none; display: block; overflow: hidden;
          transition: transform 0.3s, border-color 0.3s;
        }
        .module-card::before {
          content: ''; position: absolute; inset: 0; opacity: 0;
          transition: opacity 0.3s;
          background: radial-gradient(circle at 20% 20%, var(--card-accent, rgba(99,102,241,0.15)), transparent 60%);
        }
        .module-card:hover { transform: translateY(-5px); border-color: var(--card-accent-border, rgba(99,102,241,0.35)); }
        .module-card:hover::before { opacity: 1; }
        .module-icon {
          width: 50px; height: 50px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 1.2rem;
          background: var(--card-icon-bg, rgba(99,102,241,0.12));
          border: 1px solid var(--card-icon-border, rgba(99,102,241,0.2));
        }
        .module-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem; }
        .module-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.2rem; }
        .module-arrow {
          font-size: 0.78rem; color: var(--muted); display: flex; align-items: center; gap: 6px;
          transition: color 0.25s, gap 0.25s;
        }
        .module-card:hover .module-arrow { color: #fff; gap: 10px; }

        /* ── ABOUT ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .about-visual {
          position: relative; border-radius: 24px; overflow: hidden;
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(59,130,246,0.08));
          border: 1px solid var(--border); padding: 2.5rem;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .about-visual-top { display: flex; gap: 1rem; }
        .about-metric {
          flex: 1; background: rgba(255,255,255,0.04); border: 1px solid var(--border);
          border-radius: 14px; padding: 1.2rem;
        }
        .about-metric-val { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .about-metric-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .about-bar-section { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 14px; padding: 1.2rem; }
        .about-bar-label { font-size: 0.78rem; color: var(--muted); margin-bottom: 0.6rem; display: flex; justify-content: space-between; }
        .about-bar-track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; margin-bottom: 0.7rem; }
        .about-bar-fill { height: 100%; border-radius: 3px; animation: barGrow 1.5s ease-out both; }
        @keyframes barGrow { from { width: 0 !important; } }
        .about-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .about-list li { display: flex; gap: 12px; align-items: flex-start; }
        .about-list-check {
          width: 22px; height: 22px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);
          border-radius: 6px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; flex-shrink: 0; margin-top: 1px;
        }
        .about-list-text { font-size: 0.88rem; color: var(--muted); line-height: 1.6; }

        /* ── CTA BANNER ── */
        .cta-banner {
          margin: 0 1.5rem 7rem; border-radius: 24px; overflow: hidden;
          background: linear-gradient(135deg, #1e1b4b 0%, #1e3a5f 100%);
          border: 1px solid rgba(99,102,241,0.2);
          padding: 5rem 3rem; text-align: center;
          position: relative;
        }
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2), transparent 70%);
        }
        .cta-banner-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
        .cta-title { font-family: var(--font-display); font-size: clamp(1.7rem, 4vw, 2.8rem); font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .cta-sub { font-size: 0.95rem; color: rgba(255,255,255,0.5); margin-bottom: 2.5rem; line-height: 1.7; }

        /* ── FOOTER ── */
        footer {
          border-top: 1px solid var(--border);
          padding: 4rem 1.5rem 2rem;
        }
        .footer-inner { max-width: 1100px; margin: 0 auto; }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 768px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; } }
        @media (max-width: 480px) { .footer-top { grid-template-columns: 1fr; } }
        .footer-brand-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.8; margin-top: 1rem; max-width: 280px; }
        .footer-col-title { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 500; margin-bottom: 1rem; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-links a { font-size: 0.85rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--text); }
        .footer-bottom {
          border-top: 1px solid var(--border); padding-top: 2rem;
          display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;
        }
        .footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.25); }
        .footer-legal { display: flex; gap: 1.5rem; }
        .footer-legal a { font-size: 0.8rem; color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.2s; }
        .footer-legal a:hover { color: var(--muted); }
        .footer-socials { display: flex; gap: 0.75rem; }
        .social-btn {
          width: 34px; height: 34px; border-radius: 9px;
          background: var(--surface); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--muted); transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .social-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); }
      `}</style>

      <div className="home-root">

        {/* NAVBAR */}
        <motion.header
          className={`navbar ${navScrolled ? 'scrolled' : ''}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="nav-logo">
            <span className="nav-logo-icon">⬡</span>
            BizERP
          </Link>

          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  className={activeSection === l.id ? 'active' : ''}
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <Link to="/login" className="btn-ghost">Sign In</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ul>
                {navLinks.map((l) => (
                  <li key={l.id}><button onClick={() => scrollTo(l.id)}>{l.label}</button></li>
                ))}
              </ul>
              <div className="mobile-btns">
                <Link to="/login" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section id="hero" className="hero" ref={heroRef}>
          <canvas ref={canvasRef} className="hero-canvas" />
          <div className="hero-bg-orb hero-orb-1" />
          <div className="hero-bg-orb hero-orb-2" />

          <motion.div className="hero-content" style={{ opacity: heroOpacity, y: heroY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="hero-badge">
                <span className="hero-badge-dot" />
                Now with AI-powered analytics
              </span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22,1,0.36,1] }}
            >
              Run your entire<br />
              <span className="line2">business smarter.</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              BizERP unifies HR, finance, inventory, CRM, and supply chain into one
              elegant platform — built for teams that refuse to settle.
            </motion.p>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <Link to="/register" className="hero-btn-primary">
                Start Free Trial →
              </Link>
              <button className="hero-btn-secondary" onClick={() => scrollTo('modules')}>
                Explore Modules
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="section features-section">
          <div className="section-inner">
            <motion.div
              className="features-header"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div className="section-eyebrow" variants={fadeUp} style={{ justifyContent: 'center' }}>
                Why BizERP
              </motion.div>
              <motion.h2 className="section-title" variants={fadeUp}>
                Everything your business needs
              </motion.h2>
              <motion.p className="section-desc" variants={fadeUp}>
                From startups to enterprises — BizERP scales with you, giving every team the tools they actually need.
              </motion.p>
            </motion.div>

            <motion.div
              className="features-grid"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            >
              {features.map((f) => (
                <motion.div key={f.title} className="feature-card" variants={fadeUp}>
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MODULES */}
        <section id="modules" className="section">
          <div className="section-inner">
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div className="section-eyebrow" variants={fadeUp}>Our Modules</motion.div>
              <motion.h2 className="section-title" variants={fadeUp}>
                One platform,<br />every department.
              </motion.h2>
              <motion.p className="section-desc" variants={fadeUp}>
                16 deeply integrated modules that talk to each other — no more data silos.
              </motion.p>
            </motion.div>

            <motion.div
              className="modules-wrapper"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            >
              {modules.map((m) => (
                <motion.div key={m.title} variants={fadeUp}>
                  <Link
                    to={m.to}
                    className="module-card"
                    style={{
                      '--card-accent': m.accent + '22',
                      '--card-accent-border': m.accent + '55',
                      '--card-icon-bg': m.accent + '18',
                      '--card-icon-border': m.accent + '33',
                    }}
                  >
                    <div className="module-icon">{m.icon}</div>
                    <div className="module-title">{m.title}</div>
                    <div className="module-desc">{m.desc}</div>
                    <div className="module-arrow">Explore module →</div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="section-inner">
            <div className="about-grid">
              <motion.div
                variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div className="section-eyebrow" variants={fadeUp}>About BizERP</motion.div>
                <motion.h2 className="section-title" variants={fadeUp}>
                  Built by operators,<br />for operators.
                </motion.h2>
                <motion.p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.8', marginBottom: '1.5rem' }} variants={fadeUp}>
                  BizERP was born out of frustration with clunky, overpriced ERP software. Our team has run businesses across manufacturing, retail, and services — we know what actually matters on the ground.
                </motion.p>
                <motion.ul className="about-list" variants={stagger}>
                  {[
                    'Founded in Patna, Bihar — serving businesses across India',
                    'Trusted by 12,000+ users across 800+ companies',
                    '24/7 support team with <2hr average response time',
                    'GDPR & ISO 27001 compliant infrastructure',
                  ].map((item) => (
                    <motion.li key={item} variants={fadeUp}>
                      <span className="about-list-check">✓</span>
                      <span className="about-list-text">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                className="about-visual"
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              >
                <div className="about-visual-top">
                  {[{ val: '₹2.4Cr', label: 'Avg revenue managed' }, { val: '340ms', label: 'Avg API response' }].map((m) => (
                    <div key={m.label} className="about-metric">
                      <div className="about-metric-val">{m.val}</div>
                      <div className="about-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="about-bar-section">
                  {[
                    { label: 'Customer Satisfaction', val: 96, color: '#6366f1' },
                    { label: 'System Uptime', val: 99.9, color: '#22c55e' },
                    { label: 'On-time Support', val: 94, color: '#3b82f6' },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="about-bar-label">
                        <span>{b.label}</span><span style={{ color: b.color }}>{b.val}%</span>
                      </div>
                      <div className="about-bar-track">
                        <div className="about-bar-fill" style={{ width: `${b.val}%`, background: b.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <motion.div
          className="cta-banner"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        >
          <div className="cta-banner-inner">
            <h2 className="cta-title">Ready to transform your business?</h2>
            <p className="cta-sub">
              Join 12,000+ businesses running smarter operations with BizERP. No credit card required.
            </p>
            <div className="hero-btns" style={{ marginBottom: 0 }}>
              <Link to="/register" className="hero-btn-primary">Start Free 14-Day Trial →</Link>
              <Link to="/login" className="hero-btn-secondary">Sign In</Link>
            </div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer id="contact">
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <Link to="/" className="nav-logo" style={{ display: 'inline-flex' }}>
                  <span className="nav-logo-icon">⬡</span>
                  BizERP
                </Link>
                <p className="footer-brand-desc">
                  Your all-in-one ERP solution for managing inventory, sales, finance, and operations — built for modern businesses.
                </p>
              </div>
              <div>
                <div className="footer-col-title">Modules</div>
                <ul className="footer-links">
                  {['Inventory', 'Sales', 'Finance', 'HR', 'CRM', 'Reports'].map((m) => (
                    <li key={m}><Link to={`/${m.toLowerCase()}`}>{m}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="footer-col-title">Support</div>
                <ul className="footer-links">
                  {[['Help Center', '/help'], ['Documentation', '/docs'], ['Contact', '/contact'], ['FAQs', '/faqs']].map(([l, h]) => (
                    <li key={l}><Link to={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="footer-col-title">Contact</div>
                <ul className="footer-links">
                  <li><a href="mailto:support@bizerp.com">support@bizerp.com</a></li>
                  <li><a href="tel:+919876543210">+91-9876543210</a></li>
                  <li><span style={{ color: 'var(--muted)', fontSize:'0.85rem' }}>Patna, Bihar, India</span></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span className="footer-copy">© {new Date().getFullYear()} BizERP. All rights reserved.</span>
              <div className="footer-legal">
                {[['Terms', '/terms'], ['Privacy', '/privacy'], ['Security', '/security']].map(([l, h]) => (
                  <Link key={l} to={h}>{l}</Link>
                ))}
              </div>
              <div className="footer-socials">
                {[
                  { href: 'https://facebook.com', icon: <Facebook size={15} /> },
                  { href: 'https://twitter.com', icon: <Twitter size={15} /> },
                  { href: 'https://linkedin.com', icon: <Linkedin size={15} /> },
                  { href: 'mailto:support@bizerp.com', icon: <Mail size={15} /> },
                ].map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" whileHover={{ scale: 1.1 }}>
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Home;