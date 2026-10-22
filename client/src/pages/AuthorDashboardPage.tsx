import React, { useState } from 'react';
import { Search, FileText, FileCheck, Download, CheckCircle2, AlertCircle, Plane, CreditCard, ShieldCheck, ExternalLink } from 'lucide-react';
import { lookupAuthorApi, requestVisaLetterApi } from '../api/client';
import { Link } from 'react-router-dom';

export const AuthorDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LOOKUP' | 'VISA'>('LOOKUP');

  // Lookup state
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Visa Letter state
  const [visaName, setVisaName] = useState('');
  const [passportNum, setPassportNum] = useState('');
  const [visaInst, setVisaInst] = useState('');
  const [country, setCountry] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [paperId, setPaperId] = useState('');
  const [visaLoading, setVisaLoading] = useState(false);
  const [visaLetter, setVisaLetter] = useState<any | null>(null);
  const [visaError, setVisaError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setSearchDone(true);

    try {
      const data = await lookupAuthorApi(query);
      setResults(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lookup failed.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleVisaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVisaLoading(true);
    setVisaError(null);

    try {
      const res = await requestVisaLetterApi({
        fullName: visaName,
        passportNumber: passportNum,
        institution: visaInst,
        country,
        paperTitle,
        paperId
      });
      setVisaLetter(res.data);
    } catch (err: any) {
      setVisaError(err.message || 'Failed to issue Visa Support Letter.');
    } finally {
      setVisaLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="badge badge--primary">Author Services</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Author Portal & Delegate Self-Service
          </h1>
          <p>
            Look up your registration status, download GST tax invoices, check camera-ready verification status, or generate an official Visa Support Letter.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('LOOKUP')}
            className={`btn ${activeTab === 'LOOKUP' ? 'btn--primary' : 'btn--outline'}`}
            style={activeTab !== 'LOOKUP' ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {}}
          >
            <Search size={15} />
            <span>Registration & Submission Lookup</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('VISA')}
            className={`btn ${activeTab === 'VISA' ? 'btn--primary' : 'btn--outline'}`}
            style={activeTab !== 'VISA' ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {}}
          >
            <Plane size={15} />
            <span>Visa Support Letter Issuance</span>
          </button>
        </div>

        {/* Tab 1: Lookup Form */}
        {activeTab === 'LOOKUP' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="policy-card">
              <form onSubmit={handleLookup} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '280px' }}>
                  <label className="form-label">Search Query (Email, Paper ID, or Registration ID)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. author@vit.edu or 032 or REG-ICSCSD2026..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={loading}
                  style={{ alignSelf: 'flex-end', height: '42px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Search size={16} />
                  <span>{loading ? 'Searching...' : 'Look Up Status'}</span>
                </button>
              </form>
            </div>

            {errorMsg && (
              <div className="alert-box alert-box--danger">
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Lookup Results */}
            {searchDone && results && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {/* Razorpay Registrations */}
                {results.razorpayOrders?.length > 0 && (
                  <div className="policy-card" style={{ borderLeft: '4px solid var(--color-emerald-600)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard size={20} style={{ color: 'var(--color-emerald-600)' }} />
                      <span>Online Payment Orders ({results.razorpayOrders.length})</span>
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {results.razorpayOrders.map((ord: any, idx: number) => (
                        <div key={idx} style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.8' }}>
                          <div>Registration ID: <strong>{ord.registrationId}</strong></div>
                          <div>Delegate Name: <strong>{ord.fullName}</strong> ({ord.email})</div>
                          <div>Category: <strong>{ord.category}</strong></div>
                          {ord.cmtPaperId && <div>CMT Paper ID: <strong>{ord.cmtPaperId}</strong></div>}
                          <div>Amount: <strong>{ord.pricing?.currency === 'INR' ? '₹' : '$'}{ord.pricing?.totalPayable}</strong></div>
                          <div>Status: <span style={{ color: 'var(--color-emerald-600)', fontWeight: 800 }}>{ord.status}</span></div>

                          <div style={{ marginTop: '12px' }}>
                            <a
                              href={`/api/authors/receipt?id=${ord.registrationId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn--primary"
                              style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <Download size={13} />
                              <span>Download Official GST Invoice (PDF)</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VIERP Proofs */}
                {results.verifications?.length > 0 && (
                  <div className="policy-card">
                    <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCheck size={20} style={{ color: 'var(--color-ieee-blue)' }} />
                      <span>VIERP / Paytm Reconciliation Records ({results.verifications.length})</span>
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {results.verifications.map((v: any, idx: number) => (
                        <div key={idx} style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.8' }}>
                          <div>Registrant: <strong>{v.fullName}</strong> ({v.email})</div>
                          <div>Paytm Reference: <strong>{v.paytmTransactionId}</strong></div>
                          <div>Amount: <strong>₹{v.totalPaidAmount}</strong></div>
                          <div>Status: <span style={{ color: v.verified ? 'var(--color-emerald-600)' : 'var(--color-accent-gold)', fontWeight: 700 }}>{v.verified ? 'RECONCILED & VERIFIED' : 'PENDING RECONCILIATION'}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Camera Ready Papers */}
                {results.cameraReadySubmissions?.length > 0 && (
                  <div className="policy-card" style={{ borderLeft: '4px solid var(--color-ieee-blue)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={20} style={{ color: 'var(--color-ieee-blue)' }} />
                      <span>Camera-Ready Manuscripts ({results.cameraReadySubmissions.length})</span>
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {results.cameraReadySubmissions.map((s: any, idx: number) => (
                        <div key={idx} style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.8' }}>
                          <div>Paper ID: <strong>{s.cmtPaperId}</strong></div>
                          <div>Archive File: <strong>{s.zipFilename}</strong></div>
                          <div>Verified Page Count: <strong style={{ color: 'var(--color-emerald-600)' }}>{s.pageCount} Pages</strong></div>
                          <div>Source Format: <strong>{s.sourceFormat}</strong></div>
                          <div>Similarity Index: <strong>{s.similarityIndex}% (&lt;10% compliant)</strong></div>
                          <div>Status: <span style={{ color: 'var(--color-emerald-600)', fontWeight: 700 }}>VERIFIED FOR IEEE XPLORE</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.razorpayOrders?.length === 0 && results.verifications?.length === 0 && results.cameraReadySubmissions?.length === 0 && (
                  <div className="policy-card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                    <AlertCircle size={36} style={{ color: 'var(--color-text-muted)', margin: '0 auto 8px' }} />
                    <h4>No active registration or submission record found for "{query}".</h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                      Please ensure the email address or Paper ID matches your submission in Microsoft CMT.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Visa Support Letter */}
        {activeTab === 'VISA' && (
          <div className="policy-card">
            <div className="policy-card__header">
              <Plane size={24} style={{ color: 'var(--color-ieee-blue)' }} />
              <div>
                <h3 className="policy-card__title">
                  Generate Official Visa Support Letter
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Exclusively for registered international authors and delegates
                </span>
              </div>
            </div>

            {visaLetter ? (
              <div style={{ marginTop: '20px', padding: 'var(--space-6)', backgroundColor: 'var(--color-emerald-50)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(5, 150, 105, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <CheckCircle2 size={28} style={{ color: 'var(--color-emerald-600)' }} />
                  <h4 style={{ color: '#065f46', fontWeight: 800 }}>Visa Support Letter Issued Successfully</h4>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1fae5', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.8' }}>
                  <div>Reference No: <strong>{visaLetter.letterRef}</strong></div>
                  <div>Issued Date: <strong>{visaLetter.issueDate}</strong></div>
                  <div>Delegate: <strong>{visaLetter.delegateName}</strong> (Passport: {visaLetter.passportNumber})</div>
                  <div>Institution: <strong>{visaLetter.institution}</strong></div>
                  <div>Country: <strong>{visaLetter.country}</strong></div>
                  <div>Paper: <strong>{visaLetter.paperTitle}</strong> (ID: #{visaLetter.paperId})</div>
                  <div>Signatory: <strong>{visaLetter.organizerSignatory}</strong></div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn btn--primary"
                  >
                    <Download size={14} />
                    <span>Print / Save Letter as PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisaLetter(null)}
                    className="btn btn--outline"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVisaSubmit} style={{ marginTop: '16px' }}>
                {visaError && (
                  <div className="alert-box alert-box--danger" style={{ marginBottom: '16px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{visaError}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label--required">Full Name (As on Passport)</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. Dr. Johnathan Smith"
                      value={visaName}
                      onChange={e => setVisaName(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label--required">Passport Number</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Passport Identification Number"
                      value={passportNum}
                      onChange={e => setPassportNum(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label--required">Country of Citizenship</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. United Kingdom / Japan / Germany"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Affiliated University / Institution</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. University of Cambridge"
                      value={visaInst}
                      onChange={e => setVisaInst(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Accepted Paper Title</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Multi-Agent Reinforcement Learning for Smart Grid Optimization"
                      value={paperTitle}
                      onChange={e => setPaperTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">CMT Paper ID</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 042"
                      value={paperId}
                      onChange={e => setPaperId(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={visaLoading}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Plane size={16} />
                  <span>{visaLoading ? 'Generating Letter...' : 'Generate Official Visa Support Letter'}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
