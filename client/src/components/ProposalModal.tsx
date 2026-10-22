import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Plus, Trash2, Building, Send } from 'lucide-react';
import { submitProposalApi } from '../api/client';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'TUTORIAL' | 'SPECIAL_SESSION';
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'TUTORIAL'
}) => {
  const [proposalType, setProposalType] = useState<'TUTORIAL' | 'SPECIAL_SESSION'>(defaultType);
  const [title, setTitle] = useState('');
  const [presenterNames, setPresenterNames] = useState('');
  const [presenterEmail, setPresenterEmail] = useState('');
  const [affiliations, setAffiliations] = useState('');
  const [abstract, setAbstract] = useState('');
  const [intendedAudience, setIntendedAudience] = useState('');
  const [outline, setOutline] = useState('');
  const [pastAttendeesCount, setPastAttendeesCount] = useState('');
  const [speakerWebpageUrl, setSpeakerWebpageUrl] = useState('');

  // Dynamic Institutions for Special Sessions (>= 3 required)
  const [institutions, setInstitutions] = useState<string[]>(['', '', '']);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  // Sync proposalType if defaultType changes
  React.useEffect(() => {
    if (defaultType) {
      setProposalType(defaultType);
    }
  }, [defaultType]);

  // Close on Escape key press
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddInstitution = () => {
    setInstitutions([...institutions, '']);
  };

  const handleRemoveInstitution = (index: number) => {
    if (institutions.length > 3) {
      setInstitutions(institutions.filter((_, idx) => idx !== index));
    }
  };

  const handleInstitutionChange = (index: number, val: string) => {
    const updated = [...institutions];
    updated[index] = val;
    setInstitutions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!pdfFile) {
      setErrorMsg('Please upload your proposal document in PDF format (max 10MB).');
      return;
    }

    if (proposalType === 'SPECIAL_SESSION') {
      const validInstitutions = institutions.map(i => i.trim()).filter(Boolean);
      const uniqueInstitutions = new Set(validInstitutions.map(i => i.toLowerCase()));
      if (uniqueInstitutions.size < 3) {
        setErrorMsg('Special Session Governance Rule: You must provide at least three (3) distinct institutions participating in this special session.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('proposalType', proposalType);
      formData.append('title', title);
      formData.append('presenterNames', presenterNames);
      formData.append('presenterEmail', presenterEmail);
      formData.append('affiliations', affiliations);
      formData.append('abstract', abstract);
      formData.append('intendedAudience', intendedAudience);
      formData.append('outline', outline);
      formData.append('pastAttendeesCount', pastAttendeesCount);
      formData.append('speakerWebpageUrl', speakerWebpageUrl);

      if (proposalType === 'SPECIAL_SESSION') {
        const validInstitutions = institutions.map(i => i.trim()).filter(Boolean);
        formData.append('institutionsList', JSON.stringify(validInstitutions));
      }

      formData.append('proposalPdf', pdfFile);

      const res = await submitProposalApi(formData);
      setSuccessData(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit proposal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop modal-backdrop--open"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        style={{ maxWidth: '750px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3>Submit {proposalType === 'TUTORIAL' ? 'Tutorial' : 'Special Session'} Proposal</h3>
            <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
              ICSCSD 2026 Technical Program Committee In-App Review Portal
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {successData ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
              <CheckCircle2 size={54} style={{ color: 'var(--color-emerald-600)', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
                Proposal Submitted Successfully!
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                {successData.message}
              </p>

              <div
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  textAlign: 'left',
                  margin: '0 auto 20px',
                  maxWidth: '460px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem'
                }}
              >
                <div>Proposal ID: <strong>#{successData.data?.proposalId}</strong></div>
                <div>Category: <strong>{successData.data?.proposalType}</strong></div>
                <div>Title: <strong>{successData.data?.title}</strong></div>
                <div>Status: <span style={{ color: 'var(--color-emerald-600)', fontWeight: 700 }}>UNDER_REVIEW</span></div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn btn--primary"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="alert-box alert-box--danger" style={{ marginBottom: '16px' }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Classification Selector */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label form-label--required">Proposal Classification</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setProposalType('TUTORIAL')}
                    className={`btn ${proposalType === 'TUTORIAL' ? 'btn--primary' : 'btn--outline'}`}
                    style={proposalType !== 'TUTORIAL' ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {}}
                  >
                    <span>Tutorial (25 Nov 2026)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProposalType('SPECIAL_SESSION')}
                    className={`btn ${proposalType === 'SPECIAL_SESSION' ? 'btn--primary' : 'btn--outline'}`}
                    style={proposalType !== 'SPECIAL_SESSION' ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {}}
                  >
                    <span>Special Session (Min 3 Institutions)</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label className="form-label form-label--required">Proposal Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Next-Generation Edge AI for Carbon-Neutral Microgrids"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              {/* Presenter Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label form-label--required">Presenter / Organizer Name(s)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Dr. Jane Doe, Prof. Alan Turing"
                    value={presenterNames}
                    onChange={e => setPresenterNames(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required">Primary Contact Email</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="presenter@university.edu"
                    value={presenterEmail}
                    onChange={e => setPresenterEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Affiliations */}
              <div className="form-group">
                <label className="form-label form-label--required">Institutional Affiliation(s)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Department of Computer Science, National University of Singapore"
                  value={affiliations}
                  onChange={e => setAffiliations(e.target.value)}
                />
              </div>

              {/* Special Session 3-Institution Requirement */}
              {proposalType === 'SPECIAL_SESSION' && (
                <div style={{ backgroundColor: 'var(--color-accent-gold-light)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#78350f', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <Building size={16} />
                    <span>Mandatory Rule: At Least 3 Distinct Participating Institutions</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#92400e', marginBottom: '10px' }}>
                    Per ICSCSD governance, each special session proposal must represent researchers from 3 or more distinct academic/industrial institutions.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {institutions.map((inst, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78350f', width: '24px' }}>#{idx + 1}</span>
                        <input
                          type="text"
                          required
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                          placeholder={`Institution ${idx + 1} Name (e.g. IIT Bombay, VIT Pune)`}
                          value={inst}
                          onChange={e => handleInstitutionChange(idx, e.target.value)}
                        />
                        {institutions.length > 3 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInstitution(idx)}
                            style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddInstitution}
                    style={{ marginTop: '8px', background: 'none', border: 'none', color: '#78350f', fontWeight: 700, fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    <Plus size={14} />
                    <span>Add Another Institution</span>
                  </button>
                </div>
              )}

              {/* Abstract */}
              <div className="form-group">
                <label className="form-label form-label--required">Abstract & Motivation</label>
                <textarea
                  required
                  rows={3}
                  className="form-textarea"
                  placeholder="Comprehensive summary of the proposed session or tutorial..."
                  value={abstract}
                  onChange={e => setAbstract(e.target.value)}
                />
              </div>

              {/* Tutorial Specifics */}
              {proposalType === 'TUTORIAL' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Intended Audience & Prerequisites</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Postgraduates, AI practitioners"
                      value={intendedAudience}
                      onChange={e => setIntendedAudience(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Past Attendees Count</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Approx 150 attendees"
                      value={pastAttendeesCount}
                      onChange={e => setPastAttendeesCount(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Structure & Profile Link */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Structure / 3-Hour Breakdown</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Part 1 (60m), Break (20m), Part 2 (80m)"
                    value={outline}
                    onChange={e => setOutline(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Speaker Webpage / Scholar Link</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://scholar.google.com/citations?user=..."
                    value={speakerWebpageUrl}
                    onChange={e => setSpeakerWebpageUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* PDF Document Upload */}
              <div className="dropzone" style={{ padding: 'var(--space-5)', marginBlock: 'var(--space-3)' }}>
                <Upload className="dropzone__icon" style={{ width: '32px', height: '32px' }} />
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy-950)' }}>
                  Upload Full Proposal PDF Document *
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Single PDF file (4–5 pages, 1.5 line spacing, 10MB limit)
                </div>
                <input
                  type="file"
                  required
                  accept=".pdf,application/pdf"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setPdfFile(e.target.files[0]);
                    }
                  }}
                  style={{ marginTop: '8px', fontSize: '0.8rem' }}
                />
                {pdfFile && (
                  <div style={{ marginTop: '6px', color: 'var(--color-emerald-600)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Selected: {pdfFile.name} ({(pdfFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer" style={{ paddingBottom: 0 }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn--outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={isSubmitting}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Uploading Proposal...' : 'Submit Proposal to TPC'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
