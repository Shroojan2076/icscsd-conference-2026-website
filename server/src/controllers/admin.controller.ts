import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma, FallbackStore } from '../config/db';
import { env } from '../config/env';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    let isValid = false;
    let userId = 1;

    if (FallbackStore.isDbConnected) {
      try {
        const user = await prisma.adminUser.findUnique({ where: { email } });
        if (user) {
          const match = await bcrypt.compare(password, user.passwordHash);
          if (match) {
            isValid = true;
            userId = user.id;
          }
        }
      } catch (dbErr) {
        console.warn('DB login check error:', (dbErr as Error).message);
      }
    }

    // Default fallback credentials check
    if (!isValid) {
      if (email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase() && password === env.ADMIN_PASSWORD) {
        isValid = true;
        userId = 1;
      }
    }

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      {
        userId,
        email,
        role: 'ADMIN'
      },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Admin login successful',
      token,
      user: {
        id: userId,
        email,
        role: 'ADMIN'
      }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Invalid credentials format' });
    }
    return res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    let proposalCount = FallbackStore.proposals.length;
    let tutorialProposals = FallbackStore.proposals.filter(p => p.proposalType === 'TUTORIAL').length;
    let specialSessionProposals = FallbackStore.proposals.filter(p => p.proposalType === 'SPECIAL_SESSION').length;
    let verificationCount = FallbackStore.paymentVerifications.length;
    let verifiedCount = FallbackStore.paymentVerifications.filter(p => p.verified).length;
    let tracksCount = FallbackStore.tracks.length;
    let committeeCount = FallbackStore.committeeMembers.length;

    if (FallbackStore.isDbConnected) {
      try {
        const [pCount, tutCount, specCount, vCount, vDoneCount, tCount, cCount] = await Promise.all([
          prisma.proposalSubmission.count(),
          prisma.proposalSubmission.count({ where: { proposalType: 'TUTORIAL' } }),
          prisma.proposalSubmission.count({ where: { proposalType: 'SPECIAL_SESSION' } }),
          prisma.paymentVerification.count(),
          prisma.paymentVerification.count({ where: { verified: true } }),
          prisma.track.count(),
          prisma.committeeMember.count()
        ]);
        proposalCount = pCount;
        tutorialProposals = tutCount;
        specialSessionProposals = specCount;
        verificationCount = vCount;
        verifiedCount = vDoneCount;
        tracksCount = tCount;
        committeeCount = cCount;
      } catch (err) {
        console.warn('DB stats failed, using fallback:', (err as Error).message);
      }
    }

    return res.json({
      success: true,
      data: {
        proposalCount,
        tutorialProposals,
        specialSessionProposals,
        verificationCount,
        verifiedCount,
        tracksCount,
        committeeCount,
        isDbConnected: FallbackStore.isDbConnected
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    if (FallbackStore.isDbConnected) {
      try {
        const updated = await prisma.conferenceConfig.upsert({
          where: { id: 1 },
          update: updateData,
          create: { id: 1, ...updateData }
        });
        return res.json({ success: true, message: 'Conference configuration updated successfully', data: updated });
      } catch (dbErr) {
        console.warn('DB config update failed, updating FallbackStore:', (dbErr as Error).message);
      }
    }

    FallbackStore.config = { ...FallbackStore.config, ...updateData };
    return res.json({ success: true, message: 'Conference configuration updated (in-memory mode)', data: FallbackStore.config });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Date Management
export const createDate = async (req: Request, res: Response) => {
  try {
    const { label, dateText, isoDate, extendedText, category, displayOrder } = req.body;
    const newDateData = {
      label,
      dateText,
      isoDate: isoDate ? new Date(isoDate) : null,
      extendedText: extendedText || null,
      category: category || 'PAPER',
      displayOrder: Number(displayOrder || 0),
      isActive: true
    };

    if (FallbackStore.isDbConnected) {
      const created = await prisma.importantDate.create({ data: newDateData });
      return res.status(201).json({ success: true, message: 'Important date added', data: created });
    }

    const fallbackRecord = {
      id: FallbackStore.importantDates.length + 1,
      ...newDateData,
      isoDate: isoDate ? new Date(isoDate).toISOString() : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    FallbackStore.importantDates.push(fallbackRecord);
    return res.status(201).json({ success: true, message: 'Important date added', data: fallbackRecord });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    if (FallbackStore.isDbConnected) {
      const updated = await prisma.importantDate.update({
        where: { id },
        data: {
          ...data,
          isoDate: data.isoDate ? new Date(data.isoDate) : null
        }
      });
      return res.json({ success: true, message: 'Important date updated', data: updated });
    }

    const index = FallbackStore.importantDates.findIndex(d => d.id === id);
    if (index !== -1) {
      FallbackStore.importantDates[index] = { ...FallbackStore.importantDates[index], ...data, updatedAt: new Date() };
      return res.json({ success: true, message: 'Important date updated', data: FallbackStore.importantDates[index] });
    }
    return res.status(404).json({ success: false, message: 'Date not found' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (FallbackStore.isDbConnected) {
      await prisma.importantDate.delete({ where: { id } });
      return res.json({ success: true, message: 'Important date deleted' });
    }

    FallbackStore.importantDates = FallbackStore.importantDates.filter(d => d.id !== id);
    return res.json({ success: true, message: 'Important date deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Track Management
export const createTrack = async (req: Request, res: Response) => {
  try {
    const { trackNumber, title, slug, iconName, topics } = req.body;

    if (FallbackStore.isDbConnected) {
      const created = await prisma.track.create({
        data: {
          trackNumber: Number(trackNumber),
          title,
          slug,
          iconName: iconName || 'Cpu',
          topics: {
            create: (topics || []).map((t: string, idx: number) => ({
              topicText: t,
              displayOrder: idx + 1
            }))
          }
        },
        include: { topics: true }
      });
      return res.status(201).json({ success: true, message: 'Track created', data: created });
    }

    const fallbackTrack = {
      id: FallbackStore.tracks.length + 1,
      trackNumber: Number(trackNumber),
      title,
      slug,
      iconName: iconName || 'Cpu',
      topics: (topics || []).map((t: string, idx: number) => ({
        id: Date.now() + idx,
        trackId: FallbackStore.tracks.length + 1,
        topicText: t,
        displayOrder: idx + 1
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    FallbackStore.tracks.push(fallbackTrack);
    return res.status(201).json({ success: true, message: 'Track created', data: fallbackTrack });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTrack = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, iconName, topics } = req.body;

    if (FallbackStore.isDbConnected) {
      if (topics && Array.isArray(topics)) {
        await prisma.trackTopic.deleteMany({ where: { trackId: id } });
        await prisma.trackTopic.createMany({
          data: topics.map((t: string, idx: number) => ({
            trackId: id,
            topicText: t,
            displayOrder: idx + 1
          }))
        });
      }

      const updated = await prisma.track.update({
        where: { id },
        data: { title, iconName },
        include: { topics: { orderBy: { displayOrder: 'asc' } } }
      });
      return res.json({ success: true, message: 'Track updated', data: updated });
    }

    const index = FallbackStore.tracks.findIndex(t => t.id === id);
    if (index !== -1) {
      if (title) FallbackStore.tracks[index].title = title;
      if (iconName) FallbackStore.tracks[index].iconName = iconName;
      if (topics && Array.isArray(topics)) {
        FallbackStore.tracks[index].topics = topics.map((t: string, idx: number) => ({
          id: Date.now() + idx,
          trackId: id,
          topicText: t,
          displayOrder: idx + 1
        }));
      }
      return res.json({ success: true, message: 'Track updated', data: FallbackStore.tracks[index] });
    }
    return res.status(404).json({ success: false, message: 'Track not found' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (FallbackStore.isDbConnected) {
      await prisma.track.delete({ where: { id } });
      return res.json({ success: true, message: 'Track deleted' });
    }

    FallbackStore.tracks = FallbackStore.tracks.filter(t => t.id !== id);
    return res.json({ success: true, message: 'Track deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Proposal Review
export const getAdminProposals = async (req: Request, res: Response) => {
  try {
    const { status, type } = req.query;

    if (FallbackStore.isDbConnected) {
      const where: any = {};
      if (status) where.status = status;
      if (type) where.proposalType = type;

      const proposals = await prisma.proposalSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      return res.json({ success: true, data: proposals });
    }

    let results = [...FallbackStore.proposals];
    if (status) results = results.filter(p => p.status === status);
    if (type) results = results.filter(p => p.proposalType === type);

    return res.json({ success: true, data: results });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProposalStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (FallbackStore.isDbConnected) {
      const updated = await prisma.proposalSubmission.update({
        where: { id },
        data: { status }
      });
      return res.json({ success: true, message: `Proposal status updated to ${status}`, data: updated });
    }

    const index = FallbackStore.proposals.findIndex(p => p.id === id);
    if (index !== -1) {
      FallbackStore.proposals[index].status = status;
      FallbackStore.proposals[index].updatedAt = new Date();
      return res.json({ success: true, message: `Proposal status updated to ${status}`, data: FallbackStore.proposals[index] });
    }

    return res.status(404).json({ success: false, message: 'Proposal not found' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Payment Verifications Review
export const getAdminPaymentVerifications = async (req: Request, res: Response) => {
  try {
    if (FallbackStore.isDbConnected) {
      const verifications = await prisma.paymentVerification.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.json({ success: true, data: verifications });
    }

    return res.json({ success: true, data: FallbackStore.paymentVerifications });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleVerificationStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { verified } = req.body;

    if (FallbackStore.isDbConnected) {
      const updated = await prisma.paymentVerification.update({
        where: { id },
        data: { verified: Boolean(verified) }
      });
      return res.json({ success: true, message: `Payment verification status set to ${verified}`, data: updated });
    }

    const index = FallbackStore.paymentVerifications.findIndex(p => p.id === id);
    if (index !== -1) {
      FallbackStore.paymentVerifications[index].verified = Boolean(verified);
      return res.json({ success: true, message: `Payment verification status set to ${verified}`, data: FallbackStore.paymentVerifications[index] });
    }

    return res.status(404).json({ success: false, message: 'Verification record not found' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
