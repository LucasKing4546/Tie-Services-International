import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalNetworkMap from '@/components/network/GlobalNetworkMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Handshake, Globe, Mail, Phone } from 'lucide-react';
import GlobalPresence from '@/components/GlobalPresence';

const GlobalNetwork = () => {
  const regions = [
    {
      name: 'North America',
      status: 'Active',
      agents: 3,
      coverage: '85%'
    },
    {
      name: 'Europe',
      status: 'Active', 
      agents: 5,
      coverage: '92%'
    },
    {
      name: 'Asia Pacific',
      status: 'Expanding',
      agents: 4,
      coverage: '78%'
    },
    {
      name: 'Middle East & Africa',
      status: 'Developing',
      agents: 2,
      coverage: '45%'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold ocean-text-gradient mb-6">
                Global Network
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect with our worldwide network of authorized representatives and discover 
                partnership opportunities in marine engineering excellence.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  40+ Countries
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  50+ Partners
                </div>
                <div className="flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-primary" />
                  Trusted Relationships
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Find Your Local Representative
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our global network ensures local expertise and support wherever your projects take you. 
                  Click on any region to find your nearest authorized representative.
                </p>
              </div>
              
              <GlobalNetworkMap />
            </div>
          </div>
        </section>

        {/* Regional Overview */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Regional Coverage
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {regions.map((region, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <CardTitle className="text-lg">{region.name}</CardTitle>
                      <CardDescription>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          region.status === 'Active' ? 'bg-green-100 text-green-800' :
                          region.status === 'Expanding' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {region.status}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Agents:</span>
                          <span className="font-semibold">{region.agents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Coverage:</span>
                          <span className="font-semibold">{region.coverage}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Interested in Becoming a Partner?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join our exclusive network of authorized representatives and bring world-class 
                marine engineering solutions to your region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8"
                  onClick={() => window.open('/global-network/become-partner', '_self')}
                >
                  Become a Partner
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8"
                  onClick={() => window.open('mailto:partnerships@romica.com')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Partnerships Team
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Can't Find Your Region?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We're continuously expanding our global network. If you don't see a 
                    representative in your area, contact us directly for personalized support.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">+44 (0) 1234 567890</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">global@romica.com</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-primary/10 p-8 rounded-full">
                    <MapPin className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalNetwork;