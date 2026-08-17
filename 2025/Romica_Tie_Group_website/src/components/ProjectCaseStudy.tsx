import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  Download,
  Building,
  Search,
  Ship,
  Anchor,
  Waves
} from 'lucide-react';
import { ProjectData } from '../types/project';

interface ProjectCaseStudyProps {
  projectData: ProjectData;
}

const iconMap = {
  Building,
  Search,
  Ship,
  Anchor,
  Waves,
};

const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ projectData }) => {
  const OverviewIcon = iconMap[projectData.overviewIcon as keyof typeof iconMap];
  const VesselIcon = iconMap[projectData.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-background py-4">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                className="mb-6"
                onClick={() => window.location.href = '/projects'}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {projectData.badges.map((badge, index) => (
                  <Badge key={index} variant={badge.variant}>
                    {badge.text}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                {projectData.title}
              </h1>
              <h2 className="text-2xl text-primary mb-6">
                {projectData.subtitle}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{projectData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="font-semibold">{projectData.completedYear}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {VesselIcon && <VesselIcon className="h-5 w-5 text-primary" />}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {projectData.vesselType.includes('Application') ? 'Application' : 'Vessel Type'}
                    </p>
                    <p className="font-semibold">{projectData.vesselType}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {projectData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {OverviewIcon && <OverviewIcon className="h-6 w-6 text-primary" />}
                        {projectData.overviewTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {projectData.overviewContent.map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{projectData.technicalTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">
                            {projectData.leftColumn.title}
                          </h4>
                          <ul className="space-y-2">
                            {projectData.leftColumn.items.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">
                            {projectData.rightColumn.title}
                          </h4>
                          <ul className="space-y-2">
                            {projectData.rightColumn.items.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{projectData.highlightsTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {projectData.highlightSections.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6">
                          {projectData.highlightSections.map((section, index) => (
                            <div key={index}>
                              <h4 className="font-semibold text-foreground mb-3">
                                {section.title}
                              </h4>
                              <p className="text-muted-foreground">
                                {section.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        {projectData.stats.map((stat, index) => (
                          <div key={index} className="text-center p-4 bg-primary/5 rounded-lg">
                            <div className="text-3xl font-bold text-primary mb-2">
                              {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Client</p>
                        <p className="text-muted-foreground">{projectData.client}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Project Duration</p>
                        <p className="text-muted-foreground">{projectData.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Classification</p>
                        <p className="text-muted-foreground">{projectData.classification}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {projectData.application.includes('Area') ? 'Operation Area' : 
                           projectData.application.includes('Application') ? 'Vessel Application' : 'Vessel Type'}
                        </p>
                        <p className="text-muted-foreground">{projectData.application}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {projectData.testimonial.quote.includes('feedback') ? 'Client Feedback' : 'Client Testimonial'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="text-muted-foreground italic leading-relaxed mb-4">
                        "{projectData.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">
                            {projectData.testimonial.author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {projectData.testimonial.position}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Button className="w-full"> 
                      <Download className="mr-2 h-4 w-4" />
                      Download Case Study
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/support-service'}>
                      Contact Our Team
                    </Button>
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

export default ProjectCaseStudy;