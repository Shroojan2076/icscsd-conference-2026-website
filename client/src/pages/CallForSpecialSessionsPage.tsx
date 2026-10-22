import React, { useState } from 'react';
import { Calendar, Layers, ShieldCheck, Mail, ExternalLink, Send, Users, Sparkles, Building, AlertCircle } from 'lucide-react';
import { useBootstrap } from '../api/client';
import { ProposalModal } from '../components/ProposalModal';

export const CallForSpecialSessionsPage: React.FC = () => {
  const { data } = useBootstrap();
  const config = data.config;
  const [modalOpen, setModalOpen] = useState(false);

  const governanceRules = [
    {
      rule: 'The Special Session organizers are responsible for the advertisement and promotion of the special session and the conference.',
      badge: 'Promotion'
    },
    {
      rule: 'Once a Special Session proposal is approved, session chairs will invite papers for the session and handle the review process along with ICSCSD Team.',
      badge: 'Review Process'
    },
    {
      rule: 'Each paper should obtain at least two reviews.',
      badge: 'Min 2 Reviews'
    },
    {
      rule: 'The minimum number of papers should be 8 in each special session. Achieving at least 8 accepted papers, the Special Session will be considered successful (and included in the program).',
      badge: 'Min 8 Papers'
    },
    {
      rule: 'If a Special Session achieves less than 6 accepted papers, it may be cancelled and the papers moved to regular technical tracks or to other Special Sessions.',
      badge: 'Min Threshold: 6'
    },
    {
      rule: 'Special Session must consist of papers from at least three different institutions.',
      badge: '≥ 3 Institutions'
    },
    {
      rule: 'An individual cannot be (co-)author of more than two papers submitted to the same Special Session.',
      badge: 'Max 2 Papers/Author'
    },
    {
      rule: 'The authors of the Special Session have a special track, with the name of their Special Session in the submission system.',
      badge: 'Dedicated Track'
    },
    {
      rule: 'The final decision for acceptance will be taken by the ICSCSD Technical Program Committee based on recommendations provided by Special Session organizers.',
      badge: 'TPC Oversight'
    },
    {
      rule: 'The papers are required to meet the same standards as ICSCSD papers.',
      badge: 'IEEE Quality Standard'
    },
    {
      rule: 'Organizers of successful Special Sessions will be invited to attend the conference (online/offline), and chair the corresponding sessions. Session Chair may submit the reviewers list of the special session.',
      badge: 'Session Chair Privileges'
    }
  ];

  return (
    <div>
      {/* Top Banner */}
      <section className="section section--dark" style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="badge badge--primary" style={{ alignSelf: 'flex-start' }}>
            Thematic Technical Tracks · Proposal Submission
          </span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: '#ffffff' }}>
            Call for Special Sessions
          </h1>
          <p style={{ color: 'var(--color-border-subtle)', maxWidth: '800px', fontSize: 'var(--text-base)' }}>
            Special Sessions provide a focused forum on emerging topics within Smart Computing for Sustainable Development. Propose a dedicated session with your academic peers.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn--gold"
            >
              <Send size={15} />
              <span>Submit Special Session Proposal</span>
            </button>
            <a
              href="mailto:viticscsd@gmail.com?subject=ICSCSD%202026%20Special%20Session%20Proposal"
              className="btn btn--outline"
            >
              <Mail size={15} />
              <span>Email: viticscsd@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBlock: 'var(--space-10)' }}>
        {/* Deadlines Timeline */}
        <div className="grid-2" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="timeline-card">
            <div className="timeline-card__header">
              <span className="timeline-card__badge timeline-card__badge--active">Deadline</span>
              <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <div className="timeline-card__label">Proposal Submission Deadline</div>
            <div className="timeline-card__date">30 August 2026</div>
          </div>

          <div className="timeline-card">
            <div className="timeline-card__header">
              <span className="timeline-card__badge timeline-card__badge--active">Notification</span>
              <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <div className="timeline-card__label">Special Session Sanctioned Notification</div>
            <div className="timeline-card__date">05 September 2026</div>
          </div>
        </div>

        {/* Governance Rules (ICBDS Policy Format) */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)', borderLeft: '4px solid var(--color-ieee-blue)' }}>
          <div className="policy-card__header">
            <Layers size={24} style={{ color: 'var(--color-ieee-blue)' }} />
            <h2 className="policy-card__title">
              Special Session Governance & Eligibility Rules
            </h2>
          </div>
          <p className="policy-card__body" style={{ marginBottom: '16px' }}>
            Special Session proposals are evaluated rigorously to ensure high academic standards, active peer review, and broad inter-institutional collaboration.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {governanceRules.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.84rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-navy-900)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ color: 'var(--color-navy-950)' }}>{item.rule}</span>
                </div>
                <span className="badge badge--primary" style={{ flexShrink: 0 }}>
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Channels */}
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
            Submit Your Special Session Proposal
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '650px', margin: '0 auto 16px' }}>
            Proposals can be submitted via the in-app proposal portal, the official TinyURL Google Form (https://tinyurl.com/icscsdcallforspecialsession), or emailed directly to viticscsd@gmail.com.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn--primary"
            >
              <Send size={15} />
              <span>Submit In-App Form Now</span>
            </button>
            <a
              href="https://tinyurl.com/icscsdcallforspecialsession"
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline"
              style={{ color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' }}
            >
              <span>Open External Form</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      <ProposalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultType="SPECIAL_SESSION"
      />
    </div>
  );
};
