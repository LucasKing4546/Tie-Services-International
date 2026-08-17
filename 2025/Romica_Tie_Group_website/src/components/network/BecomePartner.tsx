import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, TrendingUp, Award, Handshake, Mail, Phone, ArrowLeft, Star } from 'lucide-react';

const BecomePartner = () => {
  const valuePropositions = [
    {
      icon: Award,
      title: 'Premium Product Portfolio',
      description: 'Access to industry-leading marine engineering solutions with proven track records in global markets.'
    },
    {
      icon: TrendingUp,
      title: 'Growing Market Opportunities',
      description: 'Capitalize on the expanding oceanographic research and offshore energy sectors worldwide.'
    },
    {
      icon: Users,
      title: 'Comprehensive Training & Support',
      description: 'Extensive technical training programs and ongoing engineering support for your team.'
    },
    {
      icon: Star,
      title: 'Reputable Brand Partnership',
      description: 'Associate with a respected name in marine engineering with decades of proven excellence.'
    }
  ];

  const idealPartnerProfile = [
    {
      category: 'Technical Competence',
      requirements: [
        'Marine engineering or related technical background',
        'Understanding of oceanographic and survey equipment',
        'Capability to provide technical pre-sales support',
        'Local engineering support capabilities'
      ]
    },
    {
      category: 'Market Relationships',
      requirements: [
        'Established connections in research institutions',
        'Relationships with offshore survey companies',
        'Network within marine engineering community',
        'Access to key decision makers in target markets'
      ]
    },
    {
      category: 'Service Capabilities',
      requirements: [
        'Local service and maintenance capabilities',
        'Qualified technical personnel',
        'Workshop facilities for equipment servicing',
        'Emergency response capabilities'
      ]
    },
    {
      category: 'Business Excellence',
      requirements: [
        'Proven track record in B2B sales',
        'Strong financial stability',
        'Commitment to long-term partnership',
        'Alignment with quality and safety standards'
      ]
    }
  ];

  const benefits = [
    'Exclusive territorial rights in designated markets',
    'Competitive margin structures with performance incentives',
    'Marketing and sales support materials',
    'Access to technical documentation and specifications',
    'Regular product training and certification programs',
    'Co-marketing opportunities at industry events',
    'Direct access to engineering team for complex projects',
    'Priority support for customer inquiries and issues'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-5">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                className="mb-6"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Global Network
              </Button>
              
              <div className="text-center">
                <Badge variant="secondary" className="mb-6">Partnership Opportunity</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Become Our Partner
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Join our exclusive network of authorized representatives and build a successful 
                  business representing world-class marine engineering solutions in your region.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Apply for Partnership
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    Download Partnership Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Why Partner with Us?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our partnership program offers exceptional opportunities for growth in the 
                  rapidly expanding marine technology sector.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valuePropositions.map((prop, index) => {
                  const IconComponent = prop.icon;
                  return (
                    <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{prop.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{prop.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Partner Profile */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ideal Partner Profile
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We seek exceptional partners who share our commitment to technical excellence 
                  and customer success.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {idealPartnerProfile.map((profile, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Handshake className="h-6 w-6 text-primary" />
                        {profile.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {profile.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Partnership Benefits
                </h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive support and resources to ensure your success as our partner.
                </p>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Application Process
                </h2>
                <p className="text-lg text-muted-foreground">
                  Simple steps to join our global partner network.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Submit Application</h3>
                  <p className="text-muted-foreground">Complete our partnership application form with your company details and market information.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Evaluation & Interview</h3>
                  <p className="text-muted-foreground">Our partnerships team will review your application and conduct a detailed interview process.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Partnership Agreement</h3>
                  <p className="text-muted-foreground">Finalize partnership terms and begin your onboarding with comprehensive training.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Take the first step towards a successful partnership. Our team is ready to 
                discuss opportunities in your region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="px-8">
                  <Mail className="mr-2 h-4 w-4" />
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Partnership Team Contact</h3>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">partnerships@romica.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">+44 (0) 1234 567890</span>
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

export default BecomePartner;