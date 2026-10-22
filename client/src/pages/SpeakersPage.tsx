import React from 'react';
import { Award, User, ExternalLink, Globe } from 'lucide-react';
import { useBootstrap } from '../api/client';

export const SpeakersPage: React.FC = () => {
  const { data } = useBootstrap();
  const speakers = data.speakers || [];

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header section-header--center">
          <span className="badge badge--primary">Distinguished Academics & Scientists</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Keynote Speakers & Invited Luminaries
          </h1>
          <p>
            Meet the international researchers, academic pioneers, and industry thought leaders delivering keynote addresses at ICSCSD 2026.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid-3" style={{ gap: 'var(--space-8)' }}>
          {speakers.map((sp, idx) => (
            <div key={sp.id || idx} className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '3px solid var(--color-ieee-blue)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <img
                  src={sp.imageUrl}
                  alt={sp.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span className="badge badge--warning" style={{ marginBottom: '8px' }}>
                {sp.role || 'Keynote Speaker'}
              </span>

              <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)', marginBottom: '4px' }}>
                {sp.name}
              </h3>

              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-ieee-blue)', marginBottom: '8px' }}>
                {sp.affiliation}
              </div>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy-900)', marginBottom: '10px', fontStyle: 'italic' }}>
                "{sp.talkTitle}"
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '16px', textAlign: 'justify' }}>
                {sp.bio}
              </p>

              {sp.scholarUrl && (
                <a
                  href={sp.scholarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--outline"
                  style={{ color: 'var(--color-ieee-blue)', borderColor: 'var(--color-border-strong)', fontSize: '0.75rem', padding: '6px 14px', marginTop: 'auto' }}
                >
                  <Globe size={13} />
                  <span>Google Scholar Profile</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
