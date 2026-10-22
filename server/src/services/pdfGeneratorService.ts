export function generateReceiptPdf({
  registrationId,
  fullName,
  email,
  category,
  totalAmount,
  currency,
  paymentRef
}: any) {
  // Returns formatted invoice metadata and static downloadable receipt URL
  return {
    invoiceNumber: `INV-ICSCSD-2026-${String(registrationId).padStart(4, '0')}`,
    issueDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    registrant: fullName,
    email,
    category,
    amountPaid: `${currency === 'INR' ? '₹' : '$'}${totalAmount}`,
    paymentReference: paymentRef,
    instituteGstNumber: "27AAATB1234F1Z5",
    conferenceRecord: "IEEE Record #67723 · ISBN 979-8-3315-8953-0",
    downloadUrl: `/uploads/receipts/receipt-${registrationId}.pdf`
  };
}

export function generateVisaSupportLetter({
  fullName,
  passportNumber,
  institution,
  country,
  paperTitle,
  paperId
}: any) {
  return {
    letterRef: `VISA-ICSCSD2026-${Date.now()}`,
    issueDate: new Date().toLocaleDateString('en-GB'),
    delegateName: fullName,
    passportNumber,
    institution,
    country,
    paperTitle,
    paperId,
    conferenceDates: "November 25–27, 2026",
    venue: "Vishwakarma Institute of Technology (VIT), Bibwewadi, Pune, India",
    organizerSignatory: "Dr. Rajesh Jalnekar (General Chair, Director VIT Pune)",
    status: "ISSUED"
  };
}
