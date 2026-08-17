import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Award } from 'lucide-react';

const FeaturedProjectSection = () => {
  return (
    <section className="py-20 ocean-gradient-reverse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
            Featured Success Story
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            GSI Vessel Program with Hyundai Heavy Industries
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A testament to our global capabilities and commitment to delivering complex, 
            high-quality solutions for major international partnerships
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">South Korea</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">On-Time Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Award className="w-5 h-5" />
                    <span className="font-semibold">Certified Quality</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Complete Deck Machinery Solution
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our collaboration with Hyundai Heavy Industries showcased our ability to deliver 
                  sophisticated vessel systems that meet the highest international standards. This project 
                  demonstrated our expertise in complex system integration and our commitment to quality.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Advanced LARS (Launch and Recovery Systems)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Specialized umbilical handling winches</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Full system certification and testing</span>
                  </div>
                </div>

                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => { window.location.href = '/projects/gsi-vessel-program'; }}>
                  View Full Case Study
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-xl">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "Romica Tie Group delivered exceptional quality and expertise throughout our collaboration. 
                  Their technical competence and commitment to deadlines made them an invaluable partner."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    H
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Project Manager</div>
                    <div className="text-gray-600">Hyundai Heavy Industries</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;
