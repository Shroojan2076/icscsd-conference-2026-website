import { PrismaClient } from '@prisma/client';
import {
  initialConferenceConfig,
  initialImportantDates,
  initialTracks,
  initialCommitteeMembers,
  initialRegistrationTiers,
  initialHotels,
  initialAttractions,
  initialSpeakers
} from './seedData';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  global.prismaGlobal ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}

// In-Memory Fallback State when DB is not yet migrated/connected
export class FallbackStore {
  public static config = { ...initialConferenceConfig };
  public static importantDates = initialImportantDates.map((d, index) => ({
    id: index + 1,
    ...d,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  public static tracks = initialTracks.map((t, index) => ({
    id: index + 1,
    trackNumber: t.trackNumber,
    title: t.title,
    slug: t.slug,
    iconName: t.iconName,
    topics: t.topics.map((topicText, topicIdx) => ({
      id: index * 10 + topicIdx + 1,
      trackId: index + 1,
      topicText,
      displayOrder: topicIdx + 1
    })),
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  public static committeeMembers = initialCommitteeMembers.map((m, index) => ({
    id: index + 1,
    ...m,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  public static registrationTiers = initialRegistrationTiers.map((t, index) => ({
    id: index + 1,
    ...t
  }));
  public static hotels = [...initialHotels];
  public static attractions = [...initialAttractions];
  public static speakers = [...initialSpeakers];
  public static cameraReadySubmissions: any[] = [];
  public static contactInquiries: any[] = [];
  public static proposals: any[] = [];
  public static paymentVerifications: any[] = [];
  public static razorpayOrders: any[] = [];

  public static isDbConnected = false;
}

// Test DB Connection at startup
export async function testDbConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    // Test a simple query
    await prisma.$queryRaw`SELECT 1`;
    FallbackStore.isDbConnected = true;
    console.log('✅ PostgreSQL connected successfully via Prisma');
    return true;
  } catch (err) {
    FallbackStore.isDbConnected = false;
    console.warn('⚠️ PostgreSQL connection failed or database not reachable. Operating with high-fidelity in-memory seed fallbacks.');
    return false;
  }
}
