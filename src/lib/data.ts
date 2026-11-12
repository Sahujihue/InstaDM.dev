import { 
  PricingPlan, 
  Testimonial, 
  FaqItem, 
  InstagramAccount, 
  Automation, 
  ContactLead, 
  AdminSettings, 
  InstagramPost,
  PaymentGatewayConfig,
  PaymentTransaction,
  CmsPage
} from '@/types';

export const INITIAL_PAYMENT_GATEWAYS: PaymentGatewayConfig[] = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'india',
    enabled: true,
    mode: 'live',
    currencies: ['INR'],
    publishableKey: 'rzp_live_instadm_9812401928',
    secretKey: 'rzp_sec_••••••••••••••••••••••••',
    merchantId: 'MID_RZP_982183',
    webhookSecret: 'whsec_rzp_prod_instadm_2026',
    supportedMethods: ['UPI (GPay, PhonePe, Paytm)', 'Cards (Visa, Mastercard, RuPay)', 'Netbanking (60+ Banks)', 'EMI & PayLater'],
    description: 'Premier Indian payment gateway with instant UPI QR & recurring subscription autopay.'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'global',
    enabled: true,
    mode: 'live',
    currencies: ['USD', 'EUR', 'INR'],
    publishableKey: 'pk_live_instadm_stripe_51Nu29841',
    secretKey: 'sk_live_••••••••••••••••••••••••',
    webhookSecret: 'whsec_stripe_prod_instadm_2026',
    supportedMethods: ['Credit & Debit Cards', 'Apple Pay', 'Google Pay', 'Link by Stripe', 'SEPA Direct Debit'],
    description: 'Gold standard global billing infrastructure supporting 135+ currencies and 1-tap checkout.'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'global',
    enabled: true,
    mode: 'live',
    currencies: ['USD', 'EUR'],
    publishableKey: 'client_id_paypal_instadm_prod',
    secretKey: 'secret_••••••••••••••••••••••••',
    webhookSecret: 'whsec_paypal_prod_instadm_2026',
    supportedMethods: ['PayPal Balance', 'PayPal Credit', 'Pay in 4', 'International Visa/Mastercard'],
    description: 'Trusted by 400M+ international consumers across North America, Europe, and Asia.'
  },
  {
    id: 'cashfree',
    name: 'Cashfree Payments',
    category: 'india',
    enabled: true,
    mode: 'live',
    currencies: ['INR'],
    publishableKey: 'cf_app_id_instadm_live_9812',
    secretKey: 'cf_sec_••••••••••••••••••••••••',
    merchantId: 'CF_MERCHANT_1092',
    webhookSecret: 'whsec_cashfree_prod_instadm_2026',
    supportedMethods: ['UPI Autopay', 'Instant UPI QR', 'Debit/Credit Cards', 'Netbanking'],
    description: 'Fast, high-uptime Indian payment gateway with native UPI subscription mandates.'
  },
  {
    id: 'payu',
    name: 'PayU India',
    category: 'india',
    enabled: true,
    mode: 'live',
    currencies: ['INR'],
    publishableKey: 'payu_key_instadm_live_8912',
    secretKey: 'payu_salt_••••••••••••••••••••',
    merchantId: 'PAYU_MID_4821',
    webhookSecret: 'whsec_payu_prod_instadm_2026',
    supportedMethods: ['UPI', 'Credit/Debit Cards', 'Netbanking', 'Wallets'],
    description: 'Enterprise payment aggregator in India powering millions of daily transactions.'
  },
  {
    id: 'crypto',
    name: 'Crypto & Web3 (USDT / BTC / ETH)',
    category: 'crypto',
    enabled: true,
    mode: 'live',
    currencies: ['USD', 'CRYPTO'],
    publishableKey: 'coinbase_commerce_api_key_instadm',
    secretKey: 'cc_sec_••••••••••••••••••••••••',
    webhookSecret: 'whsec_crypto_prod_instadm_2026',
    supportedMethods: ['USDT (TRC-20 & ERC-20)', 'USDC', 'Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)'],
    description: 'Direct zero-chargeback cryptocurrency payments via Coinbase Commerce & Web3 QR codes.'
  },
  {
    id: 'paddle',
    name: 'Paddle (Merchant of Record)',
    category: 'global',
    enabled: false,
    mode: 'sandbox',
    currencies: ['USD', 'EUR'],
    publishableKey: 'paddle_vendor_id_instadm',
    secretKey: 'paddle_api_key_••••••••••••••••',
    webhookSecret: 'whsec_paddle_sandbox_instadm',
    supportedMethods: ['Global Cards', 'PayPal', 'Apple Pay', 'Wire Transfer'],
    description: 'All-in-one Merchant of Record that handles international sales tax, VAT, and invoice compliance.'
  }
];

export const INITIAL_PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx_rzp_981240',
    gateway: 'razorpay',
    amount: 1499,
    currency: 'INR',
    status: 'COMPLETED',
    planId: 'pro',
    userEmail: 'priya@fitlifewellness.in',
    createdAt: '2026-11-12 11:24',
    paymentMethodDetails: 'UPI Autopay • priya@okhdfcbank'
  },
  {
    id: 'tx_str_892182',
    gateway: 'stripe',
    amount: 29.99,
    currency: 'USD',
    status: 'COMPLETED',
    planId: 'pro',
    userEmail: 'alex@creatorstudio.co',
    createdAt: '2026-11-12 09:40',
    paymentMethodDetails: 'Mastercard •••• 4242'
  },
  {
    id: 'tx_cry_781290',
    gateway: 'crypto',
    amount: 79.99,
    currency: 'USDT',
    status: 'COMPLETED',
    planId: 'agency',
    userEmail: 'elena@designlab.io',
    createdAt: '2026-11-11 18:15',
    paymentMethodDetails: 'USDT (TRC20) • 0x7a8b...4f21'
  },
  {
    id: 'tx_pp_671294',
    gateway: 'paypal',
    amount: 9.99,
    currency: 'USD',
    status: 'COMPLETED',
    planId: 'starter',
    userEmail: 'marcus@vancestreetwear.com',
    createdAt: '2026-11-11 14:02',
    paymentMethodDetails: 'PayPal Wallet • marcus@vancestreetwear.com'
  },
  {
    id: 'tx_cf_541920',
    gateway: 'cashfree',
    amount: 499,
    currency: 'INR',
    status: 'COMPLETED',
    planId: 'starter',
    userEmail: 'rohit@fitlife.in',
    createdAt: '2026-11-10 16:30',
    paymentMethodDetails: 'UPI QR • PhonePe'
  }
];

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
  siteTitle: 'InstaDM – Turn Every Instagram Interaction Into a Customer | instadm.dev',
  metaKeywords: 'instagram dm automation, instagram comment to dm, meta graph api automation, reel comment automation, ig dm bot, instagram lead generation, social media automation, automated direct messages',
  metaDescription: 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot with official Meta Graph API v21.0.',
  canonicalUrl: 'https://instadm.dev',
  ogTitle: 'InstaDM – Turn Every Instagram Interaction Into a Customer',
  ogDescription: 'Automate Instagram DMs, reply to Reel comments instantly, capture qualified email leads 24/7 with 100% Meta API compliance.',
  ogImageUrl: 'https://instadm.dev/og-cover.png',
  robotsIndex: true,
  googleVerificationTag: 'google-site-verification=instadm_meta_google_search_console_token_2026',
  announcementText: 'Automate your Instagram DMs and grow your business 24/7.',
  announcementCta: 'Explore Features',
  announcementActive: true,
  heroHeadline: 'Turn Every Instagram Interaction Into a Customer.',
  heroSubheadline: 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot.',
  supportEmail: 'support@instadm.dev',
  openAiApiKeyConfigured: true,
  metaAppId: 'app_meta_91823740192',
  webhookVerifyToken: 'instadm_meta_verify_token_prod_2026',
  currencyPolicy: 'AUTO_GEO',
  allowManualSwitcher: false,
  affiliateCommissionRate: 30,
  minimumPayoutAmount: 2000
};

export const INITIAL_CMS_PAGES: CmsPage[] = [
  {
    id: 'page-privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    category: 'legal',
    summary: 'How InstaDM collects, stores, and protects creator and lead data in compliance with Meta Graph API and GDPR.',
    metaTitle: 'Privacy Policy | InstaDM – Secure Meta Compliant Automation',
    metaDescription: 'Read the official InstaDM privacy policy detailing our data protection standards, Meta Graph API tokens security, and GDPR compliance.',
    metaKeywords: 'privacy policy, meta compliance, gdpr, instagram token privacy, data security',
    lastUpdated: 'November 12, 2026',
    published: true,
    content: `## 1. Information We Collect
InstaDM collects information you provide directly, such as your name, email address, password, and Meta OAuth credentials when connecting an Instagram Creator or Business account. We also process incoming comment webhooks and direct message metadata required to deliver automated interactions.

## 2. Meta Platform Policy & Data Protection
We strictly adhere to Meta Developer Policies. We never request, store, or process your Instagram account password. All interactions are dispatched via official Meta Graph API v21.0 access tokens. Access tokens are encrypted using AES-256 at rest and transmitted strictly via HTTPS with TLS 1.3 encryption.

## 3. How We Use Information
We use information to execute your automated DM funnels, capture and organize customer leads in your CRM dashboard, monitor delivery analytics, process subscription billing, and prevent platform abuse.

## 4. No Data Selling or Scraping
InstaDM does not sell, rent, or monetize your personal information or follower data. We strictly refuse unauthorized browser scraping.

## 5. Contacting Our Data Privacy Team
For privacy inquiries or data deletion requests, contact us at privacy@instadm.dev.`
  },
  {
    id: 'page-terms',
    slug: 'terms',
    title: 'Terms of Service',
    category: 'legal',
    summary: 'The rules, terms, and guidelines governing your usage of the InstaDM SaaS platform.',
    metaTitle: 'Terms of Service | InstaDM Platform Agreement',
    metaDescription: 'Review the official terms of service for InstaDM, covering acceptable use, Meta Platform policies, subscriptions, and intellectual property.',
    metaKeywords: 'terms of service, legal terms, acceptable use, meta messaging rules',
    lastUpdated: 'November 12, 2026',
    published: true,
    content: `## 1. Acceptance of Terms
By accessing or using InstaDM (https://instadm.dev), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.

## 2. Permitted & Acceptable Use
You agree to use InstaDM solely for legitimate marketing, customer support, and sales interactions. You strictly agree NOT to:
- Dispatch spam, unsolicited promotions, or deceptive phishing links.
- Send messages that violate Meta Community Standards or Instagram Guidelines.
- Attempt to circumvent Meta's rate limits or message delivery rules.

## 3. Account Security & Meta OAuth
You are responsible for maintaining the confidentiality of your credentials. You agree that InstaDM operates via Meta Graph API authorization, and your subscription is subject to your Instagram account maintaining valid Creator/Business status.

## 4. Subscriptions & Cancellations
InstaDM plans are billed in advance on a recurring monthly or annual basis. You may cancel your subscription at any time with a single click in your dashboard.

## 5. Limitation of Liability
InstaDM is not liable for indirect, incidental, or punitive damages resulting from your use of the service or actions taken by Meta Platforms, Inc.`
  },
  {
    id: 'page-about',
    slug: 'about',
    title: 'About InstaDM',
    category: 'company',
    summary: 'Our mission to empower creators, coaches, and agencies to turn every Instagram interaction into a lifelong customer.',
    metaTitle: 'About Us | InstaDM – The Modern Instagram DM Automation Platform',
    metaDescription: 'Learn about InstaDM, our creator-first mission, our architecture built on the official Meta Graph API, and our team.',
    metaKeywords: 'about instadm, creator automation, instagram marketing platform, about us',
    lastUpdated: 'November 12, 2026',
    published: true,
    content: `## Turning Interactions Into Relationships
Founded in 2026, InstaDM was built with a single mission: to eliminate the painful hours creators and businesses waste manually replying to "LINK", "INFO", or "HOW" on Instagram Reels and Stories.

Traditional "link in bio" links lose up to 80% of prospective buyers. InstaDM bridges the gap by delivering personalized resources, links, and checkout vouchers directly to followers' DMs within seconds of their comment.

## Built on Official Meta Infrastructure
Unlike legacy bots that relied on fragile browser extensions or risked account bans with password sharing, InstaDM is built strictly on the sanctioned **Meta Instagram Graph API v21.0**. We are 100% compliant, secure, and ban-safe.

## Our Core Values
1. **Creator-First Simplicity:** No code required. Set up your first funnel in under 60 seconds.
2. **Speed & Reliability:** Automated replies dispatched in under 3 seconds with 99.8% delivery uptime.
3. **Respect for Followers:** Clean, polite, and permission-based conversations that convert followers into customers.`
  },
  {
    id: 'page-refund',
    slug: 'refund',
    title: 'Refund & Cancellation Policy',
    category: 'legal',
    summary: 'Our fair money-back guarantee, single-click cancellation terms, and refund processing timelines.',
    metaTitle: 'Refund Policy | InstaDM Money-Back Guarantee',
    metaDescription: 'Read InstaDM refund terms, satisfaction guarantee, and simple single-click cancellation instructions.',
    metaKeywords: 'refund policy, cancellation terms, money-back guarantee, instadm billing',
    lastUpdated: 'November 12, 2026',
    published: true,
    content: `## 1. Customer Satisfaction Refund Guarantee
We want you to be completely satisfied with InstaDM. If our platform does not meet your automation expectations or you experience technical delivery issues, simply contact our team at support@instadm.dev or open a support ticket in your dashboard. We will process your refund request swiftly and fairly.

## 2. Single-Click Cancellation Anytime
You may cancel your monthly or yearly subscription at any time directly through **Dashboard ➔ Billing ➔ Cancel Subscription**. There are no cancellation penalties or hidden lock-ins. Following cancellation, your account retains full access until the end of your current paid billing period.

## 3. Currency & Processing Timelines
Refunds are issued directly to your original payment method (Credit Card, Debit Card, UPI, Net Banking, or PayPal) in your transacted currency (INR or USD). Processing typically reflects on your bank statement within 3 to 5 business days.`
  },
  {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact Us & Support',
    category: 'support',
    summary: 'Get in touch with the InstaDM technical engineering and customer support team.',
    metaTitle: 'Contact Us | InstaDM Customer Support & Partnerships',
    metaDescription: 'Need help with Instagram DM automation? Contact InstaDM customer support via email, live ticket, or partner inquiries.',
    metaKeywords: 'contact instadm, support email, help desk, creator support',
    lastUpdated: 'November 12, 2026',
    published: true,
    content: `## We're Here to Help You Scale
Whether you have a question about Meta OAuth connection, webhook delivery, agency client workspaces, or custom integrations, our technical team is available 24/7.

## Direct Contact Channels
- **General & Technical Support:** support@instadm.dev
- **Partnerships & Affiliates:** partners@instadm.dev
- **Privacy & Legal:** legal@instadm.dev
- **Response Time:** Typically within 2 hours during business hours (9:00 AM – 9:00 PM IST / EST).

## Self-Service Resources
Before reaching out, check our interactive **Help Center & FAQ** on the homepage or test your webhooks in real-time in your User Dashboard.`
  },
  {
    id: 'page-disclaimer',
    slug: 'disclaimer',
    title: 'Disclaimer & Meta API Compliance',
    category: 'legal',
    summary: 'Official non-affiliation disclaimer with Meta Platforms, Inc. and earnings expectations.',
    metaTitle: 'Disclaimer & Compliance Notice | InstaDM',
    metaDescription: 'Official disclaimer regarding Meta Platforms, Inc. trademarks, API independence, and business earnings representations.',
    metaKeywords: 'disclaimer, meta compliance, instagram trademark notice, earnings disclaimer',
    lastUpdated: 'November 12, 2026',
    published: true,
    content: `## 1. Non-Affiliation with Meta Platforms, Inc.
InstaDM is an independent software application developed by independent engineers. InstaDM is NOT affiliated with, sponsored by, endorsed by, or associated in any way with Meta Platforms, Inc., Instagram, or Facebook. All Instagram and Facebook trademarks, logos, and brand names are the intellectual property of Meta Platforms, Inc.

## 2. Meta Graph API Independence
InstaDM utilizes the publicly available, official Meta Instagram Graph API pursuant to Meta Developer Terms and Policies. Changes to Meta's third-party developer policies or API endpoints may affect platform features.

## 3. Earnings & Performance Disclaimer
Any case studies, testimonials, or revenue examples presented on this website are illustrative of possible outcomes and do not guarantee identical results. Your individual business performance depends on audience size, content quality, and product market fit.`
  }
];
