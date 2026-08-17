import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Anchor, Globe, Ship, Waves, Zap, Users, ArrowUpRight } from 'lucide-react';

const CoreMarketsSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const markets = [
    {
      icon: Ship,
      title: "Oceanographic Research",
      subtitle: "Deep-sea discovery awaits",
      description: "Engineering solutions that unlock the ocean's deepest secrets. Every mission matters.",
      stats: "200+ vessels equipped",
      color: "bg-primary"
    },
    {
      icon: Anchor,
      title: "Marine Survey",
      subtitle: "Precision meets purpose",
      description: "Where millimeter accuracy shapes tomorrow's understanding of our seafloor.",
      stats: "99.9% precision rate",
      color: "bg-secondary"
    },
    {
      icon: Waves,
      title: "Offshore Operations", 
      subtitle: "Conquering the impossible",
      description: "Built to withstand what nature throws at us. Tested where others fear to venture.",
      stats: "Category 5 tested",
      color: "bg-primary"
    },
    {
      icon: Globe,
      title: "Global Projects",
      subtitle: "Everywhere excellence",
      description: "From Arctic ice to tropical storms—our solutions adapt, perform, excel.",
      stats: "47 countries served",
      color: "bg-secondary"
    },
    {
      icon: Zap,
      title: "Custom Engineering",
      subtitle: "Impossible? Challenge accepted",
      description: "Your unique challenge becomes our next breakthrough. No two solutions alike.",
      stats: "100% custom builds",
      color: "bg-primary"
    },
    {
      icon: Users,
      title: "Training & Support",
      subtitle: "Knowledge that powers",
      description: "Expert hands-on training. 24/7 support. Because downtime isn't an option.",
      stats: "24/7 global support",
      color: "bg-secondary"
    }
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-lg font-medium text-primary mb-4 tracking-wider uppercase">
            Product & Solutions
          </h2>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Bring on the storms.
            <br />
            <span className="text-muted-foreground">Bring on the depths.</span>
            <br />
            Bring on the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              unsolvable projects.
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-500 ${
                activeCard === index ? 'scale-105 z-10' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br ${market.color} p-8 text-white transition-all duration-500 ${
                activeCard === index ? 'shadow-2xl shadow-primary/25' : 'hover:shadow-xl'
              }`}>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <market.icon className="w-12 h-12 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">{market.title}</h3>
                    <p className="text-lg opacity-90 mb-4">{market.subtitle}</p>
                    <p className="text-sm opacity-80 leading-relaxed">
                      {market.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="text-xs font-medium opacity-75">
                      {market.stats}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => { window.location.href = '/solutions'; }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-xl transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 blur-xl transform -translate-x-12 translate-y-12 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full group" onClick={() => { window.location.href = '/solutions'; }}>
            View All Solutions
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoreMarketsSection;
