export interface PricingParams {
  category: string;
  delegateType: 'INDIAN_INR' | 'INTERNATIONAL_USD';
  coAuthorCount?: number;
  paymentChannel?: 'RAZORPAY' | 'VIERP_PAYTM';
}

export const ICSCSD_FEE_MATRIX: Record<string, { INR: number; USD: number; label: string }> = {
  PROFESSIONAL_NON_IEEE: { INR: 8000, USD: 120, label: "Professional Member (non-IEEE)" },
  PROFESSIONAL_IEEE: { INR: 7500, USD: 110, label: "Professional Member (IEEE Member)" },
  STUDENT_NON_IEEE: { INR: 7000, USD: 100, label: "Student (non-IEEE)" },
  STUDENT_IEEE: { INR: 6500, USD: 90, label: "Student (IEEE)" },
  ATTENDEE: { INR: 3500, USD: 80, label: "Attendee (Non-Author)" }
};

export const CO_AUTHOR_FEE_INR = 2500;
export const CO_AUTHOR_FEE_USD = 40;

export function calculateRegistrationPricing({
  category,
  delegateType,
  coAuthorCount = 0,
  paymentChannel = 'RAZORPAY'
}: PricingParams) {
  // Normalize category key if passed as plain label
  let key = category;
  if (!ICSCSD_FEE_MATRIX[key]) {
    for (const [k, v] of Object.entries(ICSCSD_FEE_MATRIX)) {
      if (v.label.toLowerCase() === category.toLowerCase()) {
        key = k;
        break;
      }
    }
  }

  const tier = ICSCSD_FEE_MATRIX[key] || ICSCSD_FEE_MATRIX.PROFESSIONAL_NON_IEEE;
  const currency = delegateType === 'INDIAN_INR' ? 'INR' : 'USD';
  const baseAmount = tier[currency];
  const coAuthorAmount = currency === 'INR' ? coAuthorCount * CO_AUTHOR_FEE_INR : coAuthorCount * CO_AUTHOR_FEE_USD;
  const subtotal = baseAmount + coAuthorAmount;

  // 18% GST split as 9% CGST + 9% SGST for INR delegates
  const cgstAmount = currency === 'INR' ? +(subtotal * 0.09).toFixed(2) : 0;
  const sgstAmount = currency === 'INR' ? +(subtotal * 0.09).toFixed(2) : 0;
  const totalWithGst = +(subtotal + cgstAmount + sgstAmount).toFixed(2);

  // 2% Razorpay convenience fee when paying via integrated Razorpay checkout
  const convenienceFee = paymentChannel === 'RAZORPAY' ? +(totalWithGst * 0.02).toFixed(2) : 0;
  const totalPayable = +(totalWithGst + convenienceFee).toFixed(2);

  return {
    categoryKey: key,
    categoryLabel: tier.label,
    currency,
    baseAmount,
    coAuthorCount,
    coAuthorAmount,
    subtotal,
    cgstAmount,
    sgstAmount,
    totalWithGst,
    convenienceFee,
    totalPayable
  };
}
