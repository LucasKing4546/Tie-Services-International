import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Compass } from 'lucide-react';
import { useLanguage } from '@/components/Language'; // Ensure this import path is correct based on your file structure

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-background to-cream-50/30" />
        <div className="relative z-10 container-narrow section-padding">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-playfair font-medium text-foreground mb-6">
              {t('aboutHeroTitle')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('aboutHeroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-playfair font-medium text-foreground mb-6">
              {t('aboutLocationTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('aboutLocationDescription')}
            </p>
          </div>

          {/* Google Maps Section and Booking.com Button*/}
          <div className="mb-16 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2743.123456789!2d22.885!3d47.785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47394c2345678901%3A0x123456789abcdef0!2sStrada%20Dsida%20Jeno%2018%2C%20Satu%20Mare%20440050%2C%20Romania!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center text-primary mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">{t('aboutAddress')}</span>
              </div>
              <p className="text-muted-foreground mb-4">{t('aboutCityCountry')}</p>
              {/* Booking.com Button */}
              <a 
                href="https://www.booking.com/hotel/ro/casa-pannonia.en-gb.html?aid=311984&label=cluj-apartments-DwiSpy3oSSrgHnOK8QQ3HgS630449678626%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-1636238715823%3Alp1011806%3Ali%3Adec%3Adm&sid=eeda7c9ca163e63aecff8fa7102e7d20&age=0&all_sr_blocks=43584403_131312983_4_0_0&checkin=2026-01-07&checkout=2026-01-08&dest_id=-1169614&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&highlighted_blocks=43584403_131312983_4_0_0&hpos=1&matching_block_id=43584403_131312983_4_0_0&no_rooms=2&req_adults=4&req_children=0&room1=A%2CA&room2=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=43584403_131312983_4_0_0__20925&srepoch=1751964863&srpvid=725b3e9dc5d000bc&type=total&ucfs=1&"                  target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-lg py-4 px-8 rounded-lg text-center transform hover:scale-[1.02] transition-all duration-200 ease-out shadow-lg hover:shadow-xl will-change-transform"
              >
                {t('aboutBookingButton')}
                <ExternalLink className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* New container for Glovo and Satu Mare Attractions buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-40 mt-8">
            <div className="text-center">
              <h3 className="text-3xl font-playfair font-medium text-foreground mb-3">{t('aboutGlovoPrompt')}</h3>
              <p className="mb-3 text-l text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('aboutGlovoDescription')}
              </p>
              {/* Glovo Button */}
              <a 
                href="https://glovoapp.com/ro/en/satu-mare/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                style={{ backgroundColor: '#FEE500', color: '#00B251' }} // Glovo colors
              >
                <span className="mr-2 text-xl"></span> {t('aboutGlovoButton')}
                <ExternalLink className="ml-2 h-4 w-4 inline" />
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-playfair font-medium text-foreground mb-3">{t('aboutExploreAreaTitle')}</h3>
              <p className="mb-3 text-l text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('aboutExploreAreaDescription')}
              </p>
              {/* Satu Mare Attractions Button */}
              <a 
                href="https://xplorer.ro/romania/obiective-turistice-satu-mare/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-primary bg-transparent px-8 py-3 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <Compass className="mr-2 h-4 w-4" /> {t('aboutExploreAreaButton')}
                <ExternalLink className="ml-2 h-4 w-4 inline" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-to-r from-secondary/30 to-muted/20">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in">
              <h2 className="text-3xl lg:text-4xl font-playfair font-medium text-primary mb-6">
                {t('aboutTranquilityTitle')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t('aboutTranquilityDescription')}
              </p>
            </div>
            <div className="relative animate-fade-in">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/20 to-muted/30 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/40"></div>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {t('aboutInspiringSpaces')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-medium text-primary mb-6 ">
              {t('aboutSpecialTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('aboutDesignTitle'),
                description: t('aboutDesignDescription')
              },
              {
                title: t('aboutConnectionTitle'),
                description: t('aboutConnectionDescription')
              },
              {
                title: t('aboutApproachTitle'),
                description: t('aboutApproachDescription')
              }
            ].map((value, index) => (
              <Card key={index} className="border-0 shadow-sm animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-playfair font-medium text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-playfair font-medium text-foreground mb-8">
              {t('aboutPhilosophyTitle')}
            </h2>
            <blockquote className="text-2xl lg:text-3xl font-playfair italic text-primary mb-8 leading-relaxed">
              "{t('aboutPhilosophyQuote')}"
            </blockquote>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('aboutPhilosophyDescription')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;