export interface ConferenceConfig {
  id?: number;
  conferenceName: string;
  shortName: string;
  ieeeRecordNumber: string;
  isbn: string;
  instituteName: string;
  instituteSubtitle: string;
  conferenceDatesText: string;
  startDate: string;
  endDate: string;
  cmtSubmissionUrl: string;
  cmtGuidelinesUrl: string;
  authorGuidelinesUrl: string;
  contactEmail: string;
  tutorialFormUrl: string;
  specialSessionUrl: string;
  reviewerFormUrl: string;
  vierpStudentUrl: string;
  vierpExternalUrl: string;
  aboutConference: string[];
  aboutInstitute: string[];
  cmtAcknowledgment: string;
}

export interface ImportantDate {
  id: number;
  label: string;
  dateText: string;
  isoDate: string | null;
  extendedText?: string | null;
  note?: string | null;
  category: 'PAPER' | 'TUTORIAL' | 'SPECIAL_SESSION' | 'REGISTRATION' | 'CONFERENCE';
  displayOrder: number;
  isActive: boolean;
}

export interface TrackTopic {
  id: number;
  trackId: number;
  topicText: string;
  displayOrder: number;
}

export interface Track {
  id: number;
  trackNumber: number;
  title: string;
  slug: string;
  iconName: string;
  topics: TrackTopic[];
}

export interface CommitteeMember {
  id: number;
  fullName: string;
  roleOrAffiliation: string;
  category: 'PATRON' | 'GENERAL_CHAIR' | 'GENERAL_CO_CHAIR' | 'ADVISORY_COMMITTEE' | 'TECHNICAL_PROGRAM_COMMITTEE' | 'TUTORIAL_COMMITTEE' | 'PUBLICATION_COMMITTEE' | 'TREASURER';
  categoryLabel: string;
  displayOrder: number;
}

export interface RegistrationTier {
  id: number;
  categoryKey?: string;
  memberCategory: string;
  indianFeeDisplay: string;
  indianBaseFeeInr: number;
  gstPercent: number;
  indianTotalFeeInr: number;
  foreignFeeUsd: number;
  isIeeeMember: boolean;
  participantType: 'PROFESSIONAL' | 'STUDENT' | 'ATTENDEE';
  displayOrder: number;
}

export interface ProposalSubmission {
  id: number;
  proposalType: 'TUTORIAL' | 'SPECIAL_SESSION';
  title: string;
  presenterNames: string;
  presenterEmail: string;
  affiliations: string;
  abstract: string;
  objectives?: string | null;
  intendedAudience?: string | null;
  outline?: string | null;
  biography?: string | null;
  pastAttendeesCount?: string | null;
  speakerWebpageUrl?: string | null;
  institutionsList?: string[];
  pdfFilePath: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface PaymentVerification {
  id: number;
  fullName: string;
  email: string;
  cmtPaperId?: string | null;
  isVitStudent: boolean;
  prnNumber?: string | null;
  tierId: number;
  coAuthorsCount: number;
  currency: 'INR' | 'USD';
  totalPaidAmount: number;
  paytmTransactionId: string;
  receiptFilePath?: string | null;
  verified: boolean;
  createdAt: string;
}

export interface AccommodationHotel {
  id: number;
  name: string;
  location?: string;
  locationArea?: string;
  distanceKm?: number;
  distanceFromVitKm?: number;
  distanceLabel?: string;
  mapUrl: string;
  rating?: string;
  photoUrl?: string;
  imageUrl?: string;
  attribution?: string;
  description?: string;
}

export interface Attraction {
  id: number;
  name?: string;
  title?: string;
  description: string;
  distanceKm?: number;
  distanceFromVitKm?: number;
  distanceLabel?: string;
  photoUrl?: string;
  imageUrl?: string;
  photoAuthor?: string;
  photoCredit?: string;
  license?: string;
  licenseType?: string;
}

export interface Speaker {
  id: number;
  name: string;
  title?: string;
  role?: string;
  affiliation: string;
  bio: string;
  photoUrl?: string;
  imageUrl?: string;
  isKeynote?: boolean;
  topic?: string;
  talkTitle?: string;
  scholarUrl?: string;
}

export interface PricingCalculation {
  categoryKey?: string;
  categoryLabel?: string;
  currency: 'INR' | 'USD';
  baseAmount: number;
  coAuthorCount: number;
  coAuthorAmount: number;
  subtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  totalWithGst: number;
  convenienceFee: number;
  totalPayable: number;
}

export interface CameraReadySubmission {
  id?: number;
  cmtPaperId: string;
  registrationNumber: string;
  paperTitle: string;
  sourceFormat: 'WORD' | 'LATEX';
  similarityIndex: number;
  pageCount: number;
  zipFileName: string;
  status: 'SUBMITTED' | 'VERIFIED' | 'REJECTED';
  createdAt?: string;
}

export interface ContactInquiry {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface BootstrapResponse {
  config: ConferenceConfig;
  dates: ImportantDate[];
  tracks: Track[];
  committee: CommitteeMember[];
  registrationTiers: RegistrationTier[];
  hotels: AccommodationHotel[];
  attractions: Attraction[];
  speakers: Speaker[];
  coAuthorAddonFeeInr: number;
  coAuthorAddonFeeUsd: number;
  isDbConnected: boolean;
}
