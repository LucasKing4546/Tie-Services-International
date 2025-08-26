
import { Bed, Bath, Square, MapPin, DoorClosed } from 'lucide-react';
import { useLanguage } from './Language';

interface ApartmentDetailsProps {
  title: string;
  location: string;
  description: string;
  bedrooms: number;
  beds: string;
  bathrooms: number;
  area: number;
}

const ApartmentDetails = ({ title, location, description, bedrooms, beds, bathrooms, area }: ApartmentDetailsProps) => {
  const { t } = useLanguage(); // Initialize useLanguage hook
  return (
    <div className="container-narrow mb-16">
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center text-primary mb-4">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">{location}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-playfair font-medium text-foreground mb-6">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          {description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-500 mx-auto items-stretch">
          <div className="flex flex-col justify-center items-center p-4 bg-secondary/30 rounded-lg h-full">
            <DoorClosed className="h-6 w-6 text-primary mb-2" />
            <span className="text-foreground font-medium">
              {bedrooms} {bedrooms === 1 ? t('gallerydormitor') : t('gallerydormitories')}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center p-4 bg-secondary/30 rounded-lg h-full">
            <Bed className="h-6 w-6 text-primary mb-2" />
            <span className="text-foreground font-medium">{beds}</span>
          </div>
          <div className="flex flex-col justify-center items-center p-4 bg-secondary/30 rounded-lg h-full">
            <Bath className="h-6 w-6 text-primary mb-2" />
            <span className="text-foreground font-medium">
              {bathrooms} {bathrooms === 1 ? t('gallerybathroom') : t('gallerybathrooms')}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center p-4 bg-secondary/30 rounded-lg h-full">
            <Square className="h-6 w-6 text-primary mb-2" />
            <span className="text-foreground font-medium">{area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
