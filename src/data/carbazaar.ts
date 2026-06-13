export const carbazaar = {
  problemStatement:
    "European luxury car dealers source inventory across a patchwork of auction platforms with inconsistent data, manual request tracking, and no visibility into where a request stands. They miss auctions, source slowly, and can't show clients reliable provenance. In interviews, dealers reported spending [METRIC TBD: hours/week on tool-switching] navigating disconnected platforms instead of closing deals.",

  goals:
    "Design a B2B platform where dealers can discover, bid on, and procure premium vehicles in one place. The brief: consolidate auctions, automate request workflows, and give dealers real-time status across the procurement pipeline.",

  designProcess: [
    {
      phase: "Empathy",
      activities: ["User Research", "User Interview", "Competitive Analysis"],
      week: "1st–2nd Week",
    },
    {
      phase: "Define",
      activities: ["User Personas", "Empathy Map", "User Journey"],
      week: "2nd–3rd Week",
    },
    {
      phase: "Ideate",
      activities: ["User Flow", "Card Sorting", "Information Architecture"],
      week: "3rd–4th Week",
    },
    {
      phase: "Design",
      activities: ["Wireframe", "Hi-Fi Design", "Prototype"],
      week: "4th–6th Week",
    },
    {
      phase: "Test",
      activities: ["Feedbacks", "Conclusion", "Future Concept"],
      week: "5th–6th Week",
    },
  ],

  businessChallenges: [
    {
      title: "Crawling Data Consistency",
      description:
        "Auction platforms use different data formats, structures, and update cycles. The discrepancies break dealer trust and cause [METRIC TBD: % missed auctions per dealer per month].",
    },
    {
      title: "Validating Dealers",
      description:
        "Verifying dealer legitimacy across borders requires a scalable identity verification flow that balances security with onboarding speed.",
    },
    {
      title: "Managing Auction Inventory",
      description:
        "Maintaining accurate, real-time auction listings across multiple crawled sources while preventing duplicate or stale entries.",
    },
    {
      title: "Validating Purchases",
      description:
        "Securing transaction authenticity and building buyer confidence through transparent purchase verification workflows.",
    },
  ],

  targetAudience:
    "Independent and mid-size European luxury car dealers (25–55) who source 10–50+ vehicles monthly across multiple auction platforms, along with platform administrators managing inventory, dealer verification, and auction operations.",

  userResearch:
    "I ran 10 semi-structured interviews across two groups: 5 active dealers and 5 platform administrators. Each 45-minute session walked through their actual procurement workflow, the tools they use, and where they get stuck. Five patterns came up repeatedly. Those patterns set the feature priorities and shaped what shipped first.",

  competitiveAnalysis: {
    features: [
      "Request a car",
      "Crawling Auctions",
      "Detailed Vehicle History Reports",
      "AI-Powered Auction Recommendations",
      "Integrated Auction Management Tools",
    ],
    competitors: [
      {
        name: "Carbazaar24",
        scores: [true, true, true, true, true],
      },
      {
        name: "Auto1",
        scores: [false, false, true, false, false],
      },
      {
        name: "Copart",
        scores: [false, false, false, false, true],
      },
    ],
  },

  uniqueFeatures: [
    {
      title: "Automated Auction Creation",
      description:
        "I designed a crawler workflow that pulls listings from external auction sites and creates them in the platform automatically. Inventory grows without manual entry.",
    },
    {
      title: "Requesting Desired Cars",
      description:
        "Dealers submit specific vehicle requests that feed into future auctions, giving them direct influence over what comes up for bid.",
    },
    {
      title: "Rule-Based Request Handling",
      description:
        "Admins configure automation rules for request status updates, cutting manual processing by [METRIC TBD: % reduction measured during pilot].",
    },
    {
      title: "Centralized Platform",
      description:
        "One hub for auctions, requests, and inventory tracking. Designed to consolidate the 3 to 5 separate tools dealers said they were juggling.",
    },
  ],

  observations: [
    { percentage: 90, text: "of participants struggle with manual searches across fragmented auction platforms", group: "4/5 Dealers · 5/5 Admins" },
    { percentage: 80, text: "of dealers rely on limited inventory sources, restricting their vehicle selection", group: "4/5 Dealers" },
    { percentage: 60, text: "of dealers have no mechanism to influence or request specific inventory", group: "3/5 Dealers" },
    { percentage: 50, text: "of participants face transparency gaps in vehicle histories and pricing data", group: "3/5 Dealers · 2/5 Admins" },
    { percentage: 30, text: "of participants struggle to stay current with inventory changes and market trends", group: "1/5 Dealers · 2/5 Admins" },
  ],

  persona: {
    name: "Markus Engel",
    age: 38,
    education: "MBA, Automotive Management",
    job: "Independent Luxury Car Dealer",
    location: "Munich, Germany",
    hobbies: "Automotive photography, Networking events",
    bio: "Markus is a 38-year-old independent luxury car dealer based in Munich. With an MBA in Automotive Management and 12 years of industry experience, he sources 20–30 premium vehicles monthly across European auctions. He values efficiency and transparency but spends too much time navigating fragmented platforms.",
    goals: [
      "Reduce vehicle sourcing time from 8+ hours/week to under 3 hours through a consolidated platform.",
      "Gain real-time visibility into request status and auction timelines to make faster decisions.",
      "Access broader European inventory to meet growing client demand for rare and premium models.",
    ],
    painPoints: [
      "Spends 40% of work time navigating 3–5 different auction platforms with inconsistent interfaces.",
      "No centralized way to track submitted requests, so relies on spreadsheets and email threads.",
      "Misses time-sensitive auctions due to lack of real-time notifications across platforms.",
      "Cannot verify vehicle history reliability, leading to hesitation on high-value bids.",
    ],
    personality: [
      "Analytical",
      "Results-Driven",
      "Innovative",
      "Detail-Oriented",
      "Collaborative",
      "Decisive",
    ],
  },

  empathyMap: {
    thinks: [
      "There has to be a better way to consolidate all these auction sources into one workflow.",
      "Every hour I spend searching across platforms is an hour I could spend closing deals with clients.",
      "If I could see verified vehicle histories upfront, I'd bid with far more confidence.",
      "A single dashboard for auctions, requests, and inventory would change my whole week.",
    ],
    feels: [
      "Overwhelmed by the fragmentation. Switching between platforms feels like a constant context shift.",
      "Anxious about missing time-sensitive auctions while managing other parts of the business.",
      "Skeptical of data accuracy on existing platforms after past experiences with inconsistent listings.",
      "Motivated to adopt better tools if they genuinely reduce friction without adding complexity.",
    ],
    does: [
      "Checks 3–5 auction platforms every morning before client meetings, spending 1–2 hours on manual searches.",
      "Maintains a spreadsheet to track submitted vehicle requests and their status across platforms.",
      "Calls platform support frequently to verify listing accuracy and resolve data discrepancies.",
      "Attends industry meetups to learn what tools other dealers are using to stay competitive.",
    ],
    says: [
      '"I spend half my morning just checking three different sites for new listings. It\'s exhausting."',
      '"Last month I missed a rare Porsche auction because the notification came through email 4 hours late."',
      '"I have no idea where my request stands until I call someone. There\'s zero transparency."',
      '"If one platform could do what I currently need five for, I\'d switch immediately."',
    ],
  },

  informationArchitecture: [
    {
      section: "Auctions",
      items: [
        "Browse by Car Model, Fuel Type, Body Type, Gear Type, Doors, Mileage",
        "Auction Detail Page",
        "Bid Form / Buy Now Confirmation",
      ],
    },
    {
      section: "My Cars",
      items: [
        "Orders List",
        "Order Detail Page",
        "Car General Detail / Equipments / Documents",
      ],
    },
    {
      section: "My Requests",
      items: ["Requests List", "Request Detail Page"],
    },
    { section: "Profile", items: ["Account Settings"] },
    { section: "Blog", items: ["Articles & News"] },
    { section: "About Us", items: ["Company Info"] },
  ],
};
