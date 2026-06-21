<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Website Context

This project is the rebuild of **snaperdigital.com** in **Next.js**.

Snaper Digital is a digital agency focused on building modern, conversion-focused websites and practical AI automation systems for businesses.

The website should feel premium, sharp, modern, and high-trust. The brand direction is dark, minimal, bold, and slightly futuristic, with a strong visual “wow” effect.

The website is not just a portfolio. It should clearly explain what Snaper Digital does, who it helps, and why businesses should trust it.

## Brand Context

Snaper Digital helps businesses improve their online presence, generate more leads, and automate repetitive workflows.

The brand should feel like a serious digital partner, not a cheap template agency.

Core qualities:

- Modern
- Premium
- Direct
- Strategic
- Conversion-focused
- Technical
- Creative
- Practical

## Services Context

Snaper Digital provides:

### Website Design and Development

Custom websites built with modern technology, strong visual design, and clear business goals.

This includes business websites, landing pages, service pages, marketing websites, and conversion-focused digital experiences.

### AI Automation

Automation systems that help businesses save time, reduce manual work, and improve internal workflows.

This can include workflow automation, CRM automation, lead handling, AI-assisted processes, and integrations between tools.

### Branding and Creative Direction

Visual identity, design systems, brand direction, graphics, and digital assets that make businesses look more professional and recognizable.

### Consulting

Strategic guidance for businesses that need help improving their website, digital systems, marketing structure, or automation setup.

## Visual Style

The primary website style uses:

- Dark background, almost black
- White text
- Accent color: `#754dec`
- Close shades of `#754dec` for accents, gradients, highlights, eyebrows, borders, glow effects, and interactive elements

The website should support both **dark mode** and **light mode**.

Dark mode is the main brand experience.

Light mode should still feel polished and premium, not like an afterthought.

# Fonts that should be used

- Poppins is the primary and only font of the website
- Feel free to use different weights depending on what is being worked on.

## Technology Context

The website is built with:

- Next.js
- Tailwind CSS

Tailwind CSS should be used for styling.

## Animation and Interaction Context

The website should aim for a strong “wow” effect.

The desired feel includes:

- Scroll-driven animations
- Smooth transitions
- Animated cursor interactions
- Premium micro-interactions
- Modern motion design

The site can use more ambitious visual effects on large screens.

Heavy WebGL or 3D animation should be avoided on mobile devices.

On desktop and large screens, more advanced visual effects are acceptable.

## Performance Context

Performance is not the main priority, but the website must still be usable.

The website should not feel broken, frozen, or unloadable on slightly older devices.

Mobile should stay reasonably lightweight.

Avoid forcing heavy animations, complex canvas effects, or WebGL-heavy sections on weaker devices.

## SEO Context

The website should be structured with solid SEO foundations.

Each important page should have proper metadata.

SEO basics should include:

- Unique meta title for each page
- Unique meta description for each page
- Proper heading structure
- Clean URL structure
- Relevant Open Graph metadata
- Relevant Twitter/X card metadata
- Canonical URLs where needed
- Structured data where appropriate
- JSON-LD where appropriate

# Crawlability of pages
- This is primarily a marketing website
- Be smart about using client side and server side rendering
- Pages must be indexable and crawlable

## Meta Title Rules

Meta titles should be clear, specific, and written for both search engines and humans.

Recommended length:

- Ideal: 50–60 characters
- Maximum: around 60 characters when possible

Meta titles should include the page topic and, when useful, the Snaper Digital brand name.

## Meta Description Rules

Meta descriptions should explain the page clearly and encourage clicks without sounding spammy.

Recommended length:

- Ideal: 140–155 characters
- Maximum: 160 characters

Descriptions should be unique per page and should not be duplicated across the website.

## JSON-LD Context

Use JSON-LD where it makes sense.

Relevant structured data may include:

- Organization
- LocalBusiness or ProfessionalService
- WebSite
- WebPage
- Service
- BreadcrumbList
- FAQPage where FAQ sections exist
- Article or BlogPosting for blog content

Structured data should describe the actual page content accurately.

## Content Context

The copy should be direct, clear, and business-focused.

Avoid vague agency language.

Avoid sounding like a generic SaaS landing page.

The messaging should make it clear that Snaper Digital builds practical digital systems, not just pretty visuals.

The website should explain services in plain language while still feeling premium and expert.

## Overall Goal

The goal of the rebuild is to create a modern, high-impact Snaper Digital website that looks premium, communicates services clearly, supports SEO properly, and creates a strong first impression through design, motion, and interaction.

## Code Structure Context

The project should use smart componentization and scalable code organization.

The codebase should be structured so the website can grow without becoming messy.

Core layout elements such as the header and footer should live in the main layout structure.

Reusable UI primitives should live in a `ui` folder.

Examples of reusable UI include:

- Buttons
- Cards
- Badges
- Inputs
- Containers
- Section wrappers
- Reusable typography pieces

Page-specific or reusable website sections should live in a `sections` folder.

Examples of sections include:

- Hero sections
- Service sections
- Process sections
- Testimonials
- CTA sections
- FAQ sections
- Case study sections

The project should use smart folder decisions based on scalability.

Dynamic routing should be handled thoughtfully with Next.js folder conventions such as:

- `[slug]`
- `[category]`
- `[service]`
- `[...slug]`

These patterns should only be used when they make the codebase more scalable and easier to maintain.

The folder structure should support future growth of:

- Service pages
- Landing pages
- Blog pages
- Case studies
- Legal pages
- CMS-powered content

Avoid dumping everything into one folder.

Avoid creating unnecessary complexity too early.

The goal is clean, scalable, easy-to-understand architecture.

## CMS Context

Sanity.io headless CMS will be integrated later for blog content.

Do not install Sanity.

Do not configure Sanity.

Do not add Sanity schemas.

Do not create a studio folder.

Do not add Sanity dependencies.

Do not build CMS logic until explicitly requested.

The current project should be structured in a way that will make future Sanity integration easy, especially for blogs and CMS-powered content.
