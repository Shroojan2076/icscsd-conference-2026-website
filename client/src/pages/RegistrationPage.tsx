import React, { useState } from 'react';
import {
  CreditCard,
  ExternalLink,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserCheck,
  ShieldCheck,
  Building,
  LogIn,
  Info,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useBootstrap } from '../api/client';
import { RegistrationModal } from '../components/RegistrationModal';

export const RegistrationPage: React.FC = () => {
  const { data } = useBootstrap();
  const tiers = data.registrationTiers;
  const config = data.config;

  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('PROFESSIONAL_IEEE');
  const [vierpTab, setVierpTab] = useState<'INTERNAL' | 'EXTERNAL'>('INTERNAL');

  // Accordion open/close state for all 14 policies
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: true, // No-show policy open by default
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false
  });

  const toggleAccordion = (id: number) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openRegistrationForCategory = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setRegistrationModalOpen(true);
  };

  // 14 ICBDS Policies Definition
  const policies = [
    {
      id: 1,
      title: '1. Author Registration Requirements',
      content:
        'To be included in the ICSCSD 2026 Conference Program and submitted to IEEE Xplore, at least one author of each accepted paper must complete author registration by 15 September 2026. The registered author name, affiliation, and Microsoft CMT Paper ID must match the accepted manuscript record exactly. Each registration covers publication of one accepted paper (4–6 pages). An electronic copyright form (eCF) must be submitted through Microsoft CMT.'
    },
    {
      id: 2,
      title: '2. Registration Entitlements',
      content:
        'Each full author registration entitles one delegate to: access to all technical tracks, keynote sessions, paper presentation slot, official conference kit, delegate badge, presentation/participation certificate, and conference lunches and refreshment breaks during November 25–27, 2026. Co-authors and accompanying persons attending sessions must register separately under the Co-Author add-on fee.'
    },
    {
      id: 3,
      title: '3. Eligibility & Membership Verification (IEEE & Student Status)',
      content:
        'Delegates registering under the IEEE Member or Student Member tiers must furnish a valid IEEE Membership Number and upload an active membership card proof during registration. Student registrants must provide a valid Student Identity Card or certificate signed by the Head of Institution. If submitted credentials cannot be validated by the Finance Committee, the registration will be reclassified to the non-member/professional tier, and the delegate will be required to pay the differential fee before badge issuance.'
    },
    {
      id: 4,
      title: '4. IEEE No-Show Policy',
      content:
        'IEEE policy mandates live presentation of all accepted technical papers by an author or co-author. Any accepted paper that is not presented during its scheduled technical session will be officially designated as a "No-Show". No-show papers will be excluded from the conference proceedings and will NOT be submitted to the IEEE Xplore Digital Library. No refund of registration fees will be granted under any circumstance for no-show papers.'
    },
    {
      id: 5,
      title: '5. Substitute Presenter Rules',
      content:
        'If the primary registered author cannot present due to unavoidable circumstances, a listed co-author who is registered may deliver the presentation. The corresponding author must submit a formal written request to viticscsd@gmail.com and the TPC Chairs at least 7 days before the conference, specifying the reason and the approved co-author details. Presentations by non-authors are strictly prohibited.'
    },
    {
      id: 6,
      title: '6. Hybrid & Online Presentation Requirements',
      content:
        'For delegates approved for online presentation: authors must log in to the designated virtual conference room at least 15 minutes prior to their session. The virtual display name must follow the pattern: [PaperID] - [Registered Author Name]. High-speed internet connectivity, functional webcam, and clear audio are mandatory. Pre-recorded video presentations are not accepted without live interactive Q&A.'
    },
    {
      id: 7,
      title: '7. Cancellation & Refund Policy',
      content:
        'Registration fees, taxes (CGST/SGST), and payment gateway convenience charges are strictly NON-REFUNDABLE. In case of verified accidental duplicate payments, the refund request must be lodged within 5 business days with proof of duplicate debits. Approved refunds will be processed after deducting a 10% administrative fee and applicable tax/gateway costs within 30 days post-conference.'
    },
    {
      id: 8,
      title: '8. Registration Transfer & Corrections',
      content:
        'Registrations are non-transferable to other papers or individuals except with written consent from the Conference Secretariat. Correction requests regarding author names, paper titles, or affiliation details on certificates must be submitted before 15 October 2026. No changes will be entertained once IEEE proceedings metadata is locked.'
    },
    {
      id: 9,
      title: '9. Paper Withdrawal Policy',
      content:
        'A formal paper withdrawal request must be initiated exclusively by the corresponding author via an email to viticscsd@gmail.com, citing Paper ID, manuscript title, detailed justification, and signed concurrence from all co-authors. Papers cannot be withdrawn after the camera-ready deadline or after registration fees have been processed.'
    },
    {
      id: 10,
      title: '10. Visa Support Letters',
      content:
        'Official Visa Support Letters will be issued exclusively to registered international delegates who have completed full fee payment. Letters are issued solely for the purpose of facilitating visa applications to attend ICSCSD 2026 and do not imply any financial sponsorship, travel support, or responsibility on the part of VIT Pune or IEEE.'
    },
    {
      id: 11,
      title: '11. Payment & GST Invoice Conditions',
      content:
        'All Indian rupee payments are subject to statutory Goods and Services Tax (GST) at 18% (split as 9% CGST + 9% SGST). Delegates requiring institutional GST tax invoices must supply their organization’s 15-digit GSTIN and legal billing address at checkout. Invoices once issued cannot be amended retroactively.'
    },
    {
      id: 12,
      title: '12. Code of Conduct & Anti-Harassment',
      content:
        'ICSCSD 2026 is committed to providing an inclusive, safe, and harassment-free environment for all participants regardless of gender, sexual orientation, disability, physical appearance, race, nationality, or religion. Unacceptable behavior in oral sessions, online chat rooms, or social functions will result in immediate expulsion without refund and reporting to home institutions.'
    },
    {
      id: 13,
      title: '13. Photography & Recording Consent',
      content:
        'By attending ICSCSD 2026 (in-person or virtually), delegates grant VIT Pune and IEEE the right to record, photograph, broadcast, and archive presentations, discussions, and delegate interactions for academic proceedings, marketing, and institutional documentation.'
    },
    {
      id: 14,
      title: '14. Participant Declaration',
      content:
        'By completing registration through the Razorpay gateway or VIERP portal, the registrant declares that: (1) The manuscript represents original work, (2) All authors approved submission, (3) Plagiarism is strictly <10%, (4) The paper will be presented live, (5) Non-refundable fee terms are accepted, and (6) IEEE Xplore terms and conditions are binding.'
    }
  ];

  // 8-Step Stepper Definitions
  const steps = [
    { num: 1, title: 'Choose Category', desc: 'Select appropriate IEEE or Non-Member category based on credentials.' },
    { num: 2, title: 'Enter Paper ID', desc: 'Provide Microsoft CMT Paper ID, paper title, and registrant details.' },
    { num: 3, title: 'Review Tax & Fees', desc: 'Verify itemized breakdown: Base Fee + 18% GST + Co-Author add-on.' },
    { num: 4, title: 'Accept Policies', desc: 'Acknowledge the IEEE No-Show Policy and Registration Declaration.' },
    { num: 5, title: 'Execute Payment', desc: 'Pay securely via integrated Razorpay gateway or VIT VIERP portal.' },
    { num: 6, title: 'Download Invoice', desc: 'Save your GST Tax Invoice and official payment confirmation receipt.' },
    { num: 7, title: 'Email Notification', desc: 'Receive your registration confirmation and delegate pass in email.' },
    { num: 8, title: 'Secretariat Support', desc: 'Contact finance desk if receipt is not reconciled within 48 hours.' }
  ];

  return (
    <div>
      {/* Banner */}
      <section className="section section--dark" style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="badge badge--primary" style={{ alignSelf: 'flex-start' }}>
            IEEE Conference Record #67723 · Registration Portal
          </span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: '#ffffff' }}>
            Conference Registration & Fee Matrix
          </h1>
          <p style={{ color: 'var(--color-border-subtle)', maxWidth: '820px', fontSize: 'var(--text-base)' }}>
            Welcome to the official registration portal for ICSCSD 2026. Register your accepted paper or attendee pass through the integrated Razorpay checkout or via VIT Pune’s learner.vierp.in portal.
          </p>

          <div style={{ marginTop: '8px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openRegistrationForCategory('PROFESSIONAL_IEEE')}
              className="btn btn--gold"
            >
              <CreditCard size={15} />
              <span>Register Online via Razorpay</span>
            </button>
            <a href="#vierp-instructions" className="btn btn--outline">
              <span>VIERP ERP Payment Instructions</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBlock: 'var(--space-10)' }}>
        {/* 1. Official Registration Fee Schedule Table */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="policy-card__header">
            <CreditCard size={24} style={{ color: 'var(--color-ieee-blue)' }} />
            <div>
              <h2 className="policy-card__title">
                Registration Fee Schedule
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                All Indian author fees include statutory 18% GST (9% CGST + 9% SGST)
              </span>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginBlock: 'var(--space-4)' }}>
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Member Category</th>
                  <th style={{ textAlign: 'center' }}>Indian Base Fee</th>
                  <th style={{ textAlign: 'center' }}>18% GST (CGST + SGST)</th>
                  <th style={{ textAlign: 'center' }}>Total Indian Fee</th>
                  <th style={{ textAlign: 'center' }}>Foreign Author Fee</th>
                  <th style={{ textAlign: 'center' }}>Online Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Professional Member (non-IEEE)</strong>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>₹8,000</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>₹1,440</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-navy-950)' }}>₹9,440</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-emerald-600)' }}>$120</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => openRegistrationForCategory('PROFESSIONAL_NON_IEEE')}
                      className="btn btn--primary"
                      style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                    >
                      Register Now
                    </button>
                  </td>
                </tr>

                <tr style={{ backgroundColor: 'var(--color-ieee-blue-light)' }}>
                  <td>
                    <strong>Professional Member (IEEE Member)</strong>
                    <span className="badge badge--primary" style={{ marginLeft: '8px', fontSize: '0.65rem' }}>IEEE Discount</span>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>₹7,500</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>₹1,350</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-ieee-blue)' }}>₹8,850</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-emerald-600)' }}>$110</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => openRegistrationForCategory('PROFESSIONAL_IEEE')}
                      className="btn btn--gold"
                      style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                    >
                      Register Now
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Student (non-IEEE)</strong>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>₹7,000</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>₹1,260</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-navy-950)' }}>₹8,260</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-emerald-600)' }}>$100</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => openRegistrationForCategory('STUDENT_NON_IEEE')}
                      className="btn btn--primary"
                      style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                    >
                      Register Now
                    </button>
                  </td>
                </tr>

                <tr style={{ backgroundColor: 'var(--color-ieee-blue-light)' }}>
                  <td>
                    <strong>Student (IEEE Member)</strong>
                    <span className="badge badge--primary" style={{ marginLeft: '8px', fontSize: '0.65rem' }}>IEEE Student Discount</span>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>₹6,500</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>₹1,170</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-ieee-blue)' }}>₹7,670</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-emerald-600)' }}>$90</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => openRegistrationForCategory('STUDENT_IEEE')}
                      className="btn btn--gold"
                      style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                    >
                      Register Now
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Attendee (Non-Author)</strong>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>₹3,500</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>₹630</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-navy-950)' }}>₹4,130</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-emerald-600)' }}>$80</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => openRegistrationForCategory('ATTENDEE')}
                      className="btn btn--primary"
                      style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                    >
                      Register Now
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Co-Author Callout Banner */}
          <div className="alert-box alert-box--warning" style={{ marginTop: '16px', marginBottom: 0 }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Accompanying Co-Author Add-On Rule:</strong> ₹2,500 (+ 18% GST where applicable) additional charge for any accompanying co-author attending the conference in person.
            </div>
          </div>
        </div>

        {/* 2. 8-Step Visual Registration Process Stepper */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div className="section-header" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="badge badge--primary">Step-by-Step Guide</span>
            <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy-950)' }}>
              8-Step Registration Workflow
            </h3>
          </div>

          <div className="stepper">
            {steps.map(step => (
              <div key={step.num} className="step-card">
                <div className="step-card__number">{step.num}</div>
                <div className="step-card__content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Official VIT Pune VIERP ERP Portal Instructions */}
        <div id="vierp-instructions" className="policy-card" style={{ marginBottom: 'var(--space-10)', borderLeft: '4px solid var(--color-emerald-600)' }}>
          <div className="policy-card__header">
            <Building size={24} style={{ color: 'var(--color-emerald-600)' }} />
            <div>
              <h3 className="policy-card__title">
                Official VIT Pune VIERP ERP Payment Instructions (Paytm Gateway)
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Alternative registration pathway retained from legacy ICSCSD VIT ERP system
              </span>
            </div>
          </div>

          {/* Tab Selector */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            <button
              type="button"
              onClick={() => setVierpTab('INTERNAL')}
              className={`btn ${vierpTab === 'INTERNAL' ? 'btn--primary' : 'btn--outline'}`}
              style={{
                fontSize: '0.78rem',
                padding: '6px 14px',
                ...(vierpTab !== 'INTERNAL' ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {})
              }}
            >
              <span>For VIT Students / Internal Participants</span>
            </button>
            <button
              type="button"
              onClick={() => setVierpTab('EXTERNAL')}
              className={`btn ${vierpTab === 'EXTERNAL' ? 'btn--primary' : 'btn--outline'}`}
              style={{
                fontSize: '0.78rem',
                padding: '6px 14px',
                ...(vierpTab !== 'EXTERNAL' ? { color: 'var(--color-navy-900)', borderColor: 'var(--color-border-strong)' } : {})
              }}
            >
              <span>For External Students / Delegates</span>
            </button>
          </div>

          {/* Tab 1: VIT Internal Students */}
          {vierpTab === 'INTERNAL' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              <p>
                <strong>Step 1:</strong> Log in to the VIT Learner portal at{' '}
                <a href="https://learner.vierp.in" target="_blank" rel="noreferrer" style={{ color: 'var(--color-ieee-blue)', fontWeight: 700 }}>
                  https://learner.vierp.in
                </a>{' '}
                using your <strong>PRN No.</strong> as both username and password.
              </p>
              <p>
                <strong>Step 2:</strong> Click on the <strong>'Event'</strong> tab on the left navigation panel.
              </p>
              <p>
                <strong>Step 3:</strong> Select <strong>Organizing Institute: VIT, Pune</strong>.
              </p>
              <p>
                <strong>Step 4:</strong> Select <strong>Event: ICSCSD 2026</strong>.
              </p>
              <p>
                <strong>Step 5:</strong> Click on <strong>Pay Fees</strong>.
              </p>
              <p>
                <strong>Step 6:</strong> Select Payment Gateway <strong>PAYTM</strong> and complete your payment.
              </p>
              <p>
                <strong>Step 7:</strong> Save your Paytm transaction receipt and log it in the Author Portal for pass issuance.
              </p>
              <div style={{ marginTop: '12px' }}>
                <a
                  href="https://learner.vierp.in"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                  style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                  <LogIn size={14} />
                  <span>Open VIERP Student Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ) : (
            /* Tab 2: External Delegates */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              <p>
                <strong>Step 1:</strong> Go to{' '}
                <a href="https://learner.vierp.in/events" target="_blank" rel="noreferrer" style={{ color: 'var(--color-ieee-blue)', fontWeight: 700 }}>
                  https://learner.vierp.in/events
                </a>.
              </p>
              <p>
                <strong>Step 2:</strong> Click on <strong>Signup</strong> and sign in using your Gmail account.
              </p>
              <p>
                <strong>Step 3:</strong> Navigate to the <strong>'Pay Event Fees'</strong> tab.
              </p>
              <p>
                <strong>Step 4:</strong> Choose Organizing Institute: <strong>VIT, Pune</strong>.
              </p>
              <p>
                <strong>Step 5:</strong> Choose Event: <strong>ICSCSD 2026</strong>.
              </p>
              <p>
                <strong>Step 6:</strong> Click on <strong>Pay Fees</strong>, select <strong>PAYTM</strong>, and complete transaction.
              </p>
              <div style={{ marginTop: '12px' }}>
                <a
                  href="https://learner.vierp.in/events"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                  style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                  <LogIn size={14} />
                  <span>Open VIERP External Events Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 4. All 14 ICBDS Registration Policy & Compliance Sections */}
        <div>
          <div className="section-header" style={{ marginBottom: 'var(--space-6)' }}>
            <span className="badge badge--warning">IEEE Compliance & Institutional Regulations</span>
            <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-navy-950)' }}>
              Registration Policies & Compliance Suite (14 Sections)
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              Please review all official policies governing author registration, no-shows, IEEE Xplore submission, taxes, and code of conduct.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {policies.map(p => {
              const isOpen = openAccordions[p.id];
              return (
                <div key={p.id} className="accordion">
                  <button
                    type="button"
                    className="accordion__header"
                    onClick={() => toggleAccordion(p.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{p.title}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="accordion__body">
                      {p.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick In-App Registration & Tax Calculation Modal */}
      <RegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        defaultCategory={selectedCategory}
      />
    </div>
  );
};
