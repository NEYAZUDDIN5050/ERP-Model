import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiSearch, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Navbar = ({ sidebarWidth = 240 }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const notifications = [
    { id: 1, text: 'New order #1042 received', time: '2m ago', unread: true },
    { id: 2, text: 'Inventory low: SKU-004', time: '18m ago', unread: true },
    { id: 3, text: 'Payroll processed for March', time: '1h ago', unread: false },
    { id: 4, text: 'New CRM lead assigned to you', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .topnav {
          position: fixed; top: 0; right: 0; z-index: 100;
          left: ${sidebarWidth}px;
          height: 64px;
          background: rgba(9,8,15,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.75rem;
          gap: 1rem;
          transition: left 0.3s cubic-bezier(0.4,0,0.2,1);
          font-family: 'DM Sans', sans-serif;
        }

        .topnav-left {
          display: flex; align-items: center; gap: 1rem; flex: 1;
        }

        .breadcrumb {
          font-size: 0.78rem; color: rgba(255,255,255,0.3);
          display: flex; align-items: center; gap: 6px;
        }
        .breadcrumb span { color: rgba(255,255,255,0.7); }

        .search-wrap {
          position: relative;
        }
        .search-toggle {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 0.45rem 1rem;
          cursor: pointer; color: rgba(255,255,255,0.3);
          font-size: 0.82rem; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, background 0.2s;
          min-width: 200px;
        }
        .search-toggle:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }
        .search-input-wrap {
          position: absolute; top: calc(100% + 8px); left: 0;
          width: 320px;
          background: #13111f; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 0.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          animation: dropIn 0.15s ease;
        }
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .search-input {
          width: 100%; background: none; border: none; outline: none;
          color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          padding: 0.5rem 0.75rem;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.2); }

        .topnav-right {
          display: flex; align-items: center; gap: 0.5rem;
        }

        .icon-btn {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.45);
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          position: relative;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.14); }

        .notif-badge {
          position: absolute; top: 5px; right: 5px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #ef4444;
          border: 1.5px solid #09080f;
        }
        .notif-count {
          position: absolute; top: 4px; right: 4px;
          min-width: 16px; height: 16px; border-radius: 8px;
          background: #ef4444; color: #fff;
          font-size: 0.55rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          padding: 0 3px; border: 1.5px solid #09080f;
        }

        /* NOTIF DROPDOWN */
        .notif-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          width: 300px;
          background: #13111f; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          box-shadow: 0 24px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          animation: dropIn 0.15s ease;
          z-index: 400;
        }
        .notif-header {
          padding: 0.9rem 1.1rem 0.6rem;
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .notif-title { font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.7); letter-spacing: 0.05em; text-transform: uppercase; }
        .notif-clear { font-size: 0.72rem; color: #6366f1; cursor: pointer; }
        .notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 0.75rem 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
          cursor: pointer;
        }
        .notif-item:hover { background: rgba(255,255,255,0.03); }
        .notif-item:last-child { border-bottom: none; }
        .notif-dot {
          width: 7px; height: 7px; border-radius: 50%;
          margin-top: 5px; flex-shrink: 0;
        }
        .notif-dot.unread { background: #6366f1; }
        .notif-dot.read { background: rgba(255,255,255,0.15); }
        .notif-text { font-size: 0.8rem; color: rgba(255,255,255,0.65); line-height: 1.5; }
        .notif-time { font-size: 0.7rem; color: rgba(255,255,255,0.25); margin-top: 2px; }

        /* USER DROPDOWN */
        .user-btn {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 0.35rem 0.75rem 0.35rem 0.45rem;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
        }
        .user-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.14); }
        .user-avatar {
          width: 28px; height: 28px; border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600; color: #fff;
          flex-shrink: 0;
        }
        .user-name { font-size: 0.82rem; color: rgba(255,255,255,0.7); font-weight: 400; }
        .user-chevron { color: rgba(255,255,255,0.3); transition: transform 0.2s; }
        .user-chevron.open { transform: rotate(180deg); }

        .user-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          width: 200px;
          background: #13111f; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          box-shadow: 0 24px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          animation: dropIn 0.15s ease;
          z-index: 400;
        }
        .user-menu-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0.7rem 1rem;
          color: rgba(255,255,255,0.55); font-size: 0.83rem;
          cursor: pointer; transition: background 0.15s, color 0.15s;
          border: none; background: none; width: 100%; text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .user-menu-item:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.9); }
        .user-menu-item.danger { color: #f87171; }
        .user-menu-item.danger:hover { background: rgba(239,68,68,0.08); }
        .user-menu-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 0.25rem 0; }
      `}</style>

      <header className="topnav">
        <div className="topnav-left">
          <div className="breadcrumb">
            BizERP / <span>Dashboard</span>
          </div>
          <div className="search-wrap" ref={searchRef}>
            <div className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
              <FiSearch size={14} />
              Search anything…
            </div>
            {searchOpen && (
              <div className="search-input-wrap">
                <input
                  autoFocus
                  className="search-input"
                  placeholder="Search modules, reports, users…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="topnav-right">
          {/* Notifications */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button className="icon-btn" onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}>
              <FiBell size={16} />
              {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
            </button>
            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  <span className="notif-title">Notifications</span>
                  <span className="notif-clear">Mark all read</span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className="notif-item">
                    <div className={`notif-dot ${n.unread ? 'unread' : 'read'}`} />
                    <div>
                      <div className="notif-text">{n.text}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User menu */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div className="user-btn" onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}>
              <div className="user-avatar">N</div>
              <span className="user-name">Neyaz</span>
              <FiChevronDown size={13} className={`user-chevron ${dropdownOpen ? 'open' : ''}`} />
            </div>
            {dropdownOpen && (
              <div className="user-dropdown">
                <button className="user-menu-item" onClick={() => navigate('/profile')}>
                  <FiUser size={14} /> Profile
                </button>
                <button className="user-menu-item" onClick={() => navigate('/settings')}>
                  <FiSettings size={14} /> Settings
                </button>
                <div className="user-menu-divider" />
                <button className="user-menu-item danger" onClick={handleLogout}>
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;