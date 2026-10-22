import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Shield, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Call For Papers', path: '/call-for-papers' },
    { label: 'Call for Tutorials', path: '/call-for-tutorials' },
    { label: 'Call for Special Sessions', path: '/call-for-special-sessions' },
    { label: 'Committee', path: '/committee' },
    { label: 'Registration', path: '/registration' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0F2942] text-white shadow-lg border-b border-slate-700/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo / Title brand for mobile */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-base sm:text-lg tracking-tight hover:opacity-95 transition">
              <span className="bg-[#00629B] text-white px-2 py-0.5 rounded font-mono text-sm font-bold border border-blue-400/40">
                ICSCSD
              </span>
              <span className="text-emerald-400 font-bold">2026</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-xs xl:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00629B] text-white shadow-sm ring-1 ring-blue-300/30'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Action CTAs: CMT Direct Submission & Admin Portal */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://cmt3.research.microsoft.com/ICSCSD2026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-md shadow-sm transition transform hover:-translate-y-0.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit on CMT</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <Link
              to="/admin"
              title="Admin CMS Dashboard"
              className={`p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition border border-transparent ${
                location.pathname.startsWith('/admin') ? 'bg-white/20 text-white border-slate-500' : ''
              }`}
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="https://cmt3.research.microsoft.com/ICSCSD2026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2 py-1 rounded"
            >
              <span>CMT</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 rounded-md text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1C2E] border-t border-slate-700 px-4 pt-3 pb-5 space-y-1 shadow-2xl animate-fadeIn">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-sm font-semibold transition ${
                location.pathname === item.path
                  ? 'bg-[#00629B] text-white font-bold'
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <a
              href="https://cmt3.research.microsoft.com/ICSCSD2026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit on Microsoft CMT</span>
            </a>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-xs font-semibold px-3 py-2 rounded border border-slate-700"
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
