import { useState, useEffect, createContext, useContext } from 'react';

// Language Context
type Language = 'ro' | 'en' | 'hu';

type LanguageContextType = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ro',
  setLanguage: () => {}, // noop fallback
  t: (key: string) => key
});

// Translations - Make sure all keys are present
const translations = {
  ro: {
    home: 'Acasă',
    about: 'Despre',
    gallery: 'Galerie',
    contact: 'Contact',
    language: 'Limba',
    footerDescription: 'Experimentează un trai luxos în inima Sătmarului. Camere moderne cu dotări premium și design elegant pentru rezidenți exigenți.',
    quickNavigation: 'Navigare Rapidă',
    contactInfo: 'Informații Contact',
    copyright: `© ${new Date().getFullYear()} Pannonia Apartments. Toate drepturile rezervate. Site realizat de Secară Lucas-Victor.`,
    indexHeroSubtitle: 'Creăm spații care inspiră liniște din 2012',
    indexAboutButton: 'Descoperă Mai Mult',
    indexContactButton: 'Contactează-ne',
    indexAmenitiesTitle: 'Dotări Premium',
    indexAmenitiesDescription: 'Bucură-te de facilități de clasă mondială concepute pentru a-ți îmbunătăți stilul de viață și pentru confort maxim.',
    indexWifiTitle: "Internet de mare viteză",
    indexWifiDescription: "Internet fibră optică gratuit în toată clădirea pentru conectivitate fără întreruperi.",
    indexParkingTitle: "Parcare Gratuită",
    indexParkingDescription: "Locuri de parcare disponibile în curte, cu acces direct. Oaspeții confirmă securitatea și comoditatea.",
    indexTvTitle: "Totul Pregătit pentru Confortul Tău",
    indexTvDescription: "TV cu ecran plat, aer condiționat, mașină de spalat si uscat haine, frigider, cuptor cu microunde și bucătărie complet utilată – totul pentru o ședere fără griji.",
    indexCallToActionTitle: 'Vacanța ta perfectă începe aici.',
    indexCallToActionDescription: '  Contactează-ne pentru a afla mai multe informații și a descoperi de ce Pannonia Apartments este alegerea perfectă pentru următoarea ta vacanță.',
    indeXCallToActionButton: 'Ia Legătura',
    indexGalleryButton: 'Galerie',
    // About Page Translations
    aboutHeroTitle: 'Povestea Noastră',
    aboutHeroSubtitle: 'Născută dintr-o pasiune pentru crearea de spații care hrănesc sufletul, Pannonia reprezintă armonia perfectă între eleganța intemporală și confortul modern.',
    aboutLocationTitle: 'Locația Noastră',
    aboutLocationDescription: 'Situate lângă centrul orașului Satu Mare, apartamentele noastre oferă acces rapid și convenabil la toate facilitățile urbane.',
    aboutAddress: 'Strada Dsida Jeno, Nr. 18',
    aboutCityCountry: '440050 Satu Mare, România',
    aboutBookingButton: '🏨 REZERVĂ ACUM PE BOOKING.COM',
    aboutGlovoPrompt: 'Poftă de ceva bun?',
    aboutGlovoDescription: 'Descoperă cele mai bune preparate din Satu Mare, livrate rapid prin Glovo.',
    aboutGlovoButton: '🛵 Comandă cu Glovo',
    aboutExploreAreaTitle: 'Explorează Zona',
    aboutExploreAreaDescription: 'Descoperă cele mai bune preparate din Satu Mare, livrate rapid prin Glovo.',
    aboutExploreAreaButton: 'Explorează Satu Mare',
    aboutTranquilityTitle: 'Liniște în Inima Sătmarului',
    aboutTranquilityDescription: 'Pannónia Rooms and Apartments te întâmpină într-o zonă liniștită, la doar 2 minute cu mașina de centrul vechi (Biserica cu Lanț, Turnul Pompierilor, Catedrala Catolică, Parcul Grădina Romei). Magazinul din apropiere și malul Someșului — la 500 m distanță — fac din locație alegerea ideală',
    aboutInspiringSpaces: 'Creăm spații care inspiră liniște din 2012',
    aboutSpecialTitle: 'Ce Ne Face Cu Adevărat Speciali',
    aboutDesignTitle: 'Design Conștient',
    aboutDesignDescription: 'Mobilier nou, saltele ortopedice de tip „Bien Dormir", perne hipoalergenice premium .',
    aboutConnectionTitle: 'Conexiune Personală',
    aboutConnectionDescription: 'Proprietatea nu are recepție fizică, dar comunică eficient înainte și în timpul sejurului.',
    aboutApproachTitle: 'Abordare Holistică',
    aboutApproachDescription: 'Considerând cum lumina, textura, culoarea și fluxul funcționează împreună pentru a îmbunătăți viața de zi cu zi și bunăstarea.',
    aboutPhilosophyTitle: 'Filosofia Noastră',
    aboutPhilosophyQuote: 'Adevărata eleganță nu înseamnă să fii observat, ci să fii amintit pentru sentimentul pe care îl creezi.',
    aboutPhilosophyDescription: 'Această filosofie conduce tot ceea ce facem. Creăm spații care nu doar arată frumos, dar se simt semnificative—medii care devin fundalul pentru cele mai prețioase momente ale vieții.',
    // Contact Page Translations
    contactHeroTitle: 'Să Luăm Legătura',
    contactFormTitle: 'Spune-ne Despre Interesul Tău',
    contactFormName: 'Nume Complet',
    contactFormEmail: 'Adresă Email',
    contactFormMessage: 'Spune-ne Mai Multe',
    contactFormMessagePlaceholder: 'Împărtășește-ne întrebările tale, cerințele specifice, perioada dorită sau orice alte detalii relevante...',
    contactFormSubmit: 'Trimite Mesajul',
    contactInfoTitle: 'Ia Legătura',
    contactInfoEmailLabel: 'Email',
    contactInfoPhoneLabel: 'Telefon',
    contactInfoLocationLabel: 'Locație',
    contactToastSuccessTitle: 'Mesaj Trimis',
    contactToastSuccessDescription: 'Mulțumim pentru interesul dumneavoastră. Vă vom contacta în maximum 24 de ore.',
    contactToastErrorTitle: 'Eroare',
    contactToastErrorDescription: 'A apărut o eroare la trimiterea mesajului.',
    contactToastNetworkError: 'Nu s-a putut trimite mesajul. Încercați din nou mai târziu.',
    // Gallery Page Translations
    galleryHeroTitle: 'Galeria Noastră',
    galleryHeroSubtitle: 'Descoperă eleganța și confortul apartamentelor noastre prin colecția noastră de imagini. Fiecare fotografie surprinde atenția la detalii și atmosfera primitoare pe care o oferim.',
    galleryCTATitle: "Rezervă un Apartament",
    galleryCTADescription: "Contactează-ne pentru a afla mai multe informații și a descoperi de ce Pannonia Apartments este alegerea perfectă pentru următoarea ta vacanță.",
    galleryCTABookButton: " Contactează-ne",
    galleryLocation: 'Satu Mare, România',
    galleryBedrooms: 'Dormitoare',
    galleryBeds: 'Paturi',
    galleryBathrooms: 'Băi',
    galleryArea: 'Suprafață',
    gallerySqM: 'mp',
    galleryDoubleRoomTitle: "Cameră Dublă",
    galleryDoubleRoomDescription: "Cameră dublă luminoasă și elegant amenajată, ideală pentru un sejur confortabil în doi. Dotată cu facilități moderne pentru relaxare totală.",
    galleryDoubleRoomBeds: "1 pat dublu",
    gallerySuperiorTripleRoomTitle: "Cameră Triplă Superioară",
    gallerySuperiorTripleRoomDescription: "Cameră elegantă și spațioasă, potrivită pentru 4 persoane. O combinație de confort, stil și funcționalitate.",
    gallerySuperiorTripleRoomBeds: "4 paturi single",
    galleryFamilyRoomTitle: "Cameră de Familie cu Duș",
    galleryFamilyRoomDescription: "Spațiu generos dedicat familiilor, cu un design cald și funcțional. Perfectă pentru vacanțe liniștite și confortabile alături de cei dragi.",
    galleryFamilyRoomBeds: "2 paturi duble",
    gallerySuperiorDoubleRoomTitle: "Cameră Dublă Superioară",
    gallerySuperiorDoubleRoomDescription: "Cameră dublă luminoasă și elegant amenajată, ideală pentru un sejur confortabil în doi. Dotată cu facilități moderne pentru relaxare totală.",
    gallerySuperiorDoubleRoomBeds: "2 paturi duble",
    galleryStandardOneBedroomApartmentTitle: "Apartament Standard cu Un Dormitor",
    galleryStandardOneBedroomApartmentDescription: "Apartament cochet, complet utilat pentru o experiență de cazare independentă. Ideal pentru sejururi mai lungi sau escapade urbane.",
    galleryStandardOneBedroomApartmentBeds: "1 pat dublu + 1 pat single + 1 canapea extensibilă",
    // NEW: Missing translation for Two Bedroom Apartment
    galleryTwoBedroomApartmentTitle: "Apartament cu Două Dormitoare",
    galleryTwoBedroomApartmentDescription: "Apartament modern cu două dormitoare, perfect pentru familii sau grupuri mici. Oferă intimitate, spațiu și toate facilitățile necesare unui sejur relaxant.",
    galleryTwoBedroomApartmentBeds: "3 paturi duble + 1 pat single + 1 pat etajat",
    // Image category translations
    galleryImageCategoryDormitor: "Dormitor",
    galleryImageCategoryTerasa: "Terasă",
    galleryImageCategoryBaie: "Baie",
    galleryImageCategoryBucatarie: "Bucătărie",
    galleryImageCategoryLiving: "Living",
    galleryImageCategoryBalcon: "Balcon",
    // NEW: Additional image category translations that might be used
    galleryImageCategoryHol: "Hol",
    galleryImageCategoryParcare: "Parcare",
    galleryImageCategoryIntrare: "Intrare",
    galleryImageCategoryBucatarieModerna: "Bucătărie Modernă",
    galleryImageCategoryMiniBucatarie: "Mini Bucătărie",
    galleryImageCategoryBaieModerna: "Baie Modernă",
    galleryImageCategoryBalconPrivat: "Balcon Privat",
    galleryImageCategoryBalconSigur: "Balcon Sigur",
    galleryImageCategoryDormitorPrincipal: "Dormitor Principal",
    galleryImageCategoryDormitorSecundar: "Dormitor Secundar",
    galleryImageCategoryCameracopiilor: "Camera Copiilor",
    galleryImageCategoryBucatarieOpenSpace: "Bucătărie Open-Space",
    // Gallery amenities
    gallerydormitor: "Dormitor",
    gallerydormitories: "Dormitoare",
    gallerybathroom: "Baie",
    gallerybathrooms: "Băi"
  },
  en: {
    home: 'Home',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
    language: 'Language',
    footerDescription: 'Experience luxurious living in the heart of Satu Mare. Modern rooms with premium amenities and elegant design for discerning residents.',
    quickNavigation: 'Quick Navigation',
    contactInfo: 'Contact Information',
    copyright: `© ${new Date().getFullYear()} Pannonia Apartments. All rights reserved. Website created by Secară Lucas-Victor.`,
    indexHeroSubtitle: 'We create spaces that inspire tranquility since 2012',
    indexAboutButton: 'Discover More',
    indexContactButton: 'Contact us',
    indexAmenitiesTitle: 'Premium Amenities',
    indexAmenitiesDescription: 'Enjoy world-class facilities designed to enhance your lifestyle and provide maximum comfort.',
    indexWifiTitle: "High-Speed Internet",
    indexWifiDescription: "Free fiber optic internet throughout the building for seamless connectivity.",
    indexParkingTitle: "Free Parking",
    indexParkingDescription: "Parking spaces available in the courtyard, with direct access. Guests confirm security and convenience.",
    indexTvTitle: "Everything Ready for Your Comfort",
    indexTvDescription: "Flat-screen TV, air conditioning, washing and drying machine, refrigerator, microwave, and fully equipped kitchen – all for a worry-free stay.",
    indexCallToActionTitle: 'Your perfect vacation starts here.',
    indexCallToActionDescription: 'Contact us to find out more information and discover why Pannonia Apartments is the perfect choice for your next vacation.',
    indeXCallToActionButton: 'Get in Touch',
    indexGalleryButton: 'View Gallery',
    // About Page Translations
    aboutHeroTitle: 'Our Story',
    aboutHeroSubtitle: 'Born from a passion for creating spaces that nourish the soul, Pannonia represents the perfect harmony between timeless elegance and modern comfort.',
    aboutLocationTitle: 'Our Location',
    aboutLocationDescription: 'Located near the city center of Satu Mare, our apartments offer quick and convenient access to all urban facilities.',
    aboutAddress: 'Strada Dsida Jeno, Nr. 18',
    aboutCityCountry: '440050 Satu Mare, Romania',
    aboutBookingButton: '🏨 BOOK NOW ON BOOKING.COM',
    aboutGlovoPrompt: 'Craving something delicious?',
    aboutGlovoDescription: 'Discover the best dishes in Satu Mare, delivered quickly via Glovo.',
    aboutGlovoButton: '🛵 Order with Glovo',
    aboutExploreAreaTitle: 'Explore the Area',
    aboutExploreAreaDescription: 'Discover the best dishes in Satu Mare, delivered quickly via Glovo.',
    aboutExploreAreaButton: 'Explore Satu Mare',
    aboutTranquilityTitle: 'Tranquility in the Heart of Satu Mare',
    aboutTranquilityDescription: 'Pannónia Rooms and Apartments welcomes you to a quiet area, just a 2-minute drive from the old town (Chains Church, Firefighters Tower, Catholic Cathedral, Rome Garden Park). The nearby shop and the Somes river bank — 500m away — make the location an ideal choice.',
    aboutInspiringSpaces: 'We create spaces that inspire tranquility since 2012',
    aboutSpecialTitle: 'What Makes Us Truly Special',
    aboutDesignTitle: 'Conscious Design',
    aboutDesignDescription: 'New furniture, „Bien Dormir" orthopedic mattresses, premium hypoallergenic pillows.',
    aboutConnectionTitle: 'Personal Connection',
    aboutConnectionDescription: 'The residence does not have a physical reception, but communicate effectively before and during the stay.',
    aboutApproachTitle: 'Holistic Approach',
    aboutApproachDescription: 'Considering how light, texture, color, and flow work together to enhance daily life and well-being.',
    aboutPhilosophyTitle: 'Our Philosophy',
    aboutPhilosophyQuote: 'True elegance is not about being noticed, but about being remembered for the feeling you create.',
    aboutPhilosophyDescription: 'This philosophy guides everything we do. We create spaces that not only look beautiful, but feel meaningful—environments that become the backdrop for life\'s most precious moments.',
    // Contact Page Translations
    contactHeroTitle: 'Get in Touch',
    contactFormTitle: 'Tell Us About Your Interest',
    contactFormName: 'Full Name',
    contactFormEmail: 'Email Address',
    contactFormMessage: 'Tell Us More',
    contactFormMessagePlaceholder: 'Share your questions, specific requirements, desired period, or any other relevant details...',
    contactFormSubmit: 'Send Message',
    contactInfoTitle: 'Get in Touch',
    contactInfoEmailLabel: 'Email',
    contactInfoPhoneLabel: 'Phone',
    contactInfoLocationLabel: 'Location',
    contactToastSuccessTitle: 'Message Sent',
    contactToastSuccessDescription: 'Thank you for your interest. We will contact you within 24 hours.',
    contactToastErrorTitle: 'Error',
    contactToastErrorDescription: 'An error occurred while sending the message.',
    contactToastNetworkError: 'Could not send the message. Please try again later.',
    // Gallery Page Translations
    galleryHeroTitle: 'Our Gallery',
    galleryHeroSubtitle: 'Discover the elegance and comfort of our apartments through our image collection. Each photo captures the attention to detail and the welcoming atmosphere we offer.',
    galleryCTATitle: "Book an Apartment",
    galleryCTADescription: "Contact us to find out more information and discover why Pannonia Apartments is the perfect choice for your next vacation.",
    galleryCTABookButton: "Contact Us",
    galleryLocation: 'Satu Mare, Romania',
    galleryBedrooms: 'Bedrooms',
    galleryBeds: 'Beds',
    galleryBathrooms: 'Bathrooms',
    galleryArea: 'Area',
    gallerySqM: 'sqm',
    galleryDoubleRoomTitle: "Double Room",
    galleryDoubleRoomDescription: "Bright and elegantly furnished double room, ideal for a comfortable stay for two. Equipped with modern facilities for total relaxation.",
    galleryDoubleRoomBeds: "1 double bed",
    gallerySuperiorTripleRoomTitle: "Quadruple Apartment",
    gallerySuperiorTripleRoomDescription: "Elegant and spacious room, suitable for 4 people. A combination of comfort, style, and functionality.",
    gallerySuperiorTripleRoomBeds: "4 single beds",
    galleryFamilyRoomTitle: "Family Room with Shower",
    galleryFamilyRoomDescription: "Generous space dedicated to families, with a warm and functional design. Perfect for peaceful and comfortable vacations with loved ones.",
    galleryFamilyRoomBeds: "2 double beds",
    gallerySuperiorDoubleRoomTitle: "Superior Double Room",
    gallerySuperiorDoubleRoomDescription: "Bright and elegantly furnished double room, ideal for a comfortable stay for two. Equipped with modern facilities for total relaxation.",
    gallerySuperiorDoubleRoomBeds: "2 double beds",
    galleryStandardOneBedroomApartmentTitle: "Standard One Bedroom Apartment",
    galleryStandardOneBedroomApartmentDescription: "Cozy apartment, fully equipped for an independent accommodation experience. Ideal for longer stays or urban getaways.",
    galleryStandardOneBedroomApartmentBeds: "1 double bed + 1 single bed + 1 sofa bed",
    // NEW: Missing translation for Two Bedroom Apartment
    galleryTwoBedroomApartmentTitle: "Two Bedroom Apartment",
    galleryTwoBedroomApartmentDescription: "Modern apartment with two bedrooms, perfect for families or small groups. Offers privacy, space, and all amenities needed for a relaxing stay.",
    galleryTwoBedroomApartmentBeds: "3 double beds + 1 single bed + 1 bunk bed",
    // Image category translations
    galleryImageCategoryDormitor: "Bedroom",
    galleryImageCategoryTerasa: "Terrace",
    galleryImageCategoryBaie: "Bathroom",
    galleryImageCategoryBucatarie: "Kitchen",
    galleryImageCategoryLiving: "Living Room",
    galleryImageCategoryBalcon: "Balcony",
    // NEW: Additional image category translations that might be used
    galleryImageCategoryHol: "Hallway",
    galleryImageCategoryParcare: "Parking",
    galleryImageCategoryIntrare: "Entrance",
    galleryImageCategoryBucatarieModerna: "Modern Kitchen",
    galleryImageCategoryMiniBucatarie: "Mini Kitchen",
    galleryImageCategoryBaieModerna: "Modern Bathroom",
    galleryImageCategoryBalconPrivat: "Private Balcony",
    galleryImageCategoryBalconSigur: "Safe Balcony",
    galleryImageCategoryDormitorPrincipal: "Master Bedroom",
    galleryImageCategoryDormitorSecundar: "Secondary Bedroom",
    galleryImageCategoryCameracopiilor: "Children's Room",
    galleryImageCategoryBucatarieOpenSpace: "Open-Space Kitchen",
    // Gallery amenities
    gallerydormitor: "Bedroom",
    gallerydormitories: "Bedrooms",
    gallerybathroom: "Bathroom",
    gallerybathrooms: "Bathrooms"
  },
  hu: {
    home: 'Főoldal',
    about: 'Rólunk',
    gallery: 'Galéria',
    contact: 'Kapcsolat',
    language: 'Nyelv',
    footerDescription: 'Élvezze a luxus életmódot Szatmár szívében. Modern szobák prémium felszereltséggel és elegáns dizájnnal igényes lakók számára.',
    quickNavigation: 'Gyors navigáció',
    contactInfo: 'Kapcsolati információk',
    copyright: `© ${new Date().getFullYear()} Pannonia Apartments. Minden jog fenntartva. Weboldal készítője: Secară Lucas-Victor.`,
    indexHeroSubtitle: '2012 óta hozunk létre nyugalmat inspiráló tereket',
    indexAboutButton: 'Tudjon meg többet',
    indexContactButton: 'Kapcsolat',
    indexAmenitiesTitle: 'Prémium felszereltség',
    indexAmenitiesDescription: 'Élvezze a világszínvonalú szolgáltatásokat, melyek életstílusának fejlesztésére és maximális kényelméért lettek tervezve.',
    indexWifiTitle: "Nagy sebességű internet",
    indexWifiDescription: "Ingyenes optikai internet az egész épületben a megszakítás nélküli kapcsolatért.",
    indexParkingTitle: "Ingyenes parkolás",
    indexParkingDescription: "Parkolóhelyek az udvaron, közvetlen hozzáféréssel. A vendégek megerősítik a biztonságot és kényelmet.",
    indexTvTitle: "Minden készen áll az Ön kényelméért",
    indexTvDescription: "Lapos képernyős TV, légkondicionáló, mosógép és ruhaszárító, hűtőszekrény, mikrohullámú sütő és teljesen felszerelt konyha – minden a gondtalan tartózkodásért.",
    indexCallToActionTitle: 'Tökéletes nyaralása itt kezdődik.',
    indexCallToActionDescription: 'Vegye fel velünk a kapcsolatot további információkért és fedezze fel, miért a Pannonia Apartments a tökéletes választás következő nyaralásához.',
    indeXCallToActionButton: 'Kapcsolatfelvétel',
    indexGalleryButton: 'Galéria',
    // About Page Translations
    aboutHeroTitle: 'Történetünk',
    aboutHeroSubtitle: 'A lélek tápláló terek iránti szenvedélyből született Pannonia a időtlen elegancia és modern kényelem tökéletes harmóniáját képviseli.',
    aboutLocationTitle: 'Helyszínünk',
    aboutLocationDescription: 'Szatmár városközpontja közelében elhelyezkedő apartmanjaink gyors és kényelmes hozzáférést biztosítanak minden városi szolgáltatáshoz.',
    aboutAddress: 'Dsida Jenő utca 18.',
    aboutCityCountry: '440050 Szatmárnémeti, Románia',
    aboutBookingButton: '🏨 FOGLALJON MOST A BOOKING.COM-ON',
    aboutGlovoPrompt: 'Vágyik valami finomra?',
    aboutGlovoDescription: 'Fedezze fel Szatmár legjobb ételeit, gyorsan szállítva a Glovo-val.',
    aboutGlovoButton: '🛵 Rendeljen Glovo-val',
    aboutExploreAreaTitle: 'Fedezze fel a környéket',
    aboutExploreAreaDescription: 'Fedezze fel Szatmár legjobb ételeit, gyorsan szállítva a Glovo-val.',
    aboutExploreAreaButton: 'Fedezze fel Szatmárt',
    aboutTranquilityTitle: 'Nyugalom Szatmár szívében',
    aboutTranquilityDescription: 'A Pannónia Rooms and Apartments csendes környezetben várja Önt, mindössze 2 percre autóval a belvárostól (Láncos templom, Tűzoltótorony, Katolikus székesegyház, Róma kert park). A közeli bolt és a Szamos-part — 500 méterre — ideális választássá teszi a helyszínt.',
    aboutInspiringSpaces: '2012 óta hozunk létre nyugalmat inspiráló tereket',
    aboutSpecialTitle: 'Mi tesz minket igazán különlegessé',
    aboutDesignTitle: 'Tudatos tervezés',
    aboutDesignDescription: 'Új bútorok, „Bien Dormir" ortopéd matracok, prémium hipoallergén párnák.',
    aboutConnectionTitle: 'Személyes kapcsolat',
    aboutConnectionDescription: 'A lakóhely nincs fizikai recepciójuk, de hatékonyan kommunikálnak a tartózkodás előtt és alatt.',
    aboutApproachTitle: 'Holisztikus megközelítés',
    aboutApproachDescription: 'Figyelembe véve, hogy a fény, textúra, szín és áramlás hogyan működik együtt a mindennapi élet és jólét javításáért.',
    aboutPhilosophyTitle: 'Filozófiánk',
    aboutPhilosophyQuote: 'Az igazi elegancia nem arról szól, hogy észrevegyenek, hanem arról, hogy emlékezzenek az érzésre, amit keltesz.',
    aboutPhilosophyDescription: 'Ez a filozófia vezérli mindazt, amit teszünk. Olyan tereket hozunk létre, amelyek nemcsak szépek, de jelentőségteljesek—környezetek, melyek az élet legdrágább pillanatainak hátterévé válnak.',
    // Contact Page Translations
    contactHeroTitle: 'Vegye fel a kapcsolatot',
    contactFormTitle: 'Meséljen érdeklődéséről',
    contactFormName: 'Teljes név',
    contactFormEmail: 'E-mail cím',
    contactFormMessage: 'Mondjon többet',
    contactFormMessagePlaceholder: 'Ossza meg kérdéseit, konkrét igényeit, kívánt időszakot vagy bármilyen egyéb releváns részletet...',
    contactFormSubmit: 'Üzenet küldése',
    contactInfoTitle: 'Kapcsolatfelvétel',
    contactInfoEmailLabel: 'E-mail',
    contactInfoPhoneLabel: 'Telefon',
    contactInfoLocationLabel: 'Helyszín',
    contactToastSuccessTitle: 'Üzenet elküldve',
    contactToastSuccessDescription: 'Köszönjük érdeklődését. 24 órán belül felvesszük Önnel a kapcsolatot.',
    contactToastErrorTitle: 'Hiba',
    contactToastErrorDescription: 'Hiba történt az üzenet küldése során.',
    contactToastNetworkError: 'Az üzenet nem küldhető el. Próbálja újra később.',
    // Gallery Page Translations
    galleryHeroTitle: 'Galériánk',
    galleryHeroSubtitle: 'Fedezze fel apartmanjaink elegenciáját és kényelmét képgyűjteményünkön keresztül. Minden fotó megragadja a részletekre való figyelmet és a vendégszerető légkört, amelyet kínálunk.',
    galleryCTATitle: "Foglaljon apartmant",
    galleryCTADescription: "Vegye fel velünk a kapcsolatot további információkért és fedezze fel, miért a Pannonia Apartments a tökéletes választás következő nyaralásához.",
    galleryCTABookButton: "Kapcsolat",
    galleryLocation: 'Szatmárnémeti, Románia',
    galleryBedrooms: 'Hálószobák',
    galleryBeds: 'Ágyak',
    galleryBathrooms: 'Fürdőszobák',
    galleryArea: 'Terület',
    gallerySqM: 'nm',
    galleryDoubleRoomTitle: "Kétágyas szoba",
    galleryDoubleRoomDescription: "Világos és elegánsan berendezett kétágyas szoba, ideális ketten való kényelmes tartózkodáshoz. Modern felszereltséggel a teljes kikapcsolódásért.",
    galleryDoubleRoomBeds: "1 dupla ágy",
    gallerySuperiorTripleRoomTitle: "Négyfős apartman",
    gallerySuperiorTripleRoomDescription: "Elegáns és tágas szoba, 4 fő számára alkalmas. A kényelem, stílus és funkcionalitás kombinációja.",
    gallerySuperiorTripleRoomBeds: "4 egyszemélyes ágy",
    galleryFamilyRoomTitle: "Családi szoba zuhanyzóval",
    galleryFamilyRoomDescription: "Családok számára dedikált bőséges tér, meleg és funkcionális dizájnnal. Tökéletes nyugodt és kényelmes nyaralásokhoz szeretteivel.",
    galleryFamilyRoomBeds: "2 dupla ágy",
    gallerySuperiorDoubleRoomTitle: "Superior kétágyas szoba",
    gallerySuperiorDoubleRoomDescription: "Világos és elegánsan berendezett kétágyas szoba, ideális ketten való kényelmes tartózkodáshoz. Modern felszereltséggel a teljes kikapcsolódásért.",
    gallerySuperiorDoubleRoomBeds: "2 dupla ágy",
    galleryStandardOneBedroomApartmentTitle: "Standard egyhálószobás apartman",
    galleryStandardOneBedroomApartmentDescription: "Hangulatos apartman, teljesen felszerelt az önálló szállásélményért. Ideális hosszabb tartózkodásokhoz vagy városi kiruccanásokhoz.",
    galleryStandardOneBedroomApartmentBeds: "1 dupla ágy + 1 egyszemélyes ágy + 1 kanapéágy",
    galleryTwoBedroomApartmentTitle: "Kéthálószobás apartman",
    galleryTwoBedroomApartmentDescription: "Modern apartman két hálószobával, tökéletes családok vagy kis csoportok számára. Privát szférát, teret és minden szükséges felszereltséget biztosít a pihentető tartózkodáshoz.",
    galleryTwoBedroomApartmentBeds: "3 dupla ágy + 1 egyszemélyes ágy + 1 emeletes ágy",
    // Image category translations
    galleryImageCategoryDormitor: "Hálószoba",
    galleryImageCategoryTerasa: "Terasz",
    galleryImageCategoryBaie: "Fürdőszoba",
    galleryImageCategoryBucatarie: "Konyha",
    galleryImageCategoryLiving: "Nappali",
    galleryImageCategoryBalcon: "Erkély",
    // NEW: Additional image category translations that might be used
    galleryImageCategoryHol: "Folyosó",
    galleryImageCategoryParcare: "Parkoló",
    galleryImageCategoryIntrare: "Bejárat",
    galleryImageCategoryBucatarieModerna: "Modern konyha",
    galleryImageCategoryMiniBucatarie: "Mini konyha",
    galleryImageCategoryBaieModerna: "Modern fürdőszoba",
    galleryImageCategoryBalconPrivat: "Privát erkély",
    galleryImageCategoryBalconSigur: "Biztonságos erkély",
    galleryImageCategoryDormitorPrincipal: "Fő hálószoba",
    galleryImageCategoryDormitorSecundar: "Második hálószoba",
    galleryImageCategoryCameracopiilor: "Gyerekszoba",
    galleryImageCategoryBucatarieOpenSpace: "Nyitott konyha",
    // Gallery amenities
    gallerydormitor: "Hálószoba",
    gallerydormitories: "Hálószobák",
    gallerybathroom: "Fürdőszoba",
    gallerybathrooms: "Fürdőszobák"
  }
} as const;

// Language Provider Component with persistence
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, fallback to 'ro'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'ro' || saved === 'hu') ? saved : 'ro';
    }
    return 'ro';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const t = (key: string) => {
    const translation = translations[language][key as keyof typeof translations.ro];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};