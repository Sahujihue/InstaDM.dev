-- ============================================================
-- InstaDM.dev – Complete Production SaaS Database Schema
-- Run this script inside the Supabase SQL Editor (1-Click Run)
-- Project: https://ostskxaxeccubwnduyss.supabase.co
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'CREATOR', -- 'CREATOR' | 'ADMIN' | 'AGENCY'
    plan VARCHAR(50) DEFAULT 'free',    -- 'free' | 'starter' | 'pro' | 'agency'
    billing_cycle VARCHAR(20) DEFAULT 'monthly', -- 'monthly' | 'yearly'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INSTAGRAM CONNECTED ACCOUNTS
CREATE TABLE IF NOT EXISTS public.instagram_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    instagram_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    profile_picture_url TEXT,
    followers_count INTEGER DEFAULT 0,
    media_count INTEGER DEFAULT 0,
    access_token TEXT NOT NULL,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AUTOMATION FUNNELS (Comment-to-DM, Story Reply, Keyword)
CREATE TABLE IF NOT EXISTS public.automations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    trigger_type VARCHAR(50) NOT NULL, -- 'COMMENT_TO_DM' | 'STORY_REPLY' | 'KEYWORD' | 'FOLLOW_FOR_LINK'
    keyword VARCHAR(255) NOT NULL,
    match_type VARCHAR(50) DEFAULT 'EXACT', -- 'EXACT' | 'CONTAINS'
    reply_message TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    target_post_id VARCHAR(255),
    target_post_thumbnail TEXT,
    target_post_title VARCHAR(255),
    total_triggered INTEGER DEFAULT 0,
    dms_sent INTEGER DEFAULT 0,
    leads_captured INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CONTACTS & CAPTURED LEADS
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    instagram_handle VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'LEAD_QUALIFIED', -- 'SUBSCRIBED' | 'LEAD_QUALIFIED' | 'UNSUBSCRIBED'
    tags TEXT[] DEFAULT ARRAY['Instagram Lead'],
    source_automation_id UUID REFERENCES public.automations(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. REFERRAL & AFFILIATE COMMISSIONS
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_code VARCHAR(100) NOT NULL,
    referred_user_email VARCHAR(255) NOT NULL,
    referred_user_name VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'free',
    status VARCHAR(50) DEFAULT 'TRIAL', -- 'TRIAL' | 'PAID' | 'PENDING'
    commission_amount NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. GLOBAL PLATFORM SETTINGS (Key-Value Store)
CREATE TABLE IF NOT EXISTS public.platform_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo and authenticated users
CREATE POLICY "Public Users Access" ON public.users FOR ALL USING (true);
CREATE POLICY "Public Automations Access" ON public.automations FOR ALL USING (true);
CREATE POLICY "Public Contacts Access" ON public.contacts FOR ALL USING (true);
CREATE POLICY "Public Referrals Access" ON public.referrals FOR ALL USING (true);
CREATE POLICY "Public Settings Access" ON public.platform_settings FOR ALL USING (true);
