import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Language'; // Import useLanguage

const Contact = () => {
  const { t } = useLanguage(); // Initialize useLanguage hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Transmit form data to contact.php
    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const text = await response.text();

      if (response.ok && text.includes('Message sent')) {
        toast({
          title: t('contactToastSuccessTitle'), // Translated
          description: t('contactToastSuccessDescription'), // Translated
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast({
          title: t('contactToastErrorTitle'), // Translated
          description: text || t('contactToastErrorDescription'), // Translated
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('contactToastErrorTitle'), // Translated
        description: t('contactToastNetworkError'), // Translated
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-muted/30" />
        <div className="relative z-10 container-narrow section-padding">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-playfair font-medium text-foreground mb-6">
              {t('contactHeroTitle')}
            </h1>
            {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ești gata să începi călătoria către un spațiu mai frumos și mai liniștit? 
              Ne-ar plăcea să auzim despre viziunea ta și să discutăm cum o putem aduce la viață.
            </p> */}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm animate-slide-in">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair font-medium text-foreground">
                    {t('contactFormTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contactFormName')}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-secondary/30 border-muted focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contactFormEmail')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-secondary/30 border-muted focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contactFormMessage')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder={t('contactFormMessagePlaceholder')}
                        className="bg-secondary/30 border-muted focus:border-primary resize-none"
                      />
                    </div>

                    <Button type="submit" className="btn-elegant w-full sm:w-auto">
                      {t('contactFormSubmit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

           {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-playfair font-medium text-foreground mb-6">
                    {t('contactInfoTitle')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">{t('contactInfoEmailLabel')}</p>
                      <p className="text-muted-foreground">rezervari@pannonia.ro</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">{t('contactInfoPhoneLabel')}</p>
                      <p className="text-muted-foreground">+40 725 998 278</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">{t('contactInfoLocationLabel')}</p>
                      <p className="text-muted-foreground">Satu Mare, România</p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-muted/20">
                      <a
                        href="https://www.booking.com/hotel/ro/casa-pannonia.en-gb.html?aid=311984&label=cluj-apartments-DwiSpy3oSSrgHnOK8QQ3HgS630449678626%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-1636238715823%3Alp1011806%3Ali%3Adec%3Adm&sid=eeda7c9ca163e63aecff8fa7102e7d20&age=0&all_sr_blocks=43584403_131312983_4_0_0&checkin=2026-01-07&checkout=2026-01-08&dest_id=-1169614&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&highlighted_blocks=43584403_131312983_4_0_0&hpos=1&matching_block_id=43584403_131312983_4_0_0&no_rooms=2&req_adults=4&req_children=0&room1=A%2CA&room2=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=43584403_131312983_4_0_0__20925&srepoch=1751964863&srpvid=725b3e9dc5d000bc&type=total&ucfs=1&"                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-lg py-4 px-6 rounded-lg text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {t('aboutBookingButton')} {/* Re-using existing key */}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;