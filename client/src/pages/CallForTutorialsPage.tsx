import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckSquare, Clock, Mail, ExternalLink, Send, ArrowRight, BookOpen, Sparkles, FileText } from 'lucide-react';
import { useBootstrap } from '../api/client';
import { ProposalModal } from '../components/ProposalModal';

export const CallForTutorialsPage: React.FC = () => {
  const { data } = useBootstrap();
  const config = data.config;
  const [modalOpen, setModalOpen] = useState(false);

  const tutorialRequirements = [
    'Title of the Tutorial',
    'Name(s) of Presenter/Speaker along with affiliations',
    'Abstract & Summary of Tutorial Content',
    'Objectives and Motivation',
    'Intended Audience & Prerequisites',
    'Tutorial Outline (Detailed breakdown of session components)',
    'Presenter/Speaker Biography (citing prior speaking, training, or workshop experience, including past attendee counts)',
    'Links to the Presenter/Speaker Web Page or Scholar Profile'
  ];

  return (
    <div>
      {/* Top Breadcrumb & Hero Banner */}
      <section className="section section--dark" style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="badge badge--warning" style={{ alignSelf: 'flex-start' }}>
            Pre-Conference Interactive Sessions · 25th November 2026
          </span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: '#ffffff' }}>
            Call For Tutorials (Pre-Conference)
          </h1>
          <p style={{ color: 'var(--color-border-subtle)', maxWidth: '800px', fontSize: 'var(--text-base)' }}>
            ICSCSD 2026 invites proposals for high-quality, hands-on, and conceptual tutorials addressing fundamental and emerging topics in Smart Computing and Sustainable Development.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn--gold"
            >
              <Send size={15} />
              <span>Submit Tutorial Proposal via Portal</span>
            </button>
            <a
              href="mailto:viticscsd@gmail.com?subject=ICSCSD%202026%20Tutorial%20Submission"
              className="btn btn--outline"
            >
              <Mail size={15} />
              <span>Email: viticscsd@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBlock: 'var(--space-10)' }}>
        {/* Important Deadlines Timeline */}
        <div className="grid-3" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="timeline-card">
            <div className="timeline-card__header">
              <span className="timeline-card__badge timeline-card__badge--active">Deadline</span>
              <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <div className="timeline-card__label">Proposal Submission Deadline</div>
            <div className="timeline-card__date">05 Sep 2026</div>
          </div>

          <div className="timeline-card">
            <div className="timeline-card__header">
              <span className="timeline-card__badge timeline-card__badge--active">Notification</span>
              <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <div className="timeline-card__label">Proposal Acceptance Notification</div>
            <div className="timeline-card__date">12 Sep 2026</div>
          </div>

          <div className="timeline-card">
            <div className="timeline-card__header">
              <span className="timeline-card__badge timeline-card__badge--extended">Conference Event</span>
              <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <div className="timeline-card__label">Tutorial Day at VIT Pune</div>
            <div className="timeline-card__date">25 Nov 2026</div>
          </div>
        </div>

        {/* Proposal Requirements Checklist */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)', borderLeft: '4px solid var(--color-ieee-blue)' }}>
          <div className="policy-card__header">
            <BookOpen size={24} style={{ color: 'var(--color-ieee-blue)' }} />
            <h2 className="policy-card__title">
              Proposal Requirements & Checklist
            </h2>
          </div>
          <p className="policy-card__body" style={{ marginBottom: '16px' }}>
            ICSCSD 2026 invites proposals from research institutes, industries, and premier academic institutes. Proposals should cover the following points:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
            {tutorialRequirements.map((req, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)', fontSize: '0.82rem', color: 'var(--color-navy-950)' }}>
                <CheckSquare size={16} style={{ color: 'var(--color-emerald-600)', flexShrink: 0, marginTop: '2px' }} />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorial Duration & Submission Instructions */}
        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="policy-card">
            <div className="policy-card__header">
              <Clock size={20} style={{ color: 'var(--color-emerald-600)' }} />
              <h3 className="policy-card__title">Duration & Format</h3>
            </div>
            <p className="policy-card__body">
              The tutorial speaker is expected to organize slides, code notebooks, and presentation materials to engage attendees for approximately <strong>three (3) hours</strong>. A mandatory provision for a 15–20 minute tea/networking break must be included in the schedule.
            </p>
          </div>

          <div className="policy-card">
            <div className="policy-card__header">
              <FileText size={20} style={{ color: 'var(--color-accent-gold)' }} />
              <h3 className="policy-card__title">Formatting & Submission</h3>
            </div>
            <p className="policy-card__body">
              The proposal should not exceed <strong>4–5 pages</strong> in 1.5 line spacing, Times New Roman 12pt font. Submit as a single PDF via our integrated in-app proposal form or email to <strong>viticscsd@gmail.com</strong> with subject "ICSCSD 2026 Tutorial Submission".
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
            Ready to Submit Your Tutorial Proposal?
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '600px', margin: '0 auto 16px' }}>
            Submit directly through the conference portal or via the official Google Form link.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn--primary"
            >
              <Send size={15} />
              <span>Submit In-App Proposal Now</span>
            </button>
            <a
              href="https://tinyurl.com/icscsdcallfortutorial"
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
        defaultType="TUTORIAL"
      />
    </div>
  );
};
