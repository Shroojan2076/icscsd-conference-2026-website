  import React from 'react';
import { Link } from 'react-router-dom';
import { VitLogo, BractLogo, IeeeLogo } from './LogoSvg';
import {
  ChevronUp,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ShieldCheck,
  FileText,
  Calendar,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Partner & Institutional Logo Bar */}
        <div className="footer-partners-bar">
          <span className="footer-partners-bar__title">
            Organizing Institute & Technical Co-Sponsors
          </span>
          <div className="footer-partners-bar__logos">
            <div className="footer-partners-bar__item footer-partners-bar__item--light">
              <BractLogo style={{ height: '34px', width: 'auto', maxHeight: '34px' }} />
            </div>
            <div className="footer-partners-bar__item footer-partners-bar__item--dark">
              <VitLogo style={{ height: '34px', width: 'auto', maxHeight: '34px' }} />
            </div>
            <div className="footer-partners-bar__item footer-partners-bar__item--light">
              <IeeeLogo style={{ height: '34px', width: 'auto', maxHeight: '34px' }} />
            </div>
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Conference Overview */}
          <div className="footer-col">
            <h3>ICSCSD 2026 Overview</h3>
            <p>
              The <strong>International Conference on Smart Computing for Sustainable Development (ICSCSD-2026)</strong> is a premier international forum organized by BRACT's Vishwakarma Institute of Technology, Pune in technical co-sponsorship with IEEE Pune Section.
            </p>
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '10px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-emerald-50)'
              }}
            >
              <div>IEEE Conference Record: <strong>#67723</strong></div>
              <div>IEEE Xplore ISBN: <strong>979-8-3315-8953-0</strong></div>
              <div>Mode: <strong>Hybrid (In-Person & Online)</strong></div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/call-for-papers" className="footer-link">
                › Call for Papers & Tracks
              </Link>
              <Link to="/call-for-tutorials" className="footer-link">
                › Call for Tutorials (Nov 25)
              </Link>
              <Link to="/call-for-special-sessions" className="footer-link">
                › Call for Special Sessions
              </Link>
              <Link to="/camera-ready-submission" className="footer-link">
                › Camera-Ready Submission (.zip)
              </Link>
              <Link to="/registration" className="footer-link">
                › Registration & Fee Schedule
              </Link>
              <Link to="/accommodation" className="footer-link">
                › Accommodation & Pune Travel
              </Link>
              <Link to="/contact" className="footer-link">
                › Secretariat & Contact
              </Link>
              <Link to="/admin" className="footer-link" style={{ color: 'var(--color-accent-gold)' }}>
                › Admin Portal (CMS)
              </Link>
            </div>
          </div>

          {/* Column 3: Host Institute & Secretariat */}
          <div className="footer-col">
            <h3>Host Institute & Secretariat</h3>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: 'var(--color-accent-gold)', flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong>BRACT's Vishwakarma Institute of Technology (VIT)</strong><br />
                666, Upper Indiranagar, Bibwewadi,<br />
                Pune, Maharashtra – 411037, India
              </span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={16} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} />
              <a href="mailto:viticscsd@gmail.com" style={{ color: 'var(--color-border-strong)' }}>
                viticscsd@gmail.com
              </a>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <ExternalLink size={16} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} />
              <a href="https://www.vit.edu" target="_blank" rel="noreferrer" style={{ color: 'var(--color-border-strong)' }}>
                www.vit.edu
              </a>
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Acknowledge: The Microsoft CMT service was used for managing the peer-reviewing process for this conference, provided for free by Microsoft.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="footer-bottom">
        <div className="container footer-bottom__container">
          <div>
            © 2026 ICSCSD. All Rights Reserved · Vishwakarma Institute of Technology, Pune & IEEE Pune Section.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/registration#policies" style={{ color: 'var(--color-text-muted)' }}>
              IEEE Policies
            </Link>
            <Link to="/registration#terms" style={{ color: 'var(--color-text-muted)' }}>
              Terms & Declaration
            </Link>
            <Link to="/contact" style={{ color: 'var(--color-text-muted)' }}>
              Secretariat Support
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        type="button"
        className="scroll-top-btn"
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <ChevronUp size={20} />
      </button>
    </footer>
  );
};
