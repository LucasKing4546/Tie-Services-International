import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Calendar, ExternalLink, Users, Ship, Settings, Loader2 } from 'lucide-react';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

const Resources = () => {
  const [news, setNews] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchWordPressNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://romicatiegroup.com/news/wp-json/wp/v2/posts?_embed&per_page=10');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news from WordPress');
        }
        
        const posts = await response.json();
        setNews(posts);
        setError(null);
      } catch (err) {
        console.error('Error fetching WordPress news:', err);
        setError('Unable to load latest news. Please try again later.');
        // Fallback to empty array to show the UI without news
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWordPressNews();
  }, []);

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

  const stripHtmlTags = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
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

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span className="text-lg text-muted-foreground">Loading latest news...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">{error}</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No news articles available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((post) => (
                  <Card key={post.id} className="hover-card-effect h-full flex flex-col">
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post._embedded['wp:featuredmedia'][0].alt_text || stripHtmlTags(post.title.rendered)}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      <CardTitle className="text-lg leading-tight line-clamp-2">
                        {stripHtmlTags(post.title.rendered)}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3 flex-1">
                        {stripHtmlTags(post.excerpt.rendered)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        className="w-full text-primary hover:text-primary/80"
                        onClick={() => window.open(post.link, '_blank')}
                      >
                        Read more
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://romicatiegroup.com/news/', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All News
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="h-4 w-4 mr-2" />
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;