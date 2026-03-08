import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Animated particle canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 160, 255, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(140, 100, 255, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Please provide both email and password');
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        '/api/auth/login',
        { email: trimmedEmail, password: trimmedPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { success, message, token } = response.data;
      if (success) {
        localStorage.setItem('token', token);
        toast.success(message);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(message);
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .erp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #07060f;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .bg-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .bg-gradient-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,51,255,0.18) 0%, transparent 70%);
          top: -100px; left: -100px;
          animation: orbFloat1 12s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(180,80,255,0.12) 0%, transparent 70%);
          bottom: -80px; right: -80px;
          animation: orbFloat2 15s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(60,140,255,0.10) 0%, transparent 70%);
          top: 40%; left: 40%;
          animation: orbFloat1 18s ease-in-out infinite alternate-reverse;
        }

        @keyframes orbFloat1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-50px, -30px) scale(1.08); }
        }

        .page-container {
          position: relative;
          z-index: 10;
          display: flex;
          width: 100%;
          max-width: 1100px;
          min-height: 600px;
          margin: 2rem;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* LEFT PANEL */
        .left-panel {
          flex: 1;
          background: linear-gradient(135deg, #0f0c24 0%, #1a0e3a 50%, #0d1a3a 100%);
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60') center/cover no-repeat;
          opacity: 0.07;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #7c3aed, #3b82f6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 20px rgba(124,58,237,0.5);
        }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #c4b5fd, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .left-content {
          position: relative;
        }
        .left-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #7c3aed;
          font-weight: 500;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .left-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px; height: 1px;
          background: #7c3aed;
        }
        .left-heading {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.15;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .left-heading span {
          background: linear-gradient(90deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .left-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          max-width: 320px;
        }

        .stats-row {
          display: flex;
          gap: 2rem;
          position: relative;
        }
        .stat-item {}
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
        }
        .stat-num span {
          background: linear-gradient(90deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }

        /* RIGHT PANEL */
        .right-panel {
          width: 460px;
          background: rgba(12, 10, 22, 0.97);
          backdrop-filter: blur(30px);
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.06);
        }

        .form-eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7c3aed;
          font-weight: 500;
          margin-bottom: 0.6rem;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }
        .form-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2.5rem;
        }

        .field-group {
          margin-bottom: 1.25rem;
          position: relative;
        }
        .field-label {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.5rem;
          font-weight: 500;
          transition: color 0.3s;
        }
        .field-label.active { color: #a78bfa; }

        .field-input-wrap {
          position: relative;
        }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 0.85rem 1.1rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }
        .field-input:focus {
          border-color: rgba(124,58,237,0.6);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
        }
        .field-input.has-icon { padding-right: 3rem; }

        .field-icon-btn {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          transition: color 0.2s;
          padding: 0;
        }
        .field-icon-btn:hover { color: rgba(255,255,255,0.7); }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          margin-top: -0.25rem;
        }
        .remember-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .remember-box {
          width: 16px; height: 16px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          background: rgba(255,255,255,0.04);
          appearance: none;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }
        .remember-box:checked {
          background: #7c3aed;
          border-color: #7c3aed;
        }
        .remember-box:checked::after {
          content: '✓';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 10px;
        }
        .remember-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
        }
        .forgot-link {
          font-size: 0.8rem;
          color: #a78bfa;
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: #c4b5fd; }

        .submit-btn {
          width: 100%;
          padding: 0.95rem;
          background: linear-gradient(135deg, #7c3aed, #3b82f6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 20px rgba(124,58,237,0.4);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(124,58,237,0.55);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          pointer-events: none;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider-text {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .register-link {
          text-align: center;
          font-size: 0.83rem;
          color: rgba(255,255,255,0.3);
          margin-top: 1.5rem;
        }
        .register-link a {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .register-link a:hover { color: #c4b5fd; }

        @media (max-width: 800px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; }
          .page-container { max-width: 480px; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-field {
          animation: fadeSlideUp 0.5s ease both;
        }
        .animate-field:nth-child(1) { animation-delay: 0.1s; }
        .animate-field:nth-child(2) { animation-delay: 0.18s; }
        .animate-field:nth-child(3) { animation-delay: 0.26s; }
        .animate-field:nth-child(4) { animation-delay: 0.34s; }
        .animate-field:nth-child(5) { animation-delay: 0.42s; }
        .animate-field:nth-child(6) { animation-delay: 0.50s; }
      `}</style>

      <div className="erp-root">
        <canvas ref={canvasRef} className="bg-canvas" />
        <div className="bg-gradient-orb orb-1" />
        <div className="bg-gradient-orb orb-2" />
        <div className="bg-gradient-orb orb-3" />

        <div className="page-container">
          {/* LEFT */}
          <div className="left-panel">
            <div className="brand-logo">
              <div className="logo-icon">⬡</div>
              <span className="brand-name">BizERP</span>
            </div>
            <div className="left-content">
              <div className="left-eyebrow">Enterprise Resource Planning</div>
              <h1 className="left-heading">
                Manage your<br />business with<br /><span>precision.</span>
              </h1>
              <p className="left-desc">
                One unified platform for HR, finance, inventory, CRM, and operations — built for teams that move fast.
              </p>
            </div>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-num"><span>12k+</span></div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><span>99.9%</span></div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><span>16</span></div>
                <div className="stat-label">Modules</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <div className="animate-field">
              <div className="form-eyebrow">Secure Access</div>
              <h2 className="form-title">Welcome back</h2>
              <p className="form-subtitle">Sign in to your workspace</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group animate-field">
                <label className={`field-label ${focusedField === 'email' ? 'active' : ''}`}>
                  Email Address
                </label>
                <div className="field-input-wrap">
                  <input
                    type="email"
                    className="field-input"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              <div className="field-group animate-field">
                <label className={`field-label ${focusedField === 'password' ? 'active' : ''}`}>
                  Password
                </label>
                <div className="field-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="field-input has-icon"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <button
                    type="button"
                    className="field-icon-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options animate-field">
                <label className="remember-wrap">
                  <input type="checkbox" className="remember-box" />
                  <span className="remember-label">Remember me</span>
                </label>
                <Link to="#" className="forgot-link">Forgot password?</Link>
              </div>

              <div className="animate-field">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  <span className="btn-inner">
                    {isLoading && <span className="spinner" />}
                    {isLoading ? 'Signing in…' : 'Sign In'}
                  </span>
                </button>
              </div>
            </form>

            <div className="register-link animate-field">
              Don't have an account?{' '}
              <Link to="/register">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;