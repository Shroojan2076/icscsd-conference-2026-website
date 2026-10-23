import React from 'react';
import { BookOpen, ShieldCheck, Award, FileText, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicationPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Publication & Indexing in IEEE Xplore
          </h1>
        <br></br>
         <p style={{ fontWeight: 700 }}>
  Important information on IEEE technical co-sponsorship, indexing standards,
  e-Copyright transfer, and presentation ethics.
</p>

        </div>

{/* Publication Summary Card */}
<div className="policy-card publication-summary">
  <div className="policy-card__header">
    <h2 className="policy-card__title">
      IEEE Xplore Digital Library Inclusion
    </h2>
  </div>

  <div className="policy-card__body">
    <p>
      All accepted, registered, and presented papers at <strong>ICSCSD 2026</strong>
      will be submitted for consideration for inclusion in the
      <strong> IEEE Xplore Digital Library</strong> (IEEE Conference Record
      <strong> #67723</strong>, ISBN: <strong>979-8-3315-8953-0</strong>),
      subject to IEEE's scope and quality requirements.
    </p>

    <p>
      Papers must be presented at the conference. Under IEEE's no-show policy,
      papers that are not presented may be excluded from publication.
    </p>
  </div>

  <div className="publication-summary__details">
    <div className="publication-summary__item">
      <span>IEEE Conference Record</span>
      <strong>#67723</strong>
    </div>

    <div className="publication-summary__item">
      <span>ISBN</span>
      <strong>979-8-3315-8953-0</strong>
    </div>

    <div className="publication-summary__item">
      <span>Technical Co-Sponsor</span>
      <strong className="publication-summary__sponsor">
        IEEE Pune Section
      </strong>
    </div>
  </div>
</div>

<br></br>
       

{/* Paper Submission and Publication Guidelines */}
<div
  className="grid-2 publication-guidelines"
  style={{
    gap: 'var(--space-6)',
    marginBottom: 'var(--space-8)',
  }}
>
  <div className="policy-card publication-guidelines__card">
    <div className="policy-card__header">
      <h3 className="policy-card__title">1. Original Research</h3>
    </div>
    <p className="policy-card__body">
      Authors are invited to submit original, unpublished research related
      to the conference tracks and other relevant topics. Submissions must
      not be under consideration at another conference, journal, or
      publication venue.
    </p>
  </div>

  <div className="policy-card publication-guidelines__card">
    <div className="policy-card__header">
      <h3 className="policy-card__title">2. Paper Formatting</h3>
    </div>
    <p className="policy-card__body">
      Manuscripts must follow the IEEE conference paper format and the
      conference's page limits. Include an abstract of no more than
      400 words, up to six keywords, and clearly identify the corresponding
      author.
    </p>
    <a
      href="https://www.ieee.org/conferences/publishing/templates.html"
      target="_blank"
      rel="noopener noreferrer"
      className="publication-guidelines__link"
    >
      IEEE Paper Templates ↗
    </a>
  </div>

  <div className="policy-card publication-guidelines__card">
    <div className="policy-card__header">
      <h3 className="policy-card__title">3. Review and Selection</h3>
    </div>
    <p className="policy-card__body">
      Submitted papers undergo peer review and are evaluated on originality,
      novelty, relevance, technical quality, clarity, and contribution to
      the field. Authors should ensure their work is clearly written and
      properly presented.
    </p>
  </div>

  <div className="policy-card publication-guidelines__card">
    <div className="policy-card__header">
      <h3 className="policy-card__title">4. Registration and Presentation</h3>
    </div>
    <p className="policy-card__body">
      Submission implies that at least one author is willing to register
      and present the paper if accepted. Authors must indicate whether they
      will participate online or in person during registration. Only accepted,
      registered, and presented papers will be submitted to IEEE for possible
      inclusion in IEEE Xplore.
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
