import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Shield, CreditCard, Download, FileText } from 'lucide-react';
import { calculatePricingApi, createRazorpayOrderApi, verifyRazorpayPaymentApi } from '../api/client';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof (window as any).Razorpay !== 'undefined') {
      return resolve(true);
    }
    const existing = document.getElementById('razorpay-checkout-script');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'PROFESSIONAL_IEEE'
}) => {
  const [category, setCategory] = useState(defaultCategory);
  const [delegateType, setDelegateType] = useState<'INDIAN_INR' | 'INTERNATIONAL_USD'>('INDIAN_INR');
  const [coAuthorCount, setCoAuthorCount] = useState<number>(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [cmtPaperId, setCmtPaperId] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [ieeeNumber, setIeeeNumber] = useState('');
  const [acceptPolicies, setAcceptPolicies] = useState(false);

  // Pricing state
  const [pricing, setPricing] = useState<{
    categoryLabel?: string;
    currency: string;
    baseAmount: number;
    coAuthorCount: number;
    coAuthorAmount: number;
    subtotal: number;
    cgstAmount: number;
    sgstAmount: number;
    totalWithGst: number;
    convenienceFee: number;
    totalPayable: number;
  }>({
    categoryLabel: 'Professional Member (IEEE Member)',
    currency: 'INR',
    baseAmount: 7500,
    coAuthorCount: 0,
    coAuthorAmount: 0,
    subtotal: 7500,
    cgstAmount: 675,
    sgstAmount: 675,
    totalWithGst: 8850,
    convenienceFee: 177,
    totalPayable: 9027
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);

  // Sync category when defaultCategory prop changes
  useEffect(() => {
    if (defaultCategory) {
      setCategory(defaultCategory);
    }
  }, [defaultCategory]);

  // Recalculate pricing on input change
  useEffect(() => {
    let isMounted = true;
    calculatePricingApi({
      category,
      delegateType,
      coAuthorCount,
      paymentChannel: 'RAZORPAY'
    })
      .then(res => {
        if (isMounted && res) {
          setPricing(res);
        }
      })
      .catch(err => console.warn('Pricing calc failed, using local estimation:', err));
    return () => {
      isMounted = false;
    };
  }, [category, delegateType, coAuthorCount]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Full Name and Email Address are required.');
      return;
    }

    if (category.includes('IEEE') && !ieeeNumber.trim()) {
      setErrorMsg('IEEE Membership Number is required for IEEE discount tier.');
      return;
    }

    if (!acceptPolicies) {
      setErrorMsg('Please read and agree to the IEEE No-Show Policy and Registration Terms.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on backend with Razorpay API
      const orderRes = await createRazorpayOrderApi({
        fullName,
        email,
        phone,
        affiliation,
        category,
        delegateType,
        cmtPaperId,
        paperTitle,
        ieeeMembershipNumber: ieeeNumber,
        coAuthorCount
      });

      if (!orderRes || !orderRes.razorpayOrderId) {
        throw new Error('Failed to create Razorpay payment order on server.');
      }

      // 2. Ensure Razorpay Checkout script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof (window as any).Razorpay === 'undefined') {
        throw new Error('Razorpay Checkout SDK could not be loaded. Please check your internet connection.');
      }

      // 3. Configure Razorpay Checkout options
      const options = {
        key: orderRes.keyId,
        amount: orderRes.amount, // in paise (e.g. 902700 for ₹9,027.00)
        currency: orderRes.currency || 'INR',
        name: 'ICSCSD 2026 — VIT Pune',
        description: `Registration: ${pricing.categoryLabel || category}`,
        image: '/favicon.svg',
        order_id: orderRes.razorpayOrderId,
        handler: async function (response: any) {
          // This callback runs ONLY after payment succeeds inside the Razorpay popup
          try {
            setLoading(true);
            const verifyRes = await verifyRazorpayPaymentApi({
              registrationId: orderRes.registrationId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.success && verifyRes.data) {
              setPaymentSuccess(verifyRes.data);
            } else {
              setErrorMsg(verifyRes.message || 'Payment verification failed on server.');
            }
          } catch (vErr: any) {
            setErrorMsg(vErr.message || 'Payment verification failed on server.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: fullName,
          email: email,
          contact: phone
        },
        notes: {
          cmtPaperId: cmtPaperId || 'N/A',
          category: category,
          registrationId: orderRes.registrationId
        },
        theme: {
          color: '#0b192c'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (failureResponse: any) {
        setLoading(false);
        setErrorMsg(`Payment Declined: ${failureResponse.error?.description || 'Transaction failed.'}`);
      });

      setLoading(false);
      razorpayInstance.open();
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  const isIeeeCategory = category.includes('IEEE');

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'modal-backdrop--open' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3>ICSCSD 2026 Registration Checkout</h3>
            {/* <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
              IEEE Record #67723 · Razorpay Secure Gateway
            </span> */}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {paymentSuccess ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
              <CheckCircle size={60} style={{ color: 'var(--color-emerald-600)', margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
                Registration Confirmed!
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                Thank you, <strong>{fullName}</strong>. Your payment for <strong>{pricing.categoryLabel || category}</strong> has been successfully processed.
              </p>

              <div
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  textAlign: 'left',
                  margin: '0 auto 20px',
                  maxWidth: '460px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem'
                }}
              >
                <div>Registration ID: <strong>{paymentSuccess.registrationId}</strong></div>
                <div>Payment Ref: <strong>{paymentSuccess.paymentId}</strong></div>
                <div>Status: <span style={{ color: 'var(--color-emerald-600)', fontWeight: 700 }}>PAID / CONFIRMED</span></div>
                <div>Amount Paid: <strong>{paymentSuccess.invoice?.amountPaid || `${pricing.currency === 'INR' ? '₹' : '$'}${pricing.totalPayable}`}</strong></div>
                <div>GSTIN: <strong>{paymentSuccess.invoice?.instituteGstNumber || '27AAATB1234F1Z5'}</strong></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <a
                  href={`/api/authors/receipt?id=${paymentSuccess.registrationId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Download size={16} />
                  <span>Download GST Tax Invoice</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn--outline"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckout}>
              {errorMsg && (
                <div className="alert-box alert-box--danger" style={{ marginBottom: '16px' }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Category & Delegate Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label--required">Registration Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="PROFESSIONAL_NON_IEEE">Professional (non-IEEE) - ₹8,000 / $120</option>
                    <option value="PROFESSIONAL_IEEE">Professional (IEEE Member) - ₹7,500 / $110</option>
                    <option value="STUDENT_NON_IEEE">Student (non-IEEE) - ₹7,000 / $100</option>
                    <option value="STUDENT_IEEE">Student (IEEE Member) - ₹6,500 / $90</option>
                    <option value="ATTENDEE">Attendee (Non-Author) - ₹3,500 / $80</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label--required">Delegate Origin</label>
                  <select
                    className="form-select"
                    value={delegateType}
                    onChange={e => setDelegateType(e.target.value as any)}
                  >
                    <option value="INDIAN_INR">Indian Delegate (INR - ₹)</option>
                    <option value="INTERNATIONAL_USD">International Delegate (USD - $)</option>
                  </select>
                </div>
              </div>

              {/* Step 2: Registrant Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label--required">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Prof. / Dr. / Mr. / Ms. Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label--required">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="official@institution.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone / Mobile Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Institution / Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="University / Organization"
                    value={affiliation}
                    onChange={e => setAffiliation(e.target.value)}
                  />
                </div>
              </div>

              {/* Author Specific: Paper ID & Title */}
              {category !== 'ATTENDEE' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label--required">Microsoft CMT Paper ID</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 042"
                      value={cmtPaperId}
                      onChange={e => setCmtPaperId(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Paper Title</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Accepted Manuscript Title"
                      value={paperTitle}
                      onChange={e => setPaperTitle(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* IEEE Membership Verification Input */}
              {isIeeeCategory && (
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label form-label--required">
                    IEEE Membership Number (Proof will be verified by Finance Desk)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="8-digit IEEE Member ID"
                    value={ieeeNumber}
                    onChange={e => setIeeeNumber(e.target.value)}
                    required
                  />
                  {/* <div className="form-hint">
                    Note: Invalid or inactive IEEE credentials will trigger mandatory fee-difference reclassification per ICBDS/IEEE compliance.
                  </div> */}
                </div>
              )}

              {/* Accompanying Co-Author Add-On */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <label className="form-label">Accompanying Co-Authors Count</label>
                  <div className="form-hint">
                    ₹2,500 (+ 18% GST) additional charge per co-author attending in person
                  </div>
                </div>
                <div>
                  <select
                    className="form-select"
                    value={coAuthorCount}
                    onChange={e => setCoAuthorCount(Number(e.target.value))}
                  >
                    <option value={0}>0 (Primary Author Only)</option>
                    <option value={1}>1 Co-Author (+₹2,500)</option>
                    <option value={2}>2 Co-Authors (+₹5,000)</option>
                    <option value={3}>3 Co-Authors (+₹7,500)</option>
                    <option value={4}>4 Co-Authors (+₹10,000)</option>
                    <option value={5}>5 Co-Authors (+₹12,500)</option>
                  </select>
                </div>
              </div>

              {/* Live Dynamic Tax Breakdown Box */}
              <div className="tax-breakdown-box">
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy-950)', marginBottom: '8px' }}>
                  Itemized Fee & Tax Breakdown (GST & Gateway Compliance)
                </div>
                <table className="tax-table" style={{ width: '100%', fontSize: '0.84rem' }}>
                  <tbody>
                    <tr>
                      <td>Base Registration Fee:</td>
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                        {pricing.currency === 'INR' ? '₹' : '$'}{pricing.baseAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    {pricing.coAuthorCount > 0 && (
                      <tr>
                        <td>Co-Author Add-On ({pricing.coAuthorCount} × {pricing.currency === 'INR' ? '₹2,500' : '$40'}):</td>
                        <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          {pricing.currency === 'INR' ? '₹' : '$'}{pricing.coAuthorAmount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    )}
                    {pricing.currency === 'INR' && (
                      <>
                        <tr>
                          <td>Subtotal:</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                            ₹{pricing.subtotal.toLocaleString('en-IN')}
                          </td>
                        </tr>
                        <tr>
                          <td>CGST (9%):</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                            ₹{pricing.cgstAmount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                        <tr>
                          <td>SGST (9%):</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                            ₹{pricing.sgstAmount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                        <tr>
                          <td>Payment Gateway Convenience Fee (2%):</td>
                          <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                            ₹{pricing.convenienceFee.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr style={{ borderTop: '2px solid var(--color-border-strong)', fontWeight: 800, fontSize: '0.95rem' }}>
                      <td style={{ color: 'var(--color-navy-950)', paddingTop: '6px' }}>Total Amount Payable:</td>
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--color-ieee-blue)', paddingTop: '6px' }}>
                        {pricing.currency === 'INR' ? '₹' : '$'}{pricing.totalPayable.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Policy Checkbox */}
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  id="modal-policy-agree"
                  checked={acceptPolicies}
                  onChange={e => setAcceptPolicies(e.target.checked)}
                  style={{ marginTop: '3px' }}
                />
                <label htmlFor="modal-policy-agree" style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  I confirm the registrant and paper information is accurate. I understand and accept the IEEE No-Show Policy (live presentation is mandatory for IEEE Xplore submission) and non-refundable registration rules.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="modal-footer" style={{ marginTop: '20px', paddingBottom: 0 }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn--outline"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={loading}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <CreditCard size={16} />
                  <span>{loading ? 'Processing Order...' : `Proceed to Razorpay Payment (${pricing.currency === 'INR' ? '₹' : '$'}${pricing.totalPayable})`}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
