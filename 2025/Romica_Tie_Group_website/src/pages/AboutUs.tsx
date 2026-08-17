import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Target, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-16">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="ocean-text-gradient">ROMICA TIE GROUP</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leading provider of innovative deck machinery solutions for marine research and offshore operations worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg">
                  With over <strong className="text-foreground">35 years of team expertise</strong> in deck machinery 
                  and more than <strong className="text-foreground">20 years of group experience</strong>, ROMICA TIE GROUP 
                  has established itself as a trusted leader in marine equipment solutions.
                </p>
                <p>
                  Our journey began with a vision to revolutionize deck machinery for marine research vessels. 
                  Through decades of innovation, engineering excellence, and unwavering commitment to quality, 
                  we have grown from a specialized manufacturer to a comprehensive solutions provider.
                </p>
                <p>
                  Today, our equipment operates on research vessels across the globe, supporting critical 
                  oceanographic research, environmental monitoring, and offshore operations that advance 
                  our understanding of the marine environment.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground mb-2">35+</div>
                  <div className="text-sm text-muted-foreground">Years of Team Expertise</div>
                </CardContent>
              </Card>
              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-secondary/80 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Years of Group Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Philosophy
            </h2>
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-semibold ocean-text-gradient mb-8">
                "Together we can achieve more"
              </blockquote>
              <p className="text-lg text-muted-foreground mb-8">
                This philosophy is at the heart of everything we do. We believe that collaboration, 
                partnership, and shared expertise create solutions that exceed what any single entity 
                could accomplish alone.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We work closely with research institutions, vessel operators, and technical partners 
                  to develop solutions that meet real-world challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl">Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our global network of agents and partners ensures local expertise and support, 
                  creating stronger relationships and better outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By combining our expertise with our partners' knowledge and your specific requirements, 
                  we deliver solutions that exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Locations Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Locations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Strategically positioned across Europe to serve our global client base with 
              manufacturing excellence and technical support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* UK Office */}
            <Card className="bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">United Kingdom</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Primary Operations</h4>
                  <p className="text-muted-foreground">
                    Our UK facility serves as the primary hub for engineering design, 
                    project management, and client relations across the English-speaking markets.
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Services:</strong> Design Engineering, Project Management, Sales & Marketing
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Romania Office */}
            <Card className="bg-gradient-to-br from-background to-secondary/10 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Romania</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Manufacturing Excellence</h4>
                  <p className="text-muted-foreground">
                    Our Romanian facility focuses on precision manufacturing, quality control, 
                    and technical support, leveraging skilled engineering expertise.
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Services:</strong> Manufacturing, Quality Control, Technical Support
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Global Reach, Local Expertise
                </h3>
                <p className="text-muted-foreground">
                  While our primary operations are based in the UK and Romania, our extensive 
                  network of authorized agents and partners ensures we can provide local support 
                  and expertise in key markets worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;