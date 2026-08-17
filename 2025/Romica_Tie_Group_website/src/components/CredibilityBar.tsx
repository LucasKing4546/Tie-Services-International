import React from 'react';
import { Shield } from 'lucide-react';

export default function CredibilityBar() {
  return (
    <div className="w-full bg-card py-12 border-t border-b border-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background text-primary text-sm font-semibold mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Certified by Industry Leaders
          </div>
          <h3 className="text-4xl font-bold text-accent-foreground">Trusted & Certified</h3>
        </div>

        {/* Logo Bar */}
        <div className="flex items-center justify-center space-x-16 md:space-x-20 lg:space-x-24">
          
          {/* DNV Logo */}
          <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
            <img
              src="/dnv_logo.png"
              alt="DNV Certification"
              className="h-12 md:h-16 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          </div>

          {/* Lloyd's Register Logo */}
          <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
            <img
              src="/lv_logo.png"
              alt="Lloyd's Register Certification"
              className="h-12 md:h-16 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          </div>

          {/* Bureau Veritas Logo */}
          <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
            <img
              src="/Bureau_Veritas_logo.png"
              alt="Bureau Veritas Certification"
              className="h-12 md:h-16 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          </div>

        </div>

        {/* Optional tagline */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Certified to the highest international standards for marine operations
          </p>
        </div>

      </div>
    </div>
  );
}