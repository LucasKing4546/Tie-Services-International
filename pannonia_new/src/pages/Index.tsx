
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Bed, Bath, Square, Wifi, Car, TvMinimal } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/Language';

const Index = () => {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(73,116,140,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(179,177,174,0.1),transparent_50%)]" />
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-medium text-foreground mb-6 text-balance">
              Pannónia
              <span className="text-primary block mt-2">Rooms & Apartments</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-balance">
              {t('indexHeroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="btn-elegant group">
                <Link to="/about">
                  {t('indexAboutButton')}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline">
                <Link to="/contact">{t('indexContactButton')}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-8 w-4 h-4 rounded-full bg-primary/20 animate-pulse" />
        <div className="absolute top-3/4 right-12 w-6 h-6 rounded-full bg-accent/30 animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-primary/15 animate-pulse delay-700" />
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-gradient-to-r from-secondary/30 to-muted/20">
        <div className="container-narrow">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-playfair font-medium text-foreground mb-6">
              {t('indexAmenitiesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('indexAmenitiesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-stretch">
            {[
              {
                icon: <Wifi className="h-8 w-8 text-primary" />,
                title: t('indexWifiTitle'),
                description: t('indexWifiDescription')
              },
              {
                icon: <Car className="h-8 w-8 text-primary" />,
                title: t('indexParkingTitle'),
                description: t('indexParkingDescription')
              },
              {
                icon: <TvMinimal className="h-8 w-8 text-primary" />,
                title: t('indexTvTitle'),
                description: t('indexTvDescription')
              }
            ].map((amenity, index) => (
              <Card key={index} className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    {amenity.icon}
                  </div>
                  <h3 className="text-xl font-playfair font-medium text-foreground mb-4">{amenity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-playfair font-medium mb-6">
              {t('indexCallToActionTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('indexCallToActionDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="secondary" className="group">
                <Link to="/contact" className="inline-flex items-center">
                  {t('indeXCallToActionButton')}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="group">
                <Link to="/gallery">{t('indexGalleryButton')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
