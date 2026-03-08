import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, LineElement, PointElement, Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { FiTrendingUp, FiTrendingDown, FiArrowUpRight } from 'react-icons/fi';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  LineElement, PointElement, Filler
);

const kpis = [
  { label: 'Total Revenue',   value: '₹1,02,400', change: '+12.5%', up: true,  sub: 'vs last month',  color: '#6366f1' },
  { label: 'Total Expenses',  value: '₹48,200',   change: '-3.2%',  up: false, sub: 'vs last month',  color: '#f59e0b' },
  { label: 'Net Profit',      value: '₹54,200',   change: '+18.7%', up: true,  sub: 'vs last month',  color: '#10b981' },
  { label: 'Total Users',     value: '1,284',      change: '+5.1%',  up: true,  sub: 'active accounts',color: '#3b82f6' },
  { label: 'Active Projects', value: '17',         change: '+2',     up: true,  sub: 'this quarter',   color: '#8b5cf6' },
  { label: 'Pending Orders',  value: '34',         change: '+7',     up: false, sub: 'need attention', color: '#ef4444' },
];

const modules = [
  { to: '/crm',       title: 'CRM',          desc: 'Customer relationships & pipelines.', icon: '🤝', accent: '#3b82f6' },
  { to: '/sales',     title: 'Sales',        desc: 'Transactions, quotes & revenue.',      icon: '📈', accent: '#10b981' },
  { to: '/finance',   title: 'Finance',      desc: 'P&L, invoicing & reporting.',          icon: '💰', accent: '#f59e0b' },
  { to: '/hr',        title: 'HR & Payroll', desc: 'Staff, attendance & payroll.',          icon: '👥', accent: '#8b5cf6' },
  { to: '/inventory', title: 'Inventory',    desc: 'Stock levels & procurement.',           icon: '📦', accent: '#ef4444' },
  { to: '/scm',       title: 'Supply Chain', desc: 'Vendors, logistics & delivery.',        icon: '🚚', accent: '#06b6d4' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const barData = {
  labels: months,
  datasets: [
    {
      label: 'Revenue',
      data: [65, 78, 90, 81, 96, 85, 102, 110],
      backgroundColor: 'rgba(99,102,241,0.7)',
      borderColor: '#6366f1',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: 'Expenses',
      data: [40, 45, 55, 48, 60, 50, 58, 52],
      backgroundColor: 'rgba(245,158,11,0.5)',
      borderColor: '#f59e0b',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const lineData = {
  labels: months,
  datasets: [
    {
      label: 'Net Profit',
      data: [25, 33, 35, 33, 36, 35, 44, 58],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.08)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#10b981',
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOpts = (title) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: 'rgba(255,255,255,0.4)', font: { family: 'DM Sans', size: 11 }, boxWidth: 10, padding: 16 },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: '#1a1826',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      titleColor: 'rgba(255,255,255,0.8)',
      bodyColor: 'rgba(255,255,255,0.5)',
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: 'rgba(255,255,255,0.3)', font: { family: 'DM Sans', size: 11 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: 'rgba(255,255,255,0.3)', font: { family: 'DM Sans', size: 11 } },
    },
  },
});

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const Overview = () => {
  const [activeChart, setActiveChart] = useState('bar');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .overview { font-family: 'DM Sans', sans-serif; }

        .ov-section-title {
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 1rem;
        }

        /* KPI CARDS */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem; margin-bottom: 2rem;
        }
        .kpi-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 1.25rem;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
          cursor: default;
        }
        .kpi-card:hover { border-color: var(--kpi-color, rgba(99,102,241,0.35)); transform: translateY(-2px); }
        .kpi-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background: var(--kpi-color, #6366f1); opacity: 0.6;
        }
        .kpi-label { font-size: 0.72rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.6rem; }
        .kpi-value { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem; }
        .kpi-change {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.72rem; padding: 2px 7px; border-radius: 4px;
        }
        .kpi-change.up { background: rgba(16,185,129,0.12); color: #34d399; }
        .kpi-change.down { background: rgba(239,68,68,0.12); color: #f87171; }
        .kpi-sub { font-size: 0.7rem; color: rgba(255,255,255,0.2); margin-top: 0.35rem; }

        /* CHARTS */
        .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        @media (max-width: 900px) { .charts-row { grid-template-columns: 1fr; } }

        .chart-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.5rem;
        }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .chart-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600; color: rgba(255,255,255,0.85); }
        .chart-tabs { display: flex; gap: 4px; }
        .chart-tab {
          font-size: 0.72rem; padding: 4px 10px; border-radius: 6px;
          background: none; border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.3); cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, color 0.15s;
        }
        .chart-tab.active { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.35); color: #a5b4fc; }

        /* MODULES GRID */
        .mod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem; margin-bottom: 0.5rem;
        }
        .mod-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 1.25rem;
          text-decoration: none; display: block;
          position: relative; overflow: hidden;
          transition: transform 0.25s, border-color 0.25s;
        }
        .mod-card::before {
          content:''; position:absolute; inset:0; opacity:0; transition:opacity 0.25s;
          background: radial-gradient(circle at 20% 20%, var(--mod-accent), transparent 65%);
        }
        .mod-card:hover { transform: translateY(-3px); border-color: var(--mod-border); }
        .mod-card:hover::before { opacity: 1; }
        .mod-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--mod-icon-bg); border: 1px solid var(--mod-icon-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 0.9rem;
        }
        .mod-title { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 0.3rem; }
        .mod-desc { font-size: 0.78rem; color: rgba(255,255,255,0.35); line-height: 1.6; margin-bottom: 0.9rem; }
        .mod-link { font-size: 0.72rem; color: rgba(255,255,255,0.25); display: flex; align-items: center; gap: 4px; transition: color 0.2s; }
        .mod-card:hover .mod-link { color: rgba(255,255,255,0.7); }

        /* RECENT ACTIVITY */
        .activity-list { display: flex; flex-direction: column; gap: 0; }
        .activity-item {
          display: flex; align-items: center; gap: 12px;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .activity-item:last-child { border-bottom: none; }
        .activity-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .activity-text { font-size: 0.82rem; color: rgba(255,255,255,0.55); flex: 1; }
        .activity-text strong { color: rgba(255,255,255,0.8); font-weight: 500; }
        .activity-time { font-size: 0.7rem; color: rgba(255,255,255,0.2); white-space: nowrap; }
      `}</style>

      <div className="overview">

        {/* KPIs */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <div className="ov-section-title">Key Metrics</div>
          <div className="kpi-grid">
            {kpis.map((k) => (
              <motion.div
                key={k.label}
                className="kpi-card"
                style={{ '--kpi-color': k.color }}
                variants={fadeUp}
              >
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-value">{k.value}</div>
                <span className={`kpi-change ${k.up ? 'up' : 'down'}`}>
                  {k.up ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />}
                  {k.change}
                </span>
                <div className="kpi-sub">{k.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CHARTS */}
        <motion.div
          className="charts-row"
          variants={stagger} initial="hidden" animate="visible"
        >
          <motion.div className="chart-card" variants={fadeUp}>
            <div className="chart-header">
              <span className="chart-title">Financial Overview</span>
              <div className="chart-tabs">
                <button className={`chart-tab ${activeChart === 'bar' ? 'active' : ''}`} onClick={() => setActiveChart('bar')}>Bar</button>
                <button className={`chart-tab ${activeChart === 'line' ? 'active' : ''}`} onClick={() => setActiveChart('line')}>Trend</button>
              </div>
            </div>
            <div style={{ height: '240px' }}>
              {activeChart === 'bar'
                ? <Bar data={barData} options={chartOpts('Revenue & Expenses')} />
                : <Line data={lineData} options={chartOpts('Net Profit')} />
              }
            </div>
          </motion.div>

          <motion.div className="chart-card" variants={fadeUp}>
            <div className="chart-header">
              <span className="chart-title">Recent Activity</span>
            </div>
            <div className="activity-list">
              {[
                { color: '#6366f1', text: <><strong>Order #1042</strong> received from Acme Corp</>, time: '2m ago' },
                { color: '#f59e0b', text: <><strong>Invoice INV-088</strong> marked paid</>, time: '18m ago' },
                { color: '#ef4444', text: <><strong>Low stock alert:</strong> SKU-004 (3 left)</>, time: '45m ago' },
                { color: '#10b981', text: <><strong>Payroll</strong> processed for March</>, time: '1h ago' },
                { color: '#3b82f6', text: <><strong>New CRM lead</strong> assigned to you</>, time: '3h ago' },
                { color: '#8b5cf6', text: <><strong>Neyaz</strong> joined as manager</>, time: '5h ago' },
              ].map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ background: a.color }} />
                  <span className="activity-text">{a.text}</span>
                  <span className="activity-time">{a.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* MODULES */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <div className="ov-section-title">Quick Access — Modules</div>
          <div className="mod-grid">
            {modules.map((m) => (
              <motion.div key={m.title} variants={fadeUp}>
                <Link
                  to={m.to}
                  className="mod-card"
                  style={{
                    '--mod-accent': m.accent + '1a',
                    '--mod-border': m.accent + '44',
                    '--mod-icon-bg': m.accent + '18',
                    '--mod-icon-border': m.accent + '30',
                  }}
                >
                  <div className="mod-icon">{m.icon}</div>
                  <div className="mod-title">{m.title}</div>
                  <div className="mod-desc">{m.desc}</div>
                  <div className="mod-link">Open module <FiArrowUpRight size={11} /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </>
  );
};

export default Overview;