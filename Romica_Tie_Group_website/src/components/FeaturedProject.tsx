import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Quote, Star, Calendar, MapPin, Users, Award } from 'lucide-react';

const FeaturedProject = () => {
  const [activeImage, setActiveImage] = useState(0);

  const projectImages = [
    {
      title: "GSI Research Vessel",
      description: "Advanced LARS system installation",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    },
    {
      title: "Deck Operations",
      description: "Precision winch system in action",
      url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop"
    },
    {
      title: "Engineering Excellence",
      description: "Custom machinery integration",
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Featured Success Story
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Powering breakthrough
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              research missions
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Interactive image gallery */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img 
                  src={projectImages[activeImage].url}
                  alt={projectImages[activeImage].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-bold mb-1">{projectImages[activeImage].title}</h4>
                  <p className="text-sm opacity-90">{projectImages[activeImage].description}</p>
                </div>
              </div>
            </div>
            
            {/* Image thumbnails */}
            <div className="flex space-x-4">
              {projectImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeImage === index 
                      ? 'ring-2 ring-primary scale-105' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project details */}
          <div className="space-y-8">
            
            {/* Project stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <div className="text-2xl font-black text-primary mb-1">12</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Vessels</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <div className="text-2xl font-black text-primary mb-1">24</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Months</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <div className="text-2xl font-black text-primary mb-1">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Success</div>
              </div>
            </div>

            {/* Project title and description */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>2023-2024</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>South Korea</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Hyundai Heavy Industries</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">GSI Research Vessel Program</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Engineering and manufacturing 12 comprehensive deck machinery packages for Hyundai Heavy Industries' 
                cutting-edge research vessels. Each vessel equipped with our advanced LARS systems, precision winches, 
                and custom handling equipment designed for the most demanding oceanographic missions.
              </p>
            </div>

            {/* Client testimonial */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
              <Quote className="w-8 h-8 text-primary/40 mb-4" />
              <blockquote className="text-lg italic mb-6 leading-relaxed">
                "Romica's engineering excellence and attention to detail exceeded our expectations. 
                Their deck machinery solutions have enabled our research vessels to operate in the most 
                challenging marine environments with unprecedented reliability."
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Dr. Kim Sang-Ho</div>
                  <div className="text-sm text-muted-foreground">Project Director, Hyundai Heavy Industries</div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl group" onClick={() => { window.location.href = '/projects/gsi-vessel-program'; }}>
                View Full Case Study
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 rounded-2xl" onClick={() => { window.location.href = '/projects'; }  }>
                More Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;