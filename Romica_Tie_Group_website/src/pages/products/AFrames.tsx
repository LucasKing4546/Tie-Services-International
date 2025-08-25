import React from 'react';
import { Anchor, ArrowLeft, CheckCircle2, Move3D, Maximize, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AFrames = () => {
  const navigate = useNavigate();

  const frameTypes = [
    {
      name: 'Conventional A-Frames',
      description: 'Traditional fixed-geometry A-frames for standard lifting and deployment operations',
      icon: Anchor,
      features: ['Robust structural design', 'High load capacity', 'Marine-grade materials', 'Integrated safety systems'],
      applications: ['Standard lifting operations', 'Equipment deployment', 'General purpose handling'],
      capacity: 'Up to 50 tonnes'
    },
    {
      name: 'Wide-Angle A-Frames',
      description: 'Extended reach frames designed for operations requiring greater lateral coverage',
      icon: Maximize,
      features: ['Extended reach capability', 'Enhanced stability', 'Variable geometry options', 'Optimized load distribution'],
      applications: ['Wide vessel operations', 'Side deployment systems', 'Large equipment handling'],
      capacity: 'Up to 75 tonnes'
    },
    {
      name: 'Telescoping A-Frames',
      description: 'Adjustable length frames providing versatile reach and height configurations',
      icon: Move3D,
      features: ['Variable reach adjustment', 'Hydraulic extension system', 'Compact stowed position', 'Precise positioning control'],
      applications: ['Multi-purpose operations', 'Variable depth work', 'Space-constrained vessels'],
      capacity: 'Up to 40 tonnes'
    },
    {
      name: 'Articulating A-Frames',
      description: 'Multi-joint frames offering enhanced maneuverability and positioning flexibility',
      icon: RotateCcw,
      features: ['Multi-axis articulation', 'Precise positioning control', 'Enhanced reach envelope', 'Advanced motion control'],
      applications: ['Complex positioning tasks', 'Obstacle avoidance', 'Precision deployment'],
      capacity: 'Up to 60 tonnes'
    }
  ];

  const zFrameFeatures = [
    'Unique Z-configuration design',
    'Maximized under-hook clearance',
    'Reduced vessel interference',
    'Optimal load path geometry',
    'Custom vessel integration',
    'Enhanced operational envelope'
  ];

  const engineeringCapabilities = [
    'Custom design for specific vessel requirements',
    'FEA structural analysis and optimization',
    'Marine environment corrosion resistance',
    'Integration with existing vessel systems',
    'Load testing and certification',
    'Comprehensive maintenance programs'
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
                    <Anchor className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    Lifting & Handling Frames
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Marine A-Frames & Z-Frames
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Diverse range of custom-engineered lifting and handling frames designed to meet the specific requirements of your vessel and operations.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg">
                    Request Custom Design
                  </Button>
                  <Button size="lg" variant="outline">
                    View Engineering Portfolio
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Custom Engineering</h3>
                  <div className="flex items-start gap-4">
                    <Move3D className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Vessel-Specific Design</h4>
                      <p className="text-muted-foreground">
                        Every frame is custom-engineered to integrate seamlessly with your vessel's specifications, operational requirements, and space constraints.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* A-Frame Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                A-Frame Range
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From conventional fixed frames to advanced articulating systems, we build the right solution for your marine operations.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {frameTypes.map((frame, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <frame.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{frame.name}</CardTitle>
                    </div>
                    <CardDescription>{frame.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">Load Capacity:</span>
                        <Badge variant="outline">{frame.capacity}</Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {frame.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Typical Applications:</h4>
                        <div className="flex flex-wrap gap-1">
                          {frame.applications.map((app, idx) => (
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

        {/* Z-Frames Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Z-Frame Innovation
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our specialized Z-frame configuration provides unique advantages for vessels requiring maximum under-hook clearance and reduced structural interference.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {zFrameFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Z-Frame Advantages</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Maximize className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Maximized Clearance</h4>
                      <p className="text-sm text-muted-foreground">
                        Z-configuration provides superior under-hook clearance for oversized equipment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Move3D className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Reduced Interference</h4>
                      <p className="text-sm text-muted-foreground">
                        Minimizes structural interference with vessel superstructure and equipment.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Engineering Capabilities */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Engineering Excellence
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive engineering services from concept to commissioning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineeringCapabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3 p-6 bg-card rounded-lg shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Custom Frame Engineering?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our experienced engineering team specializes in creating bespoke lifting solutions tailored to your vessel and operational requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Start Custom Design Process
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Previous Projects
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AFrames;