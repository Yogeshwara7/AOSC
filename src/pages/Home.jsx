import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import CommunityHighlight from '@/components/home/CommunityHighlight';
import CommunitiesSection from '@/components/home/CommunitiesSection';
import TeamPreview from '@/components/home/TeamPreview';

export default function Home() {
  return (
    <div className="min-h-screen -mt-16">
      <HeroSection />
      <AboutSection />
      <CommunityHighlight />
      <CommunitiesSection />
      <TeamPreview />
    </div>
  );
}