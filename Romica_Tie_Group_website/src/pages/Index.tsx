import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoreMarketsSection from '@/components/CoreMarketsSection';
import FeaturedProject from '@/components/FeaturedProject';
import GlobalPresence from '@/components/GlobalPresence';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CoreMarketsSection />
        <FeaturedProject />
        <GlobalPresence />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
