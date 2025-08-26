import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ApartmentPresentation from '@/components/ApartmentPresentation';
import { useLanguage } from '@/components/Language'; 

const Gallery = () => {
  const { t } = useLanguage();

  const apartments = [
    {
      title: "Double Room",
      location: t("galleryLocation"),
      description: t("galleryDoubleRoomDescription"),
      bedrooms: 1,
      beds: t("galleryDoubleRoomBeds"),
      bathrooms: 1,
      area: 20,
      images: [
        { id: 1, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "DoubleRoom/best_shot.jpg" },
        { id: 2, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "DoubleRoom/tv.jpg" },
        { id: 3, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "DoubleRoom/hol.jpg" },
        { id: 4, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "DoubleRoom/whole_room.jpg" },
        { id: 5, title: t("galleryImageCategoryTerasa"), category: t("galleryImageCategoryTerasa"), image: "DoubleRoom/outside.jpg" },
        { id: 6, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "DoubleRoom/bathroom.jpg" }
      ]
    },
    {
      title: "Quadruple Apartment",
      location: t("galleryLocation"),
      description: t("gallerySuperiorTripleRoomDescription"),
      bedrooms: 1,
      beds: t("gallerySuperiorTripleRoomBeds"),
      bathrooms: 1,
      area: 30,
      images: [
        { id: 9, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Superior Triple Room/dorm1.jpg" },
        { id: 10, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Superior Triple Room/dorm2.jpg" },
        { id: 11, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Superior Triple Room/dorm3.jpg" },
        { id: 12, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Superior Triple Room/dorm4.jpg" },
        { id: 13, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Superior Triple Room/kitchen1.jpg" },
        { id: 14, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Superior Triple Room/kitchen2.jpg" },
        { id: 15, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Superior Triple Room/kitchen3.jpg" },
        { id: 16, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "Superior Triple Room/bath1.jpg" },
        { id: 17, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "Superior Triple Room/bath2.jpg" }    
      ]
    },
    {
      title: "Family Room with Shower",
      location: t("galleryLocation"),
      description: t("galleryFamilyRoomDescription"),
      bedrooms: 1,
      beds: t("galleryFamilyRoomBeds"),
      bathrooms: 1,
      area: 25,
      images: [
        { id: 17, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Family Room/dorm1.jpg" },
        { id: 18, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Family Room/dorm2.jpg" },
        { id: 19, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Family Room/dorm3.jpg" },
        { id: 20, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Family Room/kitchen.jpg" },
        { id: 21, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "Family Room/bath1.jpg" },
        { id: 22, title: t("galleryImageCategoryTerasa"), category: t("galleryImageCategoryTerasa"), image: "Family Room/outdoor.jpg" }
      ]
    },
    {
      title: "Superior Double Room",
      location: t("galleryLocation"),
      description: t("gallerySuperiorDoubleRoomDescription"),
      bedrooms: 1,
      beds: t("gallerySuperiorDoubleRoomBeds"),
      bathrooms: 1,
      area: 30,
      images: [
        { id: 23, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Superior Double Room/first.jpg" },
        { id: 24, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Superior Double Room/second.jpg" },
        { id: 25, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "Superior Double Room/bathroom.jpg" },
        { id: 26, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Superior Double Room/bath1.jpg" },
        { id: 27, title: t("galleryImageCategoryBalcon"), category: t("galleryImageCategoryBalcon"), image: "Superior Double Room/terasa.jpg" },
        { id: 28, title: t("galleryImageCategoryTerasa"), category: t("galleryImageCategoryTerasa"), image: "Superior Double Room/outdoor.jpg" }
      ]
    },
    {
      title: "Standard One Bedroom Apartment",
      location: t("galleryLocation"),
      description: t("galleryStandardOneBedroomApartmentDescription"),
      bedrooms: 2,
      beds: t("galleryStandardOneBedroomApartmentBeds"),
      bathrooms: 1,
      area: 50,
      images: [
        { id: 31, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Standard Apartment/dormp.jpg" },
        { id: 32, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Standard Apartment/dormp2.jpg" },
        { id: 33, title: t("galleryImageCategoryLiving"), category: t("galleryImageCategoryLiving"), image: "Standard Apartment/hol1.jpg" },
        { id: 34, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Standard Apartment/dorm1.jpg" },
        { id: 35, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Standard Apartment/kitchen1.jpg" },
        { id: 36, title: t("galleryImageCategoryLiving"), category: t("galleryImageCategoryLiving"), image: "Standard Apartment/living1.jpg" },
        { id: 37, title: t("galleryImageCategoryLiving"), category: t("galleryImageCategoryLiving"), image: "Standard Apartment/living2.jpg" },
        { id: 38, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "Standard Apartment/bath1.jpg" },
        { id: 39, title: t("galleryImageCategoryBalcon"), category: t("galleryImageCategoryBalcon"), image: "Standard Apartment/balcon1.jpg" }
      ]
    },
    {
      title: "Two Bedroom Apartment",
      location: t("galleryLocation"),
      description: t("galleryTwoBedroomApartmentDescription"),
      bedrooms: 2,
      beds: t("galleryTwoBedroomApartmentBeds"),
      bathrooms: 1,
      area: 50,
      images: [
        { id: 40, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Two Bedroom Apartment/dormp.jpg" },
        { id: 41, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Two Bedroom Apartment/dormp2.jpg" },
        { id: 42, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Two Bedroom Apartment/dorms.jpg" },
        { id: 43, title: t("galleryImageCategoryDormitor"), category: t("galleryImageCategoryDormitor"), image: "Two Bedroom Apartment/etajat.jpg" },
        { id: 44, title: t("galleryImageCategoryBaie"), category: t("galleryImageCategoryBaie"), image: "Two Bedroom Apartment/baie.jpg" },
        { id: 45, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Two Bedroom Apartment/kitchen1.jpg" },
        { id: 46, title: t("galleryImageCategoryBucatarie"), category: t("galleryImageCategoryBucatarie"), image: "Two Bedroom Apartment/kitchen3.jpg" },
        { id: 47, title: t("galleryImageCategoryTerasa"), category: t("galleryImageCategoryTerasa"), image: "Two Bedroom Apartment/curte1.jpg" },
        { id: 48, title: t("galleryImageCategoryTerasa"), category: t("galleryImageCategoryTerasa"), image: "Two Bedroom Apartment/curte2.jpg" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
         {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-background to-cream-50/30" />
        <div className="relative z-10 container-narrow section-padding">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-playfair font-medium text-foreground mb-6">
              {t('galleryHeroTitle')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('galleryHeroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Apartment Presentations */}
      {apartments.map((apartment, index) => (
        <div key={index}>
          <ApartmentPresentation apartment={apartment} />
          {index < apartments.length - 1}
        </div>
      ))}

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-playfair font-medium text-foreground mb-6">
              {t('galleryCTATitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('galleryCTADescription')}
            </p>
            <Button asChild className="btn-elegant group">
              <Link to="/contact">
                {t('galleryCTABookButton')}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;