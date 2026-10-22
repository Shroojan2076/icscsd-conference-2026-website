import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma, FallbackStore } from '../config/db';

const proposalSchema = z.object({
  proposalType: z.enum(['TUTORIAL', 'SPECIAL_SESSION']),
  title: z.string().min(3, 'Title is required (minimum 3 characters)'),
  presenterNames: z.string().min(2, 'Presenter / Organizer name(s) required'),
  presenterEmail: z.string().email('Valid presenter email required'),
  affiliations: z.string().min(2, 'Affiliations required'),
  abstract: z.string().min(20, 'Abstract must be at least 20 characters'),
  objectives: z.string().optional(),
  intendedAudience: z.string().optional(),
  outline: z.string().optional(),
  biography: z.string().optional(),
  pastAttendeesCount: z.string().optional(),
  speakerWebpageUrl: z.string().url().optional().or(z.literal('')),
  institutionsList: z.string().optional() // JSON array or comma separated
});

export const submitProposal = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'A PDF proposal document is required (max 10MB).'
      });
    }

    const validatedData = proposalSchema.parse(req.body);

    // Parse institutionsList
    let parsedInstitutions: string[] = [];
    if (validatedData.institutionsList) {
      try {
        parsedInstitutions = JSON.parse(validatedData.institutionsList);
      } catch {
        parsedInstitutions = validatedData.institutionsList
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
      }
    }

    // Enforce Special Session Rule: Must consist of papers / representation from at least three different institutions
    if (validatedData.proposalType === 'SPECIAL_SESSION') {
      const distinctInstitutions = Array.from(new Set(parsedInstitutions.map(i => i.toLowerCase().trim())));
      if (distinctInstitutions.length < 3) {
        return res.status(400).json({
          success: false,
          message: 'Governance Rule Violation: Special Session proposals must represent or involve at least three (3) distinct institutions.',
          details: {
            providedCount: distinctInstitutions.length,
            requiredMinimum: 3,
            institutions: parsedInstitutions
          }
        });
      }
    }

    const pdfRelativePath = `/uploads/proposals/${req.file.filename}`;

    const submissionData = {
      proposalType: validatedData.proposalType,
      title: validatedData.title,
      presenterNames: validatedData.presenterNames,
      presenterEmail: validatedData.presenterEmail,
      affiliations: validatedData.affiliations,
      abstract: validatedData.abstract,
      objectives: validatedData.objectives || null,
      intendedAudience: validatedData.intendedAudience || null,
      outline: validatedData.outline || null,
      biography: validatedData.biography || null,
      pastAttendeesCount: validatedData.pastAttendeesCount || null,
      speakerWebpageUrl: validatedData.speakerWebpageUrl || null,
      institutionsList: parsedInstitutions,
      pdfFilePath: pdfRelativePath,
      status: 'SUBMITTED' as const
    };

    let record: any = null;

    if (FallbackStore.isDbConnected) {
      try {
        record = await prisma.proposalSubmission.create({
          data: submissionData
        });
      } catch (dbErr) {
        console.warn('DB proposal create failed, using FallbackStore:', (dbErr as Error).message);
      }
    }

    if (!record) {
      record = {
        id: FallbackStore.proposals.length + 1,
        ...submissionData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      FallbackStore.proposals.unshift(record);
    }

    return res.status(201).json({
      success: true,
      message: `Your ${validatedData.proposalType === 'TUTORIAL' ? 'Tutorial' : 'Special Session'} proposal has been successfully submitted! A copy has been logged with the ICSCSD 2026 organizing committee.`,
      data: {
        proposalId: record.id,
        title: record.title,
        proposalType: record.proposalType,
        status: record.status,
        submittedAt: record.createdAt,
        pdfUrl: record.pdfFilePath
      }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error in proposal submission',
        errors: error.errors
      });
    }
    console.error('Proposal submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit proposal: ' + (error.message || 'Unknown error')
    });
  }
};
