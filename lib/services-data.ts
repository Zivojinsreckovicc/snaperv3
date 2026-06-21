/**
 * Canonical service content. Single source of truth for:
 *   - the /services overview (animated spine) and the home preview
 *   - the standalone /services/[slug] detail pages
 *   - all Service / FAQ JSON-LD
 *
 * Plain module (no client directive, no icon imports) so server-rendered
 * structured data can import it without it becoming a client reference.
 * Icons are mapped by `id` inside client components.
 */
export type ServiceCapability = { title: string; desc: string };
export type ServiceFaq = { question: string; answer: string };
export type ServiceOutcome = { value: string; label: string };

export type ServiceContent = {
  /** URL slug and DOM id. */
  id: string;
  num: string;
  kicker: string;
  title: string;
  /** Short summary used by the overview spine + home preview. */
  desc: string;
  deliverables: string[];
  tools: string[];

  // Detail-page fields
  metaTitle: string;
  metaDescription: string;
  /** Hero lead sentence. */
  intro: string;
  /** Overview body paragraphs. */
  overview: string[];
  /** Headline outcome stats. */
  outcomes: ServiceOutcome[];
  /** Deeper capability explanations. */
  capabilities: ServiceCapability[];
  faqs: ServiceFaq[];
};

export const servicesContent: ServiceContent[] = [
  {
    id: "web-development",
    num: "01",
    kicker: "Web Development",
    title: "Custom websites engineered to convert.",
    desc: "We design and build fast, modern websites from scratch, never from templates. Every build is structured around your business goals, tuned for speed and SEO, and made genuinely easy to update.",
    deliverables: [
      "Custom UX & UI design",
      "Responsive development",
      "Core Web Vitals optimization",
      "On-page SEO foundation",
      "Headless CMS integration",
      "Analytics & tracking setup",
    ],
    tools: ["Next.js", "React", "Tailwind", "Headless CMS"],
    metaTitle: "Web Development | Custom Websites | Snaper Digital",
    metaDescription:
      "Custom, conversion-focused web development with Next.js. Fast, SEO-ready websites built from scratch around your business goals, never from templates.",
    intro:
      "We design and build fast, custom websites from scratch, engineered around one goal: turning visitors into customers.",
    overview: [
      "A website is the hardest-working asset your business has, so we treat it like a product, not a brochure. Every page is planned around a real user journey and a clear next step.",
      "We build on a modern stack of Next.js, React and Tailwind for speed, security and easy updates, with clean SEO foundations baked in from day one rather than bolted on later.",
    ],
    outcomes: [
      { value: "2-3 wks", label: "Typical delivery" },
      { value: "90+", label: "Performance score target" },
      { value: "100%", label: "Custom, zero templates" },
    ],
    capabilities: [
      {
        title: "Conversion-first UX",
        desc: "We map the path from landing to action and design every section to move users toward it.",
      },
      {
        title: "Engineered for speed",
        desc: "Optimized assets and modern rendering so pages load instantly and clear Core Web Vitals.",
      },
      {
        title: "SEO from the ground up",
        desc: "Semantic structure, metadata, structured data and clean URLs that search engines reward.",
      },
      {
        title: "Easy to update",
        desc: "Headless CMS integration so your team can edit content without ever touching code.",
      },
      {
        title: "Accessible & responsive",
        desc: "Looks and works flawlessly on every screen, with accessibility considered throughout.",
      },
      {
        title: "Built to scale",
        desc: "A clean architecture that grows with new pages, features and traffic over time.",
      },
    ],
    faqs: [
      {
        question: "Do you use templates or build custom?",
        answer:
          "Everything is custom. We design and code from scratch around your brand and goals, so nothing looks or behaves like an off-the-shelf theme.",
      },
      {
        question: "Which technologies do you build with?",
        answer:
          "We build with Next.js, React and Tailwind, usually paired with a headless CMS. It is a fast, secure and future-proof stack.",
      },
      {
        question: "Will my site be good for SEO?",
        answer:
          "Yes. Clean structure, fast load times, metadata and structured data are part of every build, not an upsell.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Absolutely. We often rebuild and modernize existing sites while preserving what already works and protecting your search rankings.",
      },
    ],
  },
  {
    id: "ai-automation",
    num: "02",
    kicker: "AI Automation",
    title: "Systems that do the repetitive work for you.",
    desc: "We map the manual, repetitive parts of your business and hand them to systems that never forget a follow-up. Connected tools, automatic lead handling, and AI where it actually saves time and money.",
    deliverables: [
      "Workflow automation",
      "CRM automation & routing",
      "Lead capture & enrichment",
      "AI follow-up sequences",
      "Tool & API integrations",
      "Reporting dashboards",
    ],
    tools: ["Make", "n8n", "OpenAI", "Webhooks & APIs"],
    metaTitle: "AI Automation | Workflow & CRM Automation | Snaper",
    metaDescription:
      "Practical AI automation that removes manual busywork. Workflow and CRM automation, lead handling and AI follow-ups that save your team hours every week.",
    intro:
      "We map the repetitive parts of your business and hand them to systems that never forget a follow-up, so your team can focus on growth.",
    overview: [
      "Most businesses lose hours every week to manual, repetitive work: copying data between tools, chasing leads, sending the same follow-ups. Automation quietly removes that drag.",
      "We design practical systems that connect the tools you already use and apply AI only where it genuinely helps, never automation for its own sake.",
    ],
    outcomes: [
      { value: "Hours", label: "Saved every week" },
      { value: "24/7", label: "Follow-ups that never slip" },
      { value: "Zero", label: "Tasks falling through cracks" },
    ],
    capabilities: [
      {
        title: "Workflow automation",
        desc: "Connect your apps so routine, multi-step tasks run themselves in the background.",
      },
      {
        title: "CRM automation & routing",
        desc: "Leads are captured, enriched, scored and routed to the right place automatically.",
      },
      {
        title: "AI follow-up sequences",
        desc: "Timely, personalized follow-ups that keep deals moving without manual effort.",
      },
      {
        title: "Tool & API integrations",
        desc: "Make the tools you already pay for finally talk to each other.",
      },
      {
        title: "Reporting dashboards",
        desc: "Live visibility into what your automations do and the time they save you.",
      },
      {
        title: "Human-in-the-loop controls",
        desc: "Automation handles the busywork; your team keeps control of the decisions that matter.",
      },
    ],
    faqs: [
      {
        question: "What can you actually automate?",
        answer:
          "Lead capture and routing, follow-up emails, data entry between tools, reporting, onboarding steps and most repetitive, rules-based tasks.",
      },
      {
        question: "Which tools do you work with?",
        answer:
          "We build with platforms like Make and n8n, connect to CRMs and APIs, and use OpenAI where AI adds real value.",
      },
      {
        question: "Is AI automation reliable?",
        answer:
          "Yes. We design clear rules, add safeguards and keep a human in the loop for anything sensitive, so nothing runs blindly.",
      },
      {
        question: "Do I need a new CRM to start?",
        answer:
          "No. We usually automate on top of the tools you already use, and only recommend changes when they clearly pay off.",
      },
    ],
  },
  {
    id: "branding",
    num: "03",
    kicker: "Brand & Creative Direction",
    title: "A brand that looks the part.",
    desc: "Visual identity and creative direction that make your business look established and trustworthy, a cohesive system that holds together across every touchpoint, from your website to your decks and ads.",
    deliverables: [
      "Logo & visual identity",
      "Brand guidelines",
      "Color & typography systems",
      "Messaging & tone of voice",
      "Social & marketing assets",
      "Reusable design systems",
    ],
    tools: ["Figma", "Identity", "Guidelines"],
    metaTitle: "Brand & Creative Direction | Identity Design | Snaper",
    metaDescription:
      "Brand identity and creative direction that make your business look established and trustworthy. Logos, guidelines and design systems built to last.",
    intro:
      "Visual identity and creative direction that make your business look established, trustworthy and unmistakably yours.",
    overview: [
      "People judge your business in seconds, and most of that judgment is visual. A sharp, consistent brand earns trust before a single word is read.",
      "We build cohesive identity systems, not just logos, so everything from your website to your decks and ads feels like it belongs to the same confident company.",
    ],
    outcomes: [
      { value: "One", label: "Cohesive system, end to end" },
      { value: "100%", label: "Custom, ownable identity" },
      { value: "Every", label: "Touchpoint on-brand" },
    ],
    capabilities: [
      {
        title: "Logo & visual identity",
        desc: "A distinctive mark and visual language built around what makes you different.",
      },
      {
        title: "Brand guidelines",
        desc: "Clear rules for logo, color, type and usage so your brand stays consistent everywhere.",
      },
      {
        title: "Color & typography systems",
        desc: "Accessible, flexible palettes and type scales that work across every medium.",
      },
      {
        title: "Messaging & tone",
        desc: "A voice that sounds like you and speaks directly to the people you want to reach.",
      },
      {
        title: "Marketing & social assets",
        desc: "Templates and assets that keep every campaign sharp and on-brand.",
      },
      {
        title: "Design systems",
        desc: "Reusable components so your brand scales cleanly as you grow.",
      },
    ],
    faqs: [
      {
        question: "Do you only design logos?",
        answer:
          "No. A logo is one piece. We build the full system: color, typography, voice, assets and guidelines that hold together everywhere.",
      },
      {
        question: "Can you refresh our existing brand?",
        answer:
          "Yes. We can evolve and modernize what you have while keeping the equity your audience already recognizes.",
      },
      {
        question: "Will the branding work on our website?",
        answer:
          "That is the point. We design brand and web together so your identity translates perfectly into a live, interactive product.",
      },
      {
        question: "What do we receive at the end?",
        answer:
          "Source files, exported assets and a clear set of brand guidelines your team can use with confidence.",
      },
    ],
  },
  {
    id: "landing-pages",
    num: "04",
    kicker: "Landing Page Design & Development",
    title: "One page with one job: convert.",
    desc: "High-converting landing pages built fast for launches, campaigns and paid ads. Structured around a single action, engineered to load instantly, and wired straight into your CRM and automations.",
    deliverables: [
      "Conversion-first structure",
      "Custom standalone design",
      "Lightning-fast build",
      "A/B-ready sections",
      "Lead capture & CRM hookup",
      "Basic automations included",
    ],
    tools: ["Next.js", "CRO", "Analytics"],
    metaTitle: "Landing Page Design & Development | Snaper Digital",
    metaDescription:
      "High-converting landing pages built fast for launches, campaigns and ads. One page, one goal, engineered to load instantly and convert.",
    intro:
      "High-converting landing pages built fast for launches, campaigns and paid ads, with one job: turn clicks into action.",
    overview: [
      "A landing page lives or dies by a single number: conversion rate. So we strip away everything that distracts and engineer every section around one clear action.",
      "Built standalone and lightning-fast, your page loads instantly, looks custom, and plugs straight into your CRM and automations so no lead is ever lost.",
    ],
    outcomes: [
      { value: "5-7 days", label: "Typical turnaround" },
      { value: "One", label: "Focused goal per page" },
      { value: "A/B", label: "Ready to optimize" },
    ],
    capabilities: [
      {
        title: "Conversion-first structure",
        desc: "A proven page flow that guides visitors from hook to action without friction.",
      },
      {
        title: "Custom standalone design",
        desc: "On-brand, distinctive design built for the campaign, not a recycled template.",
      },
      {
        title: "Lightning-fast build",
        desc: "Minimal, optimized code so the page loads instantly, even on mobile ad traffic.",
      },
      {
        title: "Lead capture & CRM hookup",
        desc: "Forms wired directly to your CRM with instant notifications and routing.",
      },
      {
        title: "A/B-ready sections",
        desc: "Modular sections that make testing headlines and offers simple.",
      },
      {
        title: "Automation included",
        desc: "Confirmation emails and follow-ups fire the moment someone converts.",
      },
    ],
    faqs: [
      {
        question: "How fast can a landing page go live?",
        answer:
          "Most launch in 5 to 7 days once we have your goal, copy direction and brand assets.",
      },
      {
        question: "Can you write the copy too?",
        answer:
          "We structure the page for conversion and shape the messaging with you; full copywriting can be included on request.",
      },
      {
        question: "Will it connect to my ads and CRM?",
        answer:
          "Yes. We wire tracking, lead capture and CRM routing so your campaigns and follow-ups work end to end.",
      },
      {
        question: "What makes a landing page convert?",
        answer:
          "Clarity and focus: one audience, one offer, one action, fast load times, and a structure that removes every reason to hesitate.",
      },
    ],
  },
  {
    id: "ecommerce",
    num: "05",
    kicker: "Ecommerce Development",
    title: "Headless stores built to scale and sell.",
    desc: "Custom headless ecommerce that is fast, flexible and fully yours. The storefront is decoupled from the backend for speed, total design control, and room to grow without fighting a rigid template.",
    deliverables: [
      "Custom headless storefront",
      "Product & catalog UX",
      "Checkout optimization",
      "Payment & shipping setup",
      "CMS & inventory sync",
      "Performance & SEO",
    ],
    tools: ["Shopify Hydrogen", "Headless", "Stripe", "Next.js"],
    metaTitle: "Custom Headless Ecommerce Development | Snaper Digital",
    metaDescription:
      "Custom headless ecommerce that is fast, flexible and fully yours. A decoupled storefront built for speed, design control and room to scale and sell.",
    intro:
      "Custom headless ecommerce that is fast, flexible and fully yours, a storefront built for speed, control and serious scale.",
    overview: [
      "Template stores are quick to launch and painful to grow. The moment you want a custom experience or better performance, the platform starts fighting back.",
      "Headless commerce separates your storefront from the backend, so you get a fully custom, lightning-fast shopping experience while keeping a proven engine for products, inventory and payments.",
    ],
    outcomes: [
      { value: "Headless", label: "Full design control" },
      { value: "Fast", label: "Built for conversion" },
      { value: "Scale", label: "Grows without rebuilds" },
    ],
    capabilities: [
      {
        title: "Custom headless storefront",
        desc: "A bespoke front end on a modern stack, decoupled from the commerce backend.",
      },
      {
        title: "Product & catalog UX",
        desc: "Browsing, filtering and product pages designed to help people buy with confidence.",
      },
      {
        title: "Checkout optimization",
        desc: "A fast, frictionless checkout tuned to reduce abandonment and lift revenue.",
      },
      {
        title: "Payments & shipping",
        desc: "Reliable integrations for the payment methods and carriers your customers expect.",
      },
      {
        title: "CMS & inventory sync",
        desc: "Content and inventory stay in sync so your team manages everything in one place.",
      },
      {
        title: "Performance & SEO",
        desc: "Fast, crawlable storefronts that rank and convert on every device.",
      },
    ],
    faqs: [
      {
        question: "What does headless mean for my store?",
        answer:
          "Your customer-facing storefront is built custom and separately from the commerce backend, giving you full design freedom and much faster pages.",
      },
      {
        question: "Which platforms do you use?",
        answer:
          "We commonly build with Shopify Hydrogen and other headless backends, paired with Next.js and Stripe where it fits.",
      },
      {
        question: "Can you migrate my existing store?",
        answer:
          "Yes. We can move your products, content and customers to a headless setup while protecting your SEO and order history.",
      },
      {
        question: "Is headless worth it for a smaller store?",
        answer:
          "If you want a standout, fast, custom experience and room to scale, yes. For very simple catalogs a standard build can be enough, and we will tell you honestly.",
      },
    ],
  },
];

/** Flat offerings list (id / name / description) for the /services Service JSON-LD. */
export const serviceOfferings = servicesContent.map((s) => ({
  id: s.id,
  name: s.kicker,
  description: s.desc,
}));

/** Look up a single service by its slug. */
export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return servicesContent.find((s) => s.id === slug);
}

/** All slugs, for generateStaticParams. */
export const serviceSlugs = servicesContent.map((s) => s.id);
