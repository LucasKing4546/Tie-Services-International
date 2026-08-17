import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Play, Pause } from 'lucide-react';

const InteractiveShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const showcaseItems = [
    {
      title: "Arctic Research",
      subtitle: "Extreme conditions mastered",
      description: "Operating in -40°C with 100% reliability",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      stats: "15 Arctic expeditions"
    },
    {
      title: "Deep Sea Mining",
      subtitle: "6000m depth capability", 
      description: "Precision handling at crushing depths",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
      stats: "Record 6,847m depth"
    },
    {
      title: "Scientific Discovery",
      subtitle: "Enabling breakthrough research",
      description: "Supporting Nobel Prize-winning research",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      stats: "200+ research papers"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="text-lg font-medium text-primary mb-4 tracking-wider uppercase">
            Where Innovation Meets Ocean
          </h2>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Proven in the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              world's harshest waters
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              onMouseEnter={() => setActiveVideo(index)}
              onMouseLeave={() => setActiveVideo(null)}
            >
              <div className="aspect-[4/5] relative">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                    <div className="text-sm font-medium opacity-80 mb-2">{item.stats}</div>
                    <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                    <p className="text-lg opacity-90 mb-4">{item.subtitle}</p>
                    <p className="text-sm opacity-75 mb-6 transform transition-all duration-500 opacity-0 group-hover:opacity-75">
                      {item.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-black rounded-full w-fit opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      Learn More
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Play button overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  activeVideo === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {activeVideo === index ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Every project pushes boundaries. Every solution sets new standards.
            <span className="block mt-2 font-semibold text-foreground">
              Ready to tackle your impossible project?
            </span>
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-bold rounded-full group">
            Start Your Project
            <ArrowUpRight className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;