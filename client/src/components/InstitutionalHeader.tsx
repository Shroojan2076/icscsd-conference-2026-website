import React from 'react';
import { VitLogo, BractLogo, IeeeLogo } from './LogoSvg';

interface InstitutionalHeaderProps {
  conferenceName?: string;
  shortName?: string;
  ieeeRecordNumber?: string;
  isbn?: string;
  instituteName?: string;
  instituteSubtitle?: string;
}

export const InstitutionalHeader: React.FC<InstitutionalHeaderProps> = ({
  conferenceName = 'International Conference on Smart Computing for Sustainable Development 2026',
  shortName = 'ICSCSD-2026',
  ieeeRecordNumber = '67723',
  isbn = '979-8-3315-8953-0',
  instituteSubtitle = "Hosted by BRACT's Vishwakarma Institute of Technology, Pune (Autonomous Institute Affiliated to Savitribai Phule Pune University · NAAC 'A++' Accredited)"
}) => {
  return (
    <header className="brand-header">
      <div className="container brand-header__grid">
        {/* Left Logo Cluster: BRACT & VIT Pune */}
        <div className="brand-header__logo-left">
          <VitLogo className="h-16 w-auto" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <BractLogo className="h-9 w-auto" />
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-emerald-600)',
                backgroundColor: 'var(--color-emerald-50)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(5, 150, 105, 0.2)',
                alignSelf: 'flex-start'
              }}
            >
              NAAC 'A++' Accredited
            </span>
          </div>
        </div>

        {/* Center Title Stack */}
        <div className="brand-header__title-stack">
          <div className="brand-header__overline">
            <span>IEEE Conference Record #{ieeeRecordNumber}</span>
            <span>·</span>
            <span>ISBN: {isbn}</span>
          </div>

          <h1 className="brand-header__title">
            {conferenceName} ({shortName})
          </h1>

          <p className="brand-header__subtitle">
            {instituteSubtitle}
          </p>
        </div>

        {/* Right Logo Cluster: IEEE & IEEE Pune Section */}
        <div className="brand-header__logo-right">
          <IeeeLogo className="h-14 w-auto" />
        </div>
      </div>
    </header>
  );
};
