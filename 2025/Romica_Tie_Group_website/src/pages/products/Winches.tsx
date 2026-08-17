import React from 'react';
import { Zap, ArrowLeft, CheckCircle2, Settings, Anchor, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Winches = () => {
  const navigate = useNavigate();

  const winchTypes = [
    {
      name: 'Umbilical Winches',
      description: 'Specialized winches for ROV and AUV umbilical handling with precise tension control',
      features: ['Variable speed control', 'Tension monitoring', 'Automatic spooling', 'Emergency stop systems'],
      applications: ['ROV operations', 'AUV deployment', 'Tether management']
    },
    {
      name: 'Traction Winches',
      description: 'High-capacity winches for heavy-duty marine operations and deepwater applications',
      features: ['High breaking load capacity', 'Variable drum sizes', 'Level wind systems', 'Load monitoring'],
      applications: ['Deepwater sampling', 'Heavy lifting', 'Anchor handling']
    },
    {
      name: 'Seismic Winches',
      description: 'Precision winches designed for seismic survey equipment deployment and recovery',
      features: ['Constant tension mode', 'Precise positioning', 'Anti-vibration mounting', 'Remote operation'],
      applications: ['Seismic surveys', 'Marine exploration', 'Geophysical research']
    },
    {
      name: 'CTD Winches',
      description: 'Specialized winches for Conductivity, Temperature, and Depth instrument deployment',
      features: ['Fine speed control', 'Depth counter integration', 'Water ingress protection', 'Compact design'],
      applications: ['Oceanographic research', 'Water quality monitoring', 'Marine biology studies']
    }
  ];

  const keyFeatures = [
    'Space-saving right-angle level wind design',
    'Advanced tension monitoring systems',
    'Variable speed and load control',
    'Marine-grade corrosion resistance',
    'Modular design for easy maintenance',
    'Integration with vessel systems'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-card to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/solutions')}
              className="mb-6 hover:bg-accent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Solutions
            </Button>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    Marine Winches
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Professional Marine Winches
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Comprehensive range of marine winches engineered for reliability, precision, and performance in the most demanding marine environments.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg">
                    Request Quote
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Specifications
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Innovation</h3>
                  <div className="flex items-start gap-4">
                    <Settings className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Right-Angle Level Wind</h4>
                      <p className="text-muted-foreground">
                        Our space-saving right-angle level wind design maximizes deck space efficiency while maintaining optimal cable management and reducing wear.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Product Range */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Complete Winch Range
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From precision CTD handling to heavy-duty traction winches, our comprehensive range covers every marine application.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {winchTypes.map((winch, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{winch.name}</CardTitle>
                    <CardDescription>{winch.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {winch.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Applications:</h4>
                        <div className="flex flex-wrap gap-1">
                          {winch.applications.map((app, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Engineering Excellence
              </h2>
              <p className="text-lg text-muted-foreground">
                Every winch is designed with precision engineering and tested for marine environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-6 bg-background rounded-lg shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Discuss Your Winch Requirements?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our engineering team can help you select the perfect winch configuration for your vessel and application requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Contact Engineering Team
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Download Technical Specifications
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Winches;