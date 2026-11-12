import { PricingPlan, Testimonial, FaqItem, InstagramAccount, Automation, ContactLead, AdminSettings, InstagramPost } from '@/types';

export const INITIAL_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post_104',
    type: 'REEL',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    caption: 'Drop "LINK" below to get our complete 2026 Instagram Growth Playbook (45 Pages + 12 Reel templates) sent straight to your DMs! 🚀',
    postedAt: '2 days ago',
    likesCount: 1420,
    commentsCount: 684,
    url: 'https://instagram.com/reel/C89xYz124'
  },
  {
    id: 'post_103',
    type: 'CAROUSEL',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    caption: '7 DM automation funnels that converted $140,000+ in course sales this month. Comment "FUNNEL" for the full breakdown slide deck. 📊',
    postedAt: '4 days ago',
    likesCount: 2890,
    commentsCount: 940,
    url: 'https://instagram.com/p/C85aBc392'
  },
  {
    id: 'post_102',
    type: 'REEL',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80',
    caption: 'Flash Sale: 30% Off Everything This Weekend! Comment "VIP" below to receive your private checkout coupon code right now in your DMs. 🎉',
    postedAt: '1 week ago',
    likesCount: 4210,
    commentsCount: 1840,
    url: 'https://instagram.com/reel/C82kLm401'
  },
  {
    id: 'post_101',
    type: 'IMAGE',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80',
    caption: 'Accepting 5 high-ticket coaching clients for our Q1 Growth Mastermind. Comment "COACH" to view the curriculum and book your call.',
    postedAt: '2 weeks ago',
    likesCount: 1120,
    commentsCount: 420,
    url: 'https://instagram.com/p/C79xPq112'
  }
];

export const INITIAL_INSTAGRAM_STORIES: InstagramPost[] = [
  {
    id: 'story_active_1',
    type: 'STORY',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80',
    caption: 'Behind the scenes: Recording tomorrow’s masterclass! Reply "JOIN" to get your guest pass.',
    postedAt: '3 hours ago (Expires in 21h)',
    likesCount: 340,
    commentsCount: 182,
    url: 'https://instagram.com/stories/themoderncreator'
  },
  {
    id: 'story_active_2',
    type: 'STORY',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=300&q=80',
    caption: 'Ask me anything about scaling DM lead gen! Drop a reply with your question below.',
    postedAt: '7 hours ago (Expires in 17h)',
    likesCount: 215,
    commentsCount: 95,
    url: 'https://instagram.com/stories/themoderncreator'
  }
];

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for emerging creators and personal brands getting started with DM automation.',
    priceINR: {
      monthly: 499,
      yearly: 414, // ~17% savings: 499 * 12 * 0.83 / 12 = ~414/mo billed annually (4,968/yr)
    },
    priceUSD: {
      monthly: 9.99,
      yearly: 8.29, // ~17% savings: 9.99 * 0.83 = $8.29/mo billed annually ($99.48/yr)
    },
    popular: false,
    badge: 'Creator Essential',
    features: [
      '1 Instagram account connection',
      'Comment-to-DM automation',
      'Basic keyword triggers',
      'Basic automation management',
      'Basic analytics dashboard',
      '5,000 automated DMs / month',
      'Official Meta Graph API safe',
      'Email support'
    ],
    limits: {
      accounts: 1,
      monthlyDms: 5000,
      aiResponses: false,
      flowBuilder: false,
      teamMembers: 1
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Designed for serious creators, digital product sellers, coaches, and growing businesses.',
    priceINR: {
      monthly: 1499,
      yearly: 1244, // ~17% savings
    },
    priceUSD: {
      monthly: 29.99,
      yearly: 24.89, // ~17% savings
    },
    popular: true,
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'Advanced automation workflows',
      'Story reply & mention automation',
      'Lead capture (email & phone collection)',
      'Contact management & CRM tags',
      'AI-powered DM Assistant (GPT-4o)',
      'Follow-for-link verification gate',
      'Automated follow-up messages',
      '25,000 automated DMs / month',
      'Advanced analytics & conversion tracking',
      'Google Sheets & Zapier sync',
      'Priority live chat support'
    ],
    limits: {
      accounts: 3,
      monthlyDms: 25000,
      aiResponses: true,
      flowBuilder: true,
      teamMembers: 3
    }
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'For marketing agencies, high-volume e-commerce brands, and multi-brand managers.',
    priceINR: {
      monthly: 3999,
      yearly: 3319, // ~17% savings
    },
    priceUSD: {
      monthly: 79.99,
      yearly: 66.39, // ~17% savings
    },
    popular: false,
    badge: 'Maximum Scale',
    features: [
      'Everything in Pro',
      'Multiple account management (10+)',
      'Client dedicated workspaces',
      'Visual Drag-and-Drop Flow Builder',
      'Unlimited automated DMs & triggers',
      'Team access with role permissions',
      'Agency client reporting dashboard',
      'Custom webhook triggers & API access',
      'Dedicated account manager & onboarding',
      'SLA guarantee & 24/7 priority support'
    ],
    limits: {
      accounts: 10,
      monthlyDms: 100000,
      aiResponses: true,
      flowBuilder: true,
      teamMembers: 10
    }
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is InstaDM?',
    answer: 'InstaDM is a premium, Meta-compliant Instagram Direct Message automation platform. It turns your Instagram post comments, Reels engagement, and story replies into interactive automated conversations, delivering download links, capturing email leads, and boosting sales 24/7.'
  },
  {
    id: 'faq-2',
    category: 'technical',
    question: 'How does Instagram DM automation work?',
    answer: 'When a user leaves a comment (e.g., typing the keyword "LINK") or replies to your Story, Meta sends a secure real-time webhook to InstaDM. Our platform instantly verifies the trigger and sends a customized, personalized Direct Message to that user within seconds, along with button links and interactive lead forms.'
  },
  {
    id: 'faq-3',
    category: 'general',
    question: 'Do I need coding skills?',
    answer: 'No coding is required at all! InstaDM provides an intuitive no-code interface, pre-built high-converting templates, and a visual workflow builder. You can launch your first comment-to-DM campaign in under 2 minutes.'
  },
  {
    id: 'faq-4',
    category: 'compliance',
    question: 'Is Instagram connection secure?',
    answer: 'Yes, 100%. InstaDM strictly uses Meta’s official Instagram Graph API and Official Messaging API. We NEVER ask for your Instagram password, and we never use fragile screen scrapers or unauthorized bots. Your account remains completely safe and compliant with Instagram Terms of Service.'
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'Can I automate comments and stories?',
    answer: 'Yes! You can automatically reply to comments on posts, carousels, and Reels with a public comment reply and an instant private DM. You can also automate responses to Story replies and Story mentions.'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'Can I collect customer leads?',
    answer: 'Absolutely. InstaDM has built-in conversational lead capture. When a follower asks for your free guide or promo code, the automation asks for their email address and phone number directly inside Instagram DMs, automatically validating the format and syncing leads to Google Sheets, Zapier, or your CRM.'
  },
  {
    id: 'faq-7',
    category: 'technical',
    question: 'Does InstaDM support AI replies?',
    answer: 'Yes! InstaDM includes an AI-Powered DM Assistant powered by OpenAI. You can train the AI on your brand’s FAQs, product catalogs, pricing, and links, allowing it to intelligently answer customer queries and guide followers toward conversion in a natural, friendly tone.'
  },
  {
    id: 'faq-8',
    category: 'billing',
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time directly from your billing dashboard with a single click. There are no contracts, cancellation fees, or lock-ins. You retain full access to your plan until the end of your billing cycle.'
  },
  {
    id: 'faq-9',
    category: 'compliance',
    question: 'Which Instagram accounts are supported?',
    answer: 'In accordance with Meta’s official API guidelines, InstaDM supports any Instagram Business Account or Creator Account that is linked to a Facebook Page. If your account is currently a personal profile, you can switch to a free Creator or Business account in 10 seconds inside the Instagram app.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    role: 'Digital Course Creator',
    businessType: 'Education & Coaching',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'InstaDM completely transformed my launch week. Followers simply commented "ENROLL" on my Reels and received the course preview link within 3 seconds. Our conversion rate increased by 420% compared to traditional "link in bio" methods!',
    metricsResult: '+420% Launch Conversions',
    handle: '@elena_designlab'
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    businessType: 'E-commerce Apparel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'We set up Comment-to-DM for our flash sale with the keyword "STYLE". Within 48 hours, InstaDM automatically dispatched over 12,000 personalized discount codes, generating $38,000 in tracked revenue.',
    metricsResult: '$38K Revenue in 48h',
    handle: '@vancestreetwear'
  },
  {
    id: 'test-3',
    name: 'Priya Sharma',
    role: 'Fitness Coach & Nutritionist',
    businessType: 'Health & Wellness',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Before InstaDM, I spent 3 to 4 hours every evening manually sending my free meal plan PDF to people who commented on my Reels. Now it happens on pure autopilot, and I have collected over 4,500 qualified email leads in one month.',
    metricsResult: '4,500+ Email Leads Collected',
    handle: '@priyasharmafitness'
  },
  {
    id: 'test-4',
    name: 'Liam Gallagher',
    role: 'Managing Director',
    businessType: 'Social Growth Agency',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Managing 18 client Instagram accounts used to be a nightmare of disconnected spreadsheets. The Agency plan gave our team separate client workspaces and automated reporting that blows our clients away.',
    metricsResult: '18 Client Workspaces Scaled',
    handle: '@velocitygrowth_agency'
  }
];

export const INITIAL_ACCOUNTS: InstagramAccount[] = [
  {
    id: 'ig-acc-1',
    username: 'themoderncreator',
    name: 'The Modern Creator',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    followersCount: 84200,
    accountType: 'CREATOR',
    connectedAt: '2026-09-15',
    status: 'ACTIVE',
    metaPageId: 'page_982348271',
    webhookActive: true
  },
  {
    id: 'ig-acc-2',
    username: 'zenith_supplements',
    name: 'Zenith Nutrition & Wellness',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    followersCount: 142500,
    accountType: 'BUSINESS',
    connectedAt: '2026-10-02',
    status: 'ACTIVE',
    metaPageId: 'page_481928374',
    webhookActive: true
  }
];

export const INITIAL_AUTOMATIONS: Automation[] = [
  {
    id: 'auto-1',
    name: 'Reel Comment to Free PDF Guide',
    type: 'COMMENT_TO_DM',
    triggerKeywords: ['GUIDE', 'PDF', 'FREE'],
    matchType: 'CONTAINS',
    replyMessage: 'Hey there! 👋 Thanks for commenting. Here is the direct download link to our 2026 Instagram Growth Playbook:',
    buttonText: 'Download Free PDF',
    buttonUrl: 'https://instadm.dev/resources/growth-playbook.pdf',
    requireFollow: true,
    captureLead: true,
    leadFields: ['email'],
    status: 'ACTIVE',
    totalTriggers: 4210,
    totalDelivered: 4180,
    linkClicks: 3290,
    leadsCollected: 2840,
    createdAt: '2026-10-12',
    instagramAccountId: 'ig-acc-1',
    postCaption: 'Drop "GUIDE" below and I will send you my complete 45-page blueprint!'
  },
  {
    id: 'auto-2',
    name: 'Black Friday 30% VIP Voucher',
    type: 'COMMENT_TO_DM',
    triggerKeywords: ['VIP', 'DISCOUNT', 'DEAL'],
    matchType: 'CONTAINS',
    replyMessage: 'Exclusive VIP Offer unlocked! 🎉 Use coupon code VIP30 at checkout to get 30% off your entire order:',
    buttonText: 'Shop VIP 30% Off',
    buttonUrl: 'https://instadm.dev/store?discount=VIP30',
    requireFollow: false,
    captureLead: true,
    leadFields: ['email', 'phone'],
    status: 'ACTIVE',
    totalTriggers: 8940,
    totalDelivered: 8920,
    linkClicks: 6410,
    leadsCollected: 4120,
    createdAt: '2026-10-25',
    instagramAccountId: 'ig-acc-2',
    postCaption: 'Comment "VIP" to claim our biggest discount of the season!'
  },
  {
    id: 'auto-3',
    name: 'Story Mention Thank You & Coupon',
    type: 'STORY_REPLY',
    triggerKeywords: ['STORY_MENTION'],
    matchType: 'ANY',
    replyMessage: 'Thank you so much for tagging us in your Story! 💖 As a token of our appreciation, here is a special $15 gift card for your next purchase:',
    buttonText: 'Claim $15 Gift Card',
    buttonUrl: 'https://instadm.dev/rewards/story-perk',
    requireFollow: false,
    captureLead: false,
    status: 'ACTIVE',
    totalTriggers: 1250,
    totalDelivered: 1245,
    linkClicks: 980,
    leadsCollected: 310,
    createdAt: '2026-11-01',
    instagramAccountId: 'ig-acc-2'
  },
  {
    id: 'auto-4',
    name: 'Keyword "COACH" - Consultation Booking',
    type: 'DM_KEYWORD',
    triggerKeywords: ['COACH', 'CALL', 'APPLY'],
    matchType: 'EXACT',
    replyMessage: 'Hey! Ready to scale your brand? Let’s hop on a free 15-minute strategy call. Grab your slot on our calendar below:',
    buttonText: 'Book Free Strategy Call',
    buttonUrl: 'https://instadm.dev/calendar/apply',
    requireFollow: true,
    captureLead: true,
    leadFields: ['name', 'email', 'phone'],
    status: 'ACTIVE',
    totalTriggers: 640,
    totalDelivered: 638,
    linkClicks: 490,
    leadsCollected: 380,
    createdAt: '2026-11-05',
    instagramAccountId: 'ig-acc-1'
  }
];

export const INITIAL_LEADS: ContactLead[] = [
  {
    id: 'lead-1',
    instagramUsername: 'sarah_creative',
    name: 'Sarah Jenkins',
    email: 'sarah.j@creativestudio.io',
    phone: '+1 415 555 2671',
    tags: ['Reel Comment', 'Growth PDF', 'High Intent'],
    sourceAutomationId: 'auto-1',
    sourceAutomationName: 'Reel Comment to Free PDF Guide',
    capturedAt: '2026-11-11 14:22',
    lastInteractionAt: '2026-11-11 14:23',
    status: 'LEAD_QUALIFIED'
  },
  {
    id: 'lead-2',
    instagramUsername: 'alex_ecommerce',
    name: 'Alexandre Mercier',
    email: 'alex@branddirect.co',
    phone: '+33 6 12 34 56 78',
    tags: ['VIP Voucher', 'E-commerce', 'Buyer'],
    sourceAutomationId: 'auto-2',
    sourceAutomationName: 'Black Friday 30% VIP Voucher',
    capturedAt: '2026-11-11 16:45',
    lastInteractionAt: '2026-11-11 16:50',
    status: 'LEAD_QUALIFIED'
  },
  {
    id: 'lead-3',
    instagramUsername: 'rohit_fitlife',
    name: 'Rohit Verma',
    email: 'rohit.v@fitlife.in',
    phone: '+91 98765 43210',
    tags: ['Consultation', 'Coach Keyword', 'Warm Lead'],
    sourceAutomationId: 'auto-4',
    sourceAutomationName: 'Keyword "COACH" - Consultation Booking',
    capturedAt: '2026-11-12 09:15',
    lastInteractionAt: '2026-11-12 09:20',
    status: 'LEAD_QUALIFIED'
  },
  {
    id: 'lead-4',
    instagramUsername: 'claire_travels',
    name: 'Claire Dupont',
    email: 'claire@travelnomad.org',
    tags: ['Story Mention', 'Community'],
    sourceAutomationId: 'auto-3',
    sourceAutomationName: 'Story Mention Thank You & Coupon',
    capturedAt: '2026-11-12 11:04',
    lastInteractionAt: '2026-11-12 11:05',
    status: 'SUBSCRIBED'
  }
];

export const INITIAL_ADMIN_SETTINGS: AdminSettings = {
  siteTitle: 'InstaDM – Turn Every Instagram Interaction Into a Customer',
  announcementText: 'Automate your Instagram DMs and grow your business 24/7.',
  announcementCta: 'Explore Features',
  announcementActive: true,
  heroHeadline: 'Turn Every Instagram Interaction Into a Customer.',
  heroSubheadline: 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot.',
  supportEmail: 'support@instadm.dev',
  openAiApiKeyConfigured: true,
  metaAppId: 'app_meta_91823740192',
  webhookVerifyToken: 'instadm_meta_verify_token_prod_2026'
};
