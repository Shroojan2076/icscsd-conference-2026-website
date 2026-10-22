import React from 'react';
import { BookOpen, ShieldCheck, Award, FileText, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicationPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="badge badge--primary">IEEE Conference Proceedings</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Publication & Indexing in IEEE Xplore
          </h1>
          <p>
            Important information on IEEE technical co-sponsorship, indexing standards, e-Copyright transfer, and presentation ethics.
          </p>
        </div>

        {/* Publication Summary Card */}
        <div className="policy-card" style={{ borderLeft: '4px solid var(--color-ieee-blue)', marginBottom: 'var(--space-8)' }}>
          <div className="policy-card__header">
            <Award size={24} style={{ color: 'var(--color-ieee-blue)' }} />
            <h2 className="policy-card__title">
              IEEE Xplore Digital Library Inclusion
            </h2>
          </div>
          <div className="policy-card__body">
            <p style={{ marginBottom: '12px' }}>
              All accepted, registered, and presented papers at <strong>ICSCSD 2026</strong> will be submitted for inclusion into <strong>IEEE Xplore</strong> Digital Library (IEEE Conference Record <strong>#67723</strong>, ISBN: <strong>979-8-3315-8953-0</strong>), subject to meeting IEEE scope and quality standards.
            </p>
            <p style={{ marginBottom: '12px' }}>
              IEEE reserves the right to exclude a paper from distribution after the conference, including IEEE Xplore Digital Library, if the paper is not presented by an author at the conference (the IEEE No-Show Policy).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px', backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>IEEE Record</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-navy-950)', fontFamily: 'var(--font-mono)' }}>#67723</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>ISBN</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-navy-950)', fontFamily: 'var(--font-mono)' }}>979-8-3315-8953-0</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Technical Co-Sponsor</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-ieee-blue)' }}>IEEE Pune Section</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Publication Compliance */}
        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="policy-card">
            <div className="policy-card__header">
              <CheckCircle size={20} style={{ color: 'var(--color-emerald-600)' }} />
              <h3 className="policy-card__title">1. Peer-Review Standard</h3>
            </div>
            <p className="policy-card__body">
              Every submission undergoes double-blind peer review by at least two domain experts. Papers must exhibit novel methodology, sound empirical evaluation, and clear societal or sustainable relevance.
            </p>
          </div>

          <div className="policy-card">
            <div className="policy-card__header">
              <FileText size={20} style={{ color: 'var(--color-ieee-blue)' }} />
              <h3 className="policy-card__title">2. IEEE e-Copyright (ECF)</h3>
            </div>
            <p className="policy-card__body">
              The IEEE electronic Copyright Form (eCF) must be transferred by the corresponding author inside Microsoft CMT once the camera-ready manuscript has been approved. Papers without a signed eCF cannot be published.
            </p>
          </div>

          <div className="policy-card">
            <div className="policy-card__header">
              <AlertTriangle size={20} style={{ color: 'var(--color-crimson-600)' }} />
              <h3 className="policy-card__title">3. Mandatory Live Presentation</h3>
            </div>
            <p className="policy-card__body">
              At least one author must register and present the paper during their allocated session (in-person or online). No-show papers will be permanently excluded from IEEE Xplore without refund.
            </p>
          </div>

          <div className="policy-card">
            <div className="policy-card__header">
              <ShieldCheck size={20} style={{ color: 'var(--color-accent-gold)' }} />
              <h3 className="policy-card__title">4. Strict Plagiarism Threshold</h3>
            </div>
            <p className="policy-card__body">
              All manuscripts are screened using IEEE CrossCheck / Turnitin. Any submission with an overall similarity index exceeding 10% or containing uncredited verbatim text will be summarily rejected.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/author-guidelines" className="btn btn--primary">
            <span>Review Author Guidelines & Formatting</span>
          </Link>
          <Link to="/camera-ready-submission" className="btn btn--outline" style={{ color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' }}>
            <span>Camera-Ready Submission Guide</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
