import React, { useState, useMemo } from 'react';
import { Send, Search, ExternalLink, Cpu, BrainCircuit, ShieldCheck, Building2, HeartPulse, Zap, Database, Bot, Radio, CheckCircle, FileText } from 'lucide-react';
import { useBootstrap } from '../api/client';

export const CallForPapersPage: React.FC = () => {
  const { data } = useBootstrap();
  const config = data.config;
  const tracks = data.tracks;
  const [searchTerm, setSearchTerm] = useState('');

  const getTrackIcon = (trackNumber: number) => {
    switch (trackNumber) {
      case 1: return <BrainCircuit size={22} style={{ color: 'var(--color-ieee-blue)' }} />;
      case 2: return <Cpu size={22} style={{ color: 'var(--color-ieee-blue)' }} />;
      case 3: return <ShieldCheck size={22} style={{ color: 'var(--color-accent-gold)' }} />;
      case 4: return <Building2 size={22} style={{ color: 'var(--color-emerald-600)' }} />;
      case 5: return <HeartPulse size={22} style={{ color: 'var(--color-crimson-600)' }} />;
      case 6: return <Zap size={22} style={{ color: 'var(--color-accent-gold)' }} />;
      case 7: return <Database size={22} style={{ color: 'var(--color-ieee-blue)' }} />;
      case 8: return <Bot size={22} style={{ color: 'var(--color-ieee-blue)' }} />;
      case 9: return <Radio size={22} style={{ color: 'var(--color-emerald-600)' }} />;
      default: return <Cpu size={22} style={{ color: 'var(--color-ieee-blue)' }} />;
    }
  };

  const filteredTracks = useMemo(() => {
    if (!searchTerm.trim()) return tracks;
    const term = searchTerm.toLowerCase();
    return tracks.filter(t =>
      t.title.toLowerCase().includes(term) ||
      t.topics.some(tp => tp.topicText.toLowerCase().includes(term))
    );
  }, [tracks, searchTerm]);

  return (
    <div>
      {/* Top Breadcrumb & Hero Banner */}
      <section className="section section--dark" style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="badge badge--primary" style={{ alignSelf: 'flex-start' }}>
            IEEE Conference Record #67723 · ISBN 979-8-3315-8953-0
          </span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: '#ffffff' }}>
            Call For Papers & Research Tracks
          </h1>
          <p style={{ color: 'var(--color-border-subtle)', maxWidth: '800px', fontSize: 'var(--text-base)' }}>
            We invite original, unpublished research papers across 9 cutting-edge technical tracks. Accepted and presented papers will be submitted for inclusion into IEEE Xplore subject to meeting IEEE scope and quality requirements.
          </p>

          <div style={{ marginTop: '8px' }}>
            <a
              href={config.cmtSubmissionUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--gold"
            >
              <Send size={15} />
              <span>Submit Manuscript via Microsoft CMT</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBlock: 'var(--space-10)' }}>
        {/* Track Filter & Search Box */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '4px' }}>
                Explore 9 Research Tracks & 36 Sub-Topics
              </h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                Filter research domains or search for key technologies like AI, 6G, IoT, smart grid, or biomedical robotics.
              </p>
            </div>

            <div style={{ position: 'relative', width: 'min(100%, 320px)' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="Search topics or keywords..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 9 Tracks Grid */}
        <div className="grid-3" style={{ marginBottom: 'var(--space-12)' }}>
          {filteredTracks.map(track => (
            <div key={track.id} className="track-card">
              <div>
                <div className="track-card__header">
                  <span className="track-card__number">
                    {String(track.trackNumber).padStart(2, '0')}
                  </span>
                  <div className="track-card__icon-wrapper">
                    {getTrackIcon(track.trackNumber)}
                  </div>
                </div>

                <h3 className="track-card__title">
                  {track.title}
                </h3>

                <div className="track-card__topics">
                  {track.topics.map(topic => (
                    <div key={topic.id} className="track-card__topic-item">
                      <span className="track-card__topic-bullet">›</span>
                      <span>{topic.topicText}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  4 Sub-Topics
                </span>
                <a
                  href={config.cmtSubmissionUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--color-ieee-blue)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Submit to Track {track.trackNumber}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Microsoft CMT Acknowledgment Box */}
        <div className="policy-card" style={{ borderLeft: '4px solid var(--color-ieee-blue)' }}>
          <div className="policy-card__header">
            <FileText size={20} style={{ color: 'var(--color-ieee-blue)' }} />
            <h3 className="policy-card__title">
              Microsoft CMT Service Acknowledgment
            </h3>
          </div>

          <p className="policy-card__body" style={{ fontStyle: 'italic', marginBottom: '16px' }}>
            "{config.cmtAcknowledgment}"
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Submissions strictly via <strong>cmt3.research.microsoft.com/ICSCSD2026</strong>
            </span>
            <a
              href="https://cmt3.research.microsoft.com/ICSCSD2026"
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ fontSize: '0.8rem', padding: '6px 16px' }}
            >
              <span>Go to Microsoft CMT Author Console</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
