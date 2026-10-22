import React from 'react';
import { CommitteePage } from './CommitteePage';

export const AdvisoryBoardPage: React.FC = () => {
  return (
    <CommitteePage
      initialCategory="ADVISORY_COMMITTEE"
      pageTitle="Advisory Committee (External & Internal)"
    />
  );
};
