import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaMoneyBillWave, FaUsers, FaTruck, FaClipboardList, FaChartLine, FaWarehouse,
} from 'react-icons/fa';
import { BsColumnsGap } from 'react-icons/bs';
import { IoHomeSharp } from 'react-icons/io5';
import { FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const navItems = [
  { to: '/',          label: 'Home',         icon: IoHomeSharp,      accent: '#6366f1' },
  { to: '/dashboard', label: 'Overview',     icon: BsColumnsGap,     accent: '#6366f1' },
  { to: '/finance',   label: 'Finance',      icon: FaMoneyBillWave,  accent: '#f59e0b' },
  { to: '/hr',        label: 'HR',           icon: FaUsers,          accent: '#8b5cf6' },
  { to: '/scm',       label: 'Supply Chain', icon: FaTruck,          accent: '#06b6d4' },
  { to: '/crm',       label: 'CRM',          icon: FaClipboardList,  accent: '#3b82f6' },
  { to: '/sales',     label: 'Sales',        icon: FaChartLine,      accent: '#10b981' },
  { to: '/inventory', label: 'Inventory',    icon: FaWarehouse,      accent: '#ef4444' },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: ${collapsed ? '72px' : '240px'};
          background: #09080f;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 200;
          overflow: hidden;
        }

        .sidebar-logo {
          height: 64px;
          display: flex; align-items: center;
          padding: 0 ${collapsed ? '0' : '1.25rem'};
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
          gap: 10px;
          text-decoration: none;
        }
        .sidebar-logo-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 14px rgba(99,102,241,0.4);
        }
        .sidebar-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 700;
          background: linear-gradient(90deg, #c4b5fd, #93c5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s;
        }

        .sidebar-nav {
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding: 0.75rem 0;
          scrollbar-width: none;
        }
        .sidebar-nav::-webkit-scrollbar { display: none; }

        .sidebar-section-label {
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.2); font-family: 'DM Sans', sans-serif;
          padding: ${collapsed ? '0.75rem 0' : '0.75rem 1.25rem'};
          text-align: ${collapsed ? 'center' : 'left'};
          white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.15s;
          pointer-events: none;
        }

        .sidebar-item {
          display: flex; align-items: center;
          margin: 2px 0.5rem;
          padding: ${collapsed ? '0.7rem 0' : '0.65rem 0.85rem'};
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          gap: 10px;
          border-radius: 10px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.83rem; font-weight: 400;
          color: rgba(255,255,255,0.4);
          position: relative;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
        }
        .sidebar-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.85); }
        .sidebar-item.active {
          background: rgba(99,102,241,0.15);
          color: #fff;
        }
        .sidebar-item.active::before {
          content: '';
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 3px; border-radius: 0 3px 3px 0;
          background: var(--item-accent, #6366f1);
        }
        .sidebar-item-icon {
          width: 18px; height: 18px; flex-shrink: 0;
          color: inherit; display: flex; align-items: center; justify-content: center;
        }
        .sidebar-item-label {
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.15s;
          pointer-events: none;
        }

        .sidebar-tooltip {
          position: absolute; left: calc(100% + 12px); top: 50%; transform: translateY(-50%);
          background: #1a1826; border: 1px solid rgba(255,255,255,0.1);
          color: #fff; font-size: 0.78rem; font-family: 'DM Sans', sans-serif;
          padding: 0.3rem 0.7rem; border-radius: 6px;
          white-space: nowrap; pointer-events: none;
          opacity: 0; transition: opacity 0.15s;
          z-index: 300;
        }
        ${collapsed ? '.sidebar-item:hover .sidebar-tooltip { opacity: 1; }' : ''}

        .sidebar-bottom {
          padding: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }
        .logout-btn {
          display: flex; align-items: center; justify-content: ${collapsed ? 'center' : 'flex-start'};
          gap: 10px;
          width: 100%; padding: ${collapsed ? '0.7rem 0' : '0.65rem 0.85rem'};
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.15);
          border-radius: 10px;
          color: #f87171; font-family: 'DM Sans', sans-serif; font-size: 0.83rem;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          white-space: nowrap; overflow: hidden;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.3); }
        .logout-label {
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.15s;
        }

        .collapse-btn {
          position: absolute; top: 50%; right: -12px; transform: translateY(-50%);
          width: 24px; height: 24px;
          background: #1a1826; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.4);
          transition: color 0.2s, border-color 0.2s;
          z-index: 201;
        }
        .collapse-btn:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
      `}</style>

      <div className="sidebar">
        <Link to="/" className="sidebar-logo">
          <span className="sidebar-logo-icon">⬡</span>
          <span className="sidebar-logo-text">BizERP</span>
        </Link>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                style={{ '--item-accent': item.accent }}
              >
                <span className="sidebar-item-icon">
                  <item.icon size={16} />
                </span>
                <span className="sidebar-item-label">{item.label}</span>
                {collapsed && <span className="sidebar-tooltip">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={16} style={{ flexShrink: 0 }} />
            <span className="logout-label">Logout</span>
          </button>
        </div>

        <button className="collapse-btn" onClick={onToggle}>
          {collapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={12} />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;