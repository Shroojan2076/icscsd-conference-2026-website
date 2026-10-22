import React from 'react';

export const VitLogo: React.FC<{ className?: string }> = ({ className = 'h-16 w-auto' }) => (
  <svg className={className} viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="70" rx="8" fill="#FFFFFF" fillOpacity="0.05" />
    {/* Shield Emblems */}
    <g transform="translate(8, 7)">
      <path d="M28 2L5 12V32C5 46 15 54 28 58C41 54 51 46 51 32V12L28 2Z" fill="#0F2942" stroke="#00629B" strokeWidth="2.5" />
      <path d="M28 8L12 16V30C12 40 19 46 28 49C37 46 44 40 44 30V16L28 8Z" fill="#00629B" />
      <text x="28" y="34" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VIT</text>
      <circle cx="28" cy="42" r="3" fill="#059669" />
    </g>
    {/* Text */}
    <text x="70" y="27" fill="#0F2942" fontSize="22" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">VIT PUNE</text>
    <text x="70" y="44" fill="#00629B" fontSize="11" fontWeight="700" fontFamily="sans-serif">VISHWAKARMA INSTITUTE</text>
    <text x="70" y="57" fill="#64748B" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">OF TECHNOLOGY, PUNE</text>
  </svg>
);

export const BractLogo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto' }) => (
  <svg className={className} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="50" rx="6" fill="#FFFFFF" fillOpacity="0.05" />
    <circle cx="25" cy="25" r="18" fill="#0F2942" stroke="#059669" strokeWidth="2" />
    <text x="25" y="30" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BRACT</text>
    <text x="52" y="22" fill="#0F2942" fontSize="12" fontWeight="800" fontFamily="sans-serif">BRACT TRUST</text>
    <text x="52" y="37" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="sans-serif">Est. 1975 • NAAC A++</text>
  </svg>
);

export const IeeeLogo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto' }) => (
  <svg className={className} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Official IEEE diamond badge style */}
    <rect x="2" y="4" width="76" height="42" rx="6" fill="#00629B" />
    <path d="M40 9L60 25L40 41L20 25L40 9Z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <circle cx="40" cy="25" r="6" fill="#FFFFFF" />
    <text x="90" y="24" fill="#00629B" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">IEEE</text>
    <text x="90" y="38" fill="#0F2942" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">Pune Section</text>
    <text x="90" y="47" fill="#059669" fontSize="8" fontWeight="600" fontFamily="sans-serif">Technical Sponsor</text>
  </svg>
);
