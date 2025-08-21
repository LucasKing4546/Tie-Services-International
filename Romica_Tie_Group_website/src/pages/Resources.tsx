import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Calendar, ExternalLink, Users, Ship, Settings } from 'lucide-react';

const Resources = () => {
  const downloads = [
    {
      title: "Research Vessel Systems Catalog",
      description: "Comprehensive guide to our research vessel equipment and systems integration solutions.",
      type: "Product Catalog",
      size: "12.5 MB",
      format: "PDF",
      category: "research-vessels"
    },
    {
      title: "CTD Handling Systems Manual",
      description: "Technical specifications and operational procedures for CTD handling equipment.",
      type: "Technical Manual",
      size: "8.2 MB",
      format: "PDF",
      category: "ctd-systems"
    },
    {
      title: "Corer Handling Systems Guide",
      description: "Detailed documentation for our corer handling systems and deployment procedures.",
      type: "Technical Guide",
      size: "15.7 MB",
      format: "PDF",
      category: "corer-systems"
    },
    {
      title: "Installation & Maintenance Procedures",
      description: "Step-by-step installation guides and maintenance schedules for all systems.",
      type: "Service Manual",
      size: "22.1 MB",
      format: "PDF",
      category: "service"
    },
    {
      title: "Safety Standards & Compliance",
      description: "Safety protocols and international compliance standards for marine operations.",
      type: "Compliance Guide",
      size: "6.8 MB",
      format: "PDF",
      category: "safety"
    },
    {
      title: "Product Specifications Sheet",
      description: "Quick reference specifications for all Romica Tie Group products and systems.",
      type: "Spec Sheet",
      size: "3.4 MB",
      format: "PDF",
      category: "specifications"
    }
  ];

  const news = [
    {
      title: "Romica Tie Group to Exhibit at Oceanology International 2024",
      date: "2024-02-15",
      category: "Trade Shows",
      description: "Join us at booth #3025 to see our latest marine research equipment and discuss partnership opportunities.",
      link: "#",
      featured: true
    },
    {
      title: "New Partnership with Pacific Marine Research Institute",
      date: "2024-01-28",
      category: "Partnerships",
      description: "Expanding our reach in the Pacific region through strategic collaboration with leading research institutions.",
      link: "#"
    },
    {
      title: "GSI Vessel Program Phase 2 Completion",
      date: "2024-01-15",
      category: "Projects",
      description: "Successfully delivered advanced CTD handling systems for three additional research vessels in the GSI fleet.",
      link: "/projects/gsi-vessel-program"
    },
    {
      title: "Enhanced Agent Training Program Launch",
      date: "2023-12-10",
      category: "Training",
      description: "New comprehensive training modules now available for technical support and sales certification.",
      link: "#"
    },
    {
      title: "Sustainability Initiative: Green Marine Equipment",
      date: "2023-11-22",
      category: "Sustainability",
      description: "Introducing our new line of environmentally sustainable marine research equipment with reduced carbon footprint.",
      link: "#"
    },
    {
      title: "Q3 2023 Global Network Expansion Report",
      date: "2023-10-30",
      category: "Company News",
      description: "Added 12 new authorized agents across Europe and Asia-Pacific regions, strengthening our global presence.",
      link: "#"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'research-vessels':
        return <Ship className="h-5 w-5" />;
      case 'ctd-systems':
      case 'corer-systems':
        return <Settings className="h-5 w-5" />;
      case 'service':
      case 'safety':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Trade Shows': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Partnerships': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Projects': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Training': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Sustainability': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
      'Company News': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    };
    return colors[category as keyof typeof colors] || colors['Company News'];
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16 bg-gradient-to-br from-primary/5 to-secondary/5    ">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="ocean-text-gradient">Resources & News</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access technical documentation, product catalogs, and stay updated with the latest company news and industry events.
            </p>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Downloads</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive documentation and technical resources for our marine research equipment and systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloads.map((download, index) => (
                <Card key={index} className="h-full hover-card-effect">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(download.category)}
                        <Badge variant="secondary" className="text-xs">
                          {download.type}
                        </Badge>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{download.format}</div>
                        <div>{download.size}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{download.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {download.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News & Events Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">News & Events</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed about our latest projects, partnerships, and participation in key industry events.
              </p>
            </div>

            <div className="space-y-8">
              {news.map((article, index) => (
                <Card key={index} className={`hover-card-effect ${article.featured ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getCategoryColor(article.category)}>
                            {article.category}
                          </Badge>
                          {article.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <CardDescription className="text-base">
                          {article.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                      Read more
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;