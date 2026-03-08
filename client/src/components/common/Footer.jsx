import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = ({ sidebarWidth = 240 }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .dash-footer {
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: #09080f;
          padding: 1.25rem 2rem;
          margin-left: ${sidebarWidth}px;
          transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copy {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.2);
        }

        .footer-links {
          display: flex; gap: 1.25rem; align-items: center;
        }
        .footer-links a {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: rgba(255,255,255,0.6); }

        .footer-socials {
          display: flex; gap: 0.5rem; align-items: center;
        }
        .footer-social-btn {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .footer-social-btn:hover {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.14);
        }
      `}</style>

      <footer className="dash-footer">
        <span className="footer-copy">
          © {new Date().getFullYear()} BizERP. All rights reserved.
        </span>

        <div className="footer-links">
          {[
            ['Home', '/'],
            ['Finance', '/finance'],
            ['Support', '/support'],
            ['Privacy', '/privacy'],
          ].map(([label, to]) => (
            <Link key={label} to={to}>{label}</Link>
          ))}
        </div>

        <div className="footer-socials">
          {[
            { href: 'https://twitter.com',  icon: <FaTwitter size={12} />,  label: 'Twitter'  },
            { href: 'https://linkedin.com', icon: <FaLinkedin size={12} />, label: 'LinkedIn' },
            { href: 'https://github.com',   icon: <FaGithub size={12} />,   label: 'GitHub'   },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="footer-social-btn" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;