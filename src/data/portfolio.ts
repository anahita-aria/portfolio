export const personalInfo = {
  name: "Anahita Aria",
  title: "Senior Product Designer | AI-Native Designer with an Engineering Mind",
  tagline:
    "I design fintech and crypto products that ship, scale, and move metrics.",
  bio: "I design fintech and crypto products that ship, scale, and move metrics. With a Master's in Artificial Intelligence and a Bachelor's in Software Engineering, I approach product design with a rare dual lens — understanding what users need AND what's technically possible. I translate Figma designs directly into code with AI tools like Claude and the Figma MCP server, building products that actually make it to production, not just Figma. 6+ years, 10+ products across 7+ industries, with team leadership of 4 designers at Max Holding.",
  specialization:
    "Making complex, technical, highly-regulated products feel intuitive — crypto wallets, banking flows, B2B cockpits.",
  lookingFor: [
    "Hiring a Senior/Lead Product Designer in Berlin (fintech, crypto, AI-first products)",
    "Building something complex that needs to feel simple",
    "Curious about AI-powered design workflows",
  ],
  contact: {
    email: "aanahita.aaria@gmail.com",
    phone: "+39 345 6916",
    linkedin: "anahita-aria",
    location: "Milan, Italy",
    relocation: "Open to Berlin, Germany",
    portfolio: "https://www.behance.net/anahitaaria2",
  },
  stats: [
    { value: "80%", label: "Faster design-to-dev handoff", sub: "via Figma MCP + Claude" },
    { value: "3×", label: "Insurance sales conversion", sub: "Azki B2B2C platform" },
    { value: "40+", label: "Production components shipped", sub: "Figma-to-code with AI" },
  ],
  education: [
    {
      degree: "Master's Degree in Artificial Intelligence",
      school: "Kharazmi University",
      years: "2020 – 2022",
    },
    {
      degree: "Bachelor's Degree in Software Engineering",
      school: "Shahid Chamran University of Ahvaz",
      years: "2014 – 2018",
    },
  ],
  publications: [
    {
      label: "IEEE Publication",
      title: "ResViT: A Hybrid Model for Robust Deepfake Video Detection",
      venue: "IEEE International Conference CSR 2025",
      status: "Published",
      link: "https://ieeexplore.ieee.org/document/11130110",
    },
  ],
  languages: [
    { name: "Persian / Farsi", level: "Native" },
    { name: "English", level: "Fluent (professional working proficiency)" },
    { name: "German", level: "Beginner (actively learning)" },
  ],
  skills: {
    design: [
      "Product Design",
      "UX/UI Design",
      "Design Systems",
      "Interaction Design",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Responsive Design",
    ],
    research: [
      "Competitive Audits",
      "Usability Testing",
      "User Interviews",
      "User Research",
      "User Flows",
      "Journey Mapping",
    ],
    technical: [
      "AI-Powered Design (Claude, KlingAI)",
      "Design-to-Code",
      "Figma",
      "Figma MCP Server",
      "Storybook",
      "Git",
      "Tokens Studio",
      "Miro/FigJam",
    ],
  },
  // Legacy fields kept for backward compatibility with existing components
  softSkills: [
    "Problem Solving",
    "Empathy",
    "Adaptability",
    "Team Working",
    "Collaboration",
    "Communication",
  ],
  hardSkills: [
    "Product Design",
    "UX/UI Design",
    "Design Systems",
    "Interaction Design",
    "Information Architecture",
    "Wireframing",
    "Prototyping",
    "Responsive Design",
    "User Research",
    "Competitive Audits",
    "Usability Testing",
    "User Flows",
    "Journey Mapping",
    "Design Thinking",
  ],
  tools: {
    "AI & Design-to-Code": ["Claude", "Figma MCP Server", "KlingAI"],
    "UI Design": ["Figma", "Sketch", "Adobe XD", "Adobe Illustrator"],
    "Design System": ["Tokens Studio", "Storybook", "Git"],
    "Research & Collaboration": ["Miro", "FigJam", "Maze", "Lookback"],
  },
};

export interface Experience {
  role: string;
  location: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string;
  skills: string[];
  products?: string[];
}

export const experiences: Experience[] = [
  {
    role: "Senior Product Designer",
    location: "Milan, Italy (Remote)",
    company: "MORS",
    companyUrl: "https://www.linkedin.com/company/mors-llc/",
    duration: "January 2024 – Present",
    description:
      "Specialized technology firm at the intersection of high-frequency trading and blockchain infrastructure, building institutional entry into DeFi. I lead end-to-end product design across two flagship DeFi products serving institutional investors (hedge funds, professional traders) and sophisticated retail users. Built the design system from scratch (0→1) for the first flagship product via Tokens Studio, and shipped 40+ components from Figma directly to code using Claude and the Figma MCP server — reducing component implementation time from ~2 weeks to 1–2 days. Designed 10+ major user flows for complex DeFi primitives including vault automation, governance, and rebasing yield mechanisms. Mentor a fellow designer on the team.",
    skills: [
      "Design Systems",
      "Tokens Studio",
      "Figma MCP",
      "Claude AI",
      "DeFi UX",
      "Governance Design",
      "Institutional UX",
      "Design-to-Code",
    ],
    products: ["Backed", "Vibe", "Axion"],
  },
  {
    role: "Product Designer",
    location: "Italy (On-site)",
    company: "Neperia Group",
    companyUrl: "https://www.linkedin.com/company/neperia-group-srl/",
    duration: "September 2023 – February 2024",
    description:
      "20-year-old Italian IT company specializing in software intelligence and digital transformation. Joined as the sole designer to modernize 3 enterprise products in 6 months — agro-trading SaaS (TradeUP), business operations management (Managy), and legacy IT / software intelligence (KPS). Redesigned 60–100 screens across the 3 products, from discovery to high-fidelity UI and engineering handoff. Built the design system from scratch for TradeUp, implementing and customizing 20–40 Radix-based components. Consolidated fragmented design patterns across multiple products into a cohesive design language.",
    skills: [
      "Design System",
      "Radix UI",
      "Enterprise UX",
      "Data-Heavy Interfaces",
      "Figma",
      "Engineering Handoff",
    ],
    products: ["TradeUP", "Managy", "KPS"],
  },
  {
    role: "Senior Product Designer → UI/UX Team Lead",
    location: "Dubai, UAE (Remote from Oct 2023)",
    company: "Max Holding",
    companyUrl: "https://www.linkedin.com/company/maxholding/",
    duration: "November 2022 – January 2024",
    description:
      "Holding company operating across insurance, crypto, automotive, and food delivery industries. Joined as Senior Product Designer; promoted to UI/UX Team Lead in October 2023, formally managing a team of 4 designers. Contributed to 5 product launches across 5 industries. Led design for Azki, a B2B2C insurance platform connecting back-office operators, insurance sellers, and end users — delivering measurable business impact: insurance sales conversion increased from 20% to 60% (≈3×), B2B back-office adoption reached 70%, and user error rate reduced from 40% to 10%. Designed a digital platform for automotive dealerships.",
    skills: [
      "Team Leadership",
      "B2B2C Design",
      "Design System",
      "Usability Testing",
      "Persona",
      "User Flow",
      "Prototyping",
    ],
    products: ["AzkiSeller", "CarBazaar"],
  },
  {
    role: "Mid-Level Product Designer",
    location: "Remote (Lausanne, Switzerland)",
    company: "Arsh",
    duration: "October 2021 – November 2022",
    description:
      "Tech product company building digital products across multiple domains including music and civic tech. Joined as solo designer, owning end-to-end design for 3 products: a music collaboration & social platform, Bamano (a parenting social media app), and a citizen services / civic tech app. Led end-to-end redesigns (from discovery to high-fidelity UI) of products serving fundamentally different user bases. Conducted competitive audits to benchmark patterns and identify opportunities in each product's domain.",
    skills: [
      "Competitive Audits",
      "End-to-End Design",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Cross-domain UX",
    ],
    products: ["Music Collaboration Platform", "Bamano", "Civic Tech App"],
  },
];

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  color: string;
  image?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "backed",
    title: "Backed",
    subtitle: "DeFi Governance & Vault Platform",
    category: "Web App",
    description:
      "A DeFi platform where I redesigned vault automation, governance, and rebasing yield mechanics. The interface now serves first-time DeFi users and experts on the same screen: simple defaults visible first, advanced controls one click away.",
    color: "#53B9AB",
    image: "/projects/backed/card-cover.png",
  },
  {
    slug: "carbazaar",
    title: "CarBazaar",
    subtitle: "B2B Luxury Car Auction Platform",
    category: "Web App",
    description:
      "A B2B platform I designed for European luxury car dealers. The old workflow meant juggling 3 to 5 separate auction sites with inconsistent data. This consolidates them into one place where dealers can source, bid, and track requests from a single dashboard.",
    color: "#1E3A5F",
    image: "/projects/carbazaar.png",
  },
];
