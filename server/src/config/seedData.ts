export interface SeedConfig {
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

export interface SeedImportantDate {
  id?: number;
  label: string;
  dateText: string;
  isoDate: string | null;
  extendedText?: string | null;
  category: 'PAPER' | 'TUTORIAL' | 'SPECIAL_SESSION' | 'REGISTRATION' | 'CONFERENCE';
  displayOrder: number;
  isActive: boolean;
}

export interface SeedTrack {
  trackNumber: number;
  title: string;
  slug: string;
  iconName: string;
  topics: string[];
}

export interface SeedCommitteeMember {
  fullName: string;
  roleOrAffiliation: string;
  category: 'PATRON' | 'GENERAL_CHAIR' | 'GENERAL_CO_CHAIR' | 'ADVISORY_COMMITTEE' | 'TECHNICAL_PROGRAM_COMMITTEE' | 'TUTORIAL_COMMITTEE' | 'PUBLICATION_COMMITTEE' | 'TREASURER';
  categoryLabel: string;
  displayOrder: number;
}

export interface SeedRegistrationTier {
  id?: number;
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

export const initialConferenceConfig: SeedConfig = {
  conferenceName: "International Conference on Smart Computing for Sustainable Development",
  shortName: "ICSCSD 2026",
  ieeeRecordNumber: "67723",
  isbn: "979-8-3315-8953-0",
  instituteName: "Vishwakarma Institute of Technology, Pune",
  instituteSubtitle: "(Autonomous Institute affiliated to Savitribai Phule Pune University)",
  conferenceDatesText: "25th to 27th November 2026",
  startDate: "2026-11-25T09:00:00.000Z",
  endDate: "2026-11-27T18:00:00.000Z",
  cmtSubmissionUrl: "https://cmt3.research.microsoft.com/ICSCSD2026",
  cmtGuidelinesUrl: "https://cmt3.research.microsoft.com/ICSCSD2026",
  authorGuidelinesUrl: "https://www.ieee.org/conferences/publishing/templates.html",
  contactEmail: "viticscsd@gmail.com",
  tutorialFormUrl: "https://tinyurl.com/icscsdcallfortutorial",
  specialSessionUrl: "https://tinyurl.com/icscsdcallforspecialsession",
  reviewerFormUrl: "https://tinyurl.com/icscsdcallforreviewer",
  vierpStudentUrl: "https://learner.vierp.in",
  vierpExternalUrl: "https://learner.vierp.in/events",
  aboutConference: [
    "The International Conference on Smart Computing for Sustainable Development (ICSCSD) is a global platform dedicated to advancing research and innovation in the field of smart computing with a focus on sustainability. The conference aims to bring together researchers, academicians, industry experts, and policymakers to discuss cutting-edge technologies and their role in addressing environmental, societal, and industrial challenges.",
    "With rapid advancements in artificial intelligence, data science, the Internet of Things (IoT), and next-generation communication systems, there is a growing need to develop intelligent, efficient, and sustainable solutions. ICSCSD provides a collaborative space for sharing knowledge, exploring emerging trends, and fostering interdisciplinary research to drive sustainable development across various domains.",
    "This conference will feature keynote speeches, technical paper presentations, panel discussions, and workshops led by experts from academia and industry. Attendees will gain insights into novel computing methodologies, smart infrastructure development, sustainable industrial automation, and the application of intelligent systems in healthcare, energy, and urban planning.",
    "ICSCSD invites high-quality research contributions that push the boundaries of smart computing technologies for sustainability. Participants will have the opportunity to network with leading professionals, exchange ideas, and explore collaborative research opportunities.",
    "We look forward to welcoming you to ICSCSD, where innovation meets sustainability for a smarter and greener future."
  ],
  aboutInstitute: [
    "Vishwakarma Institute of Technology (VIT), Pune, established in 1983, is a premier autonomous institute that has consistently been at the forefront of technical education in India. Affiliated permanently to Savitribai Phule Pune University, VIT has built a reputation for academic excellence, industry-oriented learning, and cutting-edge research. The institute has been accredited with an 'A++' Grade by the National Assessment and Accreditation Council (NAAC) and all its programs are accredited by the National Board of Accreditation (NBA), reinforcing its commitment to delivering high-quality education.",
    "VIT offers 12 undergraduate programs, along with postgraduate and doctoral research opportunities, ensuring a holistic academic environment. Over the past four decades, the institute has evolved into a center of excellence, fostering innovation, entrepreneurship, and technological advancements. Its unique educational approach integrates internships, project-based learning, engineering design, and innovation, preparing students to meet the challenges of modern industries and society.",
    "The institute is part of the Bansilal Ramnath Agarwal Charitable Trust (BRACT), Pune, which was founded in 1975 under the Bombay Trust Act of 1950. The Trust, inspired by the vision of \"Vishwakarma\", the divine architect-engineer in Indian mythology, is dedicated to nurturing professionals who can drive innovation and technological progress. The Vishwakarma Group, under BRACT, has expanded its educational footprint by establishing institutions in engineering, information technology, management, marine industry, creativity & design, international schooling, arts, science, commerce, media, and business consulting.",
    "With a strong focus on socio-economic upliftment, the Vishwakarma Group has played a pivotal role in empowering individuals and communities by providing quality education and skill development opportunities. The group operates with a philosophy of entrepreneurial independence, allowing its institutions to thrive while leveraging synergies for collective growth.",
    "As VIT Pune continues to embrace new technologies and pedagogical advancements, it remains committed to producing competent, ethical, and industry-ready engineers who contribute to national and global progress. The institute stands as a beacon of excellence, shaping the future of engineering education and innovation."
  ],
  cmtAcknowledgment: "The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support."
};

export const initialImportantDates: SeedImportantDate[] = [
  {
    label: "Submission (Hard) Deadline",
    dateText: "30th August 2026",
    isoDate: "2026-08-30T23:59:59.000Z",
    extendedText: null,
    category: "PAPER",
    displayOrder: 1,
    isActive: true
  },
  {
    label: "Extended Submission Deadline",
    dateText: "-",
    isoDate: null,
    extendedText: "-",
    category: "PAPER",
    displayOrder: 2,
    isActive: true
  },
  {
    label: "Notification of Acceptance",
    dateText: "10th September 2026",
    isoDate: "2026-09-10T23:59:59.000Z",
    extendedText: null,
    category: "PAPER",
    displayOrder: 3,
    isActive: true
  },
  {
    label: "Camera-Ready Paper Submission",
    dateText: "15th September 2026",
    isoDate: "2026-09-15T23:59:59.000Z",
    extendedText: null,
    category: "PAPER",
    displayOrder: 4,
    isActive: true
  },
  {
    label: "Proposal Submission Deadline (Tutorial)",
    dateText: "05 September 2026",
    isoDate: "2026-09-05T23:59:59.000Z",
    extendedText: null,
    category: "TUTORIAL",
    displayOrder: 5,
    isActive: true
  },
  {
    label: "Proposal Acceptance Notification (Tutorial)",
    dateText: "12 September 2026",
    isoDate: "2026-09-12T23:59:59.000Z",
    extendedText: null,
    category: "TUTORIAL",
    displayOrder: 6,
    isActive: true
  },
  {
    label: "Last date of special session proposal submission",
    dateText: "30 August, 2026",
    isoDate: "2026-08-30T23:59:59.000Z",
    extendedText: null,
    category: "SPECIAL_SESSION",
    displayOrder: 7,
    isActive: true
  },
  {
    label: "The proposal sanctioned notification",
    dateText: "05 September, 2026",
    isoDate: "2026-09-05T23:59:59.000Z",
    extendedText: null,
    category: "SPECIAL_SESSION",
    displayOrder: 8,
    isActive: true
  },
  {
    label: "Conference Dates",
    dateText: "25th to 27th November 2026",
    isoDate: "2026-11-25T09:00:00.000Z",
    extendedText: null,
    category: "CONFERENCE",
    displayOrder: 9,
    isActive: true
  }
];

export const initialTracks: SeedTrack[] = [
  {
    trackNumber: 1,
    title: "Artificial Intelligence & Machine Learning for Sustainability",
    slug: "ai-ml-sustainability",
    iconName: "BrainCircuit",
    topics: [
      "AI-driven sustainable solutions",
      "Explainable AI for decision-making",
      "Machine learning applications in environmental monitoring",
      "AI for predictive analytics in smart cities"
    ]
  },
  {
    trackNumber: 2,
    title: "IoT, Edge & Cloud Computing for Smart Systems",
    slug: "iot-edge-cloud",
    iconName: "Cpu",
    topics: [
      "IoT-enabled smart infrastructure",
      "Edge computing for real-time applications",
      "Cloud-based solutions for sustainability",
      "Sensor networks and intelligent data processing"
    ]
  },
  {
    trackNumber: 3,
    title: "Blockchain & Cybersecurity for Sustainable Development",
    slug: "blockchain-cybersecurity",
    iconName: "ShieldCheck",
    topics: [
      "Blockchain applications in green energy & supply chains",
      "Cybersecurity challenges in smart systems",
      "Decentralized finance (DeFi) and sustainability",
      "Secure communication protocols for IoT"
    ]
  },
  {
    trackNumber: 4,
    title: "Sustainable Smart Cities & Infrastructure",
    slug: "smart-cities-infrastructure",
    iconName: "Building2",
    topics: [
      "Intelligent transportation systems",
      "Smart grids and energy-efficient technologies",
      "Green buildings and urban development",
      "GIS and remote sensing for smart city planning"
    ]
  },
  {
    trackNumber: 5,
    title: "Sustainable Healthcare & Biomedical Innovations",
    slug: "healthcare-biomedical",
    iconName: "HeartPulse",
    topics: [
      "AI and IoT in healthcare",
      "Smart medical devices and remote monitoring",
      "Personalized medicine and digital health",
      "Sustainable biomedical waste management"
    ]
  },
  {
    trackNumber: 6,
    title: "Renewable Energy & Smart Grid Technologies",
    slug: "renewable-energy-smart-grid",
    iconName: "Zap",
    topics: [
      "Smart grids and energy optimization",
      "AI-driven energy forecasting",
      "Sustainable battery technologies",
      "Integration of renewable energy sources"
    ]
  },
  {
    trackNumber: 7,
    title: "Data Science & Big Data Analytics for Sustainability",
    slug: "data-science-big-data",
    iconName: "Database",
    topics: [
      "Sustainable data centers and storage",
      "Big data analytics for environmental monitoring",
      "Predictive modeling for disaster management",
      "Real-time analytics for smart applications"
    ]
  },
  {
    trackNumber: 8,
    title: "Robotics & Automation for Sustainable Industries",
    slug: "robotics-automation",
    iconName: "Bot",
    topics: [
      "AI-powered industrial automation",
      "Robotics for waste management",
      "Sustainable manufacturing using automation",
      "Human-robot collaboration for green production"
    ]
  },
  {
    trackNumber: 9,
    title: "Communication & Networking for Smart Systems",
    slug: "communication-networking",
    iconName: "Radio",
    topics: [
      "6G and beyond for sustainable connectivity",
      "Low-power communication protocols",
      "Smart vehicular networks",
      "Satellite-based communication for sustainability"
    ]
  }
];

export const initialCommitteeMembers: SeedCommitteeMember[] = [
  // Patron (3)
  {
    fullName: "Shri Rajkumarji Agarwal",
    roleOrAffiliation: "Chairman, BRACT's Vishwakarma Institute of Technology Pune",
    category: "PATRON",
    categoryLabel: "Patron",
    displayOrder: 1
  },
  {
    fullName: "Shri Bharat Agarwal",
    roleOrAffiliation: "Managing Trustee, BRACT's Vishwakarma Institute of Technology Pune",
    category: "PATRON",
    categoryLabel: "Patron",
    displayOrder: 2
  },
  {
    fullName: "Dr. Bipin Sule",
    roleOrAffiliation: "CEO, Vishwakarma Institutes & University",
    category: "PATRON",
    categoryLabel: "Patron",
    displayOrder: 3
  },

  // General Chairs (2)
  {
    fullName: "Dr. Rajesh Jalnekar",
    roleOrAffiliation: "Director, VIT Pune",
    category: "GENERAL_CHAIR",
    categoryLabel: "General Chairs",
    displayOrder: 4
  },
  {
    fullName: "Dr. Vivek Deshpande",
    roleOrAffiliation: "Director, VIIT Pune",
    category: "GENERAL_CHAIR",
    categoryLabel: "General Chairs",
    displayOrder: 5
  },

  // General Co-Chairs (2)
  {
    fullName: "Dr. Parikshit Mahalle",
    roleOrAffiliation: "Dean Academics",
    category: "GENERAL_CO_CHAIR",
    categoryLabel: "General Co-Chairs",
    displayOrder: 6
  },
  {
    fullName: "Dr. Vijay Mane",
    roleOrAffiliation: "Dean Alumni and Outreach",
    category: "GENERAL_CO_CHAIR",
    categoryLabel: "General Co-Chairs",
    displayOrder: 7
  },

  // Advisory Committee Members (30)
  {
    fullName: "Dr. Rajkumar Buyya",
    roleOrAffiliation: "Redmond Barry Distinguished Professor; Director, Quantum Cloud Computing and Distributed Systems (qCLOUDS) Lab; School of Computing and Information Systems, The University of Melbourne",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 8
  },
  {
    fullName: "Dr. Prashant Kharat",
    roleOrAffiliation: "Deputy Director, AICTE",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 9
  },
  {
    fullName: "Dr. Sachin Deshmukh",
    roleOrAffiliation: "Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 10
  },
  {
    fullName: "Dr. Haribhau Bhapkar",
    roleOrAffiliation: "Associate Professor in Mathematics, Department of Mathematics, Central University of Kashmir",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 11
  },
  {
    fullName: "Dr. Nilanjan Dey",
    roleOrAffiliation: "Professor, Techno International New Town",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 12
  },
  {
    fullName: "Dr. Pradip Jawandhiya",
    roleOrAffiliation: "Principal, P. R. Pote Patil College of Engineering and Management, Amravati",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 13
  },
  {
    fullName: "Dr. Manish Potey",
    roleOrAffiliation: "Professor, K. J. Somaiya College of Engineering, Vidyanagar Campus, Vidyavihar, Mumbai",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 14
  },
  {
    fullName: "Dr. Kailash Karande",
    roleOrAffiliation: "Principal, SKN Sinhgad College of Engineering, Pandharpur",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 15
  },
  {
    fullName: "Dr. Ratnadeep Deshmukh",
    roleOrAffiliation: "Director, International Centre of Excellence in Engineering and Management (ICEEM)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 16
  },
  {
    fullName: "Dr. Suhas Sapate",
    roleOrAffiliation: "Principal, Dr. Bapuji Salunkhe Institute of Engineering and Technology, Kolhapur",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 17
  },
  {
    fullName: "Prof. (Dr.) Vaishali Patil",
    roleOrAffiliation: "Dean – Administration and Registrar",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 18
  },
  {
    fullName: "Prof. (Dr.) Ganesh Dongre",
    roleOrAffiliation: "Dean – Quality Assurance",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 19
  },
  {
    fullName: "Prof. (Dr.) Kapil Mundada",
    roleOrAffiliation: "Dean – Admissions",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 20
  },
  {
    fullName: "Prof. (Dr.) Neelam Chandolikar",
    roleOrAffiliation: "Dean, Examination",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 21
  },
  {
    fullName: "Prof. (Dr.) Swati Shilaskar",
    roleOrAffiliation: "Dean – Research & Development",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 22
  },
  {
    fullName: "Prof. S.B. Karthick",
    roleOrAffiliation: "Dean – Industry Relations",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 23
  },
  {
    fullName: "Prof. Ganesh Korwar",
    roleOrAffiliation: "Dean – Finance",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 24
  },
  {
    fullName: "Prof. (Dr.) Vijay Gaikwad",
    roleOrAffiliation: "Dean – Student Career Counselling and Guidance",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 25
  },
  {
    fullName: "Prof. (Dr.) Atul Kulkarni",
    roleOrAffiliation: "Director Corporate Relations",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 26
  },
  {
    fullName: "Prof. Dr. Nitin Sakhare",
    roleOrAffiliation: "Chief International Relations Officer",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 27
  },
  {
    fullName: "Dr. Sandip Shinde",
    roleOrAffiliation: "Head, Department of Computer Engineering",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 28
  },
  {
    fullName: "Dr. Pravin Futane",
    roleOrAffiliation: "Head, Department of Information Technology",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 29
  },
  {
    fullName: "Dr. Medha Vishwanath Wyawahare",
    roleOrAffiliation: "Head, Department of Electronics and Telecommunication",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 30
  },
  {
    fullName: "Dr. Sandip Kore",
    roleOrAffiliation: "Head, Department of Mechanical Engineering",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 31
  },
  {
    fullName: "Dr. Shilpa Sondkar",
    roleOrAffiliation: "Head, Department of Instrumentation",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 32
  },
  {
    fullName: "Prof. (Dr.) Shilpa M. Lambor",
    roleOrAffiliation: "Engineering Science and Humanities",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 33
  },
  {
    fullName: "Prof. (Dr.) Shital Parag Dongre",
    roleOrAffiliation: "Artificial Intelligence & Data Science (AI & DS)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 34
  },
  {
    fullName: "Prof. (Dr.) Shrikant T. Shinde",
    roleOrAffiliation: "Civil Engineering",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 35
  },
  {
    fullName: "Prof. (Dr.) Sunil M. Sangve",
    roleOrAffiliation: "Computer Engineering (Software Engineering)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 36
  },
  {
    fullName: "Dr. Deepa Abin",
    roleOrAffiliation: "Computer Science & Engineering (Data Science)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 37
  },
  {
    fullName: "Prof. (Dr.) Priya M. Shelke",
    roleOrAffiliation: "Computer Science & Engineering (Internet of Things, Cyber Security including BlockChain Technology)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 38
  },
  {
    fullName: "Prof. Dr. Nilesh P. Sable",
    roleOrAffiliation: "Computer Science & Engineering (Artificial Intelligence)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 39
  },
  {
    fullName: "Dr. Premanand Ghadekar",
    roleOrAffiliation: "Head, Department of CSE (AI & ML)",
    category: "ADVISORY_COMMITTEE",
    categoryLabel: "Advisory Committee Members",
    displayOrder: 40
  },

  // Technical Program Committee (20)
  {
    fullName: "Dr. Anil Surve",
    roleOrAffiliation: "Professor, Walchand College of Engineering Sangli",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 41
  },
  {
    fullName: "Dr. Prashant Kharat",
    roleOrAffiliation: "Deputy Director, AICTE, New Delhi",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 42
  },
  {
    fullName: "Dr. Sachin Jadhav",
    roleOrAffiliation: "Associate Professor, Jawaharlal Nehru University - School of Computer and Systems Sciences",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 43
  },
  {
    fullName: "Dr. Deepak Sharma",
    roleOrAffiliation: "Dean Academics, Somaiya Vidyavihar University",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 44
  },
  {
    fullName: "Dr. Subhash Shinde",
    roleOrAffiliation: "Professor at Lokmanya Tilak College of Engineering",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 45
  },
  {
    fullName: "Dr. Pallavi Chavan",
    roleOrAffiliation: "Professor, SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 46
  },
  {
    fullName: "Dr. Ramchandra Mangrulkar",
    roleOrAffiliation: "Professor, Dwarkadas J. Sanghvi College of Engineering",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 47
  },
  {
    fullName: "Dr. Namdev Sawant",
    roleOrAffiliation: "SKN Sinhgad COE Pandharpur",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 48
  },
  {
    fullName: "Dr. Prasad Lokulwar",
    roleOrAffiliation: "Professor and PG Coordinator, Department of Computer Science and Engineering, G H Raisoni College of Engineering (Autonomous), Nagpur",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 49
  },
  {
    fullName: "Dr. Ganesh Regulwar",
    roleOrAffiliation: "Associate Professor, Vardhaman College of Engineering, Hyderabad, Telangana",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 50
  },
  {
    fullName: "Kedar Nagnathrao Ghogale",
    roleOrAffiliation: "Scientist E, Centre for Development of Advanced Computing (C-DAC)",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 51
  },
  {
    fullName: "Samarjeet Borah",
    roleOrAffiliation: "Professor and Head, Department of Computer Applications, SMIT, Sikkim Manipal University, India",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 52
  },
  {
    fullName: "Dr. Makrand Shahade",
    roleOrAffiliation: "Professor, SVKM's Institute of Technology, Dhule",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 53
  },
  {
    fullName: "Parag Thakare",
    roleOrAffiliation: "Professor, Jagadambha College of Engg. & Tech., Yavatmal",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 54
  },
  {
    fullName: "Prashant Awasthi",
    roleOrAffiliation: "Tech Architecture Sr Manager, Accenture",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 55
  },
  {
    fullName: "Dr. Archana Chaudhari",
    roleOrAffiliation: "VIT, Pune",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 56
  },
  {
    fullName: "Dr. Nilesh Sable",
    roleOrAffiliation: "VIT, Pune",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 57
  },
  {
    fullName: "Dr. Shital Dongre",
    roleOrAffiliation: "VIT, Pune",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 58
  },
  {
    fullName: "Dr. Amar Buchade",
    roleOrAffiliation: "VIT, Pune",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 59
  },
  {
    fullName: "Dr. Virendra Dhotre",
    roleOrAffiliation: "VIT, Pune",
    category: "TECHNICAL_PROGRAM_COMMITTEE",
    categoryLabel: "Technical Program Committee",
    displayOrder: 60
  },

  // Tutorial Committee (2)
  {
    fullName: "Dr. Priya Shelke",
    roleOrAffiliation: "Head, CSE (Internet of Things, Cyber Security and Blockchain Technology), VIT Pune",
    category: "TUTORIAL_COMMITTEE",
    categoryLabel: "Tutorial Committee",
    displayOrder: 61
  },
  {
    fullName: "Dr. Deepali Jadhav",
    roleOrAffiliation: "Assistant Professor, Department of Information Technology, VIT Pune",
    category: "TUTORIAL_COMMITTEE",
    categoryLabel: "Tutorial Committee",
    displayOrder: 62
  },

  // Publication Committee (1)
  {
    fullName: "Dr. Amar Buchade",
    roleOrAffiliation: "VIT, Pune",
    category: "PUBLICATION_COMMITTEE",
    categoryLabel: "Publication Committee",
    displayOrder: 63
  },

  // Treasurer (2)
  {
    fullName: "Dr. Virendra Dhotre",
    roleOrAffiliation: "VIT, Pune",
    category: "TREASURER",
    categoryLabel: "Treasurer",
    displayOrder: 64
  },
  {
    fullName: "Prof. Gitanjali Yadav",
    roleOrAffiliation: "VIT, Pune",
    category: "TREASURER",
    categoryLabel: "Treasurer",
    displayOrder: 65
  }
];

export const initialRegistrationTiers: SeedRegistrationTier[] = [
  {
    memberCategory: "Professional Member (non-IEEE)",
    indianFeeDisplay: "8000 + 18% GST",
    indianBaseFeeInr: 8000,
    gstPercent: 18,
    indianTotalFeeInr: 9440,
    foreignFeeUsd: 120,
    isIeeeMember: false,
    participantType: "PROFESSIONAL",
    displayOrder: 1
  },
  {
    memberCategory: "Professional member (IEEE Member)",
    indianFeeDisplay: "7500 + 18% GST",
    indianBaseFeeInr: 7500,
    gstPercent: 18,
    indianTotalFeeInr: 8850,
    foreignFeeUsd: 110,
    isIeeeMember: true,
    participantType: "PROFESSIONAL",
    displayOrder: 2
  },
  {
    memberCategory: "Student (non-IEEE)",
    indianFeeDisplay: "7000 + 18% GST",
    indianBaseFeeInr: 7000,
    gstPercent: 18,
    indianTotalFeeInr: 8260,
    foreignFeeUsd: 100,
    isIeeeMember: false,
    participantType: "STUDENT",
    displayOrder: 3
  },
  {
    memberCategory: "Student (IEEE)",
    indianFeeDisplay: "6500 + 18% GST",
    indianBaseFeeInr: 6500,
    gstPercent: 18,
    indianTotalFeeInr: 7670,
    foreignFeeUsd: 90,
    isIeeeMember: true,
    participantType: "STUDENT",
    displayOrder: 4
  },
  {
    memberCategory: "Attendee",
    indianFeeDisplay: "3500 + 18% GST",
    indianBaseFeeInr: 3500,
    gstPercent: 18,
    indianTotalFeeInr: 4130,
    foreignFeeUsd: 80,
    isIeeeMember: false,
    participantType: "ATTENDEE",
    displayOrder: 5
  }
];

export const CO_AUTHOR_ADDON_FEE_INR = 2500;
export const CO_AUTHOR_ADDON_FEE_USD = 40;

export const initialHotels = [
  {
    id: 1,
    name: "Hotel Kohinoor Executive",
    location: "Apte Road, Deccan Gymkhana, Pune",
    distanceKm: 6.5,
    distanceLabel: "VIT Campus ~6.5 km",
    mapUrl: "https://maps.google.com/?q=Hotel+Kohinoor+Executive+Pune",
    rating: "4.2 ★★★★☆",
    photoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    attribution: "CC BY 4.0 · Licensed Attribution"
  },
  {
    id: 2,
    name: "The Pride Hotel Pune",
    location: "Shivajinagar, University Road, Pune",
    distanceKm: 7.8,
    distanceLabel: "VIT Campus ~7.8 km",
    mapUrl: "https://maps.google.com/?q=The+Pride+Hotel+Pune",
    rating: "4.4 ★★★★☆",
    photoUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    attribution: "CC BY 4.0 · Licensed Attribution"
  },
  {
    id: 3,
    name: "JW Marriott Hotel Pune",
    location: "Senapati Bapat Road, Pune",
    distanceKm: 8.5,
    distanceLabel: "VIT Campus ~8.5 km",
    mapUrl: "https://maps.google.com/?q=JW+Marriott+Hotel+Pune",
    rating: "4.7 ★★★★★",
    photoUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
    attribution: "CC BY 4.0 · 5-Star Luxury Conference Partner"
  },
  {
    id: 4,
    name: "Hotels near Swargate & Satara Road Corridor",
    location: "Panchami Hotel / Hotel Aurora Towers / Satara Road, Pune",
    distanceKm: 3.0,
    distanceLabel: "VIT Campus 2–4 km",
    mapUrl: "https://maps.google.com/?q=Swargate+Hotels+Pune",
    rating: "4.0 ★★★★☆",
    photoUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    attribution: "Direct metro & BRTS transit connectivity to Bibwewadi"
  },
  {
    id: 5,
    name: "Accommodations near Bibwewadi & Kondhwa",
    location: "Upper Indiranagar / Katraj-Kondhwa Link Road, Pune",
    distanceKm: 1.5,
    distanceLabel: "VIT Campus 1–3 km",
    mapUrl: "https://maps.google.com/?q=Bibwewadi+Pune+Hotels",
    rating: "4.1 ★★★★☆",
    photoUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    attribution: "Walking distance & short auto-rickshaw commute to VIT Pune"
  }
];

export const initialAttractions = [
  {
    id: 1,
    name: "Pu. La. Deshpande Garden",
    description: "Japanese-style garden modelled on Okayama's Korakuen Garden, located on Sinhagad Road with serene waterways and lawns.",
    distanceKm: 4.8,
    distanceLabel: "VIT Campus ~4.8 km",
    photoUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    photoAuthor: "Sarahqureshi11",
    license: "CC BY-SA 3.0"
  },
  {
    id: 2,
    name: "Parvati Hill Temple",
    description: "Ancient hilltop temple complex offering panoramic 360-degree vistas of Pune city, historical Peshwa shrines, and museum.",
    distanceKm: 3.6,
    distanceLabel: "VIT Campus ~3.6 km",
    photoUrl: "https://images.unsplash.com/photo-1600100397608-f010e421d011?auto=format&fit=crop&w=600&q=80",
    photoAuthor: "Siddhesh Nampurkar",
    license: "CC BY-SA 3.0"
  },
  {
    id: 3,
    name: "Raja Dinkar Kelkar Museum",
    description: "Extraordinary collection of Indian art, musical instruments, weaponry, and traditional craftsmanship curated by Dr. D.G. Kelkar.",
    distanceKm: 4.9,
    distanceLabel: "VIT Campus ~4.9 km",
    photoUrl: "https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=600&q=80",
    photoAuthor: "DesiBoy101",
    license: "CC BY 4.0"
  },
  {
    id: 4,
    name: "Shaniwar Wada",
    description: "Iconic 18th-century palace fortification and seat of the Peshwas of the Maratha Empire, famed for its massive gates and heritage.",
    distanceKm: 5.6,
    distanceLabel: "VIT Campus ~5.6 km",
    photoUrl: "https://images.unsplash.com/photo-1599818816943-41a4a49c25f4?auto=format&fit=crop&w=600&q=80",
    photoAuthor: "DesiBoy101",
    license: "CC BY 4.0"
  },
  {
    id: 5,
    name: "Shreemant Dagdusheth Halwai Ganpati",
    description: "One of Maharashtra's most revered and historic temples, renowned for its spiritual aura and cultural prominence in Pune.",
    distanceKm: 5.2,
    distanceLabel: "VIT Campus ~5.2 km",
    photoUrl: "https://images.unsplash.com/photo-1567591414240-e14b2d5583b4?auto=format&fit=crop&w=600&q=80",
    photoAuthor: "Siddheshnampurkar",
    license: "CC BY-SA 3.0"
  },
  {
    id: 6,
    name: "Sinhagad Fort",
    description: "Legendary hilltop fortress southwest of Pune perched at 1,312 meters, celebrated for the Battle of Sinhagad (1670) and trekking.",
    distanceKm: 26.0,
    distanceLabel: "VIT Campus ~26 km",
    photoUrl: "https://images.unsplash.com/photo-1626014303757-656447767742?auto=format&fit=crop&w=600&q=80",
    photoAuthor: "Amit mitkar",
    license: "CC BY-SA 3.0"
  }
];

export const initialSpeakers = [
  {
    id: 1,
    name: "Dr. Rajkumar Buyya",
    title: "Redmond Barry Distinguished Professor",
    affiliation: "Director, Cloud Computing & Distributed Systems (CLOUDS) Lab, The University of Melbourne, Australia",
    bio: "World-renowned scholar in cloud computing, edge intelligence, and sustainable green distributed computing systems.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    isKeynote: true,
    topic: "Smart Computing & Cloud-Edge Continuum for Sustainable Earth"
  },
  {
    id: 2,
    name: "Dr. Nilanjan Dey",
    title: "Professor & Associate Researcher",
    affiliation: "Techno International New Town & Visiting Scientist",
    bio: "Expert in IoT medical telemetry, machine learning diagnostics, and sustainable sensor networks.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    isKeynote: true,
    topic: "AI-Driven Healthcare Telemetry & Remote Sustainable Sensing"
  },
  {
    id: 3,
    name: "Dr. Prashant Kharat",
    title: "Deputy Director",
    affiliation: "All India Council for Technical Education (AICTE), New Delhi",
    bio: "Pioneering leader driving high-impact technical curriculum reforms, green computing standards, and industry-academia synergy.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    isKeynote: true,
    topic: "AICTE Initiatives on Sustainable Technical Innovation & Green Skilling"
  }
];

