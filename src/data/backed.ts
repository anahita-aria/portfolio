export const backed = {
  projectOverview: {
    problem:
      "Backed's protocol was powerful, but its interface confused people. Hidden rebasing mechanics, fragmented vault flows, and no governance onboarding pushed users away.",
    highlights: [
      "Cut task completion for core flows (deposit, rewards, vaults) from 7 steps to 3",
      "Built a tokenized design system on HeroUI; the dev team shipped features 40% faster after adoption",
      "Designed governance and NFT reward features from scratch",
      "Set a visual language built on transparency and progressive disclosure",
    ],
    result:
      "A product that matches the protocol's ambition: powerful for experts, approachable for first-time DeFi users.",
  },

  designProcess: [
    {
      phase: "Understand",
      number: "01",
      description:
        "Mapped the protocol's mechanics (rebasing, vault cycles, NFTs, governance) so I had a clear mental model before designing anything.",
    },
    {
      phase: "Define",
      number: "02",
      description:
        "Translated complex token behavior into user goals, success states, guardrails, and information hierarchy.",
    },
    {
      phase: "Explore",
      number: "03",
      description:
        "Sketched and validated flow options for staking, wrapping, NFT creation, merging, and proposals through rapid technical reviews.",
    },
    {
      phase: "Systemize",
      number: "04",
      description:
        "Built a scalable design system with reusable components, interaction patterns, and tokens to support fast protocol iteration.",
    },
    {
      phase: "Refine",
      number: "05",
      description:
        "Created high-fidelity prototypes, tested edge-cases, and optimized clarity and predictability in every interaction.",
    },
  ],

  applyingProcess:
    "For Backed, I worked from research, competitive analysis, and observed user behavior to untangle the protocol's complexity. The goal was practical: make a technical product that experienced DeFi users would respect and that first-time users could finish a deposit on without help.",

  researchIntro:
    "I identified 5 user segments based on DeFi experience and whether they were new or existing Backed users. Each with different expectations and decision patterns.",

  personas: [
    {
      type: "Expert",
      badge: "New Backed User",
      badgeColor: "#E0FADD",
      summary: "A highly experienced DeFi user, exploring Backed for the first time.",
      avatars: ["https://randomuser.me/api/portraits/women/44.jpg", "https://randomuser.me/api/portraits/men/32.jpg"],
      needs: [
        "Efficient flows for staking, wrapping, governance",
        "Transparent explanation of Babe, Equity, NFTs",
        "Clear dashboard of vaults and APRs",
      ],
      painPoints: [
        "Lack of in-depth documentation or walkthrough",
        "Confusion around auto-compounding and reward logic",
        "Frustration with oversimplified UX",
      ],
    },
    {
      type: "Expert",
      badge: "Old Backed User",
      badgeColor: "#DDE8FA",
      summary: "Who received Equity tokens and has interacted with Babe, now expecting real governance tools.",
      avatars: ["https://randomuser.me/api/portraits/men/52.jpg", "https://randomuser.me/api/portraits/women/68.jpg"],
      needs: [
        "Advanced tools for portfolio and reward tracking",
        "Full activity history and auditability",
        "Visibility into governance and future roadmap",
      ],
      painPoints: [
        "Weak communication and feedback loops",
        "No special benefits for early adopters",
        "Limited control despite prior investment",
      ],
    },
    {
      type: "Beginner",
      badge: "New Backed User",
      badgeColor: "#E0FADD",
      summary: "New to both DeFi and Backed, likely joined through a friend or community recommendation.",
      avatars: ["https://randomuser.me/api/portraits/women/22.jpg", "https://randomuser.me/api/portraits/men/75.jpg"],
      needs: [
        "Beginner-friendly onboarding (interactive if possible)",
        "Clear terminology and contextual help",
        "Minimal decision-making with safe defaults",
      ],
      painPoints: [
        "Overwhelmed by technical terms",
        "Fear of getting funds stuck or making errors",
        "General lack of confidence and trust",
      ],
    },
    {
      type: "Moderate",
      badge: "New Backed User",
      badgeColor: "#E0FADD",
      summary: "Someone with average DeFi experience, now entering Backed for more yield options.",
      avatars: ["https://randomuser.me/api/portraits/men/45.jpg", "https://randomuser.me/api/portraits/women/33.jpg"],
      needs: [
        "Clear onboarding and visual walkthrough",
        "Vault comparison tools and feature guides",
        "Guided, confident first-time interactions",
      ],
      painPoints: [
        "Difficulty navigating token interactions (stake, wrap, NFT)",
        "Anxiety about making irreversible mistakes",
        "Overload from unfamiliar terms",
      ],
    },
    {
      type: "Moderate",
      badge: "Old Backed User",
      badgeColor: "#DDE8FA",
      summary: "An existing Backed user with average DeFi knowledge who hasn't engaged deeply and may have stepped away for a while.",
      avatars: ["https://randomuser.me/api/portraits/women/55.jpg", "https://randomuser.me/api/portraits/men/62.jpg"],
      needs: [
        "Summary view of changes and benefits",
        "Personal asset history and performance",
        "Re-engagement flows that don't require relearning the product",
      ],
      painPoints: [
        "Being left in the dark about new features",
        "Concern over changes breaking old flows",
        "Distrust due to lack of transparency",
      ],
    },
  ],

  narrowingLens:
    "The full protocol is large and parts of it are still under NDA, so this case study focuses on one slice: the governance system. The research and design approach was the same across the rest.",

  competitiveAnalysis: {
    intro:
      "I studied seven DeFi protocols (listed below) to see how others handled governance and reward mechanics. The patterns that came up most often shaped Backed's approach.",
    protocolsReviewed: ["Aave", "Yearn", "Curve", "Angle", "Compound", "Uniswap", "Maker"],
  },

  userFlows: {
    governance: {
      title: "Governance Flows",
      description:
        "The proposal flow walks users from idea to vote in clearly numbered steps, with validation at each stage so people can't accidentally submit half-formed proposals.",
    },
    protocol: {
      title: "Protocol Interaction Flows",
      description:
        "I designed flows for staking, wrapping, and NFT-based rewards that hide the underlying token mechanics until the user wants to see them. Default actions are one or two clicks; advanced controls sit behind a 'View details' toggle.",
    },
  },

  wireframes: {
    intro:
      "I sketched every step of each flow as low-fidelity wireframes before adding any visual polish. Locking interaction logic and information hierarchy first meant brand and motion came last, not the other way around.",
    description:
      "Each wireframe accounted for what the user was trying to do, where they came from, and what the protocol could and couldn't support. They became the spec for the final screens, motion, and responsive behavior.",
  },

  designSystem: {
    intro:
      "I used HeroUI as the design system base and extended it to fit Backed's brand. The system is tokenized in Figma for both light and dark themes, so a token change at the design source updates every component.",
    typography: {
      description: "To balance visual clarity with brand personality, Backed's typography system uses a three-font stack:",
      fonts: [
        { name: "Zen Dots", usage: "Used exclusively in the logo for a futuristic and modular character" },
        { name: "Aldrich", usage: "Applied to headings for structure and tone consistency" },
        { name: "Manrope", usage: "A modern sans-serif optimized for body text and small UI labels" },
      ],
    },
    colorSystem: {
      description:
        "I built a semantic color system (Primary, Secondary, Tertiary, NFT, Neutral) so designers and devs could refer to roles instead of hex codes. The palette lives in Figma as variables and exports directly to dev tokens, so a color change ships in one update.",
      categories: [
        { name: "Primary", description: "Used as the brand's main color across high-priority elements such as primary buttons, key actions, and highlights." },
        { name: "Secondary", description: "Supports secondary actions and is used in charts (e.g. APR graph) to differentiate layered data." },
        { name: "Tertiary", description: "Highlights general vault-related data and is applied in supporting graphs like staking/unstaking trends." },
        { name: "NFT", description: "Visually separates NFT-specific content and actions throughout the interface." },
        { name: "Default (Neutral)", description: "Builds the structural foundation: backgrounds, containers, and dividers." },
      ],
    },
    componentLibrary: {
      description:
        "The frontend team and I evaluated several UI libraries before picking HeroUI as the base. It gave us the most flexibility for theming without rewriting components from scratch.",
      categories: [
        {
          title: "Adapting Core Components",
          description:
            "I customized the foundational elements (buttons, inputs, checkboxes, chips) to match Backed's brand. I adjusted colors, typography, spacing, and every interaction state (hover, focus, disabled, loading) for both light and dark themes.",
        },
        {
          title: "Extending with Custom Components",
          description:
            "Some surfaces had no equivalent in HeroUI, so I built them from scratch: Vault Cards, multi-state modals, and NFT panels that update in real time as users lock tokens. They use the same tokens as the base system, so visual consistency holds.",
        },
        {
          title: "Data Visualization with Chart.js",
          description:
            "After testing several charting libraries, the dev team and I landed on Chart.js for its balance of performance and flexibility. I customized every chart's style and interaction to match the rest of the product.",
        },
      ],
    },
  },

  highFidelity: {
    intro: "A custom palette was defined and implemented for semantic clarity and emotional hierarchy, spanning:",
    screens: [
      {
        title: "Dashboard",
        description:
          "A single-screen overview of the user's position. It shows real-time Net APR, total holdings, and recent activity across all vaults. Custom charts let users see deposit, withdrawal, and staking performance at a glance, so both new and advanced users get what they need without drilling into separate pages.",
        video: "/projects/backed/Dashboard.mp4",
      },
      {
        title: "Vaults List",
        description:
          "A scrollable list of every vault. Each card shows status, APR, deposit capacity, and the user's balance. Users can compare, filter, and jump into a vault page to act. The grid scales as new vaults are added without becoming a wall of text.",
        video: "/projects/backed/VaultList.mp4",
      },
      {
        title: "Vault Details Page",
        description:
          "The detail page for one vault. It includes the vault's metrics, the user's token balances (Babe, Wrapped Babe, Staked Babe), a deposit module, performance charts, and transaction history.",
        video: "/projects/backed/VaultPage.mp4",
      },
      {
        title: "Governance Interface",
        description:
          "I designed the governance interface to make the trade-off between decentralization, transparency, and usability visible to users. They see voting power, proposal status, quorum, and historical decisions on one screen. Locking tokens to gain veEQ power is a single flow with the lock duration as a slider, not a multi-step wizard.",
        video: "/projects/backed/Governance.mp4",
      },
    ],
  },

  projectStatus:
    "Backed is in active development. Most of the designs in this case study are already implemented; the rest are shipping in stages with the dev team. The protocol keeps evolving, so I keep iterating with feedback from new users.",

  keyLearnings: [
    "Designing in Web3 isn't just UX. Users need to trust an interface backed by code they can't read, and the design has to make that trust visible.",
    "Constraints create clarity. The technical limits of HeroUI and Chart.js forced design choices that ended up being simpler than the version I'd have made without them.",
    "Systems thinking matters. A button color change shouldn't take three days, so tokens, components, and flows had to share a single source of truth.",
    "Collaboration changes outcomes. Working closely with the four-person dev team during design reviews caught design decisions that wouldn't have shipped cleanly.",
    "Users vary more than personas suggest. Designing for both first-time DeFi users and experts taught me to layer interfaces: simple defaults visible first, advanced controls one click away.",
  ],
  keyLearningsSummary:
    "This project taught me how to design for multi-role governance and ship usable tools in a space where most users can't read the underlying code.",
};
