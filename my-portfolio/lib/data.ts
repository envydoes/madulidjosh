export const techStack = [
  { name: 'PHP', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'HTML5 & CSS3', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'RESTful APIs', category: 'Backend' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Coolify', category: 'DevOps' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Figma', category: 'Design' },
  { name: 'Claude Code', category: 'AI & Tools' },
  { name: 'Google Gemini', category: 'AI & Tools' },
  { name: 'OpenAI', category: 'AI & Tools' },
  { name: 'Linux / Apache', category: 'DevOps' },
];

const categoryColor: Record<string, string> = {
  Backend: '#FF2E2E',
  Database: '#FF2E2E',
  Frontend: '#10B981',
  DevOps: '#38BDF8',
  Tools: '#38BDF8',
  Design: '#FF2E2E',
  'AI & Tools': '#10B981',
};

export function colorFor(category: string) {
  return categoryColor[category] || '#38BDF8';
}

export const projects = [
  {
    id: 'sumeste-portal',
    title: 'SumEste Portal',
    category: 'Full-Stack',
    description:
      'Cross-platform resident tracking system built for the Sumacab Este community, helping organize resident information and support efficient local administration.',
    year: '2026',
    tags: ['PHP', 'MySQL', 'Tailwind CSS', 'Live System'],
    image: 'https://sum-este-portal.digital/uploads/site/sitelogo_8ba5ce5e050ec6c3.png',
    badge: 'Live Production',
    liveUrl: 'https://sum-este-portal.digital',
    githubUrl: 'https://github.com/envydoes/SumEste-Portal',
  },
  {
    id: 'aurora',
    title: 'Aurora Platform',
    category: 'Full-Stack',
    description:
      'A web-based tourism and accommodation platform designed to help visitors discover destinations, plan stays, and explore local experiences.',
    year: '2024',
    tags: ['PHP', 'HTML5', 'CSS3', 'JavaScript'],
    image: 'https://raw.githubusercontent.com/envydoes/aurora/main/images/logo.png',
    badge: 'Tourism Platform',
    liveUrl: '',
    githubUrl: 'https://github.com/envydoes/aurora',
  },
  {
    id: 'atom-ai-design',
    title: 'ATOM AI — Conversing App UI/UX',
    category: 'UI/UX & Design',
    description:
      'Comprehensive conversing app interface design with home chat, login, cloud space, and 20 supporting high-fidelity screens organized in Figma.',
    year: '2024',
    tags: ['Figma', 'UI/UX', 'Design System', '20 Screens'],
    image: '/images/atom-ai/chat.jpg',
    badge: 'Design System',
    liveUrl: '',
    githubUrl: '',
  },
];

export const timeline = [
  {
    year: '2023 — Present',
    title: 'BS Information Technology (Graduating) — Web System Technology',
    description:
      'Currently studying at Nueva Ecija University of Science and Technology (NEUST) • Nueva Ecija, Philippines.',
  },
  {
    year: '2022 — 2023',
    title: 'Started Programming — HTML, CSS & JavaScript',
    description:
      'Began the journey into web development by learning HTML, CSS, and JavaScript from the ground up, then expanded into UI/UX — designing interactive front-end builds and translating ideas into polished web interfaces.',
  },
];

export const certifications = [
  { title: 'Google AI Professional Certificate', issuer: 'Google', image: '/images/google-ai-professional-certificate.png' },
  { title: 'System Integration', issuer: 'Upskill', image: '/images/upskill-system-integration.png' },
  { title: 'Enterprise Architecture', issuer: 'Upskill', image: '/images/upskill-enterprise-architecture.png' },
  { title: 'Azure AI Fundamentals', issuer: 'TESDA', image: '/images/tesda-azure-ai-fundamentals.png' },
  { title: 'JavaScript Essentials', issuer: 'Cisco', image: '/images/javascript-essentials-2-certificate.png' },
  { title: 'Interview Tactics', issuer: 'Upskill', image: '/images/upskill-interview-tactics.png' },
];
