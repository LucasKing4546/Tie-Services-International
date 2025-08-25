import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Solutions',
      links: ['UUV & ROV Handling', 'Oceanographic Research', 'Marine Survey', 'Bespoke Engineering']
    },
    {
      title: 'Products',
      links: ['Winches', 'A-Frames', 'Launch & Recovery Systems', 'CTD Handling']
    },
    {
      title: 'Quality',
      links: ['Certifications', 'Our Commitment', 'Testing Procedures', 'Compliance Standards']
    },
    {
      title: 'Support',
      links: ['Technical Support', 'Training Programs', 'Spare Parts', 'Warranty Information']
    }
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/logo-rtg-top.png" alt="Logo" className="max-h-30 max-w-60" />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Over 35 years of expertise in deck machinery and 20+ years serving 
                the global marine research community with bespoke solutions.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">UK & Romania Operations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">+44 (0) 123 456 7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">info@romicatiegroup.com</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-gray-300 hover:text-primary transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-12 bg-gray-700" />

          {/* CTA Section */}
          <div className="bg-primary/80 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Discuss Your Project?</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Our engineering team is ready to develop custom solutions for your specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
                Get Custom Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-secondary hover:bg-gray-100">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Romica Tie Group. All rights reserved. | Together We Can Achieve More
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Follow Us:</span>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <Globe className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="text-gray-400 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;