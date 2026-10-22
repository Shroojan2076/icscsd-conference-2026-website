import { Request, Response } from 'express';
import { prisma, FallbackStore } from '../config/db';
import { CO_AUTHOR_ADDON_FEE_INR } from '../config/seedData';

export const getBootstrap = async (req: Request, res: Response) => {
  try {
    if (FallbackStore.isDbConnected) {
      const [config, dates, tracks, committee, registrationTiers] = await Promise.all([
        prisma.conferenceConfig.findFirst({ where: { id: 1 } }),
        prisma.importantDate.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } }),
        prisma.track.findMany({
          include: {
            topics: {
              orderBy: { displayOrder: 'asc' }
            }
          },
          orderBy: { trackNumber: 'asc' }
        }),
        prisma.committeeMember.findMany({ orderBy: { displayOrder: 'asc' } }),
        prisma.registrationTier.findMany({ orderBy: { displayOrder: 'asc' } })
      ]);

      return res.json({
        success: true,
        data: {
          config: config || FallbackStore.config,
          dates: dates.length > 0 ? dates : FallbackStore.importantDates,
          tracks: tracks.length > 0 ? tracks : FallbackStore.tracks,
          committee: committee.length > 0 ? committee : FallbackStore.committeeMembers,
          registrationTiers: registrationTiers.length > 0 ? registrationTiers : FallbackStore.registrationTiers,
          hotels: FallbackStore.hotels,
          attractions: FallbackStore.attractions,
          speakers: FallbackStore.speakers,
          coAuthorAddonFeeInr: CO_AUTHOR_ADDON_FEE_INR,
          coAuthorAddonFeeUsd: 40,
          isDbConnected: true
        }
      });
    }
  } catch (error) {
    console.warn('Bootstrap fallback triggered:', (error as Error).message);
  }

  // Standalone / Fallback response with 100% complete seed data
  return res.json({
    success: true,
    data: {
      config: FallbackStore.config,
      dates: FallbackStore.importantDates,
      tracks: FallbackStore.tracks,
      committee: FallbackStore.committeeMembers,
      registrationTiers: FallbackStore.registrationTiers,
      hotels: FallbackStore.hotels,
      attractions: FallbackStore.attractions,
      speakers: FallbackStore.speakers,
      coAuthorAddonFeeInr: CO_AUTHOR_ADDON_FEE_INR,
      coAuthorAddonFeeUsd: 40,
      isDbConnected: false
    }
  });
};

export const submitContactInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    const inquiry = {
      id: FallbackStore.contactInquiries.length + 1,
      name,
      email,
      subject: subject || 'General Conference Inquiry',
      message,
      createdAt: new Date()
    };
    FallbackStore.contactInquiries.unshift(inquiry);
    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by the ICSCSD 2026 Conference Secretariat. We will respond within 24-48 business hours.',
      data: inquiry
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getConfig = async (req: Request, res: Response) => {
  try {
    if (FallbackStore.isDbConnected) {
      const config = await prisma.conferenceConfig.findFirst({ where: { id: 1 } });
      if (config) return res.json({ success: true, data: config });
    }
  } catch (error) {
    console.warn('Config fetch error:', (error as Error).message);
  }
  return res.json({ success: true, data: FallbackStore.config });
};

export const getDates = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    if (FallbackStore.isDbConnected) {
      const where: any = { isActive: true };
      if (category && typeof category === 'string') {
        where.category = category;
      }
      const dates = await prisma.importantDate.findMany({
        where,
        orderBy: { displayOrder: 'asc' }
      });
      return res.json({ success: true, data: dates });
    }
  } catch (error) {
    console.warn('Dates fetch error:', (error as Error).message);
  }

  let filtered = FallbackStore.importantDates;
  if (req.query.category && typeof req.query.category === 'string') {
    filtered = filtered.filter(d => d.category === req.query.category);
  }
  return res.json({ success: true, data: filtered });
};

export const getTracks = async (req: Request, res: Response) => {
  try {
    if (FallbackStore.isDbConnected) {
      const tracks = await prisma.track.findMany({
        include: {
          topics: {
            orderBy: { displayOrder: 'asc' }
          }
        },
        orderBy: { trackNumber: 'asc' }
      });
      return res.json({ success: true, data: tracks });
    }
  } catch (error) {
    console.warn('Tracks fetch error:', (error as Error).message);
  }
  return res.json({ success: true, data: FallbackStore.tracks });
};

export const getCommittee = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    if (FallbackStore.isDbConnected) {
      const where: any = {};
      if (category && typeof category === 'string' && category !== 'ALL') {
        where.category = category;
      }
      if (search && typeof search === 'string') {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { roleOrAffiliation: { contains: search, mode: 'insensitive' } },
          { categoryLabel: { contains: search, mode: 'insensitive' } }
        ];
      }

      const members = await prisma.committeeMember.findMany({
        where,
        orderBy: { displayOrder: 'asc' }
      });
      return res.json({ success: true, count: members.length, data: members });
    }
  } catch (error) {
    console.warn('Committee fetch error:', (error as Error).message);
  }

  let results = [...FallbackStore.committeeMembers];
  const { category, search } = req.query;

  if (category && typeof category === 'string' && category !== 'ALL') {
    results = results.filter(m => m.category === category);
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const s = search.toLowerCase();
    results = results.filter(
      m =>
        m.fullName.toLowerCase().includes(s) ||
        m.roleOrAffiliation.toLowerCase().includes(s) ||
        m.categoryLabel.toLowerCase().includes(s)
    );
  }

  return res.json({ success: true, count: results.length, data: results });
};

export const getRegistrationTiers = async (req: Request, res: Response) => {
  try {
    if (FallbackStore.isDbConnected) {
      const tiers = await prisma.registrationTier.findMany({
        orderBy: { displayOrder: 'asc' }
      });
      return res.json({
        success: true,
        data: {
          tiers,
          coAuthorAddonFeeInr: CO_AUTHOR_ADDON_FEE_INR
        }
      });
    }
  } catch (error) {
    console.warn('Registration tiers fetch error:', (error as Error).message);
  }

  return res.json({
    success: true,
    data: {
      tiers: FallbackStore.registrationTiers,
      coAuthorAddonFeeInr: CO_AUTHOR_ADDON_FEE_INR
    }
  });
};
