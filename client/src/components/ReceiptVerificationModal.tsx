import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send, FileCheck, Upload } from 'lucide-react';
import { submitPaymentVerificationApi } from '../api/client';
import { RegistrationTier } from '../types';

interface ReceiptVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiers: RegistrationTier[];
  initialTierId?: number;
  initialCoAuthors?: number;
  initialTotalAmount?: number;
  initialCurrency?: string;
}

export const ReceiptVerificationModal: React.FC<ReceiptVerificationModalProps> = ({
  isOpen,
  onClose,
  tiers,
  initialTierId = 1,
  initialCoAuthors = 0,
  initialTotalAmount = 9440,
  initialCurrency = 'INR'
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cmtPaperId, setCmtPaperId] = useState('');
  const [isVitStudent, setIsVitStudent] = useState(false);
  const [prnNumber, setPrnNumber] = useState('');
  const [tierId, setTierId] = useState(initialTierId);
  const [coAuthorsCount, setCoAuthorsCount] = useState(initialCoAuthors);
  const [currency, setCurrency] = useState<'INR' | 'USD'>(initialCurrency as any);
  const [totalPaidAmount, setTotalPaidAmount] = useState(initialTotalAmount);
  const [paytmTransactionId, setPaytmTransactionId] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!paytmTransactionId.trim()) {
      setErrorMsg('Please enter a valid Paytm / Bank Transaction Reference ID.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('cmtPaperId', cmtPaperId);
      formData.append('isVitStudent', String(isVitStudent));
      formData.append('prnNumber', prnNumber);
      formData.append('tierId', String(tierId));
      formData.append('coAuthorsCount', String(coAuthorsCount));
      formData.append('currency', currency);
      formData.append('totalPaidAmount', String(totalPaidAmount));
      formData.append('paytmTransactionId', paytmTransactionId.trim());

      if (receiptFile) {
        formData.append('receiptFile', receiptFile);
      }

      const res = await submitPaymentVerificationApi(formData);
      setSuccessData(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0F2942] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Post-Payment Receipt Verification</h3>
              <p className="text-xs text-slate-300">
                Log your VIERP / Paytm transaction ID for instant committee reconciliation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success View */}
        {successData ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Payment Verification Logged!</h4>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              {successData.message}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
              <div><strong className="font-sans text-slate-500">Transaction ID:</strong> {successData.data?.paytmTransactionId}</div>
              <div><strong className="font-sans text-slate-500">Amount Paid:</strong> {successData.data?.currency} {successData.data?.totalPaidAmount}</div>
              <div><strong className="font-sans text-slate-500">Status:</strong> <span className="text-emerald-700 font-bold">{successData.data?.status}</span></div>
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0F2942] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Author Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Author / Registrant Name"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629B]"
                />
              </div>
            </div>

            {/* CMT Paper ID & VIT Student PRN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Microsoft CMT Paper ID (Optional)
                </label>
                <input
                  type="text"
                  value={cmtPaperId}
                  onChange={e => setCmtPaperId(e.target.value)}
                  placeholder="e.g. CMT-ICSCSD-104"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629B]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    VIT Student PRN (if applicable)
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVitStudent}
                      onChange={e => setIsVitStudent(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>VIT Student?</span>
                  </label>
                </div>
                <input
                  type="text"
                  disabled={!isVitStudent}
                  value={prnNumber}
                  onChange={e => setPrnNumber(e.target.value)}
                  placeholder={isVitStudent ? "Enter your 8-digit PRN No." : "Disabled (non-VIT)"}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Tier & Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registration Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={tierId}
                  onChange={e => setTierId(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629B] bg-white font-medium"
                >
                  {tiers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.memberCategory} ({currency === 'INR' ? `₹${t.indianTotalFeeInr}` : `$${t.foreignFeeUsd}`})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Accompanying Co-Authors (Rs. 2,500 each)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={coAuthorsCount}
                  onChange={e => setCoAuthorsCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Paid Amount <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value as any)}
                    className="px-2 py-2 text-xs font-bold bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                  <input
                    type="number"
                    required
                    value={totalPaidAmount}
                    onChange={e => setTotalPaidAmount(Number(e.target.value))}
                    className="flex-1 px-3 py-2 text-sm rounded-r-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Paytm / Bank Transaction Ref ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={paytmTransactionId}
                  onChange={e => setPaytmTransactionId(e.target.value)}
                  placeholder="e.g. 202610221112128001..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00629B] font-mono text-xs"
                />
              </div>
            </div>

            {/* Receipt File */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Attach Payment Screenshot / PDF Receipt (Optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setReceiptFile(e.target.files[0]);
                    }
                  }}
                  className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-slate-200 hover:file:bg-slate-300"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Logging Verification...' : 'Submit Verification Form'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
