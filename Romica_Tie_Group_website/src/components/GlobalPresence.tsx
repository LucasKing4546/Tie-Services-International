import React, { useState } from 'react';
// Import the new InteractiveWorldMap component
import InteractiveWorldMap from './InteractiveWorldMap';


// --- Icon components from lucide-react, mocked for a self-contained example ---
// In a real project, you would import these from 'lucide-react'
const Globe = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>;
const MapPin = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path><path d="M12 2a8.5 8.5 0 1 0 0 17l-1 1-1-1a8.5 8.5 0 0 0-14.7 6.3h0l.2.2.8.8.8.8h0a6.5 6.5 0 0 0 10 0l-1-1-1-1z"></path></svg>;
const Users = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const Clock = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

// --- Mocked Button component for a self-contained example ---
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-8 px-3 text-xs';
      break;
    case 'lg':
      sizeClasses = 'h-12 px-8';
      break;
    default:
      sizeClasses = 'h-9 px-4 py-2';
      break;
  }
  let variantClasses = '';
  switch (variant) {
    case 'ghost':
      variantClasses = 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground';
      break;
    default:
      variantClasses = 'bg-primary text-primary-foreground shadow hover:bg-primary/90';
      break;
  }
  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function GlobalPresence() {
  const regions = [
    {
      name: "South Korea",
      description: "Strategic partnership hub with major shipbuilders including Hyundai Heavy Industries",
      stats: "15+ active projects",
      active: true,
      icon: MapPin,
      gradient: "from-blue-500 to-blue-700",
      coordinates: [127.7669, 35.9078]
    },
    {
      name: "European Union",
      description: "Engineering excellence serving North Sea and Arctic operations",
      stats: "200+ installations",
      active: true,
      icon: Globe,
      gradient: "from-teal-500 to-teal-700",
      coordinates: [15.2551, 54.5260]
    },
    {
      name: "North America",
      description: "Advanced research vessel support across Atlantic and Pacific",
      stats: "50+ partnerships",
      active: true,
      icon: Users,
      gradient: "from-purple-500 to-purple-700",
      coordinates: [-95.7129, 37.0902]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white font-sans antialiased">
      <section className="py-16 bg-gradient-to-b from-gray-200/30 to-white relative overflow-hidden dark:from-gray-800/30 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-secondary text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Global Network
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Wherever your
              <br />
              <span className="text-transparent bg-clip-text bg-secondary/85">
                mission takes you</span>
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Strategic presence across three continents ensures rapid response and local expertise 
              for your critical marine operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
            
            {/* Interactive world map using the new component */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-3xl p-8 border border-blue-500/10 dark:border-blue-500/20">
                <div className="h-[500px] w-full rounded-2xl z-0 overflow-hidden">
                  <InteractiveWorldMap locations={regions} />
                </div>
              </div>
            </div>
            
            {/* Regional highlights */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-bold text-lg">24/7 Global Support</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Round-the-clock assistance wherever you operate</p>
                </div>
              </div>
              
              {regions.map((region, index) => {
                const IconComponent = region.icon;
                return (
                  <div 
                    key={region.name}
                    className="group relative bg-gradient-to-br from-gray-100 to-gray-200/20 rounded-2xl p-6 border border-gray-300 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg dark:from-gray-800 dark:to-gray-900/20 dark:border-gray-700 dark:hover:border-blue-500/50"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${region.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{region.name}</h4>
                          {region.active && (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-medium text-green-600">Active</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                          {region.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-blue-500">{region.stats}</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-xs text-blue-500 hover:bg-blue-500/10">
                              Learn More →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
