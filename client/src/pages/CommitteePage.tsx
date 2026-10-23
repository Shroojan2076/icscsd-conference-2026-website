import React, { useState, useMemo } from 'react';
import { Users, Search, UserCheck, Award, Briefcase, Building, Sparkles, UserRound } from 'lucide-react';
import { useBootstrap } from '../api/client';
import { CommitteeMember } from '../types';

interface CommitteePageProps {
  initialCategory?: string;
  pageTitle?: string;
}

export const CommitteePage: React.FC<CommitteePageProps> = ({
  initialCategory = 'ALL',
  pageTitle = 'Organizing Committee & Leadership'
}) => {
  const { data } = useBootstrap();
  const committee = data.committee;

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryPills = [
    { id: 'ALL', label: 'All Members', count: committee.length },
    { id: 'PATRON', label: 'Chief Patrons', count: 3 },
    { id: 'GENERAL_CHAIR', label: 'General Chairs', count: 2 },
    { id: 'GENERAL_CO_CHAIR', label: 'General Co-Chairs', count: 2 },
    { id: 'ADVISORY_COMMITTEE', label: 'Advisory Committee', count: 30 },
    { id: 'TECHNICAL_PROGRAM_COMMITTEE', label: 'TPC Members', count: 20 },
    { id: 'TUTORIAL_COMMITTEE', label: 'Tutorial Chairs', count: 2 },
    { id: 'PUBLICATION_COMMITTEE', label: 'Publication Chairs', count: 1 },
    { id: 'TREASURER', label: 'Finance & Treasurer', count: 2 }
  ];

  const filteredMembers = useMemo(() => {
    return committee.filter(m => {
      const matchCat = activeCategory === 'ALL' || m.category === activeCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const s = searchQuery.toLowerCase();
      return (
        m.fullName.toLowerCase().includes(s) ||
        m.roleOrAffiliation.toLowerCase().includes(s) ||
        m.categoryLabel.toLowerCase().includes(s)
      );
    });
  }, [committee, activeCategory, searchQuery]);

  const groupedByCategory = useMemo(() => {
    const groups: { [key: string]: CommitteeMember[] } = {};
    for (const member of filteredMembers) {
      if (!groups[member.categoryLabel]) {
        groups[member.categoryLabel] = [];
      }
      groups[member.categoryLabel].push(member);
    }
    return groups;
  }, [filteredMembers]);

  return (
    <div>
      {/* Banner */}
      <section className="section section--dark" style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="badge badge--primary" style={{ alignSelf: 'flex-start' }}>
            International Leadership & Advisory
          </span>
          
          <h1
            style={{
              fontSize: '30px',
              lineHeight: 1.3,
              fontWeight: 600,
              color: '#ffffff',
              margin: 0
            }}
          >
            {pageTitle}
          </h1>
         
          <p
            style={{
              color: 'var(--color-border-subtle)',
              maxWidth: '650px',
              fontSize: '14px',
              lineHeight: 1.5,
              margin: '8px 0 0'
            }}
          >
            Distinguished professors, research directors, institutional deans, and academic leaders guiding ICSCSD 2026.
          </p>

        </div>
      </section>

      <div className="container" style={{ paddingBlock: 'var(--space-10)' }}>
        {/* Controls Card */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', width: 'min(100%, 360px)' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="Search by name, institute, or city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Showing <strong>{filteredMembers.length}</strong> of {committee.length} members
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
            {categoryPills.map(pill => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveCategory(pill.id)}
                className={`btn ${activeCategory === pill.id ? 'btn--primary' : 'btn--outline'}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  ...(activeCategory !== pill.id ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {})
                }}
              >
                <span>{pill.label}</span>
                <span style={{ opacity: 0.8, fontFamily: 'var(--font-mono)', marginLeft: '4px' }}>
                  ({pill.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Member Directory */}
        {filteredMembers.length === 0 ? (
          <div className="policy-card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <Users size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy-950)' }}>No Members Found</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '16px' }}>
              No committee members match your search for "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
              className="btn btn--primary"
            >
              Reset Filters
            </button>
          </div>
        ) : activeCategory === 'ALL' && !searchQuery ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {Object.entries(groupedByCategory).map(([groupTitle, members]) => (
              <div key={groupTitle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid var(--color-ieee-blue)', paddingBottom: '8px', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', fontWeight: 800 }}>
                    {groupTitle}
                  </h3>
                  <span className="badge badge--primary">
                    {members.length} Members
                  </span>
                </div>

                <div className="grid-3" style={{ gap: '16px' }}>
                  {members.map(member => (
                    <div key={member.id} className="card" style={{ padding: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div
                          aria-label={`Photo placeholder for ${member.fullName}`}
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: '#F1F5F9',
                            border: '1px solid #D6DEE8',
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            overflow: 'hidden'
                          }}
                        >
                          <UserRound size={30} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-navy-950)', fontWeight: 700 }}>
                            {member.fullName}
                          </h4>
                        </div>
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: 'auto' }}>
                        {member.roleOrAffiliation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          
<div className="grid-3" style={{ gap: '16px' }}>
  {filteredMembers.map(member => (
    <div
      key={member.id}
      className="card"
      style={{ padding: 'var(--space-4)' }}
    >
      {/* Photo placeholder */}
      <div
        aria-label={`Photo placeholder for ${member.fullName}`}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#F1F5F9',
          border: '1px solid #D6DEE8',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          overflow: 'hidden'
        }}
      >
        <UserRound size={36} strokeWidth={1.5} />
      </div>

      <span
        className="badge badge--primary"
        style={{ alignSelf: 'flex-start', marginBottom: '8px' }}
      >
        {member.categoryLabel}
      </span>

      <h4
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-navy-950)',
          fontWeight: 700,
          marginBottom: '4px'
        }}
      >
        {member.fullName}
      </h4>

      <p
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.5'
        }}
      >
        {member.roleOrAffiliation}
      </p>
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
};
