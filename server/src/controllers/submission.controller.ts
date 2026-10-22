import { Request, Response } from 'express';
import { validateCameraReadyZip } from '../services/zipValidatorService';
import { generateVisaSupportLetter } from '../services/pdfGeneratorService';
import { FallbackStore } from '../config/db';

export const submitCameraReady = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload the packaged .zip archive (ICSCSD2026-ID_<PaperID>.zip).'
      });
    }

    const { cmtPaperId, registrationNumber, authors, similarityIndex, sourceFormat } = req.body;

    if (!cmtPaperId) {
      return res.status(400).json({
        success: false,
        message: 'Microsoft CMT Paper ID is required.'
      });
    }

    const simIndexNum = Number(similarityIndex || 0);
    if (simIndexNum >= 10) {
      return res.status(400).json({
        success: false,
        message: `IEEE Compliance Failure: Similarity index is ${simIndexNum}%. Plagiarism similarity index must be strictly below 10%. Please revise your manuscript.`
      });
    }

    // Run deep automated zip inspection and 4-6 page PDF check via pdf-lib
    const validationResult = await validateCameraReadyZip(req.file.path, req.file.originalname);

    const submissionRecord = {
      id: FallbackStore.cameraReadySubmissions.length + 1,
      cmtPaperId,
      registrationNumber: registrationNumber || 'PENDING',
      authors: authors || '',
      sourceFormat: sourceFormat || validationResult.sourceType,
      similarityIndex: simIndexNum,
      zipFilename: req.file.originalname,
      zipPath: `/uploads/submissions/${req.file.filename}`,
      pdfFilename: validationResult.pdfFilename,
      pageCount: validationResult.pageCount,
      validationResult,
      status: 'VERIFIED',
      ecfStatus: 'COMPLETED',
      submittedAt: new Date()
    };

    FallbackStore.cameraReadySubmissions.unshift(submissionRecord);

    return res.status(201).json({
      success: true,
      message: `Camera-Ready submission verified and accepted! PDF manuscript contains ${validationResult.pageCount} pages with valid ${validationResult.sourceType} editable source files.`,
      data: submissionRecord
    });
  } catch (err: any) {
    console.error('Camera ready submission validation failed:', err.message);
    return res.status(400).json({
      success: false,
      message: err.message || 'Validation error while inspecting camera-ready zip archive.'
    });
  }
};

export const requestVisaLetter = async (req: Request, res: Response) => {
  try {
    const { fullName, passportNumber, institution, country, paperTitle, paperId } = req.body;

    if (!fullName || !passportNumber || !country) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Passport Number, and Country are required for official Visa Support Letter issuance.'
      });
    }

    const letter = generateVisaSupportLetter({
      fullName,
      passportNumber,
      institution: institution || 'Academic Institution',
      country,
      paperTitle: paperTitle || 'ICSCSD-2026 Accepted Technical Paper',
      paperId: paperId || 'N/A'
    });

    return res.status(200).json({
      success: true,
      message: 'Official ICSCSD-2026 Visa Support Letter generated successfully.',
      data: letter
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Error generating Visa Support Letter.'
    });
  }
};

export const lookupAuthor = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ success: false, message: 'Search query (email, paper ID, or transaction ID) is required.' });
    }

    const q = query.toLowerCase().trim();

    // Check payment verifications (VIERP/Paytm)
    const matchedVerifications = FallbackStore.paymentVerifications.filter(
      p =>
        (p.email && p.email.toLowerCase().includes(q)) ||
        (p.cmtPaperId && p.cmtPaperId.toLowerCase().includes(q)) ||
        (p.paytmTransactionId && p.paytmTransactionId.toLowerCase().includes(q))
    );

    // Check Razorpay orders
    const matchedRazorpay = FallbackStore.razorpayOrders.filter(
      r =>
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.cmtPaperId && r.cmtPaperId.toLowerCase().includes(q)) ||
        (r.registrationId && r.registrationId.toLowerCase().includes(q))
    );

    // Check Camera Ready Submissions
    const matchedSubmissions = FallbackStore.cameraReadySubmissions.filter(
      s =>
        (s.cmtPaperId && s.cmtPaperId.toLowerCase().includes(q)) ||
        (s.registrationNumber && s.registrationNumber.toLowerCase().includes(q))
    );

    return res.json({
      success: true,
      data: {
        verifications: matchedVerifications,
        razorpayOrders: matchedRazorpay,
        cameraReadySubmissions: matchedSubmissions
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
