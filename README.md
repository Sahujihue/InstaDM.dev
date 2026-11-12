# InstaDM.dev – Instagram DM Automation SaaS Platform

**Official Domain:** [https://instadm.dev](https://instadm.dev)  
**Local Test Server:** [http://localhost:3005](http://localhost:3005)

InstaDM is a production-grade, Meta-compliant Instagram Direct Message automation and lead generation platform built for creators, influencers, coaches, e-commerce stores, and digital agencies.

---

## 🌟 Key Features & Capabilities

### 1. Brand Identity & Visual Design
- **Premium International SaaS Aesthetics:** Clean white/light background with subtle violet and indigo gradients (`#9333ea`, `#6366f1`, `#ec4899`).
- **Dark Navy Typography:** Using Plus Jakarta Sans for crisp readability.
- **Original Brand Assets:** Custom Instagram-inspired camera and paper-airplane vector brand mark with a `.dev` badge.
- **High-Fidelity Product Illustrations:** Multi-layer browser dashboard mockup displaying real-time Reel comment notifications, automated DM popups, lead capture tags, and workflow node paths.

### 2. Complete Marketing Landing Page
- **Announcement Bar:** *"Automate your Instagram DMs and grow your business 24/7."* with "Explore Features" link and dismissible state.
- **Sticky Navigation:** Logo, smooth anchor links (`#features`, `#how-it-works`, `#integrations`, `#pricing`, `#faq`), dynamic INR/USD currency switcher, and 1-click login/signup buttons.
- **Hero Section:**
  - Headline: *"Turn Every Instagram Interaction Into a Customer."*
  - Subheading: *"Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot."*
  - CTAs: *"Start Free Today"* & *"Explore Features"*.
  - Trust Badges: No coding required, Easy Instagram connection, Automated conversations 24/7.
- **Social Proof Section:** 4 live editable metrics (10M+ interactions, 99.8% delivery rate, 4.8x lead capture, < 2s response time) and verified industry tags.
- **12 Comprehensive Feature Cards:**
  1. Instagram Comment to DM
  2. Story Reply Automation
  3. DM Keyword Automation
  4. AI-Powered DM Assistant (OpenAI GPT-4o)
  5. Follow for Link (Gated lead magnets)
  6. Lead Generation (Email & phone capture)
  7. Automated Follow-ups (Within 24h Meta window)
  8. Visual Flow Builder (Drag-and-drop canvas)
  9. Contact Management (Built-in CRM with tags)
  10. Analytics Dashboard (Real-time conversion tracking)
  11. Instagram Live Automation (Stream comments to DM)
  12. Facebook Messenger Automation (Omnichannel support)
- **4 Large Alternating Feature Showcases:**
  - Banner 1: *"Every Comment Deserves a Conversation."* (Post + comment LINK + automated DM reply card)
  - Banner 2: *"Your AI Assistant Never Sleeps."* (Modern AI chat interface with GPT-4o)
  - Banner 3: *"Build Smart Automations Without Coding."* (Visual workflow builder with connected trigger, condition, and action nodes)
  - Banner 4: *"Turn Conversations Into Customers."* (Lead CRM dashboard with tags and export)
- **How It Works:** 3-step visual guide (Connect Instagram ➔ Create Automation ➔ Grow Your Business).
- **Interactive Automation Demo Sandbox:** Live interactive simulator where visitors can choose a scenario (Resource PDF, E-commerce VIP Code, Coach Strategy Call), type a comment (or click preset "LINK"), trigger the Meta webhook simulator, and see the interactive smartphone Instagram DM screen receive the message with clickable buttons and lead capture!
- **7 Industry Use Cases:** Tailored workflows for Content Creators, Influencers, E-Commerce Stores, Digital Product Sellers, Coaches & Consultants, Marketing Agencies, and Online Businesses.
- **Integrations Section:** Filterable showcase for Instagram Graph API, Facebook Messenger, Google Sheets, Zapier, Make, Webhooks, OpenAI GPT-4o, and upcoming Shopify/Klaviyo integrations.
- **Dynamic Pricing Section:**
  - Starter: ₹499/mo / $9.99/mo
  - Pro (Most Popular): ₹1,499/mo / $29.99/mo
  - Agency: ₹3,999/mo / $79.99/mo
  - Monthly / Yearly toggle with ~17% instant annual savings calculation.
  - Currency toggle: INR (₹) / USD ($) with automatic country detection and manual switch.
  - Direct checkout routing.
- **Testimonials Section:** Authentic creator case studies with ratings, avatars, and verified handles.
- **FAQ Section:** Expandable accordion covering all 9 required compliance and technical questions.
- **Final CTA Banner:** High-conversion gradient banner with background dashboard illustration.
- **Comprehensive SaaS Footer:** Links, legal pages, compliance disclaimers, and social links.

---

## 🔐 Authentication System

- **User Registration:** `/signup` with pre-activated instant trial.
- **Sign In:** `/login` with 1-click test credentials:
  - **Demo User:** `demo@instadm.dev` / `password123`
  - **Demo Admin:** `admin@instadm.dev` / `admin123`
- **Password Recovery:** `/forgot-password` with email confirmation simulation.
- **Session Management:** Stored securely in `AuthContext` with `localStorage` persistence.

---

## 📊 User Dashboard (`/dashboard`)

- **Overview (`/dashboard`):** Real-time counters for connected accounts, total automated DMs (28,490), active automations (4), leads captured (3,846), live activity stream, and "Quick Create Automation" modal with confetti feedback.
- **Instagram Accounts (`/dashboard/accounts`):** Meta Business OAuth connection dialog, follower counts, token health check, and Graph API permission status.
- **Automations Manager (`/dashboard/automations`):** Filter by Comment-to-DM, Story Reply, and DM Keywords, pause/activate toggles, and performance statistics.
- **Visual Flow Builder (`/dashboard/flow-builder`):** Visual node canvas (Trigger ➔ Condition ➔ Delay ➔ Action ➔ Lead Capture) with live parameter inspector and built-in execution simulator.
- **Contacts & Leads CRM (`/dashboard/contacts`):** Searchable table with tags (`#HighIntent`, `#VIPVoucher`, `#ReelComment`), email & phone validation, and **instant CSV export button**!
- **DM Live Inbox (`/dashboard/inbox`):** Two-pane Instagram direct message viewer with human takeover toggle, automated message badges, and manual message sender.
- **AI Assistant (`/dashboard/ai-assistant`):** Configure OpenAI GPT-4o / GPT-4o Mini / Claude models, custom system persona instructions, knowledge base FAQ grounding, and confidence thresholds.
- **Analytics (`/dashboard/analytics`):** Real-time telemetry, 24-hour hourly traffic bar charts, delivery rates, and top-performing Reel rankings.
- **Integrations (`/dashboard/integrations`):** Configure OpenAI API keys, Google Sheets sync target URLs, and HMAC-signed outbound webhooks.
- **Billing (`/dashboard/billing`):** Active plan overview, usage progress bars, plan upgrade/downgrade switcher, and tax-compliant invoice receipt downloads.
- **Settings (`/dashboard/settings`):** Account profile editor and official Meta Webhook verification credentials (`hub.verify_token`).

---

## 🛡️ Admin Panel (`/admin`)

- **Admin Overview (`/admin`):** Financial summary with MRR ($48,250), ARR ($579,000), total users (4,921), and active paid subscriptions (3,810).
- **Pricing & Plans Manager (`/admin/pricing`):** Edit monthly & yearly prices in INR and USD, usage limits, and annual discount percentages live without modifying source code.
- **User Management (`/admin/users`):** Search registered creators, view connected accounts, change subscription tiers, and inspect usage limits.
- **Testimonial Manager (`/admin/testimonials`):** Edit customer reviews, handles, and conversion metrics shown on the homepage.
- **FAQ Manager (`/admin/faqs`):** Update or add FAQ answers live.
- **System Logs & Webhooks (`/admin/logs`):** Live audit log of incoming Meta Instagram Graph API webhook events, latency in ms, status codes, and JSON payload inspector with an interactive "Send Test Webhook" trigger.
- **SEO & Site Branding (`/admin/settings`):** Configure top announcement bar text, homepage meta titles, hero headlines, and support contact emails.

---

## ⚡ Meta / Instagram Graph API Integration

- **Verification Endpoint:** `GET /api/webhooks/instagram`
  - Validates `hub.mode === 'subscribe'` and `hub.verify_token === 'instadm_meta_verify_token_prod_2026'`.
  - Returns the raw `hub.challenge` string with status `200 OK`.
- **Event Processor:** `POST /api/webhooks/instagram`
  - Receives `comments.create`, `messaging.deliveries`, and `story_mentions`.
  - Extracts keyword triggers (e.g. `LINK`, `VIP`, `COACH`).
  - Dispatches automated direct messages and button links within <2 seconds.
- **Compliance Rules:**
  - 100% compliant with Meta Instagram Messaging policies.
  - Respects the 24-hour standard messaging window.
  - Zero password storage, zero scraping, zero unauthorized bot activity.

---

## 🚀 Running the Project

```bash
# Navigate to the project directory
cd "C:\Users\Yusuf Sahu\.gemini\antigravity\scratch\instadm"

# Development server
npm run dev

# Production build & start
npm run build
npm run start -- -p 3005
```

Navigate to:
- **Homepage:** [http://localhost:3005](http://localhost:3005)
- **User Dashboard:** [http://localhost:3005/dashboard](http://localhost:3005/dashboard)
- **Admin Panel:** [http://localhost:3005/admin](http://localhost:3005/admin)
- **Webhook Test:** [http://localhost:3005/api/webhooks/instagram?hub.mode=subscribe&hub.challenge=test_challenge&hub.verify_token=instadm_meta_verify_token_prod_2026](http://localhost:3005/api/webhooks/instagram?hub.mode=subscribe&hub.challenge=test_challenge&hub.verify_token=instadm_meta_verify_token_prod_2026)
