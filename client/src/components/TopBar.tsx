import React from 'react';
import { Mail, Calendar, ExternalLink } from 'lucide-react';

interface TopBarProps {
  ieeeRecordNumber?: string;
  isbn?: string;
  datesText?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  ieeeRecordNumber = '67723',
  isbn = '979-8-3315-8953-0',
  datesText = 'November 25–27, 2026 · VIT, Pune'
}) => {
  return (
    <div className="topbar">
      <div className="container topbar__container">
        <div className="topbar__left">
          <a href="mailto:viticscsd@gmail.com" className="topbar__link">
            <Mail size={13} />
            <span>viticscsd@gmail.com</span>
          </a>
          <span style={{ opacity: 0.4 }}>|</span>
          <a
            href="https://www.vit.edu"
            target="_blank"
            rel="noreferrer"
            className="topbar__link"
          >
            <span>vit.edu</span>
            <ExternalLink size={11} />
          </a>
        </div>
        <div className="topbar__right">
          <span className="topbar__link">
            <Calendar size={13} />
            <span>{datesText}</span>
          </span>
          <span className="topbar__badge">
            IEEE Record #{ieeeRecordNumber}
          </span>
          <span className="topbar__badge" style={{ backgroundColor: 'rgba(0, 98, 155, 0.25)', color: '#93c5fd' }}>
            ISBN: {isbn}
          </span>
        </div>
      </div>
    </div>
  );
};
