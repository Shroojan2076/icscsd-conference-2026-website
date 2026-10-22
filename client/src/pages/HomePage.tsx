import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Send,
  FileText,
  ChevronRight,
  ExternalLink,
  Award,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Users,
  Compass,
  Building,
  GraduationCap
} from 'lucide-react';
import { useBootstrap } from '../api/client';
import { VitLogo, BractLogo, IeeeLogo } from '../components/LogoSvg';

export const HomePage: React.FC = () => {
  const { data } = useBootstrap();
  const config = data.config;
  const tracks = data.tracks;
  const dates = data.dates;
  const hotels = data.hotels || [];
  const attractions = data.attractions || [];

  // Live 4-box countdown to 25 Nov 2026 09:00:00 IST
  const targetTime = new Date('2026-11-25T09:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // Patrons preview list
  const chiefPatrons = [
    {
      name: 'Shri. Rajkumarji Agarwal',
      role: 'Chief Patron',
      designation: "Chairman, BRACT's Vishwakarma Institute of Technology, Pune"
    },
    {
      name: 'Shri. Bharat Agarwal',
      role: 'Patron',
      designation: "Managing Trustee, BRACT's Vishwakarma Institute of Technology, Pune"
    },
    {
      name: 'Dr. Bipin Sule',
      role: 'Patron',
      designation: 'CEO, Vishwakarma Institutes & University'
    },
    {
      name: 'Dr. Rajesh Jalnekar',
      role: 'General Chair',
      designation: 'Director, Vishwakarma Institute of Technology, Pune'
    },
    {
      name: 'Dr. Vivek Deshpande',
      role: 'General Chair',
      designation: 'Director, Vishwakarma Institute of Information Technology, Pune'
    }
  ];

  return (
    <div>
      {/* 1. Hero Section with Live Countdown (ICBDS Style) */}
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__record-badge">
            <Award size={14} style={{ color: 'var(--color-accent-gold)' }} />
            <span>IEEE Conference Record #67723 · ISBN: 979-8-3315-8953-0</span>
          </div>

          <h1 className="hero__headline">
            International Conference on Smart Computing for Sustainable Development
            <br />
            <span style={{ color: '#93c5fd', fontSize: '0.9em' }}>(ICSCSD-2026)</span>
          </h1>

          <div className="hero__metadata-pills">
            <span className="hero__pill">
              <Calendar size={14} />
              <span>November 25–27, 2026</span>
            </span>
            <span className="hero__pill">
              <MapPin size={14} />
              <span>VIT, Pune, India</span>
            </span>
            <span className="hero__pill">
              <Compass size={14} />
              <span>Hybrid Mode (In-Person & Online)</span>
            </span>
          </div>

          {/* 4-Box Live Countdown Widget */}
          <div className="countdown-grid">
            <div className="countdown-box">
              <span className="countdown-box__value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-box__label">Days</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-box__value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-box__label">Hours</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-box__value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-box__label">Minutes</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-box__value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-box__label">Seconds</span>
            </div>
          </div>

          <div className="hero__actions">
            <a
              href="https://cmt3.research.microsoft.com/ICSCSD2026"
              target="_blank"
              rel="noreferrer"
              className="btn btn--gold"
            >
              <Send size={15} />
              <span>Submit Paper on Microsoft CMT</span>
              <ExternalLink size={13} />
            </a>

            <Link to="/registration" className="btn btn--primary">
              <FileText size={15} />
              <span>Register Now</span>
              <ChevronRight size={15} />
            </Link>

            <Link to="/call-for-papers" className="btn btn--outline">
              <span>Call for Papers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 4-Column Key Highlights Stat Strip */}
      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-card__number">2026</div>
            <div className="stat-card__label">Flagship Edition of ICSCSD</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__number">09</div>
            <div className="stat-card__label">Cutting-Edge Research Tracks</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__number">Hybrid</div>
            <div className="stat-card__label">Nov 25–27, 2026 (Tutorials: Nov 25)</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__number">IEEE Xplore</div>
            <div className="stat-card__label">Record #67723 · ISBN 979-8-3315-8953-0</div>
          </div>
        </div>
      </section>

      {/* 3. Organisers & Technical Partners Strip */}
      <section className="partners-strip">
        <div className="container partners-grid">
          <div className="partner-item">
            <BractLogo className="h-9 w-auto" />
            <div style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
              <strong>BRACT Trust</strong><br />
              <span style={{ color: 'var(--color-text-muted)' }}>Est. 1975</span>
            </div>
          </div>
          <div className="partner-item">
            <VitLogo className="h-12 w-auto" />
            <div style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
              <strong>Vishwakarma Institute of Technology</strong><br />
              <span style={{ color: 'var(--color-emerald-600)', fontWeight: 600 }}>NAAC 'A++' Accredited</span>
            </div>
          </div>
          <div className="partner-item">
            <IeeeLogo className="h-10 w-auto" />
            <div style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
              <strong>IEEE Pune Section</strong><br />
              <span style={{ color: 'var(--color-text-muted)' }}>Technical Co-Sponsor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About the Conference & About VIT Pune Split Section */}
      <section id="about-conference" className="section section--alt">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-10)', alignItems: 'stretch' }}>
            {/* About Conference */}
            <div className="card" style={{ borderTop: '4px solid var(--color-ieee-blue)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="badge badge--primary">Conference Scope & Vision</span>
              </div>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-navy-950)', marginBottom: '16px' }}>
                About ICSCSD 2026
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
                {config.aboutConference.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* 4 Feature Pills */}
              <div className="feature-pill-grid">
                <div className="feature-pill">
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald-600)', flexShrink: 0 }} />
                  <span>Keynotes by Eminent Experts</span>
                </div>
                <div className="feature-pill">
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald-600)', flexShrink: 0 }} />
                  <span>Peer-Reviewed Paper Sessions</span>
                </div>
                <div className="feature-pill">
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald-600)', flexShrink: 0 }} />
                  <span>Tutorials & Special Sessions</span>
                </div>
                <div className="feature-pill">
                  <CheckCircle2 size={18} style={{ color: 'var(--color-emerald-600)', flexShrink: 0 }} />
                  <span>IEEE Xplore Indexing</span>
                </div>
              </div>
            </div>

            {/* About Host Institute (VIT Pune) */}
            <div className="card" style={{ borderTop: '4px solid var(--color-accent-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="badge badge--warning">Host Institution</span>
              </div>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-navy-950)', marginBottom: '16px' }}>
                About VIT Pune
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
                {config.aboutInstitute.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="badge badge--success">Est. 1983</span>
                <span className="badge badge--warning">BRACT Trust (1975)</span>
                <span className="badge badge--primary">SPPU Affiliated</span>
                <span className="badge badge--success">NAAC 'A++' Grade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Numbered Track Cards (Track 01 through Track 09) */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="badge badge--primary">Scope of Submissions</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)' }}>
              Conference Research Tracks
            </h2>
            <p>
              ICSCSD 2026 invites prospective authors to submit original, high-quality, and unpublished research manuscripts across 9 core tracks.
            </p>
          </div>

          <div className="grid-3">
            {tracks.map(t => (
              <div key={t.id} className="track-card">
                <div>
                  <div className="track-card__header">
                    <span className="track-card__number">
                      {String(t.trackNumber).padStart(2, '0')}
                    </span>
                    <div className="track-card__icon-wrapper">
                      <Cpu size={22} />
                    </div>
                  </div>

                  <h3 className="track-card__title">
                    {t.title}
                  </h3>

                  <div className="track-card__topics">
                    {t.topics.map((tp, idx) => (
                      <div key={idx} className="track-card__topic-item">
                        <span className="track-card__topic-bullet">›</span>
                        <span>{tp.topicText}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)', marginTop: '8px' }}>
                  <Link
                    to={`/call-for-papers?track=${t.trackNumber}`}
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--color-ieee-blue)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>View Track Guidelines</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/call-for-papers" className="btn btn--primary">
              <span>View Detailed Author Guidelines & Paper Templates</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Important Dates Timeline (ICBDS Style) */}
      <section id="important-dates" className="section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="badge badge--warning">Deadlines & Schedule</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)' }}>
              Important Dates
            </h2>
            <p>
              Please note these critical milestones for submission, peer-review notification, registration, and conference sessions.
            </p>
          </div>

          <div className="timeline-grid">
            {dates.map((d, index) => {
              const isActive = d.label.toLowerCase().includes('submission') || d.label.toLowerCase().includes('camera');
              const isExtended = d.label.toLowerCase().includes('hard');

              return (
                <div key={d.id || index} className="timeline-card">
                  <div>
                    <div className="timeline-card__header">
                      <span
                        className={`timeline-card__badge ${
                          isExtended
                            ? 'timeline-card__badge--extended'
                            : isActive
                            ? 'timeline-card__badge--active'
                            : 'timeline-card__badge--closed'
                        }`}
                      >
                        {isExtended ? 'Hard Deadline' : isActive ? 'Active Milestone' : 'Scheduled'}
                      </span>
                      <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
                    </div>

                    <div className="timeline-card__label" style={{ marginTop: '8px' }}>
                      {d.label}
                    </div>
                  </div>

                  <div>
                    <div className="timeline-card__date">
                      {d.dateText}
                    </div>
                    {d.note && (
                      <div className="timeline-card__note">
                        {d.note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Microsoft CMT Submission Callout Banner with Mandatory Acknowledgment */}
          <div
            style={{
              marginTop: 'var(--space-10)',
              backgroundColor: 'var(--color-navy-900)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <span className="badge badge--warning" style={{ marginBottom: '8px', display: 'inline-block' }}>
                  Peer Review Platform
                </span>
                <h3 style={{ fontSize: 'var(--text-xl)', color: '#ffffff', marginBottom: '4px' }}>
                  Share Your Research at ICSCSD-2026
                </h3>
                <p style={{ color: 'var(--color-border-subtle)', fontSize: 'var(--text-sm)', maxWidth: '650px' }}>
                  Submit your original, unpublished manuscripts through the official Microsoft CMT portal: <strong>cmt3.research.microsoft.com/ICSCSD2026</strong>.
                </p>
              </div>

              <a
                href={config.cmtSubmissionUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--gold"
                style={{ flexShrink: 0 }}
              >
                <Send size={15} />
                <span>Submit Manuscript on CMT</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Mandatory Microsoft CMT Acknowledgment */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '12px',
                fontSize: '0.75rem',
                color: 'var(--color-border-strong)',
                lineHeight: '1.6'
              }}
            >
              <strong>Microsoft CMT Acknowledgment:</strong> The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
            </div>
          </div>
        </div>
      </section>

      {/* 7. Chief Patrons & Leadership Preview Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="badge badge--primary">Institutional Leadership</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)' }}>
              Chief Patrons & Conference Chairs
            </h2>
            <p>
              Under the visionary patronage and academic leadership of BRACT, VIT Pune, and VIIT Pune.
            </p>
          </div>

          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {chiefPatrons.map((p, idx) => (
              <div key={idx} className="patron-card">
                <div className="patron-card__avatar">
                  {p.name.split(' ').map(n => n[0]).filter(c => c && c.match(/[A-Z]/)).slice(0, 2).join('')}
                </div>
                <div className="patron-card__role">
                  {p.role}
                </div>
                <h4 className="patron-card__name">
                  {p.name}
                </h4>
                <div className="patron-card__affiliation">
                  {p.designation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/committee" className="btn btn--outline" style={{ color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' }}>
              <Users size={16} />
              <span>View Full 62-Member Committee & Advisory Board</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Accommodation & Pune Attractions Preview Grid */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="badge badge--warning">Host City & Hospitality</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)' }}>
              Plan Your Visit to Pune
            </h2>
            <p>
              Explore recommended hotel partners near VIT Pune (Bibwewadi campus) and iconic cultural landmarks across the historic Oxford of the East.
            </p>
          </div>

          {/* Hotels Preview */}
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={20} style={{ color: 'var(--color-ieee-blue)' }} />
              <span>Recommended Hotels Near VIT Pune</span>
            </h3>

            <div className="grid-3">
              {hotels.slice(0, 3).map((h, idx) => (
                <div key={h.id || idx} className="hotel-card">
                  <img src={h.imageUrl} alt={h.name} className="hotel-card__image" />
                  <div className="hotel-card__content">
                    <div>
                      <span className="hotel-card__distance">
                        <MapPin size={12} />
                        <span>VIT Campus ~{h.distanceFromVitKm} km</span>
                      </span>
                      <h4 className="hotel-card__title">{h.name}</h4>
                      <p className="hotel-card__location">{h.locationArea}</p>
                    </div>

                    <a
                      href={h.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: 'var(--color-ieee-blue)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions Preview */}
          <div>
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={20} style={{ color: 'var(--color-accent-gold)' }} />
              <span>Places to Visit in Pune</span>
            </h3>

            <div className="grid-3">
              {attractions.slice(0, 3).map((att, idx) => (
                <div key={att.id || idx} className="attraction-card">
                  <img src={att.imageUrl} alt={att.title} className="attraction-card__image" />
                  <div className="attraction-card__content">
                    <span className="hotel-card__distance" style={{ marginBottom: '6px' }}>
                      <MapPin size={12} />
                      <span>VIT Campus ~{att.distanceFromVitKm} km</span>
                    </span>
                    <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', fontWeight: 700, marginBottom: '6px' }}>
                      {att.title}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '8px' }}>
                      {att.description}
                    </p>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: 'auto' }}>
                      Photo: {att.photoCredit} ({att.licenseType})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/accommodation" className="btn btn--primary">
              <span>View Full Accommodation & Travel Guide</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
