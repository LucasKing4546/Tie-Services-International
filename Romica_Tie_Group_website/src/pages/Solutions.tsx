import React, { useState } from 'react';
import { ChevronRight, Anchor, Ship, Globe, Wrench, Wind, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Solutions = () => {
  const [activeApplication, setActiveApplication] = useState('uuv-rov');

  const applications = [
    {
      id: 'uuv-rov',
      name: 'UUV & ROV Handling',
      icon: Ship,
      description: 'Advanced systems for autonomous and remotely operated vehicle deployment',
      features: ['Launch and Recovery Systems (LARS)', 'Umbilical handling winches', 'Precision positioning systems'],
      markets: 'Offshore energy, deep sea mining, marine research'
    },
    {
      id: 'oceanographic',
      name: 'Oceanographic Research',
      icon: Search,
      description: 'Specialized equipment for marine science and ocean exploration',
      features: ['CTD handling systems', 'Coring handling systems', 'Deepwater traction winches'],
      markets: 'Research institutions, government agencies, marine biology'
    },
    {
      id: 'geophysical',
      name: 'Geophysical & Marine Survey',
      icon: Globe,
      description: 'Professional survey equipment for marine exploration and mapping',
      features: ['Side scan winches', 'Seismic recording systems', 'Multi-beam sonar deployment'],
      markets: 'Oil & gas exploration, hydrographic surveying, marine archaeology'
    },
    {
      id: 'bespoke',
      name: 'Bespoke Engineering & Prototyping',
      icon: Wrench,
      description: 'Custom turn-key solutions for unique marine engineering challenges',
      features: ['Custom design & engineering', 'Rapid prototyping', 'Specialized manufacturing'],
      markets: 'All industries requiring unique solutions not met by standard products'
    }
  ];

  const products = [
    {
      id: 'winches',
      name: 'Winches',
      description: 'Comprehensive range of marine winches for every application',
      types: ['Umbilical Winches', 'Traction Winches', 'Seismic Winches', 'CTD Winches'],
      highlight: 'Space-saving right-angle level wind design',
      icon: Zap
    },
    {
      id: 'aframes',
      name: 'A-Frames',
      description: 'Diverse range of lifting and handling frames',
      types: ['Conventional A-Frames', 'Wide-angle A-Frames', 'Telescoping A-Frames', 'Articulating A-Frames', 'Z-Frames'],
      highlight: 'Custom engineering for specific vessel requirements',
      icon: Anchor
    },
    {
      id: 'lars',
      name: 'Launch & Recovery Systems (LARS)',
      description: 'Sophisticated systems for safe deployment and recovery',
      types: ['ROV LARS', 'AUV LARS', 'Scientific LARS', 'Hybrid Systems'],
      highlight: 'Advanced motion compensation and safety systems',
      icon: Ship
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold ocean-text-gradient mb-6">
              Marine Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive marine engineering solutions structured by application and product type to match your problem-solving approach
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Applications
              </Button>
              <Button size="lg" variant="outline">
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Solutions by Application</h2>
            <p className="text-lg text-muted-foreground">
                Organized by customer problem-solving mindset to help you find the right solution for your specific marine application.
            </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {applications.map((app) => {
                const IconComponent = app.icon;
                return (
                <Card 
                    key={app.id} 
                    className={`cursor-pointer transition-all duration-300 hover-scale-102 ${
                    activeApplication === app.id ? 'ring-2 ring-primary bg-accent/10' : ''
                    }`}
                    onClick={() => setActiveApplication(app.id)}
                >
                    <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    </CardHeader>
                </Card>
                );
            })}
            </div>

            {/* Active Application Details */}
            {applications.map((app) => {
            if (app.id !== activeApplication) return null;
            const IconComponent = app.icon;
            return (
                <Card key={`detail-${app.id}`} className="mb-8">
                <CardHeader>
                    <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{app.name}</CardTitle>
                        <CardDescription className="text-lg">{app.description}</CardDescription>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Key Products & Features</h4>
                        <ul className="space-y-2">
                        {app.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Target Markets</h4>
                        <p className="text-muted-foreground">{app.markets}</p>
                        <Button className="mt-4" variant="outline">
                        Learn More <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    </div>
                </CardContent>
                </Card>
            );
            })}

            <div className="mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Products by Type</h2>
            <p className="text-lg text-muted-foreground">
                Comprehensive range of marine equipment organized by product category for easy navigation and comparison.
            </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
                const IconComponent = product.icon;
                return (
                <Card key={product.id} className="hover-scale-102 transition-all duration-300">
                    <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                        <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Available Types:</h4>
                        <ul className="space-y-1">
                            {product.types.map((type, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                {type}
                            </li>
                            ))}
                        </ul>
                        </div>
                        <div className="border-t border-border pt-4">
                        <div className="flex items-start gap-2">
                            <Wind className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-primary font-medium">{product.highlight}</p>
                        </div>
                        </div>
                        <Button className="w-full" variant="outline">
                        View Details <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                );
            })}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our bespoke engineering team specializes in turn-key solutions and prototyping for unique marine applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Discuss Your Project
            </Button>
            <Button size="lg" variant="outline">
              Download Capabilities Brochure
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Solutions;