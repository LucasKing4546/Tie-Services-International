import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Shield, FileCheck, Building2, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const QualityCompliance = () => {
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

  const certifications = [
    {
      category: "Class-Approved Designs",
      icon: Shield,
      items: [
        "DNV (Det Norske Veritas)",
        "Lloyd's Register",
        "Bureau Veritas"
      ],
      description: "Our designs are surveyed and approved by leading marine classification societies"
    },
    {
      category: "Quality & Welding Systems",
      icon: Award,
      items: [
        "TUV Certification",
        "DNV-GL Approval"
      ],
      description: "Certified quality management and welding procedures ensuring excellence"
    },
    {
      category: "Workshop Approvals",
      icon: Building2,
      items: [
        "Bureau Veritas (BV) System Approved Workshop"
      ],
      description: "Our manufacturing facilities meet the highest industry standards"
    },
    {
      category: "ISO Certifications",
      icon: FileCheck,
      items: [
        "ISO 9001:2008 - Romica Engineering Limited",
        "ISO 3834:part 2 (Fusion-Welding)",
        "ISO 14001 Environmental Management"
      ],
      description: "International standards for quality management and environmental responsibility"
    }
  ];

  const qualityPillars = [
    {
      title: "Marine Classification Society Requirements",
      description: "Strict adherence to international maritime standards and regulations",
      icon: Globe
    },
    {
      title: "Health & Safety Excellence",
      description: "Comprehensive safety protocols protecting our workforce and clients",
      icon: Shield
    },
    {
      title: "Continuous Improvement",
      description: "Ongoing commitment to enhancing our processes and capabilities",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Section */}
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold ocean-text-gradient mb-6">
              Quality & Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Building trust through rigorous standards, comprehensive certifications, 
              and unwavering commitment to excellence in marine engineering.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                ISO Certified
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Class Approved
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Marine Standards
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section id="commitment-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Commitment to Quality
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Quality is not just a goal—it's the foundation of everything we do. Our commitment 
                extends beyond compliance to encompass a culture of excellence that permeates every 
                aspect of our operations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {qualityPillars.map((pillar, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <pillar.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Certifications & Approvals
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive portfolio of certifications demonstrates our commitment to 
                meeting and exceeding industry standards across all aspects of our operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <cert.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{cert.category}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {cert.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cert.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-foreground font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Trusted by Leading Organizations Worldwide
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Our certifications and quality standards provide the assurance that your marine 
              engineering projects are in capable, compliant hands.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">DNV Approved</span>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">ISO Certified</span>
              </div>
              <div className="text-center">
                <FileCheck className="h-12 w-12 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">BV Approved</span>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Global Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default QualityCompliance;