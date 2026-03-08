import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './common/Sidebar';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Overview from './common/Overview';

const SIDEBAR_FULL = 240;
const SIDEBAR_MINI = 72;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_MINI : SIDEBAR_FULL;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .dash-root {
          min-height: 100vh;
          background: #09080f;
          color: #f0eeff;
          font-family: 'DM Sans', sans-serif;
          display: flex; flex-direction: column;
        }

        .dash-body {
          display: flex; flex: 1; flex-direction: column;
          margin-left: ${sidebarWidth}px;
          margin-top: 64px;
          transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
          min-height: calc(100vh - 64px);
        }

        .dash-main {
          flex: 1;
          padding: 2rem 2.5rem;
        }
        @media (max-width: 768px) {
          .dash-main { padding: 1.25rem; }
        }

        .dash-page-header {
          margin-bottom: 2rem;
        }
        .dash-page-eyebrow {
          font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #6366f1; margin-bottom: 0.4rem;
          display: flex; align-items: center; gap: 8px;
        }
        .dash-page-eyebrow::before {
          content:''; display:inline-block; width:16px; height:1px; background:#6366f1;
        }
        .dash-page-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700;
          color: #fff; margin-bottom: 0.3rem;
        }
        .dash-page-sub {
          font-size: 0.83rem; color: rgba(255,255,255,0.3);
        }

        .dash-content-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 2rem;
        }
      `}</style>

      <div className="dash-root">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <Navbar sidebarWidth={sidebarWidth} />

        <div className="dash-body">
          <main className="dash-main">
            <motion.div
              className="dash-page-header"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dash-page-eyebrow">Welcome back, Neyaz</div>
              <h1 className="dash-page-title">Dashboard Overview</h1>
              <p className="dash-page-sub">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>

            <motion.div
              className="dash-content-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Overview />
            </motion.div>
          </main>

          <Footer sidebarWidth={0} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;