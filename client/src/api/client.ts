import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staticFallbackData } from '../data/staticFallback';
import { BootstrapResponse, CommitteeMember, ProposalSubmission, PaymentVerification } from '../types';

const API_BASE = '/api';

// Fetch Bootstrap data with seamless fallback
export const fetchBootstrap = async (): Promise<BootstrapResponse> => {
  try {
    const res = await fetch(`${API_BASE}/bootstrap`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
  } catch (err) {
    console.warn('Backend API unavailable. Using static fallback data:', err);
  }
  return staticFallbackData;
};

export const useBootstrap = () => {
  return useQuery({
    queryKey: ['bootstrap'],
    queryFn: fetchBootstrap,
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: staticFallbackData
  });
};

// Fetch Committee with query params
export const fetchCommittee = async (category?: string, search?: string): Promise<CommitteeMember[]> => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'ALL') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/committee?${params.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch (err) {
    console.warn('API committee fetch failed, filtering locally:', err);
  }

  // Local fallback filtering
  let list = staticFallbackData.committee;
  if (category && category !== 'ALL') {
    list = list.filter(m => m.category === category);
  }
  if (search && search.trim() !== '') {
    const s = search.toLowerCase();
    list = list.filter(
      m =>
        m.fullName.toLowerCase().includes(s) ||
        m.roleOrAffiliation.toLowerCase().includes(s) ||
        m.categoryLabel.toLowerCase().includes(s)
    );
  }
  return list;
};

// Submit In-App Proposal (Multipart)
export const submitProposalApi = async (formData: FormData) => {
  const res = await fetch(`${API_BASE}/proposals`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit proposal');
  }
  return data;
};

// Submit Payment Verification
export const submitPaymentVerificationApi = async (formData: FormData) => {
  const res = await fetch(`${API_BASE}/registrations/verify`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit payment verification');
  }
  return data;
};

// Admin Auth Helper
export const getAdminToken = () => localStorage.getItem('icscsd_admin_token');
export const setAdminToken = (token: string) => localStorage.setItem('icscsd_admin_token', token);
export const removeAdminToken = () => localStorage.removeItem('icscsd_admin_token');

export const adminLoginApi = async (credentials: { email: string; password: string }) => {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  if (data.token) {
    setAdminToken(data.token);
  }
  return data;
};

// Admin Fetch Stats
export const fetchAdminStats = async () => {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch admin stats');
  return data.data;
};

// Admin Fetch Proposals
export const fetchAdminProposals = async (): Promise<ProposalSubmission[]> => {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/admin/proposals`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch proposals');
  return data.data;
};

// Admin Update Proposal Status
export const updateProposalStatusApi = async ({ id, status }: { id: number; status: string }) => {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/admin/proposals/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update proposal status');
  return data;
};

// Admin Fetch Payment Verifications
export const fetchAdminVerifications = async (): Promise<PaymentVerification[]> => {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/admin/verifications`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch verifications');
  return data.data;
};

// Admin Toggle Payment Verification
export const toggleVerificationApi = async ({ id, verified }: { id: number; verified: boolean }) => {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/admin/verifications/${id}/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ verified })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle verification');
  return data;
};

// Calculate Registration Pricing Live
export const calculatePricingApi = async (params: {
  category: string;
  delegateType: 'INDIAN_INR' | 'INTERNATIONAL_USD';
  coAuthorCount?: number;
  paymentChannel?: 'RAZORPAY' | 'VIERP_PAYTM';
}) => {
  const res = await fetch(`${API_BASE}/registrations/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to calculate pricing');
  return data.data;
};

// Create Razorpay Order
export const createRazorpayOrderApi = async (formData: any) => {
  const res = await fetch(`${API_BASE}/registrations/razorpay/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to initialize payment');
  return data.data;
};

// Verify Razorpay Payment
export const verifyRazorpayPaymentApi = async (paymentData: any) => {
  const res = await fetch(`${API_BASE}/registrations/razorpay/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Payment verification failed');
  return data;
};

// Submit Camera Ready .zip Manuscript
export const submitCameraReadyApi = async (formData: FormData) => {
  const res = await fetch(`${API_BASE}/submissions/camera-ready`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Camera-ready submission validation failed');
  return data;
};

// Submit Contact Inquiry
export const submitContactInquiryApi = async (inquiryData: { name: string; email: string; subject?: string; message: string }) => {
  const res = await fetch(`${API_BASE}/public/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to send message');
  return data;
};

// Request Visa Support Letter
export const requestVisaLetterApi = async (letterData: any) => {
  const res = await fetch(`${API_BASE}/authors/visa-letter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(letterData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to generate Visa Support Letter');
  return data;
};

// Lookup Author Registrations & Submissions
export const lookupAuthorApi = async (query: string) => {
  const res = await fetch(`${API_BASE}/authors/lookup?query=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Author lookup failed');
  return data.data;
};

