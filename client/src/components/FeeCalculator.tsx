import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, UserCheck, Users, IndianRupee, DollarSign, ArrowRight, Copy, Check } from 'lucide-react';
import { RegistrationTier } from '../types';

interface FeeCalculatorProps {
  tiers: RegistrationTier[];
  coAuthorAddonFeeInr?: number;
  onSelectTier?: (tier: RegistrationTier, coAuthors: number, total: number, currency: string) => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({
  tiers,
  coAuthorAddonFeeInr = 2500,
  onSelectTier
}) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [participantType, setParticipantType] = useState<'PROFESSIONAL' | 'STUDENT' | 'ATTENDEE'>('PROFESSIONAL');
  const [isIeeeMember, setIsIeeeMember] = useState<boolean>(false);
  const [coAuthorCount, setCoAuthorCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Match the active tier
  const matchedTier = useMemo(() => {
    if (participantType === 'ATTENDEE') {
      return tiers.find(t => t.participantType === 'ATTENDEE') || tiers[4];
    }
    return tiers.find(t => t.participantType === participantType && t.isIeeeMember === isIeeeMember) || tiers[0];
  }, [tiers, participantType, isIeeeMember]);

  // Calculations
  const baseFee = currency === 'INR' ? (matchedTier?.indianBaseFeeInr || 8000) : (matchedTier?.foreignFeeUsd || 120);
  const gstAmount = currency === 'INR' ? Math.round(baseFee * 0.18) : 0;
  const coAuthorFeeTotal = currency === 'INR' ? (coAuthorCount * coAuthorAddonFeeInr) : (coAuthorCount * 30); // $30 equivalent for foreign co-authors or Rs. 2500
  const grandTotal = baseFee + gstAmount + coAuthorFeeTotal;

  const handleCopyBreakdown = () => {
    const text = `ICSCSD 2026 Registration Fee Estimate:
- Category: ${matchedTier?.memberCategory}
- Base Fee: ${currency === 'INR' ? `Rs. ${baseFee}` : `$${baseFee}`}
- GST (18%): ${currency === 'INR' ? `Rs. ${gstAmount}` : 'N/A'}
- Co-Authors (${coAuthorCount}): ${currency === 'INR' ? `Rs. ${coAuthorFeeTotal}` : `$${coAuthorFeeTotal}`}
- Grand Total: ${currency === 'INR' ? `Rs. ${grandTotal}` : `$${grandTotal}`}
Portal: https://learner.vierp.in`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#00629B]/20 shadow-lg p-5 sm:p-7 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full pointer-events-none -z-0"></div>

      <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-[#0F2942] to-[#00629B] text-white rounded-xl shadow-xs">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0F2942]">Interactive Registration Fee Calculator</h3>
          <p className="text-xs text-slate-500">
            Compute your exact conference registration fees with applicable IEEE discounts, GST (for Indian authors), and accompanying co-authors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Currency Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              1. Author Region & Currency
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-sm font-semibold transition ${
                  currency === 'INR'
                    ? 'bg-[#0F2942] text-white border-[#0F2942] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <IndianRupee className="w-4 h-4" />
                <span>Indian Author (INR + 18% GST)</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-sm font-semibold transition ${
                  currency === 'USD'
                    ? 'bg-[#0F2942] text-white border-[#0F2942] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Foreign Author (USD)</span>
              </button>
            </div>
          </div>

          {/* Participant Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              2. Participant Classification
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'PROFESSIONAL', label: 'Professional / Faculty' },
                { id: 'STUDENT', label: 'Student / Scholar' },
                { id: 'ATTENDEE', label: 'General Attendee' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setParticipantType(item.id as any)}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition text-center ${
                    participantType === item.id
                      ? 'bg-[#00629B] text-white border-[#00629B] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* IEEE Member Discount Toggle (disabled for Attendee) */}
          {participantType !== 'ATTENDEE' && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-[#00629B]" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Are you an active IEEE Member?</span>
                    <span className="text-xs text-slate-500">
                      Eligible for special subsidized IEEE Member rates (save Rs. 500-590 / $10-$20).
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsIeeeMember(!isIeeeMember)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isIeeeMember ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isIeeeMember ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Co-Authors Add-on */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-slate-700" />
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Accompanying Co-Authors</span>
                  <span className="text-xs text-slate-500">
                    Additional charge of Rs. 2,500 per accompanying co-author.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCoAuthorCount(num)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition ${
                      coAuthorCount === num
                        ? 'bg-[#0F2942] text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Calculation Result Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-[#0F2942] text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Calculated Pricing Summary</span>
            </div>

            <div className="text-base font-bold text-slate-200 mb-1">
              {matchedTier?.memberCategory}
            </div>
            <div className="text-xs text-slate-400 mb-4">
              {currency === 'INR' ? 'Indian Author Tier (with 18% GST included)' : 'Foreign Author International Tier'}
            </div>

            {/* Price Line Items */}
            <div className="space-y-2.5 border-t border-slate-700/80 pt-4 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Conference Registration:</span>
                <span className="font-mono font-semibold">
                  {currency === 'INR' ? `₹${baseFee.toLocaleString('en-IN')}` : `$${baseFee}`}
                </span>
              </div>

              {currency === 'INR' && (
                <div className="flex justify-between text-slate-300">
                  <span>Goods & Services Tax (18% GST):</span>
                  <span className="font-mono font-semibold">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {coAuthorCount > 0 && (
                <div className="flex justify-between text-emerald-300">
                  <span>Co-Author Add-on ({coAuthorCount} × {currency === 'INR' ? '₹2,500' : '$30'}):</span>
                  <span className="font-mono font-semibold">
                    {currency === 'INR' ? `+₹${coAuthorFeeTotal.toLocaleString('en-IN')}` : `+$${coAuthorFeeTotal}`}
                  </span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="border-t border-slate-700/80 mt-4 pt-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block">Total Payable Amount</span>
                <span className="text-[11px] text-emerald-400 font-medium">All taxes included</span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {currency === 'INR' ? `₹${grandTotal.toLocaleString('en-IN')}` : `$${grandTotal}`}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2.5">
            <button
              type="button"
              onClick={handleCopyBreakdown}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition border border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Breakdown Copied to Clipboard!' : 'Copy Price Breakdown'}</span>
            </button>

            {onSelectTier && matchedTier && (
              <button
                type="button"
                onClick={() => onSelectTier(matchedTier, coAuthorCount, grandTotal, currency)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
              >
                <span>Proceed to Receipt Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
