import React from 'react';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProof } from '@/components/home/SocialProof';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { FeatureShowcase } from '@/components/home/FeatureShowcase';
import { HowItWorks } from '@/components/home/HowItWorks';
import { InteractiveDemo } from '@/components/home/InteractiveDemo';
import { UseCases } from '@/components/home/UseCases';
import { IntegrationsSection } from '@/components/home/IntegrationsSection';
import { PricingSection } from '@/components/home/PricingSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';
import { Footer } from '@/components/common/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* A. Top Announcement Bar */}
      <AnnouncementBar />

      {/* B. Sticky Header & Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* C. Hero Section with Large Product Mockup */}
        <HeroSection />

        {/* D. Social Proof & Live Metrics */}
        <SocialProof />

        {/* E. 12 Premium Visual Feature Cards */}
        <FeaturesGrid />

        {/* F. Feature Showcase - 4 Large Image Banners */}
        <FeatureShowcase />

        {/* G. How It Works - 3-Step Process */}
        <HowItWorks />

        {/* H. Interactive Live Automation Demo Sandbox */}
        <InteractiveDemo />

        {/* I. Industry Use Cases */}
        <UseCases />

        {/* J. Supported Ecosystem Integrations */}
        <IntegrationsSection />

        {/* K. Dynamic Pricing (INR/USD, Monthly/Yearly 17% savings) */}
        <PricingSection />

        {/* L. Testimonials & Case Studies */}
        <TestimonialsSection />

        {/* M. Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* N. Final Call-to-Action Banner */}
        <FinalCta />
      </main>

      {/* O. Comprehensive Footer */}
      <Footer />
    </div>
  );
}
