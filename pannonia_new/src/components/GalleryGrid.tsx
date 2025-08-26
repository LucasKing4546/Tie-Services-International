import { Card, CardContent } from '@/components/ui/card';
import { Square } from 'lucide-react';

interface ApartmentImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface GalleryGridProps {
  images: ApartmentImage[];
  onImageClick: (index: number) => void;
}

const GalleryGrid = ({ images, onImageClick }: GalleryGridProps) => {
  return (
    <div className="container-wide">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card 
            key={image.id} 
            className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-in cursor-pointer" 
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onImageClick(index)}
          >
            <CardContent className="p-0">
              <div className="aspect-video overflow-hidden relative">
                <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
