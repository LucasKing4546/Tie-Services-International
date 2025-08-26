import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
// 1. Import the useLanguage hook
import { useLanguage } from "./Language"; // Adjust path if needed

const Footer = () => {
  // 2. Get the translation function 't' from the hook
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a322f] text-white border-t border-white/10">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-playfair font-semibold mb-4 block"
            >
              Pannónia Rooms & Apartments
            </Link>
            {/* 3. Replace hard-coded text with translation keys */}
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-playfair font-semibold mb-4">
              {t('quickNavigation')}
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block text-white/80 hover:text-primary transition-colors">
                {t('home')}
              </Link>
              <Link to="/about" className="block text-white/80 hover:text-primary transition-colors">
                {t('about')}
              </Link>
              <Link to="/gallery" className="block text-white/80 hover:text-primary transition-colors">
                {t('gallery')}
              </Link>
              <Link to="/contact" className="block text-white/80 hover:text-primary transition-colors">
                {t('contact')}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-playfair font-semibold mb-4">
              {t('contactInfo')}
            </h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <span>rezervari@pannonia.ro</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span>+40 725 998 278</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-primary" />
                <span>Satu Mare, România</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/60">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;