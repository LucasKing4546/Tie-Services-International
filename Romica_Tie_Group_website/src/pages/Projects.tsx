import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { MapPin, Calendar, Building, Ship, Search } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 'gsi-vessel-program',
      title: 'GSI Vessel Program',
      client: 'Hyundai Heavy Industries',
      location: 'South Korea',
      year: '2023',
      category: 'Deck Machinery Solutions',
      description: 'Successful collaboration delivering complete deck machinery solutions with exceptional quality design and timely delivery for major shipbuilding project.',
      image: '/placeholder.svg',
      highlights: [
        'Complete Deck Machinery Solution',
        'On-time Delivery',
        'Class-certified Quality',
        'International Collaboration'
      ],
      icon: Ship,
      route: '/projects/gsi-vessel-program'
    },
    {
      id: 'dsv-newbuild',
      title: 'DSV Newbuild Project',
      client: 'Shanghai Zhenhua Heavy Industries (ZPMC)',
      location: 'China',
      year: '2022',
      category: 'Complex Systems Integration',
      description: 'Demonstrates our capability to deliver sophisticated systems to major international shipyards with complex technical requirements.',
      image: '/placeholder.svg',
      highlights: [
        'International Shipyard Delivery',
        'Complex Systems Integration',
        'ZPMC Partnership',
        'Technical Excellence'
      ],
      icon: Building,
      route: '/projects/dsv-newbuild'
    },
    {
      id: 'fugro-geophysical',
      title: 'Fugro Geophysical Survey Vessel',
      client: 'Fugro',
      location: 'Global Operations',
      year: '2023',
      category: 'Survey Equipment',
      description: 'Highlights our experience equipping commercial survey vessels operated by major industry players in geophysical research.',
      image: '/placeholder.svg',
      highlights: [
        'Commercial Survey Vessel',
        'Industry Leader Partnership',
        'Geophysical Equipment',
        'Global Operations Support'
      ],
      icon: Search,
      route: '/projects/fugro-geophysical'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Project Case Studies
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover our global experience and proven capabilities through detailed case studies 
                showcasing successful collaborations with industry leaders worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Global Reach
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  Major Shipyards
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Proven Track Record
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our proven expertise can deliver exceptional results for your next marine engineering challenge.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;