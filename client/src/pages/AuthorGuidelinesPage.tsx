import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle, Download, ExternalLink, Send, ShieldCheck } from 'lucide-react';

export const AuthorGuidelinesPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="badge badge--primary">IEEE Formatting Standards</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Author Submission & Formatting Guidelines
          </h1>
          <p>
            Detailed specifications for manuscript preparation, page length limits, plagiarism screening, author affiliation formatting, and Microsoft CMT submission.
          </p>
        </div>

        {/* Paper Requirements Card */}
        <div className="policy-card" style={{ borderLeft: '4px solid var(--color-ieee-blue)', marginBottom: 'var(--space-8)' }}>
          <div className="policy-card__header">
            <FileText size={24} style={{ color: 'var(--color-ieee-blue)' }} />
            <h2 className="policy-card__title">
              General Manuscript Requirements
            </h2>
          </div>
          <div className="policy-card__body">
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'disc' }}>
              <li>
                <strong>Page Limit:</strong> Manuscripts must be a minimum of <strong>4 pages</strong> and a maximum of <strong>6 pages</strong> in standard IEEE two-column conference format (US Letter size). Papers under 4 pages or over 6 pages will be rejected automatically.
              </li>
              <li>
                <strong>Originality & Plagiarism:</strong> All submissions must report original, previously unpublished research. The overall similarity index must be <strong>strictly below 10%</strong>. Self-plagiarism without attribution is prohibited.
              </li>
              <li>
                <strong>No Headers, Footers, or Page Numbers:</strong> Do NOT include running headers, footers, page numbers, conference title, or ISBN in your draft manuscript or final camera-ready PDF. These will be added programmatically by IEEE during production.
              </li>
              <li>
                <strong>Blind Review:</strong> Initial submissions for peer-review should adhere to the double-blind review requirement where specified by the track.
              </li>
            </ul>
          </div>
        </div>

        {/* 5-Line Author Affiliation Visual Example Box */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
            Mandatory 5-Line Author & Affiliation Format
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            To ensure automated indexing in IEEE Xplore, author affiliations in the camera-ready version must strictly follow this exact 5-line sequence:
          </p>

          <div className="affiliation-box">
            <div>Line 1: Author Name (e.g., Amit Kumar Singh)</div>
            <div>Line 2: Department / Center (e.g., Mechanical Engineering Department)</div>
            <div>Line 3: Institution / University (e.g., NIT Patna)</div>
            <div>Line 4: City, Country (e.g., Patna, India)</div>
            <div>Line 5: Email Address (e.g., acingh@gmail.com)</div>
          </div>
        </div>

        {/* Official IEEE Templates */}
        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
              Microsoft Word Template
            </h3>
            <p className="policy-card__body" style={{ marginBottom: '16px' }}>
              Use the official IEEE Conference Microsoft Word template (.docx). Do not convert Word files to PDF until peer-review revisions are finalized.
            </p>
            <a
              href="https://www.ieee.org/conferences/publishing/templates.html"
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              <Download size={15} />
              <span>Download IEEE Word Template</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
              LaTeX Formatting Package
            </h3>
            <p className="policy-card__body" style={{ marginBottom: '16px' }}>
              Use the official <code>IEEEtran.cls</code> document class with US Letter option (<code>\documentclass[conference]{'{'}IEEEtran{'}'}</code>). Include all <code>.bib</code> bibliography files.
            </p>
            <a
              href="https://www.ieee.org/conferences/publishing/templates.html"
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline"
              style={{ color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)', fontSize: '0.8rem', padding: '8px 16px' }}
            >
              <Download size={15} />
              <span>Download IEEE LaTeX Template</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* CMT Submission Callout */}
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
            Submit Your Manuscript to Microsoft CMT
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '600px', margin: '0 auto 16px' }}>
            Submit your manuscript to <strong>cmt3.research.microsoft.com/ICSCSD2026</strong> before the hard deadline on <strong>30 August 2026</strong>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="https://cmt3.research.microsoft.com/ICSCSD2026"
              target="_blank"
              rel="noreferrer"
              className="btn btn--gold"
            >
              <Send size={15} />
              <span>Go to Microsoft CMT Console</span>
              <ExternalLink size={14} />
            </a>
            <Link to="/camera-ready-submission" className="btn btn--outline" style={{ color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' }}>
              <span>Camera-Ready Submission Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
