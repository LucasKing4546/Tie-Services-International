import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Square } from 'lucide-react';

interface ApartmentImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ApartmentImage[];
  selectedIndex: number | null;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageModal = ({ isOpen, onClose, images, selectedIndex, onPrevious, onNext }: ImageModalProps) => {
  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0 shadow-none">
        <div className="relative group">
          <div className="aspect-[3/4] md:aspect-video bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg overflow-hidden">
            {currentImage ? (
                <img
                    src={currentImage.image}
                    alt={currentImage.title}
                    className="object-contain max-h-full max-w-full"
                />
                ) : (
                <div className="text-center text-muted-foreground">
                    <Square className="h-24 w-24 mx-auto mb-4" />
                    <p className="text-xl">No image selected</p>
                </div>
            )}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
