import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

interface StickyNavbarProps {
  onOpenQuickRegister?: () => void;
}

export const StickyNavbar: React.FC<StickyNavbarProps> = ({ onOpenQuickRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container navbar__container">
          <Link to="/" className="navbar__brand">
            ICSCSD 2026
          </Link>

          {/* Desktop Nav Items with Pure CSS Hover Dropdowns */}
          <div className="navbar__nav">
            {/* Home */}
            <div className="navbar__item">
              <Link
                to="/"
                className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
              >
                Home
              </Link>
            </div>

            {/* About ▾ */}
            <div className="navbar__item">
              <Link
                to="/about"
                className={`navbar__link ${isActive('/about') ? 'navbar__link--active' : ''}`}
              >
                About <ChevronDown size={14} />
              </Link>
              <div className="navbar__dropdown">
                <Link to="/about#bract" className="navbar__dropdown-link">
                  About BRACT (1975)
                </Link>
                <Link to="/about#vit-pune" className="navbar__dropdown-link">
                  About VIT Pune (1983)
                </Link>
                <Link to="/about#ieee-pune" className="navbar__dropdown-link">
                  About IEEE Pune Section
                </Link>
              </div>
            </div>

            {/* Conference ▾ */}
            <div className="navbar__item">
              <span className={`navbar__link ${isActive('/call-for-papers') || isActive('/tracks') || isActive('/publication') ? 'navbar__link--active' : ''}`} style={{ cursor: 'pointer' }}>
                Conference <ChevronDown size={14} />
              </span>
              <div className="navbar__dropdown">
                <Link to="/#about-conference" className="navbar__dropdown-link">
                  About Conference
                </Link>
                <Link to="/call-for-papers" className="navbar__dropdown-link">
                  Call for Papers
                </Link>
                <Link to="/tracks" className="navbar__dropdown-link">
                  Research Tracks (9 Tracks)
                </Link>
                <Link to="/#important-dates" className="navbar__dropdown-link">
                  Important Dates
                </Link>
                <Link to="/publication" className="navbar__dropdown-link">
                  Publication & Indexing
                </Link>
              </div>
            </div>

            {/* Committee ▾ */}
            <div className="navbar__item">
              <Link
                to="/committee"
                className={`navbar__link ${isActive('/committee') || isActive('/advisory-board') ? 'navbar__link--active' : ''}`}
              >
                Committee <ChevronDown size={14} />
              </Link>
              <div className="navbar__dropdown">
                <Link to="/committee" className="navbar__dropdown-link">
                  Organizing Committee & Patrons
                </Link>
                <Link to="/advisory-board" className="navbar__dropdown-link">
                  Advisory Committee
                </Link>
                <Link to="/committee#tpc" className="navbar__dropdown-link">
                  Technical Program Committee (TPC)
                </Link>
              </div>
            </div>

            {/* Authors ▾ */}
            <div className="navbar__item">
              <span className={`navbar__link ${isActive('/author') || isActive('/author-guidelines') || isActive('/camera-ready-submission') ? 'navbar__link--active' : ''}`} style={{ cursor: 'pointer' }}>
                Authors <ChevronDown size={14} />
              </span>
              <div className="navbar__dropdown">
                <Link to="/author-guidelines" className="navbar__dropdown-link">
                  Author Guidelines
                </Link>
                <Link to="/camera-ready-submission" className="navbar__dropdown-link">
                  Camera-Ready Submission
                </Link>
                <Link to="/author" className="navbar__dropdown-link">
                  Author Portal & Lookup
                </Link>
              </div>
            </div>

            {/* Registration */}
            <div className="navbar__item">
              <Link
                to="/registration"
                className={`navbar__link ${isActive('/registration') ? 'navbar__link--active' : ''}`}
              >
                Registration
              </Link>
            </div>

            {/* Accommodation & Travel */}
            <div className="navbar__item">
              <Link
                to="/accommodation"
                className={`navbar__link ${isActive('/accommodation') ? 'navbar__link--active' : ''}`}
              >
                Accommodation & Travel
              </Link>
            </div>

            {/* Contact */}
            <div className="navbar__item">
              <Link
                to="/contact"
                className={`navbar__link ${isActive('/contact') ? 'navbar__link--active' : ''}`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Action: Register CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              to="/registration"
              className="navbar__cta-btn"
              onClick={onOpenQuickRegister}
            >
              <span>Register</span>
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="navbar__hamburger"
              aria-label="Toggle Mobile Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'mobile-drawer-backdrop--open' : ''}`}
        onClick={closeMobile}
      />

      {/* Mobile Slide-Over Drawer */}
      <aside
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer--open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer__header">
          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>ICSCSD 2026 Menu</span>
          <button
            type="button"
            onClick={closeMobile}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          <Link to="/" className="mobile-drawer__link" onClick={closeMobile}>
            Home
          </Link>

          <span className="mobile-drawer__subheading">About Institute & Society</span>
          <Link to="/about" className="mobile-drawer__link" onClick={closeMobile}>
            Overview & Heritage
          </Link>
          <Link to="/about#bract" className="mobile-drawer__link" onClick={closeMobile}>
            About BRACT (1975)
          </Link>
          <Link to="/about#vit-pune" className="mobile-drawer__link" onClick={closeMobile}>
            About VIT Pune (1983)
          </Link>
          <Link to="/about#ieee-pune" className="mobile-drawer__link" onClick={closeMobile}>
            About IEEE Pune Section
          </Link>

          <span className="mobile-drawer__subheading">Conference & Research</span>
          <Link to="/call-for-papers" className="mobile-drawer__link" onClick={closeMobile}>
            Call for Papers
          </Link>
          <Link to="/tracks" className="mobile-drawer__link" onClick={closeMobile}>
            9 Research Tracks
          </Link>
          <Link to="/publication" className="mobile-drawer__link" onClick={closeMobile}>
            Publication & Indexing (IEEE Xplore)
          </Link>

          <span className="mobile-drawer__subheading">Leadership & Governance</span>
          <Link to="/committee" className="mobile-drawer__link" onClick={closeMobile}>
            Organizing Committee & Patrons
          </Link>
          <Link to="/advisory-board" className="mobile-drawer__link" onClick={closeMobile}>
            Advisory Committee
          </Link>

          <span className="mobile-drawer__subheading">Authors & Registration</span>
          <Link to="/author-guidelines" className="mobile-drawer__link" onClick={closeMobile}>
            Author Guidelines
          </Link>
          <Link to="/camera-ready-submission" className="mobile-drawer__link" onClick={closeMobile}>
            Camera-Ready Submission (.zip Validator)
          </Link>
          <Link to="/author" className="mobile-drawer__link" onClick={closeMobile}>
            Author Portal (Lookup & Visa Letter)
          </Link>
          <Link to="/registration" className="mobile-drawer__link" onClick={closeMobile}>
            Registration & Fee Matrix
          </Link>
          <Link to="/accommodation" className="mobile-drawer__link" onClick={closeMobile}>
            Accommodation & Travel (Pune)
          </Link>
          <Link to="/contact" className="mobile-drawer__link" onClick={closeMobile}>
            Contact Us & Secretariat
          </Link>
          <Link to="/admin" className="mobile-drawer__link" onClick={closeMobile} style={{ color: 'var(--color-accent-gold)' }}>
            Admin Console (TPC & Finance)
          </Link>
        </nav>
      </aside>
    </>
  );
};
