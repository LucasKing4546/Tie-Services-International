import React from 'react';
import { Ship, ArrowLeft, CheckCircle2, Shield, Gauge, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LARS = () => {
  const navigate = useNavigate();

  const larsTypes = [
    {
      name: 'ROV LARS',
      description: 'Specialized launch and recovery systems designed for remotely operated vehicles',
      features: ['Precision positioning control', 'Heave compensation systems', 'Umbilical management', 'Emergency recovery capability'],
      applications: ['Inspection operations', 'Subsea maintenance', 'Deep sea exploration', 'Offshore construction'],
      capacity: 'Up to 15 tonnes'
    },
    {
      name: 'AUV LARS',
      description: 'Advanced systems for autonomous underwater vehicle deployment and recovery',
      features: ['Automated docking systems', 'Magnetic coupling mechanisms', 'Integrated charging stations', 'Precise alignment systems'],
      applications: ['Autonomous surveys', 'Long-duration missions', 'Scientific research', 'Environmental monitoring'],
      capacity: 'Up to 8 tonnes'
    },
    {
      name: 'Scientific LARS',
      description: 'Multi-purpose systems for diverse scientific equipment and instrumentation',
      features: ['Modular design flexibility', 'Multiple deployment modes', 'Instrument-specific adaptors', 'Data cable management'],
      applications: ['Oceanographic research', 'Marine biology studies', 'Geological sampling', 'Water quality monitoring'],
      capacity: 'Up to 25 tonnes'
    },
    {
      name: 'Hybrid Systems',
      description: 'Versatile LARS capable of handling multiple vehicle types and configurations',
      features: ['Multi-vehicle compatibility', 'Quick-change tooling', 'Adaptive control systems', 'Integrated maintenance facilities'],
      applications: ['Multi-purpose vessels', 'Research expeditions', 'Commercial operations', 'Training facilities'],
      capacity: 'Up to 20 tonnes'
    }
  ];

  const advancedFeatures = [
    {
      title: 'Motion Compensation',
      description: 'Advanced heave compensation systems minimize vessel motion effects during critical operations',
      icon: Gauge
    },
    {
      title: 'Safety Systems',
      description: 'Comprehensive safety interlocks, emergency stops, and fail-safe mechanisms protect equipment and personnel',
      icon: Shield
    },
    {
      title: 'Automated Control',
      description: 'Sophisticated control systems enable precise automated deployment and recovery sequences',
      icon: Settings
    },
    {
      title: 'Emergency Recovery',
      description: 'Dedicated emergency recovery modes ensure safe retrieval under adverse conditions',
      icon: Zap
    }
  ];

  const systemCapabilities = [
    'Real-time load monitoring and control',
    'Integrated vessel motion compensation',
    'Precision positioning systems',
    'Emergency stop and recovery modes',
    'Comprehensive safety interlocks',
    'Remote operation capabilities',
    'Multi-vehicle compatibility',
    'Modular component design',
    'Environmental monitoring integration',
    'Automated deployment sequences'
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
                    <Ship className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    Launch & Recovery Systems
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Advanced LARS Solutions
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Sophisticated Launch and Recovery Systems engineered for safe, precise, and reliable deployment of underwater vehicles and scientific equipment.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg">
                    Discuss Requirements
                  </Button>
                  <Button size="lg" variant="outline">
                    Technical Documentation
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Advanced Safety Features</h3>
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Motion Compensation & Safety Systems</h4>
                      <p className="text-muted-foreground">
                        Our LARS feature advanced motion compensation technology and comprehensive safety systems to ensure safe operations in challenging sea conditions.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* LARS Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                LARS System Range
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Specialized launch and recovery systems designed for different vehicle types and operational requirements.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {larsTypes.map((lars, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{lars.name}</CardTitle>
                      <Badge variant="outline">{lars.capacity}</Badge>
                    </div>
                    <CardDescription>{lars.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {lars.features.map((feature, idx) => (
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
                          {lars.applications.map((app, idx) => (
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

        {/* Advanced Features */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Advanced Technology Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Cutting-edge technology ensuring safe and precise operations in demanding marine environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* System Capabilities */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Comprehensive System Capabilities
              </h2>
              <p className="text-lg text-muted-foreground">
                Every LARS system is engineered with advanced capabilities for reliable marine operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemCapabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3 p-6 bg-card rounded-lg shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Custom Engineering Solutions
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Every LARS system is custom-designed to integrate with your specific vessel configuration, operational requirements, and safety protocols.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Custom vessel integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Comprehensive safety analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Performance optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Advanced control systems</span>
                  </div>
                </div>
              </div>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Design Process</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Requirements Analysis</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive assessment of operational needs and vessel constraints</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Custom Design</h4>
                    <p className="text-sm text-muted-foreground">Detailed engineering design with 3D modeling and simulation</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Testing & Validation</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive testing and certification before delivery</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Installation & Commissioning</h4>
                    <p className="text-sm text-muted-foreground">Complete installation support and system commissioning</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Design Your LARS Solution?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our experienced engineering team specializes in creating sophisticated launch and recovery systems tailored to your specific operational requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Start Requirements Discussion
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Download LARS Brochure
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LARS;