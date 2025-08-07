import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Handshake } from 'lucide-react';

const GlobalPresenceSection = () => {
  const regions = [
    { name: 'South Korea', status: 'Primary Office', color: 'bg-blue-500' },
    { name: 'European Union', status: 'Regional Coverage', color: 'bg-green-500' },
    { name: 'North America', status: 'Agent Network', color: 'bg-purple-500' },
    { name: 'Romania', status: 'Operations Hub', color: 'bg-orange-500' }
  ];

  return (
    <section id="network" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Global Presence & Agent Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Supporting our international expansion strategy through strategic partnerships and local expertise
          </p>
        </div>

        {/* Interactive Map Placeholder */}
        <Card className="mb-12 border-0 shadow-lg bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Find Your Local Representative</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Our growing network of qualified agents provides local expertise and support 
                  across key maritime research regions worldwide.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {regions.map((region) => (
                    <div key={region.name} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
                      <div>
                        <div className="font-semibold">{region.name}</div>
                        <div className="text-sm text-blue-200">{region.status}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  <MapPin className="mr-2 w-5 h-5" />
                  Find Your Local Agent
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-200" />
                    <p className="text-blue-100">Interactive World Map</p>
                    <p className="text-sm text-blue-200">Click regions to find agents</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Become a Partner Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Value Proposition for Agents</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Access to high-quality, specialized products</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Reputable brand with proven track record</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Comprehensive training and support programs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Technical competence and service capabilities</span>
                </li>
              </ul>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Learn About Partnership Opportunities
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Handshake className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Optimal Agent Profile</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Technical competence in marine equipment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Established relationships in research/survey communities</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Strong service and support capabilities</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Commitment to quality and customer satisfaction</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                Apply to Become a Partner
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;