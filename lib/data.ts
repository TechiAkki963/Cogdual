export type Service = {
  title: string;
  audience: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type Job = {
  id: string;
  title: string;
  mode: 'Remote' | 'Office';
  locationLabel: string;
  summary: string;
  skills: string[];
};

export type Solution = {
  title: string;
  description: string;
  href: string;
  audience: string;
  external?: boolean;
};

export const company = {
  name: 'Cogdual Infotech Solutions',
  tagline: 'Comprehensive HR & Career Solutions',
  phoneDisplay: '9585911663',
  phoneHref: '+919585911663',
  email: 'hrservices@cogdual.com',
  address: 'Door No. 5 Sath Sangam Road, SS Colony, Madurai - 626016',
  city: 'Madurai',
  region: 'Tamil Nadu',
  postalCode: '626016',
  country: 'IN',
  linkedin: 'https://www.linkedin.com/company/cogdual-infotech-solutions/home/',
  youtubeSearch: 'https://www.youtube.com/results?search_query=Vettrikanavugal',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Door%20No.%205%20Sath%20Sangam%20Road%2C%20SS%20Colony%2C%20Madurai%20-%20626016',
} as const;

export const audienceRoutes = [
  {
    title: 'I am looking for a job',
    description: 'See current openings and apply with your resume in under a minute.',
    href: '/#jobs',
    action: 'Explore jobs',
  },
  {
    title: 'I want to get certified',
    description: 'Explore global technology certifications, practice and exam vouchers.',
    href: '/certifications',
    action: 'View certifications',
  },
  {
    title: 'I need to hire',
    description: 'Freshers, lateral talent, leaders, payroll and workforce support.',
    href: '/employers',
    action: 'Employer solutions',
  },
  {
    title: 'I represent a college',
    description: 'Bring industry voices, faculty programmes and curriculum guidance to campus.',
    href: '/colleges',
    action: 'College programmes',
  },
] as const;

export const solutions: Solution[] = [
  {
    title: 'Fresher / entry-level hiring',
    audience: 'Employers',
    description: 'Source, screen and shortlist graduates against your role requirements and early-career hiring goals.',
    href: '/employers#fresher-hiring',
  },
  {
    title: 'Experienced / lateral hiring',
    audience: 'Employers',
    description: 'Recruit experienced IT and non-IT professionals with role, domain and experience fit in focus.',
    href: '/employers#lateral-hiring',
  },
  {
    title: 'Executive / leadership search',
    audience: 'Employers',
    description: 'A discreet senior search process for leadership roles aligned to strategy, capability and culture.',
    href: '/employers#executive-search',
  },
  {
    title: 'Corporate training',
    audience: 'Companies',
    description: 'Custom communication, behavioural and leadership development programmes shaped around team needs.',
    href: '/employers#corporate-training',
  },
  {
    title: 'Payroll outsourcing',
    audience: 'Companies',
    description: 'Support for payroll operations, tax advisory and submissions, compensation and statutory compliance.',
    href: '/employers#payroll',
  },
  {
    title: 'IT business partnering',
    audience: 'Companies',
    description: 'Requirement-led technology business support referenced in Cogdual’s public commercial model; scope is confirmed through enquiry.',
    href: '/employers#it-business-partnering',
  },
  {
    title: 'Global certification',
    audience: 'Students & professionals',
    description: 'Job-ready certification routes and vouchers from global technology and business brands.',
    href: '/certifications',
  },
  {
    title: 'VConnect · Industry–academia',
    audience: 'Colleges',
    description: 'Industry speakers, faculty development, event judging and curriculum guidance for institutions.',
    href: '/colleges',
  },
  {
    title: 'Kidzora',
    audience: 'Parents & educators',
    description: 'Printable and digital learning products for ages 3–10, designed to make practice playful.',
    href: 'https://cogdual.com/kidzora-kids-world',
    external: true,
  },
  {
    title: 'Corporate Gifts',
    audience: 'Businesses',
    description: 'Cogdual’s corporate gifting catalogue, including merchandise and custom-branded options.',
    href: 'https://cogdual.com/corporate-gifts',
    external: true,
  },
];

export const certificationBrands = ['IBM', 'Meta', 'Cisco', 'Microsoft', 'Adobe', 'Tally'] as const;

export const certificationVoucherTypes = [
  { title: 'E-learning', description: 'Structured learning access for certification preparation.' },
  { title: 'Practice', description: 'Practice products to rehearse knowledge before the exam.' },
  { title: 'Exam', description: 'Exam vouchers for the certification selected.' },
  { title: 'Bundle', description: 'Combined learning, practice and/or exam options where available.' },
] as const;

export const vconnectPrograms = [
  {
    title: 'Guest lectures · Students',
    description: 'Career readiness, industry trends, skills and tools explained by working professionals.',
    meta: 'Virtual or in-person · up to 1 hour · typically 100–500 students',
  },
  {
    title: 'Faculty development programmes',
    description: 'Workshops for faculty and staff to align academic preparation with current industry expectations.',
    meta: 'Virtual or in-person · up to 1 hour · typically 25–50 participants',
  },
  {
    title: 'Event judging & panel assessment',
    description: 'Industry experts for hackathons, paper presentations, pitch competitions and technical symposia.',
    meta: 'Virtual or in-person · up to 3 hours · per event / competition',
  },
  {
    title: 'Curriculum creation & guidance',
    description: 'Advisory support for academic boards and departments designing industry-relevant course frameworks.',
    meta: 'Virtual or in-person · hourly consulting basis',
  },
] as const;

export const recruitmentFeeBands = [
  { label: 'Experienced · under 5 years', fee: '8.33% + GST', basis: 'Annual CTC' },
  { label: 'Experienced · 5–10 years', fee: '10% + GST', basis: 'Annual CTC' },
  { label: 'Experienced · above 10 years', fee: '12% + GST', basis: 'Annual CTC' },
  { label: 'Executive / leadership search', fee: '15% + GST', basis: 'Annual CTC' },
] as const;

export const services: Service[] = [
  {
    title: 'Employer solutions',
    audience: 'Employers & startups',
    description:
      'Fresher, lateral and leadership hiring with corporate training, payroll support and a clear commercial model.',
    href: '/employers',
    linkLabel: 'Explore employer solutions',
  },
  {
    title: 'Global certification',
    audience: 'Students & professionals',
    description:
      'Certification pathways and e-learning, practice, exam and bundle vouchers from leading global brands.',
    href: '/certifications',
    linkLabel: 'Explore certifications',
  },
  {
    title: 'VConnect · Industry–academia',
    audience: 'Colleges',
    description:
      'Guest speakers, faculty development, event judging and curriculum guidance that bring industry closer to campus.',
    href: '/colleges',
    linkLabel: 'Explore VConnect',
  },
  {
    title: 'Kidzora & corporate gifting',
    audience: 'Families & businesses',
    description:
      'Secondary Cogdual ventures spanning children’s learning products and practical corporate gifting.',
    href: 'https://cogdual.com/kidzora-kids-world',
    linkLabel: 'Explore Cogdual ventures',
  },
];

export const jobs: Job[] = [
  {
    id: 'node-js-developer',
    title: 'Node JS Developer',
    mode: 'Remote',
    locationLabel: 'Remote · India',
    summary:
      'Build reliable backend services and APIs for product teams that value clean delivery, observability and maintainable JavaScript systems.',
    skills: ['Node.js', 'REST APIs', 'Databases'],
  },
  {
    id: 'application-support-engineer',
    title: 'Application Support Engineer',
    mode: 'Remote',
    locationLabel: 'Remote · India',
    summary:
      'Own production support, incident triage and clear technical communication while helping engineering teams improve service reliability.',
    skills: ['Support', 'SQL', 'Troubleshooting'],
  },
  {
    id: 'senior-etl-developer',
    title: 'Senior ETL Developer',
    mode: 'Remote',
    locationLabel: 'Remote · India',
    summary:
      'Design dependable data pipelines, improve transformation performance and help teams move business-critical data with confidence.',
    skills: ['ETL', 'SQL', 'Data pipelines'],
  },
  {
    id: 'rust-developer',
    title: 'RUST Developer',
    mode: 'Remote',
    locationLabel: 'Remote · India',
    summary:
      'Create efficient, safe systems software and backend components with strong attention to correctness, performance and production quality.',
    skills: ['Rust', 'Systems', 'Backend'],
  },
  {
    id: 'java-full-stack-developer',
    title: 'Java Full Stack Developer',
    mode: 'Office',
    locationLabel: 'Work from office',
    summary:
      'Ship end-to-end web features across Java services and modern frontends, collaborating closely with product and delivery teams.',
    skills: ['Java', 'Spring', 'Frontend'],
  },
];

export const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Employer Solutions', href: '/employers' },
  { label: 'VConnect', href: '/colleges' },
  { label: 'Corporate Gifts', href: 'https://cogdual.com/corporate-gifts' },
  { label: 'Kidzora', href: 'https://cogdual.com/kidzora-kids-world' },
  { label: 'Online Store', href: 'https://cogdual.com/' },
] as const;
