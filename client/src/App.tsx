import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Chrome Components
import { TopBar } from './components/TopBar';
import { InstitutionalHeader } from './components/InstitutionalHeader';
import { StickyNavbar } from './components/StickyNavbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CallForPapersPage } from './pages/CallForPapersPage';
import { PublicationPage } from './pages/PublicationPage';
import { CallForTutorialsPage } from './pages/CallForTutorialsPage';
import { CallForSpecialSessionsPage } from './pages/CallForSpecialSessionsPage';
import { SpeakersPage } from './pages/SpeakersPage';
import { CommitteePage } from './pages/CommitteePage';
import { AdvisoryBoardPage } from './pages/AdvisoryBoardPage';
import { AuthorGuidelinesPage } from './pages/AuthorGuidelinesPage';
import { CameraReadyPage } from './pages/CameraReadyPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AccommodationPage } from './pages/AccommodationPage';
import { ContactPage } from './pages/ContactPage';
import { AuthorDashboardPage } from './pages/AuthorDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { useBootstrap } from './api/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Scroll to top on every route transition
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AppContent: React.FC = () => {
  const { data } = useBootstrap();
  const config = data.config;
  const [quickRegOpen, setQuickRegOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}>
      <ScrollToTop />

      {/* 1. Top Utility Strip */}
      <TopBar
        ieeeRecordNumber={config.ieeeRecordNumber}
        isbn={config.isbn}
        datesText="November 25–27, 2026 · VIT, Pune"
      />

      {/* 2. Institutional Branding Banner */}
      <InstitutionalHeader
        conferenceName={config.conferenceName}
        shortName={config.shortName}
        ieeeRecordNumber={config.ieeeRecordNumber}
        isbn={config.isbn}
        instituteSubtitle={config.instituteSubtitle}
      />

      {/* 3. Sticky Navigation Bar */}
      <StickyNavbar onOpenQuickRegister={() => setQuickRegOpen(true)} />

      {/* 4. Main Page View */}
      <main style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/call-for-papers" element={<CallForPapersPage />} />
          <Route path="/tracks" element={<CallForPapersPage />} />
          <Route path="/publication" element={<PublicationPage />} />
          <Route path="/call-for-tutorials" element={<CallForTutorialsPage />} />
          <Route path="/call-for-special-sessions" element={<CallForSpecialSessionsPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/committee" element={<CommitteePage />} />
          <Route path="/advisory-board" element={<AdvisoryBoardPage />} />
          <Route path="/author-guidelines" element={<AuthorGuidelinesPage />} />
          <Route path="/camera-ready-submission" element={<CameraReadyPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/author" element={<AuthorDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* 5. Global Multi-Column Footer */}
      <Footer />

      {/* Quick Registration Modal Triggered from Global Chrome */}
      <RegistrationModal
        isOpen={quickRegOpen}
        onClose={() => setQuickRegOpen(false)}
        defaultCategory="PROFESSIONAL_IEEE"
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
