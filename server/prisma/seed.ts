import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  initialConferenceConfig,
  initialImportantDates,
  initialTracks,
  initialCommitteeMembers,
  initialRegistrationTiers
} from '../src/config/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ICSCSD 2026 database seed...');

  // 1. Seed Conference Config
  console.log('Seeding ConferenceConfig...');
  await prisma.conferenceConfig.upsert({
    where: { id: 1 },
    update: initialConferenceConfig,
    create: {
      id: 1,
      ...initialConferenceConfig
    }
  });

  // 2. Clear & Seed Important Dates
  console.log('Seeding Important Dates...');
  await prisma.importantDate.deleteMany();
  for (const dateItem of initialImportantDates) {
    await prisma.importantDate.create({
      data: {
        label: dateItem.label,
        dateText: dateItem.dateText,
        isoDate: dateItem.isoDate ? new Date(dateItem.isoDate) : null,
        extendedText: dateItem.extendedText,
        category: dateItem.category,
        displayOrder: dateItem.displayOrder,
        isActive: dateItem.isActive
      }
    });
  }

  // 3. Clear & Seed Tracks and Topics
  console.log('Seeding Tracks and Topics...');
  await prisma.trackTopic.deleteMany();
  await prisma.track.deleteMany();
  for (const trackItem of initialTracks) {
    const createdTrack = await prisma.track.create({
      data: {
        trackNumber: trackItem.trackNumber,
        title: trackItem.title,
        slug: trackItem.slug,
        iconName: trackItem.iconName
      }
    });

    for (let i = 0; i < trackItem.topics.length; i++) {
      await prisma.trackTopic.create({
        data: {
          trackId: createdTrack.id,
          topicText: trackItem.topics[i],
          displayOrder: i + 1
        }
      });
    }
  }

  // 4. Clear & Seed Committee Members
  console.log(`Seeding ${initialCommitteeMembers.length} Committee Members...`);
  await prisma.committeeMember.deleteMany();
  for (const member of initialCommitteeMembers) {
    await prisma.committeeMember.create({
      data: {
        fullName: member.fullName,
        roleOrAffiliation: member.roleOrAffiliation,
        category: member.category,
        categoryLabel: member.categoryLabel,
        displayOrder: member.displayOrder
      }
    });
  }

  // 5. Clear & Seed Registration Tiers
  console.log('Seeding Registration Tiers...');
  await prisma.registrationTier.deleteMany();
  for (const tier of initialRegistrationTiers) {
    await prisma.registrationTier.create({
      data: {
        memberCategory: tier.memberCategory,
        indianFeeDisplay: tier.indianFeeDisplay,
        indianBaseFeeInr: tier.indianBaseFeeInr,
        gstPercent: tier.gstPercent,
        indianTotalFeeInr: tier.indianTotalFeeInr,
        foreignFeeUsd: tier.foreignFeeUsd,
        isIeeeMember: tier.isIeeeMember,
        participantType: tier.participantType,
        displayOrder: tier.displayOrder
      }
    });
  }

  // 6. Seed Default Admin User
  console.log('Seeding Admin User (admin@vit.edu)...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vit.edu';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@ICSCSD2026';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      role: 'ADMIN'
    }
  });

  console.log('✅ ICSCSD 2026 database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
