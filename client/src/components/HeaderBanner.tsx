import React from 'react';
import { VitLogo, BractLogo, IeeeLogo } from './LogoSvg';
import { Calendar, Award, ExternalLink } from 'lucide-react';

interface HeaderBannerProps {
  conferenceName?: string;
  shortName?: string;
  ieeeRecordNumber?: string;
  isbn?: string;
  instituteName?: string;
  instituteSubtitle?: string;
  conferenceDatesText?: string;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  conferenceName = "International Conference on Smart Computing for Sustainable Development",
  shortName = "ICSCSD 2026",
  ieeeRecordNumber = "67723",
  isbn = "979-8-3315-8953-0",
  instituteName = "Vishwakarma Institute of Technology, Pune",
  instituteSubtitle = "(Autonomous Institute affiliated to Savitribai Phule Pune University)",
  conferenceDatesText = "25th to 27th November 2026"
}) => {
  return (
    <header className="w-full bg-gradient-to-b from-white via-slate-50 to-slate-100/90 border-b border-slate-200">
      {/* Top Academic Ribbon */}
      <div className="bg-[#0F2942] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              IEEE Technical Co-Sponsorship (Pune Section)
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-300 font-mono">Record #{ieeeRecordNumber}</span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300 font-mono">ISBN: {isbn}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="https://vit.edu"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1"
            >
              vit.edu <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-500">|</span>
            <a
              href="mailto:viticscsd@gmail.com"
              className="hover:text-emerald-300 transition"
            >
              viticscsd@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Branding Grid */}
      <div className="max-w-7xl mx-auto px-4 py-5 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: VIT & BRACT Emblems */}
          <div className="lg:col-span-3 flex items-center justify-center lg:justify-start gap-4">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <VitLogo className="h-14 sm:h-16 w-auto drop-shadow-sm" />
              <div className="flex items-center gap-2">
                <BractLogo className="h-8 sm:h-9 w-auto opacity-95" />
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  NAAC A++
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Conference Title Hierarchy */}
          <div className="lg:col-span-6 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-xs">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>International Academic Conference</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F2942] tracking-tight leading-snug">
              {conferenceName}
            </h1>

            <div className="text-lg sm:text-xl font-bold text-[#00629B] tracking-wide">
              ({shortName})
            </div>

            {/* IEEE Record Badge */}
            <div className="inline-block bg-slate-100 hover:bg-slate-200/80 transition px-3 py-1 rounded-md border border-slate-300/80 text-xs text-slate-700 font-mono">
              (IEEE conference Record #{ieeeRecordNumber} &nbsp;|&nbsp; ISBN: {isbn})
            </div>

            {/* Host Institute Hierarchy */}
            <div className="pt-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-800">
                {instituteName}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {instituteSubtitle}
              </p>
            </div>

            {/* Date Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-[#0F2942] text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm border border-slate-700">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Conference Dates: <strong className="text-emerald-300 font-bold">{conferenceDatesText}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: IEEE & IEEE Pune Section Sponsor Logos */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center gap-3">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
              <IeeeLogo className="h-10 sm:h-12 w-auto" />
              <span className="text-[10px] text-slate-500 font-medium mt-1">
                IEEE Pune Section Co-Sponsorship
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Hybrid Mode (Online / Offline)</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
