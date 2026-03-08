import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (field === 'password') calcStrength(e.target.value);
  };

  const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    setStrength(s);
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength];
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#6366f1'][strength];

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(60,180,255,${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required'); return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters'); return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email'); return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        '/api/auth/signup',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { token, message } = response.data;
      localStorage.setItem('token', token);
      toast.success(message || 'Account created!');
      setTimeout(() => navigate('/dashboard'), 1000);
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          background: #060d14;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .bg-canvas { position: fixed; inset: 0; z-index: 0; }

        .bg-orb {
          position: fixed; border-radius: 50%; filter: blur(100px); z-index: 0; pointer-events: none;
        }
        .orb-a { width: 450px; height: 450px; background: radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%); top: -80px; right: -80px; animation: fa 14s ease-in-out infinite alternate; }
        .orb-b { width: 350px; height: 350px; background: radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%); bottom: -60px; left: -60px; animation: fb 12s ease-in-out infinite alternate; }
        .orb-c { width: 280px; height: 280px; background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%); top: 50%; left: 30%; animation: fa 18s ease-in-out infinite alternate-reverse; }
        @keyframes fa { from { transform: translate(0,0); } to { transform: translate(50px,40px); } }
        @keyframes fb { from { transform: translate(0,0); } to { transform: translate(-40px,-30px); } }

        .page-container {
          position: relative; z-index: 10;
          display: flex; width: 100%; max-width: 1100px; min-height: 640px;
          margin: 2rem; border-radius: 28px; overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* LEFT */
        .left-panel {
          flex: 1;
          background: linear-gradient(140deg, #061421 0%, #0a1f35 50%, #071422 100%);
          padding: 3.5rem;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .left-panel::before {
          content: '';
          position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60') center/cover no-repeat;
          opacity: 0.06;
        }

        .brand-logo { display: flex; align-items: center; gap: 12px; position: relative; }
        .logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 20px rgba(14,165,233,0.45);
        }
        .brand-name {
          font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700;
          background: linear-gradient(90deg, #7dd3fc, #a5f3fc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .left-content { position: relative; }
        .left-eyebrow {
          font-size: 0.68rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: #0ea5e9; font-weight: 500; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .left-eyebrow::before { content: ''; display: inline-block; width: 24px; height: 1px; background: #0ea5e9; }
        .left-heading {
          font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 700;
          line-height: 1.15; color: #fff; margin-bottom: 1.5rem;
        }
        .left-heading span {
          background: linear-gradient(90deg, #7dd3fc, #67e8f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .left-desc { font-size: 0.9rem; color: rgba(255,255,255,0.4); line-height: 1.8; max-width: 300px; }

        .feature-list { display: flex; flex-direction: column; gap: 1rem; position: relative; }
        .feature-item { display: flex; align-items: center; gap: 12px; }
        .feature-dot {
          width: 28px; height: 28px;
          background: rgba(14,165,233,0.12);
          border: 1px solid rgba(14,165,233,0.25);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }
        .feature-text { font-size: 0.82rem; color: rgba(255,255,255,0.45); }

        /* RIGHT */
        .right-panel {
          width: 460px;
          background: rgba(8, 14, 22, 0.97);
          backdrop-filter: blur(30px);
          padding: 3rem 3.5rem;
          display: flex; flex-direction: column; justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.05);
          overflow-y: auto;
        }

        .form-eyebrow { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0ea5e9; font-weight: 500; margin-bottom: 0.5rem; }
        .form-title { font-family: 'Playfair Display', serif; font-size: 1.9rem; color: #fff; font-weight: 600; margin-bottom: 0.35rem; }
        .form-subtitle { font-size: 0.83rem; color: rgba(255,255,255,0.3); margin-bottom: 2rem; }

        .field-group { margin-bottom: 1.1rem; position: relative; }
        .field-label {
          display: block; font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin-bottom: 0.45rem; font-weight: 500; transition: color 0.3s;
        }
        .field-label.active { color: #38bdf8; }
        .field-input-wrap { position: relative; }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.15); }
        .field-input:focus {
          border-color: rgba(14,165,233,0.5);
          background: rgba(14,165,233,0.04);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.08);
        }
        .field-input.has-icon { padding-right: 3rem; }

        .field-icon-btn {
          position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.25);
          display: flex; align-items: center; transition: color 0.2s; padding: 0;
        }
        .field-icon-btn:hover { color: rgba(255,255,255,0.6); }

        .strength-bar-wrap { display: flex; gap: 4px; margin-top: 8px; align-items: center; }
        .strength-seg {
          height: 3px; flex: 1; border-radius: 4px;
          background: rgba(255,255,255,0.08);
          transition: background 0.3s;
        }
        .strength-text { font-size: 0.68rem; color: rgba(255,255,255,0.35); margin-left: 8px; white-space: nowrap; transition: color 0.3s; }

        .submit-btn {
          width: 100%; padding: 0.9rem;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border: none; border-radius: 12px;
          color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          letter-spacing: 0.04em; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 20px rgba(14,165,233,0.35);
          margin-top: 1.25rem;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(14,165,233,0.5); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .submit-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent); pointer-events: none; }

        .btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .login-link { text-align: center; font-size: 0.82rem; color: rgba(255,255,255,0.3); margin-top: 1.5rem; }
        .login-link a { color: #38bdf8; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .login-link a:hover { color: #7dd3fc; }

        @media (max-width: 800px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; }
          .page-container { max-width: 480px; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim { animation: fadeSlideUp 0.5s ease both; }
        .anim:nth-child(1) { animation-delay: 0.08s; }
        .anim:nth-child(2) { animation-delay: 0.15s; }
        .anim:nth-child(3) { animation-delay: 0.22s; }
        .anim:nth-child(4) { animation-delay: 0.29s; }
        .anim:nth-child(5) { animation-delay: 0.36s; }
        .anim:nth-child(6) { animation-delay: 0.43s; }
        .anim:nth-child(7) { animation-delay: 0.50s; }
        .anim:nth-child(8) { animation-delay: 0.57s; }
      `}</style>

      <div className="erp-root">
        <canvas ref={canvasRef} className="bg-canvas" />
        <div className="bg-orb orb-a" />
        <div className="bg-orb orb-b" />
        <div className="bg-orb orb-c" />

        <div className="page-container">
          {/* LEFT */}
          <div className="left-panel">
            <div className="brand-logo">
              <div className="logo-icon">⬡</div>
              <span className="brand-name">BizERP</span>
            </div>
            <div className="left-content">
              <div className="left-eyebrow">Get Started Today</div>
              <h1 className="left-heading">
                Your entire<br />business,<br /><span>unified.</span>
              </h1>
              <p className="left-desc">
                Join thousands of businesses running smarter operations with BizERP.
              </p>
            </div>
            <div className="feature-list">
              {[
                ['⚡', 'Setup in under 5 minutes'],
                ['🔐', 'Enterprise-grade security'],
                ['📊', 'Real-time analytics & reports'],
                ['🤝', 'Multi-role team access'],
              ].map(([icon, text]) => (
                <div className="feature-item" key={text}>
                  <div className="feature-dot">{icon}</div>
                  <span className="feature-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <div className="anim">
              <div className="form-eyebrow">New Account</div>
              <h2 className="form-title">Create account</h2>
              <p className="form-subtitle">Start your 14-day free trial</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group anim">
                <label className={`field-label ${focusedField === 'name' ? 'active' : ''}`}>Full Name</label>
                <div className="field-input-wrap">
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={update('name')}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              <div className="field-group anim">
                <label className={`field-label ${focusedField === 'email' ? 'active' : ''}`}>Work Email</label>
                <div className="field-input-wrap">
                  <input
                    type="email"
                    className="field-input"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={update('email')}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              <div className="field-group anim">
                <label className={`field-label ${focusedField === 'password' ? 'active' : ''}`}>Password</label>
                <div className="field-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="field-input has-icon"
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={update('password')}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <button type="button" className="field-icon-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? (
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
                {form.password && (
                  <div className="strength-bar-wrap">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="strength-seg" style={{ background: i <= strength ? strengthColor : undefined }} />
                    ))}
                    <span className="strength-text" style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
              </div>

              <div className="field-group anim">
                <label className={`field-label ${focusedField === 'confirm' ? 'active' : ''}`}>Confirm Password</label>
                <div className="field-input-wrap">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className="field-input has-icon"
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <button type="button" className="field-icon-btn" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                    {showConfirm ? (
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="anim">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  <span className="btn-inner">
                    {isLoading && <span className="spinner" />}
                    {isLoading ? 'Creating account…' : 'Create Account'}
                  </span>
                </button>
              </div>
            </form>

            <div className="login-link anim">
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;