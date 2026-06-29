export const projectDataHome = [
{
  id: 1,
  thumbnail: '/img/projects/travia-hero.png',
  heroImage: '/img/projects/travia-hero.png',
  title: "TRAVIA",
  category: "Full Stack",
  year: "2026",
  tags: ["React 19", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS v4", "TanStack Query", "Zustand", "Framer Motion"],
  summary: "An AI-powered Indonesian travel booking platform that lets users discover tour packages, chat with an AI travel assistant to find the perfect trip, ags — from product browsing to payment — allin one place.",                                                                                                        viewDemo: true,
  viewDemo: true,
  demoURL: 'https://travia-lime.vercel.app/',
  viewRepo: true,
  urlRepo: 'https://github.com/lutfiApriamto/travel-ai-project',                                                                                                       
  keyFeatures: [
    "Built an animated AI chat interface on the hero section that simulates a real conversation — greeting the user, typing an intent, and surfacing matching prously to demonstrate the core valueproposition.",
    "Designed a full booking flow with per-pelect participant count which is validated in real-time against remaining quota, with warnings and disabled CTAs when slots are exhausted — consistent across desktop and mobile.",
    "Implemented a dual-path checkout system — Express Checkout for immediate payment and Add to Cart for deferred purchase — with a sticky mobile bottom bar ad each maintaining their own participant andadd-on state.",
    "Built a rich product detail page featurth per-day meal previews, animatedexpand/collapse via Framer Motion, and a chip-grid includes/excludes section for at-a-glance trip clarity.",
    "Developed a Wishlist system backed by ahenticated users save and remove productswith optimistic UI updates and toast notifications.",
    "Architected a full authentication systeP-only refresh cookies, session restore onpage reload, and protected route guards — with redirect-back URLs preserved through the login flow.",
    "Built a complete admin and agent backenoducts, categories, bookings, payments,users, roles, add-ons, tags, and more — designed API-first with RESTful conventions throughout."
  ],
  outComeImpact: [
    "Delivered a production-grade full-stackend booking capability, real payment methodintegration, and a polished UI that adapts across mobile, tablet, and desktop.",
    "Established a consistent design system tokens — a single palette change cascadesacross the entire UI — with full dark mode support via class-based theming.",
    "Demonstrated advanced React architecturr server-state with cache invalidation,Zustand for cross-component client state, code-split routes, and Framer Motion orchestration for complex multanimations.",
    "Shipped a distinctive visual identity with editorial typography (Fraunces serif + Plus Jakarta Sans), a true-orange brand color (#FF6B35), and layourity and conversion over decorativedefaults."
  ]
},
  {
    id: 2,
    thumbnail: '/img/projects/jomock-thumbnail.jpeg',
    heroImage: '/img/projects/jomock-thumbnail2.jpeg',
    title: "JO-MOCK",
    category: "Full Stack",
    year: "2026",
    tags: ["React 19", "Vite 8", "Node.js", "Express 5", "MongoDB", "Tailwind CSS", "TanStack Query", "Zustand"],
    summary: "A contract-first API mocking platform that lets frontend and backend teams collaborate on API contracts, generate instant mock servers, and manage changes through a structured review workflow — all from the browser.",
    viewDemo: true,
    demoURL: 'https://jo-mock.vercel.app/',
    viewRepo: true,
    urlRepo: 'https://github.com/lutfiApriamto/jo-mock',
    keyFeatures: [
      "Designed a contract-first workflow where teams define API endpoints, request schemas, and multiple response scenarios before writing any backend code.",
      "Built a real-time mock server that serves JSON responses based on defined contracts — each project gets a unique slug-based URL ready for immediate frontend consumption.",
      "Implemented per-user response toggles allowing each developer to independently switch which response scenario an endpoint returns, without affecting other team members.",
      "Developed a Change Request system with formal propose-review-approve workflow, enabling structured API contract evolution with full version history and email notifications.",
      "Created a one-click Code Generator that produces production-ready Axios code in React JS/TS with useState or Zustand — just swap the base URL when the real backend is ready.",
      "Built role-based team collaboration with Project Manager, Frontend Dev, and Backend Dev roles — including ownership transfer and invitation management via email.",
      "Implemented JSON import/export for endpoint collections, enabling backup, migration, and sharing of API contracts across projects."
    ],
    outComeImpact: [
      "Eliminated frontend-backend blocking by providing instant, functional mock APIs — teams can develop in parallel from day one without waiting for backend implementation.",
      "Reduced API miscommunication through a single source of truth for contracts, with structured change requests replacing informal Slack or email negotiations.",
      "Delivered a fully deployed full-stack SaaS platform on Vercel with MongoDB Atlas, demonstrating end-to-end production architecture including auth, RBAC, email integration, and API key management.",
      "Demonstrated advanced React patterns including code splitting with React.lazy, TanStack Query for server state, Zustand for client state, and a fully responsive dark-mode UI with Tailwind CSS."
    ]
  },
  {
    id: 3,
    thumbnail: '/img/projects/sales-thumbnail.png',
    heroImage: '/img/projects/sales-thumbnail.png',
    title: "SalesGen.ai",
    category: "Full Stack",
    year: "2025",
    tags: ["React.js", "Laravel", "Vite.js", "Gemini AI", "Supabase", "Docker"],
    summary: "An AI-powered fullstack web application that automatically generates professional sales pages and landing pages using Google Gemini AI, complete with authentication, credit system, live preview, and HTML export.",
    viewDemo: true,
    demoURL: 'https://sales-page-front-end.vercel.app/',
    viewRepo: true,
    urlRepo: 'https://github.com/lutfiApriamto/sales-page-frontend',
    keyFeatures: [
      "Integrated Google Gemini AI to generate persuasive sales page copywriting automatically from raw product information input.",
      "Built a complete authentication system using Laravel Sanctum — Register, Login, Logout, Forgot Password, and Reset Password with custom HTML email templates.",
      "Implemented a Live Preview system that renders the generated HTML sales page directly in the browser with Desktop and Mobile viewport modes.",
      "Developed a Credit System where each account receives 35 generation credits, preventing API abuse and managing usage limits automatically.",
      "Built HTML Export functionality allowing users to download their generated sales page as a ready-to-host `.html` file."
    ],
    outComeImpact: [
      "Successfully deployed fullstack application — frontend on Vercel and backend via Docker on Render — demonstrating end-to-end production deployment capability.",
      "Eliminated the need for manual copywriting by automating the entire sales page generation process, reducing creation time from hours to seconds.",
      "Established a scalable multi-feature dashboard with history management, allowing users to revisit, preview, and regenerate previous sales pages.",
      "Demonstrated cross-stack proficiency by combining React 19 + Vite on the frontend with Laravel 12 + PostgreSQL (Supabase) on the backend in a single cohesive product."
    ]
  },
  {
    id: 4,
    thumbnail: '/img/projects/fro-thumbnail.png',
    heroImage: '/img/projects/fro-mes.png',
    title: "FRO MES Feature Redevelopment",
    category: "Front-End",
    year: "2025",
    tags: ["React.js", "Zustand", "Chakra UI", "TanStack"],
    summary: "Revamped and migrated essential manufacturing modules to a scalable, highly optimized architecture. Built comprehensive bulk processing systems and real-time visualization tracking.",
    viewDemo: false,
    demoURL: 'https://github.com/lutfiApriamto',
    viewRepo: false,
    urlRepo: 'https://github.com/lutfiApriamto',
    keyFeatures: [
      "Spearheaded full migration of legacy manufacturing modules to a modern React.js architecture, ensuring zero downtime during the transition period.",
      "Engineered a comprehensive Bulk Processing system supporting both Adjustment and Sample workflows, capable of handling large-scale batch operations efficiently.",
      "Built a Real-time Status Storage tracking module with detailed data visualization, enabling granular monitoring of manufacturing pipeline states.",
      "Refactored complex legacy business logic into modular, reusable front-end components — significantly reducing duplication and improving long-term maintainability.",
      "Integrated TanStack Query for server-state management, reducing redundant API calls and improving data synchronization across the application."
    ],
    outComeImpact: [
      "Reduced manual tracking errors in manufacturing workflows by introducing a structured, automated status monitoring system.",
      "Improved codebase maintainability score significantly — legacy spaghetti logic was decomposed into clearly scoped, testable component units.",
      "Accelerated feature delivery velocity for subsequent modules by establishing reusable component patterns adopted by the broader team.",
      "Enhanced cross-team collaboration quality through rigorous Git workflow practices including structured code reviews and merge conflict protocols."
    ]
  },
  {
    id: 5,
    thumbnail: '/img/projects/ikan-thumbnail.png',
    heroImage: '/img/projects/ikan-thumbnail2.png',
    title: "Fish E-commerce Platform",
    category: "Full Stack",
    year: "2025",
    tags: ["Vite.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    summary: "A comprehensive full-stack e-commerce solution designed for local ornamental fish businesses, featuring catalog management, shopping cart, and direct transaction management.",
    viewDemo: true,
    demoURL: 'https://e-commerce-ikan-hias-fe.vercel.app/',
    viewRepo: false,
    urlRepo: 'https://github.com/lutfiApriamto',
    keyFeatures: [
      "Developed a complete product catalog system with category filtering, stock management, and dynamic pricing tailored for ornamental fish businesses.",
      "Built a full shopping cart and checkout flow with direct transaction management, eliminating the need for third-party marketplace intermediaries.",
      "Implemented a fully responsive interface ensuring seamless user experience across mobile, tablet, and desktop devices.",
      "Designed and built an administrative dashboard enabling merchants to manage inventory, process orders, and track sales in real time."
    ],
    outComeImpact: [
      "Contributed to a measurable 30% increase in online sales reach for local UMKM ornamental fish businesses in Depok.",
      "Eliminated reliance on manual order-taking processes — all transactions are now digitized and trackable through the admin panel.",
      "Successfully registered Intellectual Property rights (DIKTI SAINTEK) for the platform, validating its novelty and impact.",
      "Provided local fish farmers with a professional digital storefront, increasing their credibility and accessibility to a wider customer base.",
      "Reduced order processing time significantly by centralizing product, customer, and transaction data in a single unified system."
    ]
  },
  {
    id: 6,
    thumbnail: '/img/projects/bank-sampah-thumbnail.png',
    heroImage: '/img/projects/bank-sampah-thumbnail.png',
    title: "Trash Management Digitalization System",
    category: "Full Stack",
    year: "2025",
    tags: ["Vite.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    summary: "A cross-platform full-stack data management system for Rawa Panjang Village waste bank program, digitalizing point-based waste exchange transactions with real-time tracking.",
    viewDemo: true,
    demoURL: 'https://bank-sampah-dosen-project-fe.vercel.app/',
    viewRepo: false,
    urlRepo: 'https://github.com/lutfiApriamto',
    keyFeatures: [
      "Engineered a point-based waste exchange transaction system that digitalizes the entire waste collection and reward workflow across multiple branches.",
      "Built real-time point tracking per resident, allowing branch operators to view, update, and validate waste exchange records instantly.",
      "Implemented automated monthly report export capabilities to Excel format, replacing the previously manual and error-prone reporting process.",
      "Designed a multi-branch management interface supporting 10+ branch locations under the Rawa Panjang Village waste bank program.",
      "Built a RESTful API backend with structured endpoint validation to ensure data integrity across all branch operations."
    ],
    outComeImpact: [
      "Successfully deployed and actively used by 10+ branch locations, replacing paper-based records entirely across the program.",
      "Registered Intellectual Property rights (DIKTI SAINTEK) in collaboration with Universitas Gunadarma, recognizing the system's societal contribution.",
      "Reduced monthly report preparation time from hours to minutes by automating Excel export generation.",
      "Enabled village administrators to gain real-time visibility into waste collection performance across all branches for the first time.",
    ]
  },
  {
    id: 7,
    thumbnail: '/img/projects/lepkom-thumbnail.png',
    heroImage: '/img/projects/lepkom-thumbnail.png',
    title: "Assistant Assessment Web App",
    category: "Full Stack",
    year: "2025",
    tags: ["Vite.js", "Node.js", "Express.js", "MongoDB"],
    summary: "A secure full-stack data management system to digitize and centralize the scoring and assessment workflow for new laboratory assistant candidates.",
    viewDemo: true,
    demoURL: 'https://oprek-lepkom.vercel.app/',
    viewRepo: false,
    urlRepo: 'https://github.com/lutfiApriamto',
    keyFeatures: [
      "Built a secure authentication system with role-based access control, separating assessor and administrator privileges.",
      "Designed a structured digital scoring interface allowing assessors to input, review, and submit candidate evaluations with form validation.",
      "Implemented a centralized candidate data management system, replacing scattered spreadsheets with a unified, queryable database.",
      "Developed an automated grade recapitulation feature that compiles individual assessment scores into final rankings instantly."
    ],
    outComeImpact: [
      "Accelerated the grade recapitulation process from a multi-day manual task to a near-instant automated computation.",
      "Eliminated data inconsistencies previously caused by manual spreadsheet consolidation across multiple assessors.",
      "Improved the security and integrity of candidate evaluation data through structured API validation and protected endpoints.",
      "Reduced administrative overhead for the LEPKOM open recruitment process, allowing the team to focus on evaluation quality over logistics.",
      "Established a reusable digital workflow template that can be adapted for future recruitment cycles with minimal modification."
    ]
  },
  {
    id: 8,
    thumbnail: '/img/projects/gas-thumbnail.png',
    heroImage: '/img/projects/gas-thumbnail.png',
    title: "GAS Peduli Gizi",
    category: "Full Stack",
    year: "2025",
    tags: ["Vite.js", "Node.js", "Express.js", "MongoDB"],
    summary: "A full-stack monitoring system to track and streamline nutrition resource distribution across 10 school locations, accelerating reporting processes.",
    viewDemo: false,
    demoURL: 'https://github.com/lutfiApriamto',
    viewRepo: false,
    urlRepo: 'https://github.com/lutfiApriamto',
    keyFeatures: [
      "Built a distribution tracking dashboard displaying real-time status of nutrition resource delivery across all 10 school locations.",
      "Implemented a per-school reporting module enabling local coordinators to log distribution activities and flag issues independently.",
      "Developed an aggregated reporting view for central administrators to monitor overall program progress across all locations simultaneously.",
      "Designed the system with a mobile-first approach, ensuring field coordinators can log data from any device on location."
    ],
    outComeImpact: [
      "Reduced overall reporting cycle time significantly by replacing manual data collection with a centralized digital input system.",
      "Enabled real-time program oversight for central coordinators — eliminating the dependency on end-of-cycle paper reports.",
      "Improved distribution accountability by maintaining a timestamped, auditable record of all delivery activities per school.",
      "Supported the nutrition program's community impact by ensuring no distribution delays went undetected across all 10 locations."
    ]
  },
  {
    id: 9,
    thumbnail: '/img/projects/lutfiscript.png',
    heroImage: '/img/projects/lutfiscript.png',
    title: "LutfiScript",
    category: "Full Stack",
    year: "2024",
    tags: ["Vite.js", "Node.js", "Express.js", "MongoDB", "MongoDB Atlas"],
    summary: "A comprehensive full-stack e-learning platform for JavaScript education, with separate Admin and User portals, video modules, authentication, and interactive quizzes.",
    viewDemo: true,
    demoURL: 'https://lutfi-script-client.vercel.app/',
    viewRepo: true,
    urlRepo: 'https://github.com/lutfiApriamto/LutfiScript-client',
    keyFeatures: [
      "Built dual-portal architecture with separate Admin and User interfaces — admins manage content while users consume learning materials.",
      "Implemented a full authentication system including email-based password reset, session management, and protected route handling.",
      "Developed a structured video module access system where users progress through JavaScript learning content in a guided sequence.",
      "Created an interactive quiz engine with real-time scoring, answer validation, and per-module progress tracking.",
      "Integrated MongoDB Atlas as the cloud database, enabling scalable data storage without infrastructure management overhead."
    ],
    outComeImpact: [
      "Delivered a fully functional e-learning platform as an independent full-stack project, demonstrating end-to-end development capability.",
      "Established a scalable content management foundation — admins can add, edit, and remove learning modules without touching code.",
      "Provided a structured JavaScript learning path for users, from fundamentals to practical exercises, all within one platform.",
      "Demonstrated practical application of MERN stack (Vite.js variant) in a real-world, multi-role application context."
    ]
  },
];

export const certifData = [
    {
    id: 0,
    tumbnail: '/img/sertif/L-dicoding-PMO.jpg',
    title: 'Dasar Manajemen Proyek',
    organizer : 'Dicoding',
    url : 'https://drive.google.com/file/d/1bnFMyLK_iCriSACcF1XdU1pqnJSLkP7L/view?usp=sharing',
    year : '2023'
  },
  {
    id: 1,
    tumbnail: '/img/sertif/L-dicoding-p-software.jpg',
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    organizer : 'Dicoding',
    url : 'https://drive.google.com/file/d/10-YMVFIE1awtY__sDJTr4z9nQbwcxMFd/view?usp=sharing',
    year : '2023'
  },
  {
    id: 2,
    tumbnail: '/img/sertif/L-dicoding-sql.jpg',
    title: 'Dasar Structured Query Language (SQL)',
    organizer : 'Dicoding',
    url : 'https://drive.google.com/file/d/1q7RNaUUMmsApxLSCg7AYmx325JJMPA0o/view?usp=sharing',
    year : '2023'
  },
  {
    id: 3,
    tumbnail: '/img/sertif/L-ikan.jpg',
    title: 'Sertifikat Penghargaan PENGEMBANGAN BUDIDAYA IKAN HIAS BERBASIS ENERGI TERBARUKAN DAN PEMASARAN DIGITAL',
    organizer : 'KEMDIKTISAINTEK',
    url : 'https://drive.google.com/file/d/10cYorscFiWWgP_cFNdWcifU20gyk1zBc/view?usp=sharing',
    year : '2023'
  },
  {
    id: 4,
    tumbnail: '/img/sertif/L-kaliber.jpg',
    title: 'Building and Improving Front-end Code Faster',
    organizer : 'Kalibrr x Dicoding',
    url : 'https://drive.google.com/file/d/1e_b3auHK850kHMd4rLR-Dp4lUWqrhge3/view?usp=sharing',
    year : '2026'
  },
  {
    id: 5,
    tumbnail: '/img/sertif/L-SMKDEV.jpg',
    title: 'Building and Improving Front-end Code Faster',
    organizer : 'Kalibrr x Dicoding',
    url : 'https://drive.google.com/file/d/1AXavllRS5RvtJelG9ZGdb-zGDwRsYFP1/view?usp=sharing',
    year : '2023'
  },
  {
    id: 6,
    tumbnail: '/img/sertif/P-bpptik-cikarang.jpg',
    title: 'Junior Web Programming',
    organizer : 'BNSP x BPPTIK Cikarang',
    url : 'https://drive.google.com/file/d/1YEJ2Fp2_ZRdAxD27y3dta_6JLVFezfEL/view?usp=sharing',
    year : '2023'
  },
  {
    id: 7,
    tumbnail: '/img/sertif/P-bpptik-Gunadarma.jpg',
    title: 'Okupasi Junior Web Programming',
    organizer : 'BNSP x Universitas Gunadarma',
    url : 'https://drive.google.com/file/d/1saB8uzhEo83cLjBq-FmU0hFGJs2EqIaS/view?usp=sharing',
    year : '2025'
  },
  {
    id: 8,
    tumbnail: '/img/sertif/P-Haki-Bank-Sampah.jpg',
    title: 'SURAT PENCATATAN CIPTAAN Aplikasi Bank Sampah',
    organizer : 'Direktorat Jenderal Kekayaan Intelektual',
    url : 'https://drive.google.com/file/d/1dKa_3sfTSvOLKRXTNyhYG8n8yK1-g6i8/view?usp=sharing',
    year : '2025'
  },
  {
    id: 9,
    tumbnail: '/img/sertif/P-Haki-ikan-Hias.jpg',
    title: 'SURAT PENCATATAN CIPTAAN Aplikasi Digital Marketing UMKM Ikan Hias Pokdakan Curug Jaya 2 Bojongsari, Depok',
    organizer : 'Direktorat Jenderal Kekayaan Intelektual',
    url : 'https://drive.google.com/file/d/1LYU66Holjhk5Kb05ZvL0rCHfIr4JUj6K/view?usp=sharing',
    year : '2025'
  },
  {
    id: 10,
    tumbnail: '/img/sertif/P-workshop-gundar.jpg',
    title: 'Building Website using HTML 5',
    organizer : 'Universitas Gunadarma',
    url : 'https://drive.google.com/file/d/1NwwvFGbfrAzQjjF0uaVHBlHZAVoavtPd/view?usp=sharing',
    year : '2024'
  },
]

export const stats = [
  {
    id: 1,
    number: 2,
    suffix: "+",
    label: "Years Building",
    sublabel: "Since 2024",
    description: "Started with curiosity, stayed for the craft.",
  },
  {
    id: 2,
    number: 10,
    suffix: "+",
    label: "Projects Shipped",
    sublabel: "End-to-end",
    description: "From idea to deployment, fully owned.",
  },
  {
    id: 3,
    number: 10,
    suffix: "+",
    label: "Knowledge Tech",
    sublabel: "& Still Growing",
    description: "MERN, Next.js, Go, PHP, and beyond.",
  },
  {
    id: 4,
    number: 2,
    suffix: "×",
    label: "IP Rights Acquired",
    sublabel: "DIKTI SAINTEK",
    description: "Recognized work with official IP registration.",
  },
  {
    id: 5,
    number: 3,
    suffix: "",
    label: "Classes Instructed",
    sublabel: "60–90 Students Each",
    description: "Mentored Java, Go, and PHP at LEPKOM.",
  },
  {
    id: 6,
    number: 371,
    suffix: "",
    prefix: "",
    label: "GPA Score",
    sublabel: "out of 4.00",
    description: "Graduated from Gunadarma with distinction.",
    isGPA: true,
  },
];

// ── DATA ──
export const traits = [
  {
    id: 1,
    keyword: "Adaptive",
    emoji: "⚡",
    description: "Quickly adjusting to new tech stacks, team dynamics, and project requirements without losing momentum.",
    level: 92,
  },
  {
    id: 2,
    keyword: "Collaborative",
    emoji: "🤝",
    description: "Thriving in team environments from pair programming to cross-functional syncs with designers and PMs.",
    level: 88,
  },
  {
    id: 3,
    keyword: "Critical Thinker",
    emoji: "🧠",
    description: "Breaking down complex problems into manageable parts and finding elegant, scalable solutions.",
    level: 90,
  },
  {
    id: 4,
    keyword: "Problem Solver",
    emoji: "🔧",
    description: "Turning ambiguous bugs and undefined requirements into clear, actionable development tasks.",
    level: 94,
  },
  {
    id: 5,
    keyword: "Committed",
    emoji: "🎯",
    description: "Seeing every project through delivering on time, maintaining quality, and owning outcomes.",
    level: 96,
  },
  {
    id: 6,
    keyword: "Communicator",
    emoji: "💬",
    description: "Translating technical complexity into clear language for both developers and non-technical stakeholders.",
    level: 85,
  },
];