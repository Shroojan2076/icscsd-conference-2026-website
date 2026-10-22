import React from 'react';
import { Building, Award, ShieldCheck, ExternalLink, Globe, BookOpen, CheckCircle } from 'lucide-react';
import { VitLogo, BractLogo, IeeeLogo } from '../components/LogoSvg';

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
            <BractLogo className="h-12 w-auto" />
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
              Bansilal Ramnath Agarwal Charitable Trust (BRACT) was established on 16th June 1975 under the visionary foresight of the Agarwal industrial family. Dedicated to social upliftment, cultural preservation, and academic excellence, BRACT was founded with the mission to build world-class educational institutions in Maharashtra.
            </p>
            <p>
              Over five decades, BRACT has nurtured a diverse ecosystem of institutes spanning engineering, information technology, management, and research, collectively known across India as the <strong>Vishwakarma Institutes & University</strong>. BRACT’s educational institutions are recognized nationwide for academic rigor, state-of-the-art research laboratories, global industry collaborations, and an unwavering commitment to ethics and societal development.
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
            <VitLogo className="h-16 w-auto" />
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
              Vishwakarma Institute of Technology (VIT), Pune, is a premier autonomous engineering institute established in the year 1983 under BRACT. The Institute is permanently affiliated to <strong>Savitribai Phule Pune University (SPPU)</strong>, recognized by the All India Council for Technical Education (AICTE), New Delhi, and accredited by the National Assessment and Accreditation Council (NAAC) with the prestigious <strong>'A++' Grade</strong>.
            </p>
            <p>
              VIT Pune runs 12 undergraduate, postgraduate, and doctoral degree programs across engineering disciplines, with all eligible undergraduate programs accredited by the <strong>National Board of Accreditation (NBA)</strong>. The institute boasts a sprawling 17.5-acre campus in Bibwewadi, Pune, equipped with high-performance computing clusters, IoT and robotics maker-spaces, artificial intelligence labs, and advanced renewable energy research testbeds.
            </p>
            <p>
              The institute has consistently ranked among the top private engineering institutions in India in the National Institutional Ranking Framework (NIRF). VIT Pune has developed robust international research partnerships with leading global universities across the United States, Europe, Australia, and Asia.
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
            <IeeeLogo className="h-14 w-auto" />
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
              The <strong>Institute of Electrical and Electronics Engineers (IEEE)</strong> is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity. The <strong>IEEE Pune Section</strong>, established in June 2010 (under IEEE Bombay Section initially, now an independent section), serves professionals, researchers, and students across Pune, Ahmednagar, Satara, Solapur, Sangli, and Kolhapur regions of Maharashtra.
            </p>
            <p>
              IEEE Pune Section actively promotes state-of-the-art technological advancements by co-sponsoring flagship conferences, symposia, research workshops, humanitarian activities, and industry conclaves. ICSCSD 2026 is technically co-sponsored by IEEE Pune Section under IEEE Conference Record <strong>#67723</strong>, ensuring peer-reviewed conference proceedings will be submitted for inclusion into IEEE Xplore subject to meeting IEEE scope and quality requirements.
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
