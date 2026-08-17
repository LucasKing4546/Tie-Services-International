import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  FileText, 
  Users, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Download,
  BookOpen,
  Headphones,
  Settings,
  AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SupportService = () => {
  // Handle URL hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);

  const supportChannels = [
    {
      icon: Phone,
      title: 'Emergency Hotline',
      description: '24/7 technical emergency support',
      contact: '+44 1234 567 890',
      availability: 'Available 24/7'
    },
    {
      icon: Mail,
      title: 'Technical Support Email',
      description: 'Non-urgent technical queries',
      contact: 'support@romicatie.com',
      availability: 'Response within 4 hours'
    },
    {
      icon: FileText,
      title: 'Service Request Portal',
      description: 'Submit and track service requests',
      contact: 'Access Online Portal',
      availability: 'Track progress anytime'
    }
  ];

  const trainingPrograms = [
    {
      title: 'Agent Technical Certification',
      duration: '5 days',
      format: 'On-site at Romica facilities',
      description: 'Comprehensive training on product installation, operation, and troubleshooting',
      includes: ['Product theory', 'Hands-on practice', 'Certification exam', 'Training materials']
    },
    {
      title: 'Client Operation Training',
      duration: '2-3 days',
      format: 'On-site at client location',
      description: 'End-user training for vessel crews and technical staff',
      includes: ['System operation', 'Maintenance procedures', 'Safety protocols', 'Documentation']
    },
    {
      title: 'Advanced Service Training',
      duration: '3 days',
      format: 'Hybrid (Online + Practical)',
      description: 'Advanced troubleshooting and repair techniques for certified technicians',
      includes: ['Diagnostic procedures', 'Complex repairs', 'Software updates', 'Quality standards']
    }
  ];

  const warrantyTiers = [
    {
      tier: 'Standard Warranty',
      duration: '12 months',
      coverage: 'Manufacturing defects and material failures',
      support: 'Remote support included',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      tier: 'Extended Warranty',
      duration: '24 months',
      coverage: 'Comprehensive coverage including wear parts',
      support: 'Priority support and on-site service',
      color: 'bg-green-50 border-green-200'
    },
    {
      tier: 'Premium Care',
      duration: '36 months',
      coverage: 'Full coverage with preventive maintenance',
      support: '24/7 priority support and guaranteed response times',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl ocean-text-gradient font-bold mb-6">
                Support & Service
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Comprehensive after-sales support ensuring your marine systems operate at peak performance throughout their lifecycle
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Emergency Support
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Global Service Network
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Certified Technicians
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Support Section */}
        <section id="technical-support-section" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Support</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Multi-tiered support system with direct escalation pathways to Romica's central engineering team
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {supportChannels.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{channel.title}</CardTitle>
                      <CardDescription>{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="font-semibold text-lg mb-2">{channel.contact}</p>
                      <p className="text-sm text-muted-foreground">{channel.availability}</p>
                      <Button className="mt-4 w-full">Contact Support</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <CardTitle className="text-amber-800">Support Escalation Process</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-800 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-1">Local Agent</h4>
                    <p className="text-amber-700">First line support and basic troubleshooting</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-800 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-1">Regional Support</h4>
                    <p className="text-amber-700">Advanced technical support and remote diagnostics</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-800 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-1">Romica Central</h4>
                    <p className="text-amber-700">Engineering team involvement and factory support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Training Programs Section */}
        <section id="training-section" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Training Programs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive training for agent technicians and clients on product operation, sales, and service
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {trainingPrograms.map((program, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <Badge variant="outline">{program.duration}</Badge>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">
                      {program.format}
                    </CardDescription>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3">Training Includes:</h4>
                    <ul className="space-y-2 mb-6">
                      {program.includes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Request Training</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  Training Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">For Agents:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Enhanced technical competency</li>
                      <li>• Certification credentials</li>
                      <li>• Improved customer satisfaction</li>
                      <li>• Access to latest product updates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">For Clients:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Optimized system performance</li>
                      <li>• Reduced operational risks</li>
                      <li>• Extended equipment lifecycle</li>
                      <li>• Compliance with safety standards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Spare Parts & Maintenance Section */}
        <section id="spare-parts-section" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Spare Parts & Maintenance</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Global spare parts supply chain and comprehensive maintenance services to ensure continuous operation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="w-6 h-6 text-primary" />
                    Spare Parts Supply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Critical Parts Availability</span>
                      <Badge variant="secondary">24-48 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Standard Parts</span>
                      <Badge variant="secondary">3-5 days</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Global Shipping</span>
                      <Badge variant="secondary">Express Available</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Parts Catalog</span>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Wrench className="w-6 h-6 text-primary" />
                    Maintenance Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Preventive Maintenance</h4>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance programs to prevent system failures</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Corrective Maintenance</h4>
                      <p className="text-sm text-muted-foreground">Rapid response repair services with certified technicians</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">System Upgrades</h4>
                      <p className="text-sm text-muted-foreground">Hardware and software upgrades to enhance performance</p>
                    </div>
                    <Button className="w-full mt-4">Schedule Maintenance</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Maintenance Contracts Available</CardTitle>
                <CardDescription className="text-green-700">
                  Flexible maintenance agreements tailored to your operational requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h4 className="font-semibold text-green-800">Basic</h4>
                    <p className="text-sm text-green-700">Annual inspection & basic maintenance</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-green-800">Comprehensive</h4>
                    <p className="text-sm text-green-700">Scheduled maintenance & priority support</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-green-800">Full Service</h4>
                    <p className="text-sm text-green-700">Complete maintenance management</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Warranty Information Section */}
        <section id="warranty-section" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Warranty Information</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive warranty coverage with clear claim administration process and transparent terms
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {warrantyTiers.map((tier, index) => (
                <Card key={index} className={`${tier.color} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{tier.tier}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{tier.duration}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">Coverage</h4>
                        <p className="text-sm text-muted-foreground">{tier.coverage}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Support</h4>
                        <p className="text-sm text-muted-foreground">{tier.support}</p>
                      </div>
                    </div>
                    <Button className="w-full mt-6">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Claim Process</CardTitle>
                  <CardDescription>Simple and transparent claim administration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                      <div>
                        <h4 className="font-medium">Report Issue</h4>
                        <p className="text-sm text-muted-foreground">Contact your local agent or our support team</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                      <div>
                        <h4 className="font-medium">Assessment</h4>
                        <p className="text-sm text-muted-foreground">Technical evaluation and warranty coverage verification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                      <div>
                        <h4 className="font-medium">Resolution</h4>
                        <p className="text-sm text-muted-foreground">Repair, replacement, or credit as appropriate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warranty Terms</CardTitle>
                  <CardDescription>Key coverage details and exclusions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">✓ Covered</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Manufacturing defects</li>
                        <li>• Material failures</li>
                        <li>• Design-related issues</li>
                        <li>• Software defects</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">✗ Not Covered</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Normal wear and tear</li>
                        <li>• Misuse or abuse</li>
                        <li>• Environmental damage</li>
                        <li>• Modifications by third parties</li>
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <FileText className="w-4 h-4 mr-2" />
                    Full Terms & Conditions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportService;