import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertTriangle, FileArchive, FileCheck, Info } from 'lucide-react';
import { submitCameraReadyApi } from '../api/client';

export const CameraReadyUploader: React.FC = () => {
  const [cmtPaperId, setCmtPaperId] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [authors, setAuthors] = useState('');
  const [sourceFormat, setSourceFormat] = useState<'WORD' | 'LATEX'>('WORD');
  const [similarityIndex, setSimilarityIndex] = useState<number>(6);
  const [file, setFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setErrorMsg(null);
    if (!selectedFile.name.toLowerCase().endsWith('.zip')) {
      setErrorMsg('Invalid file type! Please upload an archive with .zip extension.');
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!cmtPaperId.trim()) {
      setErrorMsg('Please specify your Microsoft CMT Paper ID.');
      return;
    }

    if (!file) {
      setErrorMsg('Please select or drop your camera-ready .zip archive.');
      return;
    }

    if (similarityIndex >= 10) {
      setErrorMsg(`IEEE Compliance Violation: Plagiarism similarity index must be strictly below 10%. Your entered similarity is ${similarityIndex}%.`);
      return;
    }

    const expectedZipName = `ICSCSD2026-ID_${cmtPaperId.trim()}.zip`;
    if (!file.name.toLowerCase().includes(cmtPaperId.trim().toLowerCase())) {
      setErrorMsg(`Filename warning: Your zip file is "${file.name}". The required IEEE packaging format is "${expectedZipName}". Please rename your zip archive to match this pattern.`);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('zipFile', file);
      formData.append('cmtPaperId', cmtPaperId.trim());
      formData.append('registrationNumber', registrationNumber.trim());
      formData.append('authors', authors.trim());
      formData.append('sourceFormat', sourceFormat);
      formData.append('similarityIndex', String(similarityIndex));

      const res = await submitCameraReadyApi(formData);
      setValidationResult(res.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification of camera-ready package failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="policy-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="policy-card__header">
        <FileArchive size={24} style={{ color: 'var(--color-ieee-blue)' }} />
        <h3 className="policy-card__title">
          Camera-Ready Package Upload & Automated .zip Pre-Flight Validator
        </h3>
      </div>

      <p className="policy-card__body">
        Our automated verification engine will inspect your .zip archive, parse the compiled manuscript PDF via <code>pdf-lib</code> to confirm the <strong>4–6 page limit</strong>, and verify that original editable source files (Word/LaTeX) are enclosed.
      </p>

      {validationResult ? (
        <div style={{ marginTop: '20px', padding: 'var(--space-6)', backgroundColor: 'var(--color-emerald-50)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(5, 150, 105, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <CheckCircle2 size={32} style={{ color: 'var(--color-emerald-600)' }} />
            <div>
              <h4 style={{ color: '#065f46', fontSize: 'var(--text-base)', fontWeight: 800 }}>
                Camera-Ready Verification Successful!
              </h4>
              <span style={{ fontSize: '0.8rem', color: '#047857' }}>
                Manuscript bundle accepted for IEEE Conference Record #67723
              </span>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1fae5', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.8' }}>
            <div>CMT Paper ID: <strong>{validationResult.cmtPaperId}</strong></div>
            <div>Archive File: <strong>{validationResult.zipFilename}</strong></div>
            <div>Enclosed Manuscript PDF: <strong>{validationResult.pdfFilename}</strong></div>
            <div>Verified Page Count: <strong style={{ color: 'var(--color-emerald-600)' }}>{validationResult.pageCount} Pages (Compliant with 4–6 page rule)</strong></div>
            <div>Source Type: <strong>{validationResult.sourceFormat} Source</strong></div>
            <div>IEEE e-Copyright Status: <strong style={{ color: 'var(--color-emerald-600)' }}>Enabled in CMT Console</strong></div>
          </div>

          <button
            type="button"
            className="btn btn--outline"
            style={{ marginTop: '16px' }}
            onClick={() => {
              setValidationResult(null);
              setFile(null);
            }}
          >
            Submit Another Manuscript Package
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          {errorMsg && (
            <div className="alert-box alert-box--danger" style={{ marginBottom: '16px' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label--required">Microsoft CMT Paper ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 032 or 104"
                value={cmtPaperId}
                onChange={e => setCmtPaperId(e.target.value)}
                required
              />
              <div className="form-hint">Must match your CMT console Paper ID exactly.</div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Registration ID / Order ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. REG-ICSCSD2026-123456"
                value={registrationNumber}
                onChange={e => setRegistrationNumber(e.target.value)}
              />
              <div className="form-hint">From Razorpay receipt or VIERP proof.</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label--required">Source Format</label>
              <select
                className="form-select"
                value={sourceFormat}
                onChange={e => setSourceFormat(e.target.value as any)}
              >
                <option value="WORD">Microsoft Word (.docx / .doc)</option>
                <option value="LATEX">LaTeX (.tex + .bib + style files)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label--required">
                Similarity Index (% must be &lt; 10%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                className="form-input"
                value={similarityIndex}
                onChange={e => setSimilarityIndex(Number(e.target.value))}
                required
              />
              <div className="form-hint">Per Turnitin / iThenticate report.</div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Authors & Affiliations (Comma-separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Amit Kumar Singh, Dr. Rajesh Jalnekar (VIT Pune)"
              value={authors}
              onChange={e => setAuthors(e.target.value)}
            />
          </div>

          {/* Interactive Drag & Drop Box */}
          <div
            className={`dropzone ${isDragging ? 'dropzone--active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{ marginBottom: '16px' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".zip"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <FileArchive className="dropzone__icon" />
            <div style={{ fontWeight: 700, color: 'var(--color-navy-950)' }}>
              {file ? file.name : 'Click to browse or drop your .zip archive here'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB · Ready to Validate` : 'Package naming requirement: ICSCSD2026-ID_<PaperID>.zip (Max 50MB)'}
            </div>
          </div>

          <div className="alert-box alert-box--info" style={{ marginTop: 0, marginBottom: '20px' }}>
            <Info size={18} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem' }}>
              <strong>Required Zip Contents:</strong> (1) Compiled 4–6 page IEEE PDF, (2) Original editable Word (.docx) or LaTeX source files, (3) Similarity report PDF (&lt;10%), (4) High-resolution figures. Do NOT include page numbers or headers/footers in the source.
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            disabled={loading}
          >
            <FileCheck size={18} />
            <span>{loading ? 'Inspecting Archive via pdf-lib...' : 'Validate & Upload Camera-Ready Package'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
