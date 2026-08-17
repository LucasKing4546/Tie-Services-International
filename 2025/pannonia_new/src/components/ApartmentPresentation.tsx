import { useState } from 'react';
import ApartmentDetails from './ApartmentDetails';
import GalleryGrid from './GalleryGrid';
import ImageModal from './ImageModal';

interface ApartmentImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface ApartmentData {
  title: string;
  location: string;
  description: string;
  bedrooms: number;
  beds: string; // Assuming this is a string, adjust if needed
  bathrooms: number;
  area: number;
  images: ApartmentImage[];
}

interface ApartmentPresentationProps {
  apartment: ApartmentData;
}

const ApartmentPresentation = ({ apartment }: ApartmentPresentationProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? apartment.images.length - 1 : selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === apartment.images.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  return (
    <>
       <section className="bg-white py-8">
        <ApartmentDetails
          title={apartment.title}
          location={apartment.location}
          description={apartment.description}
          bedrooms={apartment.bedrooms}
          beds={apartment.beds}
          bathrooms={apartment.bathrooms}
          area={apartment.area}
        />
        <GalleryGrid images={apartment.images} onImageClick={openModal} />
      </section>

      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={closeModal}
        images={apartment.images}
        selectedIndex={selectedImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
};

export default ApartmentPresentation;
