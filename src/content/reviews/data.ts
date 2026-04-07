import type { ReviewExperienceProps } from '@/components/reviews/types';

export const docsalotReview: ReviewExperienceProps = {
  hero: {
    badge: 'In Review - Deep Dive',
    titleAccent: 'DocsAlot',
    title: 'Developer Experience',
    subtitle:
      'An honest, detailed assessment of API design, documentation, community, and developer education. The before snapshot.',
    meta: ['April 2026', 'docsalot.dev', 'AI-native docs platform'],
  },
  scores: [
    {
      id: 'api',
      label: 'API',
      score: 58,
      verdict: 'Promising',
      tone: 'amber',
      sectionId: 'section-api',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      score: 71,
      verdict: 'Solid',
      tone: 'green',
      sectionId: 'section-docs',
    },
    {
      id: 'community',
      label: 'Community',
      score: 34,
      verdict: 'Early',
      tone: 'red',
      sectionId: 'section-community',
    },
    {
      id: 'education',
      label: 'Education',
      score: 63,
      verdict: 'Growing',
      tone: 'amber',
      sectionId: 'section-education',
    },
  ],
  sections: [
    {
      id: 'section-api',
      number: '01',
      title: 'API Design & Usability',
      subtitle: 'Design, developer experience, and programmatic surface area',
      findings: [
        `DocsAlot has two API surfaces: the <strong>API Playground feature</strong> customers embed in their docs, and DocsAlot's <strong>own backend API</strong> for the assistant and agent. The Playground is polished: six-language code generation, OpenAPI auto-import, and interactive try-it mode. But DocsAlot's own API is barely documented publicly.`,
        `The CLI (<code>docsalot auth login</code>, <code>docs pull</code>, <code>docs push</code>, <code>docs publish</code>) shipped in March 2026 and adds a third API surface. It includes a browser-based auth flow and a skill system for coding agents. The MCP server is a fourth surface, where each docs site exposes search, list, and read tools via Model Context Protocol.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Multi-language playground with OpenAPI auto-generation',
          body: [
            `The API Playground supports cURL, Python, JavaScript, Go, Java, and Rust code snippets out of the box. Drop an OpenAPI spec into your docs folder and endpoint parameters, descriptions, and response schemas are auto-generated. Authentication models are configurable per page or globally via <code>layout.json</code>.`,
            `This is a real differentiator over raw Docusaurus or GitBook setups where you would need to wire this up yourself.`,
          ],
          sourceUrl: 'https://docsalot-docs.docsalot.dev/api-playground/demo',
          sourceLabel: 'docsalot-docs.docsalot.dev/api-playground/demo',
        },
        {
          kind: 'gap',
          title: "DocsAlot's own API is referenced but not documented",
          body: [
            `The AI-native docs page references endpoints like <code>/api-reference/assistant/create-assistant-message</code> and <code>/api-reference/agent/create-agent-job</code>, but there is no public API reference with the same playground treatment they give customers. No documented auth flows, rate limits, error shapes, or pagination for DocsAlot's own API.`,
            `A docs platform that does not dog-food its own API docs feature on its own API is a missed opportunity.`,
          ],
          sourceUrl: 'https://docsalot-docs.docsalot.dev/ai-native',
          sourceLabel: 'docsalot-docs.docsalot.dev/ai-native',
        },
        {
          kind: 'opportunity',
          title: 'Four API surfaces, no unified developer portal',
          body: [
            `Playground feature, backend REST API, CLI, and MCP server are four distinct ways developers interact with DocsAlot programmatically. Each lives in a different docs section with no shared developer portal entry point.`,
            `A developer landing page that maps all four surfaces with their auth models and use cases would materially improve discoverability.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across API sub-dimensions:',
      breakdown: [
        { label: 'Playground DX', value: 78, tone: 'green' },
        { label: 'Own API docs', value: 25, tone: 'red' },
        { label: 'CLI experience', value: 68, tone: 'amber' },
        { label: 'MCP surface', value: 60, tone: 'amber' },
        { label: 'Auth model', value: 55, tone: 'amber' },
      ],
      recommendations: [
        'Create a unified Developer Portal page mapping all four API surfaces',
        "Dog-food the API Playground on DocsAlot's own REST API endpoints",
        'Document rate limits, error shapes, and versioning policy',
        'Publish MCP server schema with example tool calls and responses',
      ],
    },
    {
      id: 'section-docs',
      number: '02',
      title: 'Documentation Quality',
      subtitle: 'Structure, clarity, completeness, and self-referential integrity',
      findings: [
        `The docs site at <code>docs.docsalot.dev</code> covers eight major sections with more than forty pages. The AI-native documentation page is standout work, with a clear Read, Write, Discover taxonomy that makes the product's value proposition concrete. Every page includes an AI chat assistant, content negotiation by appending <code>.md</code>, and auto-generated <code>llms.txt</code>.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Eating their own cooking with AI features on every page',
          body: [
            `Every docs page has an embedded AI chat assistant, MCP server connectivity, content negotiation, <code>llms.txt</code>, and <code>skill.md</code> files. These are not just features they sell; they run on their own docs and on customer examples like MasonHub.`,
          ],
        },
        {
          kind: 'gap',
          title: 'Sidebar typo: Creating Documenation',
          body: [
            `The sidebar heading reads <code>Creating Documenation</code>, missing the second t. For a platform whose promise is documentation quality, this is the kind of small detail that chips away at credibility because it is visible on every page.`,
          ],
        },
        {
          kind: 'gap',
          title: 'llms.txt reads like marketing copy, not a machine reference',
          body: [
            `The <code>llms.txt</code> file at <code>docsalot.dev/llms.txt</code> opens with marketing language and includes sections like Why DocsAlot is the Best Choice. That cuts against the standard's purpose: it should be a factual reference for AI agents, not an SEO landing page in plain text.`,
          ],
          sourceUrl: 'https://docsalot.dev/llms.txt',
          sourceLabel: 'docsalot.dev/llms.txt',
        },
        {
          kind: 'opportunity',
          title: 'No concepts or architecture page explaining the data model',
          body: [
            `The docs jump from quickstart into settings without spelling out fundamentals like what a documentation project is, how versions work, or how the editor relates to GitHub sync. A concepts page would reduce cognitive load for new users before they start configuring details.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across documentation sub-dimensions:',
      breakdown: [
        { label: 'Coverage', value: 82, tone: 'green' },
        { label: 'AI features', value: 88, tone: 'green' },
        { label: 'Accuracy', value: 62, tone: 'amber' },
        { label: 'IA / Navigation', value: 65, tone: 'amber' },
        { label: 'Onboarding depth', value: 45, tone: 'red' },
      ],
      recommendations: [
        'Fix the Creating Documenation typo and audit for others',
        'Rewrite llms.txt as a factual reference instead of marketing copy',
        'Add a concepts or architecture page before the settings section',
        'Run their own Broken Link Checker and DocsAgent Score on the docs',
      ],
    },
    {
      id: 'section-community',
      number: '03',
      title: 'Developer Community',
      subtitle: 'Channels, presence, and engagement infrastructure',
      findings: [
        `Community is the weakest of the four pillars. The product has a Discord, a GitHub org, and social presence on X, but all three have structural issues that limit their effectiveness.`,
      ],
      evidence: [
        {
          kind: 'gap',
          title: 'Two conflicting Discord invite links across the site',
          body: [
            `The main site links to <code>discord.gg/Dp6EpTv4BU</code> while the docs footer links to <code>discord.gg/MPNgtSZkgK</code>. That fragments community and confuses new users because it is not clear whether these are separate servers or duplicate invites.`,
          ],
        },
        {
          kind: 'gap',
          title: 'GitHub org is SlashML with 98 repos, mostly forks',
          body: [
            `The GitHub org at <code>github.com/slashml</code> has ninety-eight repositories and seventeen followers. Most visible repos are forks or older ML projects, with no public DocsAlot source code. The org is verified for <code>slashml.com</code>, not <code>docsalot.dev</code>, which creates brand confusion.`,
          ],
        },
        {
          kind: 'gap',
          title: 'No product social account and no visible community programs',
          body: [
            `Twitter and X links point to the founder's personal account instead of a product account. There is no public roadmap, contributor recognition, or community champion program, and feedback channels mostly collapse to email or Discord.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across community sub-dimensions:',
      breakdown: [
        { label: 'Discord presence', value: 40, tone: 'red' },
        { label: 'GitHub presence', value: 28, tone: 'red' },
        { label: 'Social media', value: 22, tone: 'red' },
        { label: 'Feedback loops', value: 35, tone: 'red' },
        { label: 'Programs', value: 20, tone: 'red' },
      ],
      recommendations: [
        'Consolidate Discord to a single invite link across all properties',
        'Create a dedicated DocsAlot GitHub org or rename and rebrand SlashML',
        'Launch a DocsAlot product account on X and ship a public roadmap',
        'Open-source at least one component: the CLI, MCP server, or a template',
      ],
    },
    {
      id: 'section-education',
      number: '04',
      title: 'Developer Education',
      subtitle: 'Tutorials, guides, onboarding resources, and learning paths',
      findings: [
        `Education is a mixed picture. The blog is genuinely strong: opinionated, technically substantive, and published consistently. The free tools are a smart lead-generation play. But the actual onboarding experience and tutorial depth have room to grow.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Blog content is opinionated and technically substantive',
          body: [
            `There are fourteen posts since January 2026 covering MCP servers, <code>llms.txt</code> limitations, agent-friendly CLIs, <code>skill.md</code> as an open standard, and firsthand documentation experiments. These are not generic explainers; they take positions and back them up.`,
          ],
          sourceUrl: 'https://docsalot.dev/blog',
          sourceLabel: 'docsalot.dev/blog',
        },
        {
          kind: 'strength',
          title: 'Free tools work as educational entry points without signup',
          body: [
            `DocsAgent Score, Docs SEO Checker, GTM Readiness Audit, Human Readability Audit, and Broken Link Checker all give developers immediate value with no signup wall. That makes them effective education and demand-generation assets at the same time.`,
          ],
          sourceUrl: 'https://docsalot.dev/tools',
          sourceLabel: 'docsalot.dev/tools',
        },
        {
          kind: 'gap',
          title: 'Quickstart ends after editing one frontmatter field',
          body: [
            `The quickstart is four steps: create a project, view the site, edit <code>index.mdx</code>, and publish. There is no build-something-real follow-up, no progressive path into advanced features, and the GitHub integration is buried in an optional block. A developer can finish without understanding the product.`,
          ],
          sourceUrl: 'https://docsalot-docs.docsalot.dev/quickstart',
          sourceLabel: 'docsalot-docs.docsalot.dev/quickstart',
        },
        {
          kind: 'gap',
          title: 'Comparison pages exist, but migration guides do not',
          body: [
            `DocsAlot has a healthy set of competitor comparison pages, but zero migration guides. If someone reads DocsAlot vs GitBook and decides to switch, there is no next-step guide that shows how to move content, structure, and workflows over.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across education sub-dimensions:',
      breakdown: [
        { label: 'Blog quality', value: 85, tone: 'green' },
        { label: 'Free tools', value: 78, tone: 'green' },
        { label: 'Onboarding', value: 38, tone: 'red' },
        { label: 'Tutorials', value: 32, tone: 'red' },
        { label: 'Migration paths', value: 10, tone: 'red' },
      ],
      recommendations: [
        'Expand quickstart into a build real docs in 15 minutes tutorial',
        'Create migration guides for GitBook, Mintlify, and Docusaurus',
        'Build a learning path page that sequences quickstart, concepts, and advanced topics',
        'Add video walkthroughs or short demo recordings for key workflows',
      ],
    },
  ],
  footerNote:
    'Preliminary assessment based on publicly available sources. Full review requires account creation, hands-on testing, and community participation. Scores are directional estimates pending deeper investigation.',
};

export const scalekitReview: ReviewExperienceProps = {
  hero: {
    badge: 'In Review - Deep Dive',
    titleAccent: 'Scalekit',
    title: 'Developer Experience',
    subtitle:
      'Auth stack for AI applications. API design, documentation, community, and developer education assessed across four pillars.',
    meta: ['April 2026', 'docs.scalekit.com', 'B2B and AI auth platform'],
  },
  scores: [
    {
      id: 'api',
      label: 'API',
      score: 82,
      verdict: 'Strong',
      tone: 'green',
      sectionId: 'section-api',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      score: 85,
      verdict: 'Excellent',
      tone: 'green',
      sectionId: 'section-docs',
    },
    {
      id: 'community',
      label: 'Community',
      score: 68,
      verdict: 'Growing',
      tone: 'amber',
      sectionId: 'section-community',
    },
    {
      id: 'education',
      label: 'Education',
      score: 80,
      verdict: 'Solid',
      tone: 'green',
      sectionId: 'section-education',
    },
  ],
  sections: [
    {
      id: 'section-api',
      number: '01',
      title: 'API Design & Usability',
      subtitle: 'SDKs, REST API, OpenAPI spec, webhooks, and interceptors',
      findings: [
        `Scalekit's API surface is mature and well-organized. There are five official SDKs, a full REST API with OpenAPI spec, Postman collections, webhooks, and interceptors. The API follows standard OAuth 2.1 patterns, and the SDK method names map cleanly to the REST endpoints.`,
        `The modular architecture is the standout design decision: MCP Auth, Agent Auth, SSO, SCIM, and Full-Stack Auth can each be adopted independently. The overall surface area is large, but each module stays self-contained enough to be learnable.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Five SDKs with framework-specific compatibility spelled out',
          body: [
            `Node.js, Python, Go, Java, and Expo each have dedicated SDK pages with versions, framework compatibility, install instructions, and direct getting-started links. The docs also make it clear that the repos are open source and MIT licensed.`,
            `That level of compatibility detail removes guesswork before an integration starts, especially for teams deciding which language stack to standardize on.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/sdks/',
          sourceLabel: 'docs.scalekit.com/sdks',
        },
        {
          kind: 'strength',
          title: 'OpenAPI spec, Postman collection, and markdown API reference all exist',
          body: [
            `The API is published in multiple formats: the main reference at <code>/apis/</code>, an OpenAPI JSON spec, a Postman collection, and a markdown-rendered version for LLM and IDE workflows. Every page also includes direct actions like Open in Claude and Open in Cursor.`,
            `That multi-format delivery is a strong sign the API program is designed for both humans and tooling.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/apis/',
          sourceLabel: 'docs.scalekit.com/apis',
        },
        {
          kind: 'strength',
          title: 'Webhooks and interceptors are treated as first-class extensibility points',
          body: [
            `Scalekit documents not just post-event webhooks, but also interceptors that run during authentication flows. That gives teams a place to attach policy checks, custom validation, or flow-specific routing logic before the flow completes.`,
            `It is an unusual capability in auth products and a real differentiator when integrations need custom control points.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'The API reference appears more reference-oriented than playground-oriented',
          body: [
            `The Scalar-based reference is strong, but it is not obvious whether there is a built-in authenticated try-it experience for live calls. Postman partially fills that gap, but switching tools still adds friction compared with products that support interactive testing in the docs itself.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across API sub-dimensions:',
      breakdown: [
        { label: 'SDK coverage', value: 92, tone: 'green' },
        { label: 'API reference', value: 85, tone: 'green' },
        { label: 'Extensibility', value: 88, tone: 'green' },
        { label: 'Interactive testing', value: 60, tone: 'amber' },
        { label: 'Auth model clarity', value: 80, tone: 'green' },
      ],
      recommendations: [
        'Add an interactive API explorer with live try-it support for authenticated endpoints',
        'Show an SDK version compatibility matrix that maps SDK releases to API features',
        'Add rate limit and error shape documentation directly into the API reference',
      ],
    },
    {
      id: 'section-docs',
      number: '02',
      title: 'Documentation Quality',
      subtitle: 'Structure, clarity, AI-readiness, and developer affordances',
      findings: [
        `Scalekit's documentation is one of the strongest parts of the product. The information architecture mirrors the modular product design, and every page includes markdown-first and AI-assistant-friendly affordances like Copy Markdown, View in Markdown, Open in Claude, and Open in Cursor.`,
        `The docs source is open on GitHub and includes edit links on every page, which helps credibility and makes the docs feel like a maintained developer surface instead of a static marketing asset.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'The llms.txt implementation is unusually well executed',
          body: [
            `The <code>llms.txt</code> file does more than list pages. It provides routing guidance by product area and splits the docs into targeted sets like full-stack-auth, agent-authentication, and mcp-authentication. There are also compact and full variants for different loading strategies.`,
            `This is one of the better examples of llms.txt as a practical machine-facing document rather than a token gesture.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/llms.txt',
          sourceLabel: 'docs.scalekit.com/llms.txt',
        },
        {
          kind: 'strength',
          title: 'Open in Claude and Cursor links reduce context-loading friction',
          body: [
            `Every page ships with assistant-friendly actions, including preloaded Claude prompts and Cursor deep links. Combined with markdown views and copy-to-markdown, that makes the docs highly usable inside modern AI-assisted workflows.`,
          ],
        },
        {
          kind: 'strength',
          title: 'Quickstarts include real code, demos, and sequence diagrams',
          body: [
            `The FSA quickstart covers install, redirect, callback, session, and logout with working examples in multiple languages. It also includes embedded videos, flow diagrams, and inline notes for common integration mistakes.`,
            `That is materially better than quickstarts that stop at a toy authentication redirect without showing session handling or error cases.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/authenticate/fsa/quickstart/',
          sourceLabel: 'docs.scalekit.com/authenticate/fsa/quickstart',
        },
        {
          kind: 'opportunity',
          title: 'The navigation is powerful, but high-choice for first-time visitors',
          body: [
            `The mega-menu exposes a lot of product surface area immediately. That is useful once someone understands the product map, but it may be overwhelming for a newcomer who still needs help deciding between modular auth and full-stack auth.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across documentation sub-dimensions:',
      breakdown: [
        { label: 'IA / Navigation', value: 75, tone: 'green' },
        { label: 'AI readiness', value: 95, tone: 'green' },
        { label: 'Code quality', value: 90, tone: 'green' },
        { label: 'Quickstart depth', value: 88, tone: 'green' },
        { label: 'Discoverability', value: 72, tone: 'amber' },
      ],
      recommendations: [
        'Add a which Scalekit product do I need decision tree for first-time visitors',
        'Simplify the top-level navigation so the first scan has fewer competing choices',
        'Add estimated integration time to each quickstart header',
      ],
    },
    {
      id: 'section-community',
      number: '03',
      title: 'Developer Community',
      subtitle: 'Channels, open source, social presence, and programs',
      findings: [
        `Community infrastructure is in place and more professional than many early developer tools, but engagement depth still looks early. Scalekit has Slack, a clean GitHub organization, a product X account, YouTube, LinkedIn, and a Creator Program.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'The GitHub organization is clean and purpose-built',
          body: [
            `The <code>scalekit-inc</code> org is verified for scalekit.com and avoids the common problem of a cluttered repo list full of unrelated forks. The naming is consistent, the repos are clearly product-linked, and the org README routes developers to the right starting points.`,
          ],
          sourceUrl: 'https://github.com/scalekit-inc',
          sourceLabel: 'github.com/scalekit-inc',
        },
        {
          kind: 'strength',
          title: 'Product identity is separate from founder identity',
          body: [
            `Scalekit has dedicated product accounts and an explicit Creator Program. That is the right baseline for building a real developer community rather than relying on ad hoc founder-led communication alone.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'Slack is present, but the actual community energy is hard to evaluate from outside',
          body: [
            `Slack can work well for support and community, but it is less legible from the outside than Discord or public forums. Without joining, it is difficult to tell how active it is, how quickly questions get answered, or how the channels are structured.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'The open-source footprint looks under-promoted relative to its quality',
          body: [
            `The repos appear well structured, but star counts are still modest. That suggests the code may be better than the current visibility around it, which is often a distribution problem rather than a product problem.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across community sub-dimensions:',
      breakdown: [
        { label: 'GitHub presence', value: 82, tone: 'green' },
        { label: 'Social identity', value: 75, tone: 'green' },
        { label: 'Community hub', value: 55, tone: 'amber' },
        { label: 'OSS engagement', value: 42, tone: 'red' },
        { label: 'Programs', value: 65, tone: 'amber' },
      ],
      recommendations: [
        'Promote the open-source repos through targeted developer community launches',
        'Add a public community preview or FAQ before the Slack join gate',
        'Ship a public roadmap or changelog with a visible community feedback loop',
        'Show the Creator Program in action with guest posts, tutorials, and community output',
      ],
    },
    {
      id: 'section-education',
      number: '04',
      title: 'Developer Education',
      subtitle: 'Tutorials, cookbooks, testing tools, and AI-assisted integration',
      findings: [
        `Education is Scalekit's second-strongest pillar after documentation. The team has invested heavily in meeting developers where they work: AI coding agents, IDE integrations, testing tools, practical cookbooks, and product-specific implementation prompts.`,
        `The Build with AI section is the standout differentiator here because it treats agent workflows as a first-class integration path instead of a side note.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Build with AI supports multiple coding agents and editor flows',
          body: [
            `Scalekit offers installable plugins and prompts for Claude Code, Codex, GitHub Copilot CLI, Cursor, and broader skills-based agent flows. Different auth modules also have dedicated prompts so the guidance stays product-specific rather than generic.`,
            `This is one of the most complete AI-agent developer experiences currently visible in the auth category.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/dev-kit/build-with-ai/',
          sourceLabel: 'docs.scalekit.com/dev-kit/build-with-ai',
        },
        {
          kind: 'strength',
          title: 'Dryrun and the SSO Simulator shorten time-to-understanding',
          body: [
            `The dryrun flow lets developers exercise a local auth path before writing a full integration, and the SSO Simulator removes the need to set up a real IdP on day one. These are exactly the sorts of tools that turn an auth product from conceptually clear into practically approachable.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/dev-kit/tools/scalekit-dryrun/',
          sourceLabel: 'docs.scalekit.com/dev-kit/tools/scalekit-dryrun',
        },
        {
          kind: 'strength',
          title: 'Cookbooks focus on practical integration patterns, not toy examples',
          body: [
            `The cookbook content covers real product usage like enterprise SSO with Next.js, agent workflows, and application-level auth patterns. The pieces are authored, scoped, and tagged clearly enough that they feel like practical implementation guides rather than blog filler.`,
          ],
          sourceUrl: 'https://docs.scalekit.com/cookbooks/',
          sourceLabel: 'docs.scalekit.com/cookbooks',
        },
        {
          kind: 'opportunity',
          title: 'There is no clear guided academy-style learning path yet',
          body: [
            `The docs include demos and embedded videos, but there is not yet a structured tutorial sequence that takes a developer from first auth flow to production enterprise rollout in a staged way. For a product with this many modules, that missing learning path is noticeable.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across education sub-dimensions:',
      breakdown: [
        { label: 'AI-assisted dev', value: 95, tone: 'green' },
        { label: 'Testing tools', value: 88, tone: 'green' },
        { label: 'Cookbooks', value: 82, tone: 'green' },
        { label: 'Code samples', value: 78, tone: 'green' },
        { label: 'Video / guided', value: 40, tone: 'red' },
      ],
      recommendations: [
        'Create a structured video series that goes from zero to production auth quickly',
        'Build a guided learning path that sequences FSA, SSO, and SCIM adoption',
        'Expand cookbooks to cover migration from Auth0, Clerk, and WorkOS',
      ],
    },
  ],
  footerNote:
    'Preliminary assessment based on publicly available sources including docs.scalekit.com, scalekit.com, and github.com/scalekit-inc. Scores are directional estimates. Full review would still require account creation, SDK testing, Slack participation, and end-to-end auth flow implementation.',
};

export const confidentAiReview: ReviewExperienceProps = {
  hero: {
    badge: 'In Review - Deep Dive',
    titleAccent: 'Confident AI',
    title: 'Platform Review',
    subtitle:
      'The AI quality platform built on DeepEval. LLM evaluation, observability, and red teaming for engineering, QA, and product teams.',
    meta: ['April 2026', 'confident-ai.com', 'LLMOps and AI quality platform'],
  },
  scores: [
    {
      id: 'messaging',
      label: 'Messaging',
      score: 82,
      verdict: 'Strong',
      tone: 'green',
      sectionId: 'section-messaging',
    },
    {
      id: 'structure',
      label: 'Structure',
      score: 76,
      verdict: 'Solid',
      tone: 'green',
      sectionId: 'section-structure',
    },
    {
      id: 'trust',
      label: 'Trust',
      score: 70,
      verdict: 'Growing',
      tone: 'amber',
      sectionId: 'section-trust',
    },
    {
      id: 'developer-exp',
      label: 'Dev UX',
      score: 88,
      verdict: 'Excellent',
      tone: 'green',
      sectionId: 'section-devx',
    },
  ],
  sections: [
    {
      id: 'section-messaging',
      number: '01',
      title: 'Messaging & Positioning',
      subtitle: 'Value proposition clarity and audience fit',
      findings: [
        `The core headline is strong and specific: Confident AI positions itself as an AI quality platform with lower engineering overhead, which is a clear contrast against competitors that speak almost exclusively to platform engineers.`,
        `The traces to datasets to evals to experiments narrative communicates a full workflow in very little space. The weakness is audience spread: the homepage speaks to engineers, PMs, and QA at once, but PM and QA paths are less concrete than the engineering path.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'The primary value loop is compressed and memorable',
          body: [
            `The homepage subhead communicates an end-to-end evaluation workflow rather than a single feature. That creates a stronger product story than tooling pages that lead with isolated capabilities.`,
          ],
          sourceUrl: 'https://www.confident-ai.com',
          sourceLabel: 'confident-ai.com',
        },
        {
          kind: 'opportunity',
          title: 'PM and QA messaging needs concrete visual proof',
          body: [
            `The who-we-serve segmentation is directionally right, but the supporting visuals and examples remain engineering-heavy. Showing explicit PM and QA workflows on-page would improve multi-persona clarity.`,
          ],
        },
        {
          kind: 'strength',
          title: 'Jargon is lower than category average',
          body: [
            `The copy stays more outcome-oriented than many LLMOps alternatives, which helps technical buyers bring in non-engineering stakeholders earlier in the evaluation process.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across messaging sub-dimensions:',
      breakdown: [
        { label: 'Headline clarity', value: 88, tone: 'green' },
        { label: 'Value prop depth', value: 84, tone: 'green' },
        { label: 'Audience fit', value: 72, tone: 'amber' },
        { label: 'Differentiation', value: 82, tone: 'green' },
        { label: 'Jargon control', value: 80, tone: 'green' },
      ],
      recommendations: [
        'Add PM and QA specific screenshots directly in the who-we-serve block',
        'Preserve the traces to datasets to evals messaging as the primary story',
        'Add one quick copy line under each persona describing the first action they should take',
      ],
    },
    {
      id: 'section-structure',
      number: '02',
      title: 'Page Structure & Information Architecture',
      subtitle: 'Hierarchy, depth, and conversion flow',
      findings: [
        `The homepage has strong material, but there is too much of it before the best conversion-relevant sections. The overall information density creates long-scroll fatigue for first-time evaluators.`,
        `The how-it-works setup narrative appears later than expected even though it is one of the most reassuring blocks for technical teams assessing setup friction.`,
      ],
      evidence: [
        {
          kind: 'gap',
          title: 'Too many feature slices appear before setup clarity',
          body: [
            `Multiple feature cards and support sections appear before practical onboarding flow details. This can dilute attention and delay the point where a visitor understands how quickly they can test the product.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'How-it-works should move closer to the hero',
          body: [
            `Moving the setup sequence immediately after the hero and logo trust band would reduce uncertainty and likely improve mid-page conversion behavior.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'Feature card count can be reduced without losing depth',
          body: [
            `Keeping three high-priority cards on the homepage and linking to deeper product pages for the rest would tighten narrative flow while preserving discoverability.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across structure sub-dimensions:',
      breakdown: [
        { label: 'Content hierarchy', value: 70, tone: 'amber' },
        { label: 'Scroll depth risk', value: 65, tone: 'amber' },
        { label: 'Section uniqueness', value: 72, tone: 'amber' },
        { label: 'CTA placement', value: 82, tone: 'green' },
        { label: 'Navigation clarity', value: 85, tone: 'green' },
      ],
      recommendations: [
        'Move how-it-works immediately after the hero and trust logos',
        'Reduce homepage feature cards to top three capabilities',
        'Add a mid-page CTA so the middle of the page has a clear next action',
      ],
    },
    {
      id: 'section-trust',
      number: '03',
      title: 'Trust & Social Proof',
      subtitle: 'Validation, outcomes, and credibility signals',
      findings: [
        `Brand logos and compliance positioning are strong, and the DeepEval ecosystem footprint is an asset many competitors cannot match. Trust breadth is there, but trust depth is thinner than it could be.`,
        `The biggest gap is narrative proof. One testimonial and broad claims are helpful, but they leave measurable customer outcomes underrepresented on the homepage.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Enterprise logos and compliance badges establish baseline credibility quickly',
          body: [
            `Recognizable brand logos plus SOC 2 and HIPAA messaging create immediate confidence for enterprise-minded evaluators.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'DeepEval traction should be surfaced more prominently on homepage',
          body: [
            `GitHub stars and monthly usage are high-signal proof points for developer-first products. They should be treated as first-class trust metrics in the hero or logo region.`,
          ],
          sourceUrl: 'https://github.com/confident-ai/deepeval',
          sourceLabel: 'github.com/confident-ai/deepeval',
        },
        {
          kind: 'gap',
          title: 'Testimonial volume and specificity are below what logos imply',
          body: [
            `A larger testimonial set with concrete outcomes would better support the scale claims and bridge the gap between recognition logos and practical buyer confidence.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across trust sub-dimensions:',
      breakdown: [
        { label: 'Logo credibility', value: 90, tone: 'green' },
        { label: 'Testimonial depth', value: 45, tone: 'red' },
        { label: 'Case study access', value: 60, tone: 'amber' },
        { label: 'Community signals', value: 72, tone: 'amber' },
        { label: 'Compliance badges', value: 92, tone: 'green' },
      ],
      recommendations: [
        'Add two to three customer stories with explicit before and after metrics',
        'Highlight DeepEval usage and star metrics on the homepage hero or trust band',
        'Keep social counters synchronized so visible proof does not look stale',
      ],
    },
    {
      id: 'section-devx',
      number: '04',
      title: 'Developer Experience & Docs',
      subtitle: 'Documentation quality, SDK breadth, and integration readiness',
      findings: [
        `Developer experience is a top-tier strength. The docs are clear, workflow-oriented, and practical. SDK and framework coverage is broad, and quickstart friction appears low.`,
        `Integration breadth across agent and orchestration ecosystems is substantial, and the homepage code examples show realistic usage rather than toy snippets.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Documentation architecture is coherent and execution quality is high',
          body: [
            `The docs map cleanly to evaluation and observability workflows, which helps teams move from exploration to implementation without hunting for conceptual gaps.`,
          ],
          sourceUrl: 'https://docs.confident-ai.com',
          sourceLabel: 'docs.confident-ai.com',
        },
        {
          kind: 'strength',
          title: 'Integration ecosystem is broader than most direct alternatives',
          body: [
            `Framework, SDK, and CI coverage reduce platform lock-in risk and improve adoption viability for mixed-stack teams.`,
          ],
        },
        {
          kind: 'opportunity',
          title: 'Interactive sandbox visibility can be stronger on the homepage',
          body: [
            `The product feels robust, but an immediate sandbox or runnable demo path would further reduce trial friction before signup.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across developer experience sub-dimensions:',
      breakdown: [
        { label: 'Docs quality', value: 92, tone: 'green' },
        { label: 'SDK breadth', value: 90, tone: 'green' },
        { label: 'Quickstart friction', value: 88, tone: 'green' },
        { label: 'Code samples', value: 85, tone: 'green' },
        { label: 'API reference', value: 86, tone: 'green' },
      ],
      recommendations: [
        'Add a public interactive demo path linked directly from the homepage',
        'Keep visible social counters and ecosystem metrics actively refreshed',
        'Promote MCP-native and agent-native workflows as top-level differentiators',
      ],
    },
    {
      id: 'section-conversion',
      number: '05',
      title: 'Conversion & Pricing Clarity',
      subtitle: 'Pricing transparency, CTA hierarchy, and upgrade path clarity',
      findings: [
        `Pricing transparency is good, and the free tier appears meaningful enough for real product evaluation. This is a strong base for self-serve conversion.`,
        `The main conversion gap is CTA hierarchy. Demo and free-trial actions compete too equally in contexts where most developer visitors should likely start with self-serve.`,
      ],
      evidence: [
        {
          kind: 'strength',
          title: 'Pricing tiers and overage model are clear and legible',
          body: [
            `The model communicates plan boundaries and usage costs with less ambiguity than many adjacent LLMOps tools.`,
          ],
          sourceUrl: 'https://www.confident-ai.com/pricing',
          sourceLabel: 'confident-ai.com/pricing',
        },
        {
          kind: 'strength',
          title: 'Free tier appears substantive rather than symbolic',
          body: [
            `A usable free plan lowers evaluation friction and supports broader developer-led product discovery.`,
          ],
        },
        {
          kind: 'gap',
          title: 'Primary CTA intent is diluted by equal-weight alternatives',
          body: [
            `When self-serve is viable, the free trial path should carry stronger visual priority than demo booking in most top-level homepage placements.`,
          ],
        },
      ],
      breakdownIntro: 'Score breakdown across conversion sub-dimensions:',
      breakdown: [
        { label: 'Pricing clarity', value: 86, tone: 'green' },
        { label: 'Free tier value', value: 88, tone: 'green' },
        { label: 'CTA hierarchy', value: 58, tone: 'amber' },
        { label: 'Signup friction', value: 80, tone: 'green' },
        { label: 'Upgrade path', value: 72, tone: 'amber' },
      ],
      recommendations: [
        'Make try free the dominant primary CTA and demote demo request where appropriate',
        'Explain the practical upgrade trigger between starter and premium tiers',
        'Add a sticky or mid-page CTA to catch intent before the bottom of the page',
      ],
    },
  ],
  footerNote:
    'Overall score: 78. Confident AI has strong technical depth, excellent docs, and a credible open-source moat via DeepEval. The biggest gains now are narrative compression, stronger testimonial depth, and clearer CTA hierarchy. Assessment is based on publicly visible homepage, docs, pricing, and repository signals as of April 2026.',
};

export const reviewDataBySlug: Record<string, ReviewExperienceProps> = {
  'docsalot-in-review': docsalotReview,
  'scalekit-in-review': scalekitReview,
  'confident-ai-in-review': confidentAiReview,
};

export function getOverallScore(review: ReviewExperienceProps): number {
  const total = review.scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / review.scores.length);
}

export function getOverallScoreForSlug(slug: string): number | null {
  const review = reviewDataBySlug[slug];
  return review ? getOverallScore(review) : null;
}
