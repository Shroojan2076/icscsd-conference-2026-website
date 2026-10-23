import React from 'react';
import { Building, Award, ShieldCheck, ExternalLink, Globe, BookOpen, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="badge badge--primary">Institutional Legacy</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            About the Host Institutions & Co-Sponsors
          </h1>
          <p>
            Learn about Bansilal Ramnath Agarwal Charitable Trust (BRACT), Vishwakarma Institute of Technology (VIT) Pune, and the IEEE Pune Section.
          </p>
        </div>

        {/* Section 1: About BRACT Trust */}
        <section id="bract" className="policy-card" style={{ marginBottom: 'var(--space-8)', borderLeft: '4px solid var(--color-accent-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <img
              className="about-institution__logo"
              src="/images/bract-building.webp"
              alt="Building on the BRACT campus"
              loading="lazy"
            />
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)' }}>
                Bansilal Ramnath Agarwal Charitable Trust (BRACT)
              </h2>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                Established in 1975 · Pioneer in Higher Technical Education
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
            <p>
              <b>Bansilal Ramnath Agarwal Charitable Trust (BRACT)</b> was established on 16th June 1975 by the Agarwal industrial family, with a vision to promote social upliftment, cultural preservation, and academic excellence through world-class educational institutions in Maharashtra.

            </p>
            <p>
             Over five decades, BRACT has developed a diverse network of institutes spanning engineering, technology, management, and research, collectively known as the <b>Vishwakarma Institutes & University</b>. Its institutions are recognized for academic excellence, advanced research facilities, global industry collaborations, and commitment to ethics and societal development.

            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span className="badge badge--warning">50+ Years of Educational Excellence</span>
            <span className="badge badge--primary">Autonomous Institutions</span>
            <span className="badge badge--success">Visionary Philanthropic Leadership</span>
          </div>
        </section>

        {/* Section 2: About VIT Pune */}
        <section id="vit-pune" className="policy-card" style={{ marginBottom: 'var(--space-8)', borderLeft: '4px solid var(--color-ieee-blue)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <img
              className="about-institution__logo"
              src="/images/vit-logo.png"
              alt="Vishwakarma Institute of Technology logo"
              loading="lazy"
            />
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)' }}>
                Vishwakarma Institute of Technology (VIT), Pune
              </h2>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ieee-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
                Established 1983 · NAAC 'A++' Accredited · Autonomous Institute Affiliated to SPPU
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
            <p>
              <strong>Vishwakarma Institute of Technology (VIT), Pune</strong>, established
  in 1983 under BRACT, is a premier autonomous engineering institute
  permanently affiliated with <strong>Savitribai Phule Pune University (SPPU)</strong>,
  recognized by <strong>AICTE</strong>, and accredited with
  <strong>NAAC 'A++' Grade</strong>.
            </p>
            <p>
              Offering 12 undergraduate, postgraduate, and doctoral programs, VIT Pune
  features NBA-accredited eligible undergraduate programs and a 17.5-acre
  campus equipped with advanced research laboratories, AI facilities, and
  IoT and robotics infrastructure.
            </p>
            <p>
              Consistently ranked among India's leading private engineering institutions
  under <strong>NIRF</strong>, VIT Pune also maintains international research
  collaborations with universities worldwide.
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span className="badge badge--success">NAAC 'A++' Grade</span>
            <span className="badge badge--primary">NBA Accredited Programs</span>
            <span className="badge badge--warning">NIRF Ranked Engineering Institute</span>
            <span className="badge badge--info">Permanent SPPU Affiliation</span>
          </div>

          <div style={{ marginTop: '16px' }}>
            <a
              href="https://www.vit.edu"
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline"
              style={{ color: 'var(--color-ieee-blue)', borderColor: 'var(--color-ieee-blue)' }}
            >
              <span>Visit VIT Pune Official Website</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Section 3: About IEEE Pune Section */}
        <section id="ieee-pune" className="policy-card" style={{ borderLeft: '4px solid var(--color-emerald-600)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <img
              className="about-institution__logo"
              src="/images/ieee-logo.jpg"
              alt="IEEE logo"
              loading="lazy"
            />
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)' }}>
                IEEE Pune Section (Technical Co-Sponsor)
              </h2>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-emerald-600)', fontWeight: 700, textTransform: 'uppercase' }}>
                Region 10 (Asia-Pacific) · IEEE Technical Co-Sponsorship
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
            <p>
               The <strong>Institute of Electrical and Electronics Engineers (IEEE)</strong>
  is the world's largest technical professional organization dedicated to
  advancing technology for humanity. Established in June 2010, the
  <strong>IEEE Pune Section</strong> supports professionals, researchers, and
  students across Pune and surrounding regions of Maharashtra.
            </p>
            <p>
              Through conferences, research workshops, technical events, and industry
  collaborations, IEEE Pune Section promotes technological advancement.
  <strong>ICSCSD 2026</strong> is technically co-sponsored by the section under
  IEEE Conference Record <strong>#67723</strong>, with peer-reviewed proceedings
  to be submitted for inclusion in IEEE Xplore, subject to IEEE's scope and
  quality requirements.
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span className="badge badge--primary">IEEE Conference Record #67723</span>
            <span className="badge badge--warning">ISBN: 979-8-3315-8953-0</span>
            <span className="badge badge--success">IEEE Region 10 Network</span>
          </div>

          <div style={{ marginTop: '16px' }}>
            <a
              href="https://ieeepunesection.org"
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline"
              style={{ color: 'var(--color-emerald-600)', borderColor: 'var(--color-emerald-600)' }}
            >
              <span>Visit IEEE Pune Section Official Portal</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
