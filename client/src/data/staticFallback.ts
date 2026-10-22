import { BootstrapResponse, AccommodationHotel, Attraction, Speaker } from '../types';

export const staticHotels: AccommodationHotel[] = [
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

export const staticAttractions: Attraction[] = [
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

export const staticSpeakers: Speaker[] = [
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

export const staticFallbackData: BootstrapResponse = {
  isDbConnected: false,
  coAuthorAddonFeeInr: 2500,
  coAuthorAddonFeeUsd: 40,
  hotels: staticHotels,
  attractions: staticAttractions,
  speakers: staticSpeakers,
  config: {
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
  },
  dates: [
    {
      id: 1,
      label: "Paper Submission (Hard) Deadline",
      dateText: "30th August 2026",
      isoDate: "2026-08-30T23:59:59.000Z",
      extendedText: null,
      category: "PAPER",
      displayOrder: 1,
      isActive: true
    },
    {
      id: 2,
      label: "Special Session Proposal Submission Deadline",
      dateText: "30th August 2026",
      isoDate: "2026-08-30T23:59:59.000Z",
      extendedText: null,
      category: "SPECIAL_SESSION",
      displayOrder: 2,
      isActive: true
    },
    {
      id: 3,
      label: "Tutorial Proposal Submission Deadline",
      dateText: "05 September 2026",
      isoDate: "2026-09-05T23:59:59.000Z",
      extendedText: null,
      category: "TUTORIAL",
      displayOrder: 3,
      isActive: true
    },
    {
      id: 4,
      label: "Special Session Sanctioned Notification",
      dateText: "05 September 2026",
      isoDate: "2026-09-05T23:59:59.000Z",
      extendedText: null,
      category: "SPECIAL_SESSION",
      displayOrder: 4,
      isActive: true
    },
    {
      id: 5,
      label: "Paper Notification of Acceptance",
      dateText: "10th September 2026",
      isoDate: "2026-09-10T23:59:59.000Z",
      extendedText: null,
      category: "PAPER",
      displayOrder: 5,
      isActive: true
    },
    {
      id: 6,
      label: "Tutorial Proposal Acceptance Notification",
      dateText: "12 September 2026",
      isoDate: "2026-09-12T23:59:59.000Z",
      extendedText: null,
      category: "TUTORIAL",
      displayOrder: 6,
      isActive: true
    },
    {
      id: 7,
      label: "Camera-Ready Paper Submission & Early Bird Registration",
      dateText: "15th September 2026",
      isoDate: "2026-09-15T23:59:59.000Z",
      extendedText: null,
      category: "PAPER",
      displayOrder: 7,
      isActive: true
    },
    {
      id: 8,
      label: "Pre-Conference Tutorials",
      dateText: "25th November 2026",
      isoDate: "2026-11-25T09:00:00.000Z",
      extendedText: null,
      category: "TUTORIAL",
      displayOrder: 8,
      isActive: true
    },
    {
      id: 9,
      label: "Conference Dates (Hybrid Mode)",
      dateText: "25th to 27th November 2026",
      isoDate: "2026-11-25T09:00:00.000Z",
      extendedText: null,
      category: "CONFERENCE",
      displayOrder: 9,
      isActive: true
    }
  ],
  tracks: [
    {
      id: 1,
      trackNumber: 1,
      title: "Artificial Intelligence & Machine Learning for Sustainability",
      slug: "ai-ml-sustainability",
      iconName: "BrainCircuit",
      topics: [
        { id: 1, trackId: 1, topicText: "AI-driven sustainable solutions", displayOrder: 1 },
        { id: 2, trackId: 1, topicText: "Explainable AI for decision-making", displayOrder: 2 },
        { id: 3, trackId: 1, topicText: "Machine learning applications in environmental monitoring", displayOrder: 3 },
        { id: 4, trackId: 1, topicText: "AI for predictive analytics in smart cities", displayOrder: 4 }
      ]
    },
    {
      id: 2,
      trackNumber: 2,
      title: "IoT, Edge & Cloud Computing for Smart Systems",
      slug: "iot-edge-cloud",
      iconName: "Cpu",
      topics: [
        { id: 5, trackId: 2, topicText: "IoT-enabled smart infrastructure", displayOrder: 1 },
        { id: 6, trackId: 2, topicText: "Edge computing for real-time applications", displayOrder: 2 },
        { id: 7, trackId: 2, topicText: "Cloud-based solutions for sustainability", displayOrder: 3 },
        { id: 8, trackId: 2, topicText: "Sensor networks and intelligent data processing", displayOrder: 4 }
      ]
    },
    {
      id: 3,
      trackNumber: 3,
      title: "Blockchain & Cybersecurity for Sustainable Development",
      slug: "blockchain-cybersecurity",
      iconName: "ShieldCheck",
      topics: [
        { id: 9, trackId: 3, topicText: "Blockchain applications in green energy & supply chains", displayOrder: 1 },
        { id: 10, trackId: 3, topicText: "Cybersecurity challenges in smart systems", displayOrder: 2 },
        { id: 11, trackId: 3, topicText: "Decentralized finance (DeFi) and sustainability", displayOrder: 3 },
        { id: 12, trackId: 3, topicText: "Secure communication protocols for IoT", displayOrder: 4 }
      ]
    },
    {
      id: 4,
      trackNumber: 4,
      title: "Sustainable Smart Cities & Infrastructure",
      slug: "smart-cities-infrastructure",
      iconName: "Building2",
      topics: [
        { id: 13, trackId: 4, topicText: "Intelligent transportation systems", displayOrder: 1 },
        { id: 14, trackId: 4, topicText: "Smart grids and energy-efficient technologies", displayOrder: 2 },
        { id: 15, trackId: 4, topicText: "Green buildings and urban development", displayOrder: 3 },
        { id: 16, trackId: 4, topicText: "GIS and remote sensing for smart city planning", displayOrder: 4 }
      ]
    },
    {
      id: 5,
      trackNumber: 5,
      title: "Sustainable Healthcare & Biomedical Innovations",
      slug: "healthcare-biomedical",
      iconName: "HeartPulse",
      topics: [
        { id: 17, trackId: 5, topicText: "AI and IoT in healthcare", displayOrder: 1 },
        { id: 18, trackId: 5, topicText: "Smart medical devices and remote monitoring", displayOrder: 2 },
        { id: 19, trackId: 5, topicText: "Personalized medicine and digital health", displayOrder: 3 },
        { id: 20, trackId: 5, topicText: "Sustainable biomedical waste management", displayOrder: 4 }
      ]
    },
    {
      id: 6,
      trackNumber: 6,
      title: "Renewable Energy & Smart Grid Technologies",
      slug: "renewable-energy-smart-grid",
      iconName: "Zap",
      topics: [
        { id: 21, trackId: 6, topicText: "Smart grids and energy optimization", displayOrder: 1 },
        { id: 22, trackId: 6, topicText: "AI-driven energy forecasting", displayOrder: 2 },
        { id: 23, trackId: 6, topicText: "Sustainable battery technologies", displayOrder: 3 },
        { id: 24, trackId: 6, topicText: "Integration of renewable energy sources", displayOrder: 4 }
      ]
    },
    {
      id: 7,
      trackNumber: 7,
      title: "Data Science & Big Data Analytics for Sustainability",
      slug: "data-science-big-data",
      iconName: "Database",
      topics: [
        { id: 25, trackId: 7, topicText: "Sustainable data centers and storage", displayOrder: 1 },
        { id: 26, trackId: 7, topicText: "Big data analytics for environmental monitoring", displayOrder: 2 },
        { id: 27, trackId: 7, topicText: "Predictive modeling for disaster management", displayOrder: 3 },
        { id: 28, trackId: 7, topicText: "Real-time analytics for smart applications", displayOrder: 4 }
      ]
    },
    {
      id: 8,
      trackNumber: 8,
      title: "Robotics & Automation for Sustainable Industries",
      slug: "robotics-automation",
      iconName: "Bot",
      topics: [
        { id: 29, trackId: 8, topicText: "AI-powered industrial automation", displayOrder: 1 },
        { id: 30, trackId: 8, topicText: "Robotics for waste management", displayOrder: 2 },
        { id: 31, trackId: 8, topicText: "Sustainable manufacturing using automation", displayOrder: 3 },
        { id: 32, trackId: 8, topicText: "Human-robot collaboration for green production", displayOrder: 4 }
      ]
    },
    {
      id: 9,
      trackNumber: 9,
      title: "Communication & Networking for Smart Systems",
      slug: "communication-networking",
      iconName: "Radio",
      topics: [
        { id: 33, trackId: 9, topicText: "6G and beyond for sustainable connectivity", displayOrder: 1 },
        { id: 34, trackId: 9, topicText: "Low-power communication protocols", displayOrder: 2 },
        { id: 35, trackId: 9, topicText: "Smart vehicular networks", displayOrder: 3 },
        { id: 36, trackId: 9, topicText: "Satellite-based communication for sustainability", displayOrder: 4 }
      ]
    }
  ],
  committee: [
    // Patron (3)
    {
      id: 1,
      fullName: "Shri Rajkumarji Agarwal",
      roleOrAffiliation: "Chairman, BRACT's Vishwakarma Institute of Technology Pune",
      category: "PATRON",
      categoryLabel: "Patron",
      displayOrder: 1
    },
    {
      id: 2,
      fullName: "Shri Bharat Agarwal",
      roleOrAffiliation: "Managing Trustee, BRACT's Vishwakarma Institute of Technology Pune",
      category: "PATRON",
      categoryLabel: "Patron",
      displayOrder: 2
    },
    {
      id: 3,
      fullName: "Dr. Bipin Sule",
      roleOrAffiliation: "CEO, Vishwakarma Institutes & University",
      category: "PATRON",
      categoryLabel: "Patron",
      displayOrder: 3
    },

    // General Chairs (2)
    {
      id: 4,
      fullName: "Dr. Rajesh Jalnekar",
      roleOrAffiliation: "Director, VIT Pune",
      category: "GENERAL_CHAIR",
      categoryLabel: "General Chairs",
      displayOrder: 4
    },
    {
      id: 5,
      fullName: "Dr. Vivek Deshpande",
      roleOrAffiliation: "Director, VIIT Pune",
      category: "GENERAL_CHAIR",
      categoryLabel: "General Chairs",
      displayOrder: 5
    },

    // General Co-Chairs (2)
    {
      id: 6,
      fullName: "Dr. Parikshit Mahalle",
      roleOrAffiliation: "Dean Academics",
      category: "GENERAL_CO_CHAIR",
      categoryLabel: "General Co-Chairs",
      displayOrder: 6
    },
    {
      id: 7,
      fullName: "Dr. Vijay Mane",
      roleOrAffiliation: "Dean Alumni and Outreach",
      category: "GENERAL_CO_CHAIR",
      categoryLabel: "General Co-Chairs",
      displayOrder: 7
    },

    // Advisory Committee (30)
    {
      id: 8,
      fullName: "Dr. Rajkumar Buyya",
      roleOrAffiliation: "Redmond Barry Distinguished Professor; Director, Quantum Cloud Computing and Distributed Systems (qCLOUDS) Lab; School of Computing and Information Systems, The University of Melbourne",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 8
    },
    {
      id: 9,
      fullName: "Dr. Prashant Kharat",
      roleOrAffiliation: "Deputy Director, AICTE",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 9
    },
    {
      id: 10,
      fullName: "Dr. Sachin Deshmukh",
      roleOrAffiliation: "Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 10
    },
    {
      id: 11,
      fullName: "Dr. Haribhau Bhapkar",
      roleOrAffiliation: "Associate Professor in Mathematics, Department of Mathematics, Central University of Kashmir",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 11
    },
    {
      id: 12,
      fullName: "Dr. Nilanjan Dey",
      roleOrAffiliation: "Professor, Techno International New Town",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 12
    },
    {
      id: 13,
      fullName: "Dr. Pradip Jawandhiya",
      roleOrAffiliation: "Principal, P. R. Pote Patil College of Engineering and Management, Amravati",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 13
    },
    {
      id: 14,
      fullName: "Dr. Manish Potey",
      roleOrAffiliation: "Professor, K. J. Somaiya College of Engineering, Vidyanagar Campus, Vidyavihar, Mumbai",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 14
    },
    {
      id: 15,
      fullName: "Dr. Kailash Karande",
      roleOrAffiliation: "Principal, SKN Sinhgad College of Engineering, Pandharpur",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 15
    },
    {
      id: 16,
      fullName: "Dr. Ratnadeep Deshmukh",
      roleOrAffiliation: "Director, International Centre of Excellence in Engineering and Management (ICEEM)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 16
    },
    {
      id: 17,
      fullName: "Dr. Suhas Sapate",
      roleOrAffiliation: "Principal, Dr. Bapuji Salunkhe Institute of Engineering and Technology, Kolhapur",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 17
    },
    {
      id: 18,
      fullName: "Prof. (Dr.) Vaishali Patil",
      roleOrAffiliation: "Dean – Administration and Registrar",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 18
    },
    {
      id: 19,
      fullName: "Prof. (Dr.) Ganesh Dongre",
      roleOrAffiliation: "Dean – Quality Assurance",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 19
    },
    {
      id: 20,
      fullName: "Prof. (Dr.) Kapil Mundada",
      roleOrAffiliation: "Dean – Admissions",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 20
    },
    {
      id: 21,
      fullName: "Prof. (Dr.) Neelam Chandolikar",
      roleOrAffiliation: "Dean, Examination",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 21
    },
    {
      id: 22,
      fullName: "Prof. (Dr.) Swati Shilaskar",
      roleOrAffiliation: "Dean – Research & Development",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 22
    },
    {
      id: 23,
      fullName: "Prof. S.B. Karthick",
      roleOrAffiliation: "Dean – Industry Relations",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 23
    },
    {
      id: 24,
      fullName: "Prof. Ganesh Korwar",
      roleOrAffiliation: "Dean – Finance",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 24
    },
    {
      id: 25,
      fullName: "Prof. (Dr.) Vijay Gaikwad",
      roleOrAffiliation: "Dean – Student Career Counselling and Guidance",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 25
    },
    {
      id: 26,
      fullName: "Prof. (Dr.) Atul Kulkarni",
      roleOrAffiliation: "Director Corporate Relations",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 26
    },
    {
      id: 27,
      fullName: "Prof. Dr. Nitin Sakhare",
      roleOrAffiliation: "Chief International Relations Officer",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 27
    },
    {
      id: 28,
      fullName: "Dr. Sandip Shinde",
      roleOrAffiliation: "Head, Department of Computer Engineering",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 28
    },
    {
      id: 29,
      fullName: "Dr. Pravin Futane",
      roleOrAffiliation: "Head, Department of Information Technology",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 29
    },
    {
      id: 30,
      fullName: "Dr. Medha Vishwanath Wyawahare",
      roleOrAffiliation: "Head, Department of Electronics and Telecommunication",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 30
    },
    {
      id: 31,
      fullName: "Dr. Sandip Kore",
      roleOrAffiliation: "Head, Department of Mechanical Engineering",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 31
    },
    {
      id: 32,
      fullName: "Dr. Shilpa Sondkar",
      roleOrAffiliation: "Head, Department of Instrumentation",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 32
    },
    {
      id: 33,
      fullName: "Prof. (Dr.) Shilpa M. Lambor",
      roleOrAffiliation: "Engineering Science and Humanities",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 33
    },
    {
      id: 34,
      fullName: "Prof. (Dr.) Shital Parag Dongre",
      roleOrAffiliation: "Artificial Intelligence & Data Science (AI & DS)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 34
    },
    {
      id: 35,
      fullName: "Prof. (Dr.) Shrikant T. Shinde",
      roleOrAffiliation: "Civil Engineering",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 35
    },
    {
      id: 36,
      fullName: "Prof. (Dr.) Sunil M. Sangve",
      roleOrAffiliation: "Computer Engineering (Software Engineering)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 36
    },
    {
      id: 37,
      fullName: "Dr. Deepa Abin",
      roleOrAffiliation: "Computer Science & Engineering (Data Science)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 37
    },
    {
      id: 38,
      fullName: "Prof. (Dr.) Priya M. Shelke",
      roleOrAffiliation: "Computer Science & Engineering (Internet of Things, Cyber Security including BlockChain Technology)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 38
    },
    {
      id: 39,
      fullName: "Prof. Dr. Nilesh P. Sable",
      roleOrAffiliation: "Computer Science & Engineering (Artificial Intelligence)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 39
    },
    {
      id: 40,
      fullName: "Dr. Premanand Ghadekar",
      roleOrAffiliation: "Head, Department of CSE (AI & ML)",
      category: "ADVISORY_COMMITTEE",
      categoryLabel: "Advisory Committee Members",
      displayOrder: 40
    },

    // Technical Program Committee (20)
    {
      id: 41,
      fullName: "Dr. Anil Surve",
      roleOrAffiliation: "Professor, Walchand College of Engineering Sangli",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 41
    },
    {
      id: 42,
      fullName: "Dr. Prashant Kharat",
      roleOrAffiliation: "Deputy Director, AICTE, New Delhi",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 42
    },
    {
      id: 43,
      fullName: "Dr. Sachin Jadhav",
      roleOrAffiliation: "Associate Professor, Jawaharlal Nehru University - School of Computer and Systems Sciences",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 43
    },
    {
      id: 44,
      fullName: "Dr. Deepak Sharma",
      roleOrAffiliation: "Dean Academics, Somaiya Vidyavihar University",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 44
    },
    {
      id: 45,
      fullName: "Dr. Subhash Shinde",
      roleOrAffiliation: "Professor at Lokmanya Tilak College of Engineering",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 45
    },
    {
      id: 46,
      fullName: "Dr. Pallavi Chavan",
      roleOrAffiliation: "Professor, SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 46
    },
    {
      id: 47,
      fullName: "Dr. Ramchandra Mangrulkar",
      roleOrAffiliation: "Professor, Dwarkadas J. Sanghvi College of Engineering",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 47
    },
    {
      id: 48,
      fullName: "Dr. Namdev Sawant",
      roleOrAffiliation: "SKN Sinhgad COE Pandharpur",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 48
    },
    {
      id: 49,
      fullName: "Dr. Prasad Lokulwar",
      roleOrAffiliation: "Professor and PG Coordinator, Department of Computer Science and Engineering, G H Raisoni College of Engineering (Autonomous), Nagpur",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 49
    },
    {
      id: 50,
      fullName: "Dr. Ganesh Regulwar",
      roleOrAffiliation: "Associate Professor, Vardhaman College of Engineering, Hyderabad, Telangana",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 50
    },
    {
      id: 51,
      fullName: "Kedar Nagnathrao Ghogale",
      roleOrAffiliation: "Scientist E, Centre for Development of Advanced Computing (C-DAC)",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 51
    },
    {
      id: 52,
      fullName: "Samarjeet Borah",
      roleOrAffiliation: "Professor and Head, Department of Computer Applications, SMIT, Sikkim Manipal University, India",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 52
    },
    {
      id: 53,
      fullName: "Dr. Makrand Shahade",
      roleOrAffiliation: "Professor, SVKM's Institute of Technology, Dhule",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 53
    },
    {
      id: 54,
      fullName: "Parag Thakare",
      roleOrAffiliation: "Professor, Jagadambha College of Engg. & Tech., Yavatmal",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 54
    },
    {
      id: 55,
      fullName: "Prashant Awasthi",
      roleOrAffiliation: "Tech Architecture Sr Manager, Accenture",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 55
    },
    {
      id: 56,
      fullName: "Dr. Archana Chaudhari",
      roleOrAffiliation: "VIT, Pune",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 56
    },
    {
      id: 57,
      fullName: "Dr. Nilesh Sable",
      roleOrAffiliation: "VIT, Pune",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 57
    },
    {
      id: 58,
      fullName: "Dr. Shital Dongre",
      roleOrAffiliation: "VIT, Pune",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 58
    },
    {
      id: 59,
      fullName: "Dr. Amar Buchade",
      roleOrAffiliation: "VIT, Pune",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 59
    },
    {
      id: 60,
      fullName: "Dr. Virendra Dhotre",
      roleOrAffiliation: "VIT, Pune",
      category: "TECHNICAL_PROGRAM_COMMITTEE",
      categoryLabel: "Technical Program Committee",
      displayOrder: 60
    },

    // Tutorial Committee (2)
    {
      id: 61,
      fullName: "Dr. Priya Shelke",
      roleOrAffiliation: "Head, CSE (Internet of Things, Cyber Security and Blockchain Technology), VIT Pune",
      category: "TUTORIAL_COMMITTEE",
      categoryLabel: "Tutorial Committee",
      displayOrder: 61
    },
    {
      id: 62,
      fullName: "Dr. Deepali Jadhav",
      roleOrAffiliation: "Assistant Professor, Department of Information Technology, VIT Pune",
      category: "TUTORIAL_COMMITTEE",
      categoryLabel: "Tutorial Committee",
      displayOrder: 62
    },

    // Publication Committee (1)
    {
      id: 63,
      fullName: "Dr. Amar Buchade",
      roleOrAffiliation: "VIT, Pune",
      category: "PUBLICATION_COMMITTEE",
      categoryLabel: "Publication Committee",
      displayOrder: 63
    },

    // Treasurer (2)
    {
      id: 64,
      fullName: "Dr. Virendra Dhotre",
      roleOrAffiliation: "VIT, Pune",
      category: "TREASURER",
      categoryLabel: "Treasurer",
      displayOrder: 64
    },
    {
      id: 65,
      fullName: "Prof. Gitanjali Yadav",
      roleOrAffiliation: "VIT, Pune",
      category: "TREASURER",
      categoryLabel: "Treasurer",
      displayOrder: 65
    }
  ],
  registrationTiers: [
    {
      id: 1,
      categoryKey: "PROFESSIONAL_NON_IEEE",
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
      id: 2,
      categoryKey: "PROFESSIONAL_IEEE",
      memberCategory: "Professional Member (IEEE Member)",
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
      id: 3,
      categoryKey: "STUDENT_NON_IEEE",
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
      id: 4,
      categoryKey: "STUDENT_IEEE",
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
      id: 5,
      categoryKey: "ATTENDEE",
      memberCategory: "Attendee (Non-Author)",
      indianFeeDisplay: "3500 + 18% GST",
      indianBaseFeeInr: 3500,
      gstPercent: 18,
      indianTotalFeeInr: 4130,
      foreignFeeUsd: 80,
      isIeeeMember: false,
      participantType: "ATTENDEE",
      displayOrder: 5
    }
  ]
};
