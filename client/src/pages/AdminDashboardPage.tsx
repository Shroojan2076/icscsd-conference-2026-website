import React, { useState, useEffect } from 'react';
import {
  Shield,
  LogIn,
  LogOut,
  FileText,
  CreditCard,
  Calendar,
  Layers,
  Settings,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Edit2,
  Check
} from 'lucide-react';
import {
  adminLoginApi,
  getAdminToken,
  removeAdminToken,
  fetchAdminStats,
  fetchAdminProposals,
  updateProposalStatusApi,
  fetchAdminVerifications,
  toggleVerificationApi,
  useBootstrap
} from '../api/client';
import { ProposalSubmission, PaymentVerification } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { data: bootstrapData, refetch: refetchBootstrap } = useBootstrap();

  // Auth State
  const [token, setToken] = useState<string | null>(getAdminToken());
  const [loginEmail, setLoginEmail] = useState('admin@vit.edu');
  const [loginPassword, setLoginPassword] = useState('Admin@ICSCSD2026');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'PROPOSALS' | 'VERIFICATIONS' | 'DATES' | 'TRACKS'>('PROPOSALS');
  const [stats, setStats] = useState<any>(null);
  const [proposals, setProposals] = useState<ProposalSubmission[]>([]);
  const [verifications, setVerifications] = useState<PaymentVerification[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Date Form Modal
  const [showAddDateModal, setShowAddDateModal] = useState(false);
  const [newDateLabel, setNewDateLabel] = useState('');
  const [newDateText, setNewDateText] = useState('');
  const [newDateIso, setNewDateIso] = useState('');
  const [newDateCategory, setNewDateCategory] = useState<'PAPER' | 'TUTORIAL' | 'SPECIAL_SESSION'>('PAPER');

  // Load admin dashboard data when authenticated
  const loadDashboardData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [statsRes, proposalsRes, verificationsRes] = await Promise.all([
        fetchAdminStats().catch(() => null),
        fetchAdminProposals().catch(() => []),
        fetchAdminVerifications().catch(() => [])
      ]);
      setStats(statsRes);
      setProposals(proposalsRes);
      setVerifications(verificationsRes);
    } catch (err) {
      console.warn('Dashboard data fetch error:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await adminLoginApi({ email: loginEmail, password: loginPassword });
      setToken(res.token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Check email and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    removeAdminToken();
    setToken(null);
  };

  const handleUpdateProposalStatus = async (id: number, status: string) => {
    try {
      await updateProposalStatusApi({ id, status });
      setActionMessage(`Proposal #${id} status updated to ${status}`);
      setTimeout(() => setActionMessage(null), 3000);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to update proposal status');
    }
  };

  const handleToggleVerification = async (id: number, currentStatus: boolean) => {
    try {
      await toggleVerificationApi({ id, verified: !currentStatus });
      setActionMessage(`Payment Verification #${id} marked as ${!currentStatus ? 'VERIFIED' : 'PENDING'}`);
      setTimeout(() => setActionMessage(null), 3000);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle verification status');
    }
  };

  const handleAddDate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          label: newDateLabel,
          dateText: newDateText,
          isoDate: newDateIso || null,
          category: newDateCategory,
          displayOrder: 10
        })
      });
      if (res.ok) {
        setShowAddDateModal(false);
        setNewDateLabel('');
        setNewDateText('');
        setNewDateIso('');
        setActionMessage('Important Date successfully added');
        setTimeout(() => setActionMessage(null), 3000);
        refetchBootstrap();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to add date');
    }
  };

  const handleDeleteDate = async (id: number) => {
    if (!confirm('Are you sure you want to delete this date?')) return;
    try {
      const res = await fetch(`/api/admin/dates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setActionMessage('Date deleted');
        setTimeout(() => setActionMessage(null), 3000);
        refetchBootstrap();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete date');
    }
  };

  // If not authenticated, render Login Form
  if (!token) {
    return (
      <div className="section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div className="policy-card" style={{ maxWidth: '440px', width: '100%', margin: '0 auto', padding: 'var(--space-8)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-navy-900)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}
            >
              <Shield size={26} style={{ color: 'var(--color-accent-gold)' }} />
            </div>
            <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '4px' }}>
              ICSCSD 2026 Admin Portal
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
              Vishwakarma Institute of Technology, Pune · Organizing CMS
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {loginError && (
              <div className="alert-box alert-box--danger" style={{ marginBottom: '16px' }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{loginError}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label form-label--required">Official Admin Email</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="admin@vit.edu"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label form-label--required">Password</label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
              />
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
              <div><strong>Default Demo Credentials:</strong></div>
              <div>Email: <code style={{ color: 'var(--color-ieee-blue)' }}>admin@vit.edu</code></div>
              <div>Password: <code style={{ color: 'var(--color-ieee-blue)' }}>Admin@ICSCSD2026</code></div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn btn--primary"
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <LogIn size={15} />
              <span>{loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingBlock: 'var(--space-8)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Top Header Card */}
        <div style={{ backgroundColor: 'var(--color-navy-950)', color: '#ffffff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6) var(--space-8)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <span className="badge badge--success" style={{ marginBottom: '6px', display: 'inline-block' }}>
              Organizing CMS Active
            </span>
            <h1 style={{ fontSize: 'var(--text-2xl)', color: '#ffffff', marginBottom: '4px' }}>
              ICSCSD 2026 Management Console
            </h1>
            <p style={{ color: 'var(--color-border-subtle)', fontSize: 'var(--text-xs)' }}>
              Logged in as <strong>{loginEmail}</strong> (Administrator)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={loadDashboardData}
              title="Refresh Data"
              className="btn btn--outline"
              style={{ padding: '8px 12px' }}
            >
              <RefreshCw size={14} className={loadingData ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleLogout}
              className="btn btn--outline"
              style={{ color: '#fca5a5', borderColor: 'rgba(239, 68, 68, 0.4)', padding: '8px 16px' }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Action Message Alert */}
        {actionMessage && (
          <div className="alert-box alert-box--success">
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Overview Metric Cards */}
        <div className="grid-4" style={{ gap: '16px' }}>
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Proposals</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-navy-950)', fontFamily: 'var(--font-mono)', marginBlock: '4px' }}>
              {stats?.proposalCount ?? proposals.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Tutorials & Special Sessions</div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Verifications</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-emerald-600)', fontFamily: 'var(--font-mono)', marginBlock: '4px' }}>
              {stats?.verificationCount ?? verifications.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {stats?.verifiedCount ?? verifications.filter(v => v.verified).length} Reconciled / Paid
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Technical Tracks</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-ieee-blue)', fontFamily: 'var(--font-mono)', marginBlock: '4px' }}>
              {bootstrapData.tracks.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>36 Topics across 9 Tracks</div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Committee</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-accent-gold)', fontFamily: 'var(--font-mono)', marginBlock: '4px' }}>
              {bootstrapData.committee.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>62 Members across 8 Wings</div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', overflowX: 'auto' }}>
          {[
            { id: 'PROPOSALS', label: 'Proposals Submitted', count: proposals.length },
            { id: 'VERIFICATIONS', label: 'Payment Verifications', count: verifications.length },
            { id: 'DATES', label: 'Important Dates', count: bootstrapData.dates.length },
            { id: 'TRACKS', label: 'Tracks & Topics', count: bootstrapData.tracks.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${activeTab === tab.id ? 'btn--primary' : 'btn--outline'}`}
              style={{
                fontSize: '0.78rem',
                padding: '6px 14px',
                whiteSpace: 'nowrap',
                ...(activeTab !== tab.id ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {})
              }}
            >
              <span>{tab.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.8, marginLeft: '4px' }}>({tab.count})</span>
            </button>
          ))}
        </div>

        {/* TAB 1: PROPOSALS */}
        {activeTab === 'PROPOSALS' && (
          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '12px' }}>
              Tutorial & Special Session Proposals ({proposals.length})
            </h3>

            {proposals.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', padding: '24px 0', textAlign: 'center' }}>
                No proposals submitted yet. Submissions from /call-for-tutorials or /call-for-special-sessions will display here.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="fee-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Title & Presenters</th>
                      <th>Affiliation</th>
                      <th>Document</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals.map(p => (
                      <tr key={p.id}>
                        <td>
                          <span className="badge badge--primary" style={{ fontSize: '0.7rem' }}>{p.proposalType}</span>
                        </td>
                        <td>
                          <strong>{p.title}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{p.presenterNames} ({p.presenterEmail})</div>
                        </td>
                        <td style={{ fontSize: '0.75rem' }}>{p.affiliations}</td>
                        <td>
                          {p.pdfFilePath ? (
                            <a href={p.pdfFilePath} target="_blank" rel="noreferrer" style={{ color: 'var(--color-ieee-blue)', fontWeight: 700, fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Download size={13} />
                              <span>View PDF</span>
                            </a>
                          ) : (
                            <span style={{ color: 'var(--color-text-muted)' }}>N/A</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${p.status === 'APPROVED' ? 'badge--success' : p.status === 'REJECTED' ? 'badge--danger' : 'badge--warning'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={p.status}
                            onChange={e => handleUpdateProposalStatus(p.id, e.target.value)}
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          >
                            <option value="SUBMITTED">SUBMITTED</option>
                            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                            <option value="APPROVED">APPROVE</option>
                            <option value="REJECTED">REJECT</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERIFICATIONS */}
        {activeTab === 'VERIFICATIONS' && (
          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '12px' }}>
              VIERP / Paytm Payment Verifications ({verifications.length})
            </h3>

            {verifications.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', padding: '24px 0', textAlign: 'center' }}>
                No payment verifications logged yet.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="fee-table">
                  <thead>
                    <tr>
                      <th>Registrant</th>
                      <th>Paper / PRN</th>
                      <th>Amount</th>
                      <th>Transaction ID</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifications.map(v => (
                      <tr key={v.id}>
                        <td>
                          <strong>{v.fullName}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{v.email}</div>
                        </td>
                        <td style={{ fontSize: '0.75rem' }}>
                          <div>CMT: {v.cmtPaperId || 'N/A'}</div>
                          {v.isVitStudent && <div>PRN: {v.prnNumber}</div>}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {v.currency} {v.totalPaidAmount}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ieee-blue)' }}>
                          {v.paytmTransactionId}
                        </td>
                        <td>
                          <span className={`badge ${v.verified ? 'badge--success' : 'badge--warning'}`}>
                            {v.verified ? 'VERIFIED' : 'PENDING'}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleVerification(v.id, v.verified)}
                            className="btn btn--outline"
                            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                          >
                            {v.verified ? 'Revoke' : 'Verify'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DATES */}
        {activeTab === 'DATES' && (
          <div className="policy-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)' }}>
                Important Dates & Milestones ({bootstrapData.dates.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowAddDateModal(true)}
                className="btn btn--primary"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
              >
                <Plus size={14} />
                <span>Add Date</span>
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Milestone Label</th>
                    <th>Display Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bootstrapData.dates.map(d => (
                    <tr key={d.id}>
                      <td>
                        <span className="badge badge--primary" style={{ fontSize: '0.7rem' }}>{d.category}</span>
                      </td>
                      <td><strong>{d.label}</strong></td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ieee-blue)', fontWeight: 700 }}>{d.dateText}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeleteDate(d.id)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TRACKS */}
        {activeTab === 'TRACKS' && (
          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '16px' }}>
              Conference Tracks ({bootstrapData.tracks.length}) & Topics
            </h3>

            <div className="grid-3" style={{ gap: '16px' }}>
              {bootstrapData.tracks.map(t => (
                <div key={t.id} style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="badge badge--primary">Track {t.trackNumber}</span>
                  </div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-navy-950)', fontWeight: 700, marginBottom: '8px' }}>
                    {t.title}
                  </h4>
                  <ul style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {t.topics.map(tp => (
                      <li key={tp.id}>{tp.topicText}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Date Modal */}
        {showAddDateModal && (
          <div className="modal-backdrop modal-backdrop--open">
            <div className="modal-dialog" style={{ maxWidth: '440px' }}>
              <div className="modal-header">
                <h3>Add Milestone Date</h3>
                <button
                  type="button"
                  onClick={() => setShowAddDateModal(false)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  <XCircle size={20} />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddDate}>
                  <div className="form-group">
                    <label className="form-label form-label--required">Event Label</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. Workshop Proposal Deadline"
                      value={newDateLabel}
                      onChange={e => setNewDateLabel(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label form-label--required">Display Text</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. 20th October 2026"
                      value={newDateText}
                      onChange={e => setNewDateText(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={newDateCategory}
                      onChange={e => setNewDateCategory(e.target.value as any)}
                      className="form-select"
                    >
                      <option value="PAPER">PAPER</option>
                      <option value="TUTORIAL">TUTORIAL</option>
                      <option value="SPECIAL_SESSION">SPECIAL_SESSION</option>
                    </select>
                  </div>

                  <div className="modal-footer" style={{ paddingBottom: 0 }}>
                    <button
                      type="button"
                      onClick={() => setShowAddDateModal(false)}
                      className="btn btn--outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn--primary"
                    >
                      Save Date
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
