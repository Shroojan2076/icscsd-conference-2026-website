import React from 'react';
import { FileCheck, AlertTriangle, Download, ExternalLink, CheckCircle, ShieldAlert, Sparkles, FolderArchive } from 'lucide-react';
import { CameraReadyUploader } from '../components/CameraReadyUploader';

export const CameraReadyPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="badge badge--primary">IEEE Conference Record #67723</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Camera-Ready Manuscript Submission
          </h1>
          <p>
            Submit your final peer-reviewed, compliant camera-ready paper package and transfer electronic IEEE copyright (eCF) for inclusion in IEEE Xplore.
          </p>
        </div>

        {/* Deadline Alert Banner */}
        <div className="alert-box alert-box--warning" style={{ marginBottom: 'var(--space-8)' }}>
          <AlertTriangle size={22} style={{ flexShrink: 0 }} />
          <div>
            <strong>Hard Deadline for Camera-Ready Submission: 15 September 2026.</strong><br />
            Authors must incorporate all reviewer comments received in their Microsoft CMT Author Console prior to compiling their final manuscript bundle.
          </div>
        </div>

        {/* Step-by-Step Compliance Guide */}
        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} style={{ color: 'var(--color-ieee-blue)' }} />
              <span>1. Page Limit & Formatting Rules</span>
            </h3>
            <ul style={{ paddingLeft: '18px', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.6' }}>
              <li>
                <strong>Strict 4–6 Page Limit:</strong> Manuscripts must be a minimum of 4 pages and a maximum of 6 pages in standard IEEE two-column format. Papers with 3 pages or 7+ pages will be rejected automatically.
              </li>
              <li>
                <strong>Editable Source Files:</strong> Provide editable Microsoft Word (.docx/.doc) or LaTeX (.tex + .bib + style files). Do NOT convert a PDF back into Word.
              </li>
              <li>
                <strong>Zero Headers & Footers:</strong> Remove all page numbers, running headers, conference names, and ISBN references from your manuscript. IEEE adds these programmatically.
              </li>
              <li>
                <strong>High-Resolution Figures:</strong> All figures and schematics must be embedded at a minimum of 300 DPI for print legibility.
              </li>
            </ul>
          </div>

          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} style={{ color: 'var(--color-crimson-600)' }} />
              <span>2. Plagiarism & Originality Standards</span>
            </h3>
            <ul style={{ paddingLeft: '18px', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.6' }}>
              <li>
                <strong>Similarity Index &lt; 10%:</strong> The similarity index must be strictly below 10% (excluding references and quotes). Papers failing Turnitin/iThenticate screening will be removed from proceedings.
              </li>
              <li>
                <strong>Author Order Integrity:</strong> The author sequence in the manuscript must match the Microsoft CMT author list identically.
              </li>
              <li>
                <strong>IEEE e-Copyright Transfer:</strong> The corresponding author must complete the IEEE electronic Copyright Form (eCF) in Microsoft CMT before publication.
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory 5-Line Author Affiliation Visual Example Box */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', marginBottom: '6px' }}>
            Mandatory 5-Line Author & Affiliation Format
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            All author affiliation blocks must follow this strict 5-line structure:
          </p>

          <div className="affiliation-box">
            <div>Line 1: Author Name (e.g., Amit Kumar Singh)</div>
            <div>Line 2: Department / Laboratory (e.g., Mechanical Engineering Department)</div>
            <div>Line 3: Institute / University (e.g., NIT Patna)</div>
            <div>Line 4: City, Country (e.g., Patna, India)</div>
            <div>Line 5: Author Email (e.g., acingh@gmail.com)</div>
          </div>
        </div>

        {/* Packaging Rule */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)', borderLeft: '4px solid var(--color-accent-gold)' }}>
          <div className="policy-card__header">
            <FolderArchive size={22} style={{ color: 'var(--color-accent-gold)' }} />
            <h3 className="policy-card__title">
              Mandatory .zip Archive Packaging Rule
            </h3>
          </div>
          <div className="policy-card__body">
            <p style={{ marginBottom: '10px' }}>
              To ensure error-free compilation into the IEEE proceedings, your camera-ready bundle must be packaged according to this convention:
            </p>
            <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div>Folder Name: <strong>ICSCSD2026-ID_&lt;PaperID&gt;</strong> (e.g. <code>ICSCSD2026-ID_042</code>)</div>
              <div>Archive Filename: <strong>ICSCSD2026-ID_&lt;PaperID&gt;.zip</strong> (e.g. <code>ICSCSD2026-ID_042.zip</code>)</div>
            </div>
            <p>
              <strong>Enclosed files must include:</strong> (1) The compiled manuscript PDF, (2) Original editable source files (Word or LaTeX), (3) Plagiarism similarity report PDF, and (4) High-resolution image assets.
            </p>
          </div>
        </div>

        {/* Automated .zip Pre-Flight Validator Dropzone */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <CameraReadyUploader />
        </div>
      </div>
    </div>
  );
};
