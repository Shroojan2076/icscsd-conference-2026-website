import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Building, Clock, ExternalLink } from 'lucide-react';
import { submitContactInquiryApi } from '../api/client';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Name, email, and message are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactInquiryApi({
        name,
        email,
        subject,
        message
      });
      setSuccessMsg(res.message || 'Thank you! Your inquiry has been sent to the ICSCSD 2026 Secretariat.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="badge badge--primary">Support & Communications</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Conference Secretariat & Contact Us
          </h1>
          <p>
            Have a question about submissions, registration, sponsorship, or presentation logistics? Reach out to our dedicated conference chairs.
          </p>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-8)', alignItems: 'start' }}>
          {/* Left Column: Secretariat Contacts & Host Institute */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Conference Secretariat Card */}
            <div className="policy-card" style={{ borderLeft: '4px solid var(--color-ieee-blue)' }}>
              <div className="policy-card__header">
                <Mail size={22} style={{ color: 'var(--color-ieee-blue)' }} />
                <h3 className="policy-card__title">
                  Conference Secretariat
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                <div>
                  <strong style={{ color: 'var(--color-navy-950)' }}>Official Conference Inquiries:</strong><br />
                  <a href="mailto:viticscsd@gmail.com" style={{ color: 'var(--color-ieee-blue)', fontWeight: 600 }}>viticscsd@gmail.com</a>
                </div>

                <div>
                  <strong style={{ color: 'var(--color-navy-950)' }}>General Chairs:</strong><br />
                  Dr. Rajesh Jalnekar (Director, VIT Pune)<br />
                  Dr. Vivek Deshpande (Director, VIIT Pune)
                </div>

                <div>
                  <strong style={{ color: 'var(--color-navy-950)' }}>Publication Chair:</strong><br />
                  Dr. Amar Buchade (VIT Pune)
                </div>

                <div>
                  <strong style={{ color: 'var(--color-navy-950)' }}>Tutorial Chairs:</strong><br />
                  Dr. Priya Shelke, Dr. Deepali Jadhav (VIT Pune)
                </div>

                <div>
                  <strong style={{ color: 'var(--color-navy-950)' }}>Finance & Treasurer:</strong><br />
                  Dr. Virendra Dhotre, Prof. Gitanjali Yadav (VIT Pune)
                </div>
              </div>
            </div>

            {/* Host Institute Card */}
            <div className="policy-card" style={{ borderLeft: '4px solid var(--color-accent-gold)' }}>
              <div className="policy-card__header">
                <Building size={22} style={{ color: 'var(--color-accent-gold)' }} />
                <h3 className="policy-card__title">
                  Host Institute & Venue
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                <p>
                  <strong>BRACT's Vishwakarma Institute of Technology (VIT), Pune</strong><br />
                  666, Upper Indiranagar, Bibwewadi,<br />
                  Pune, Maharashtra – 411037, India.
                </p>

                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ExternalLink size={14} style={{ color: 'var(--color-ieee-blue)' }} />
                  <a href="https://www.vit.edu" target="_blank" rel="noreferrer" style={{ color: 'var(--color-ieee-blue)', fontWeight: 600 }}>
                    www.vit.edu
                  </a>
                </p>

                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <span>Working Hours: Mon–Sat, 09:30 AM – 05:30 PM IST</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="policy-card">
            <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
              Send an Inquiry to Secretariat
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Fill out this form and our organizing committee desk will reply to your registered email address within 24–48 business hours.
            </p>

            {successMsg && (
              <div className="alert-box alert-box--success" style={{ marginBottom: '16px' }}>
                <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="alert-box alert-box--danger" style={{ marginBottom: '16px' }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label form-label--required">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Prof. / Dr. / Mr. / Ms. Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label form-label--required">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@institution.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Registration Query / Paper ID #042 / Visa Letter"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label form-label--required">Message / Question</label>
                <textarea
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Please describe your query in detail..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
                style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Send size={15} />
                <span>{loading ? 'Sending Message...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
