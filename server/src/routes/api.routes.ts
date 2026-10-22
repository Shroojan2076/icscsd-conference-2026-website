import { Router } from 'express';
import {
  getBootstrap,
  getConfig,
  getDates,
  getTracks,
  getCommittee,
  getRegistrationTiers,
  submitContactInquiry
} from '../controllers/public.controller';
import { submitProposal } from '../controllers/proposal.controller';
import {
  verifyPayment,
  calculatePricing,
  createRazorpayOrder,
  verifyRazorpayPayment
} from '../controllers/registration.controller';
import {
  submitCameraReady,
  requestVisaLetter,
  lookupAuthor
} from '../controllers/submission.controller';
import {
  adminLogin,
  getAdminStats,
  updateConfig,
  createDate,
  updateDate,
  deleteDate,
  createTrack,
  updateTrack,
  deleteTrack,
  getAdminProposals,
  updateProposalStatus,
  getAdminPaymentVerifications,
  toggleVerificationStatus
} from '../controllers/admin.controller';
import { authenticateAdmin } from '../middlewares/auth.middleware';
import { uploadProposalPdf, uploadZip } from '../middlewares/upload.middleware';

const router = Router();

// ================= PUBLIC ROUTES =================
router.get('/bootstrap', getBootstrap);
router.get('/config', getConfig);
router.get('/dates', getDates);
router.get('/tracks', getTracks);
router.get('/committee', getCommittee);
router.get('/registrations/tiers', getRegistrationTiers);

// Contact Inquiry
router.post('/public/contact', submitContactInquiry);
router.post('/contact', submitContactInquiry);

// Registration & Pricing
router.post('/registrations/calculate', calculatePricing);
router.post('/registrations/razorpay/create-order', createRazorpayOrder);
router.post('/registrations/razorpay/verify', verifyRazorpayPayment);

// Proposal submission with PDF attachment (Tutorials & Special Sessions)
router.post('/proposals', uploadProposalPdf.single('proposalPdf'), submitProposal);
router.post('/proposals/tutorials', uploadProposalPdf.single('proposalPdf'), submitProposal);
router.post('/proposals/special-sessions', uploadProposalPdf.single('proposalPdf'), submitProposal);

// Payment verification submission (VIERP / Paytm)
router.post('/registrations/verify', uploadProposalPdf.single('receiptFile'), verifyPayment);
router.post('/registrations/vierp/submit-proof', uploadProposalPdf.single('receiptFile'), verifyPayment);

// Camera-Ready Manuscript Submission (.zip with adm-zip and pdf-lib validation)
router.post('/submissions/camera-ready', uploadZip.single('zipFile'), submitCameraReady);

// Author Portal Services
router.post('/authors/visa-letter', requestVisaLetter);
router.get('/authors/lookup', lookupAuthor);

// Admin Authentication
router.post('/admin/login', adminLogin);

// ================= PROTECTED ADMIN CMS ROUTES =================
router.use('/admin', authenticateAdmin);

// Dashboard stats
router.get('/admin/stats', getAdminStats);

// Config update
router.put('/admin/config', updateConfig);

// Important Dates management
router.post('/admin/dates', createDate);
router.put('/admin/dates/:id', updateDate);
router.delete('/admin/dates/:id', deleteDate);

// Tracks management
router.post('/admin/tracks', createTrack);
router.put('/admin/tracks/:id', updateTrack);
router.delete('/admin/tracks/:id', deleteTrack);

// Proposal Review
router.get('/admin/proposals', getAdminProposals);
router.put('/admin/proposals/:id/status', updateProposalStatus);

// Payment Verifications Review
router.get('/admin/verifications', getAdminPaymentVerifications);
router.put('/admin/verifications/:id/verify', toggleVerificationStatus);

export default router;
