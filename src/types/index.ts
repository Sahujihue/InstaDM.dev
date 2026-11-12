export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  plan: 'free' | 'starter' | 'pro' | 'agency';
  billingCycle: 'monthly' | 'yearly';
  currency: 'INR' | 'USD';
  createdAt: string;
  connectedAccountsCount: number;
  monthlyDmsUsed: number;
  monthlyDmsLimit: number;
}

export interface InstagramAccount {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  followersCount: number;
  accountType: 'BUSINESS' | 'CREATOR';
  connectedAt: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING_REAUTH';
  metaPageId: string;
  webhookActive: boolean;
}

export interface InstagramPost {
  id: string;
  type: 'REEL' | 'CAROUSEL' | 'IMAGE' | 'STORY';
  thumbnail: string;
  caption: string;
  postedAt: string;
  likesCount: number;
  commentsCount: number;
  url: string;
}

export interface Automation {
  id: string;
  name: string;
  type: 'COMMENT_TO_DM' | 'STORY_REPLY' | 'DM_KEYWORD' | 'FOLLOW_FOR_LINK' | 'LIVE_COMMENT';
  targetScope?: 'SPECIFIC_POST' | 'ALL_POSTS' | 'NEXT_POST' | 'SPECIFIC_STORY' | 'ALL_STORIES';
  selectedPostId?: string;
  selectedPostThumbnail?: string;
  selectedPostCaption?: string;
  triggerKeywords: string[];
  matchType: 'EXACT' | 'CONTAINS' | 'ANY';
  replyMessage: string;
  buttonText?: string;
  buttonUrl?: string;
  requireFollow: boolean;
  captureLead: boolean;
  leadFields?: ('email' | 'phone' | 'name')[];
  publicCommentReplies?: string[];
  status: 'ACTIVE' | 'PAUSED' | 'DRAFT';
  totalTriggers: number;
  totalDelivered: number;
  linkClicks: number;
  leadsCollected: number;
  createdAt: string;
  instagramAccountId: string;
  postThumbnail?: string;
  postCaption?: string;
}

export interface ContactLead {
  id: string;
  instagramUsername: string;
  name?: string;
  email?: string;
  phone?: string;
  tags: string[];
  sourceAutomationId: string;
  sourceAutomationName: string;
  capturedAt: string;
  lastInteractionAt: string;
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'LEAD_QUALIFIED';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  button?: {
    text: string;
    url: string;
  };
  status?: 'SENT' | 'DELIVERED' | 'READ';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceINR: {
    monthly: number;
    yearly: number;
  };
  priceUSD: {
    monthly: number;
    yearly: number;
  };
  popular?: boolean;
  badge?: string;
  features: string[];
  limits: {
    accounts: number;
    monthlyDms: number;
    aiResponses: boolean;
    flowBuilder: boolean;
    teamMembers: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  businessType: string;
  avatar: string;
  rating: number;
  review: string;
  metricsResult: string;
  handle: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing' | 'compliance';
}

export interface WebhookLog {
  id: string;
  timestamp: string;
  eventType: string;
  senderId: string;
  senderUsername?: string;
  status: 'SUCCESS' | 'IGNORED' | 'ERROR';
  details: string;
  payload: Record<string, unknown>;
}

export interface AdminSettings {
  siteTitle: string;
  announcementText: string;
  announcementCta: string;
  announcementActive: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  supportEmail: string;
  openAiApiKeyConfigured: boolean;
  metaAppId: string;
  webhookVerifyToken: string;
}
