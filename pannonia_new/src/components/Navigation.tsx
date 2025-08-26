import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from './Language';
import LanguageSwitch from './LanguageSwitch';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('contact'), path: '/contact' },
  ];

  const NavLink = ({ item, onClick }: { item: { name: string; path: string }, onClick?: () => void }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary ${
          isActive ? 'text-primary' : 'text-foreground/80'
        }`}
      >
        {item.name}
        {isActive && (
          <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-playfair font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Pannónia Rooms & Apartments
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>

            {/* Desktop Language Switch */}
            <LanguageSwitch />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <Link
                  to="/"
                  className="text-2xl font-playfair font-semibold text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Pannónia
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      item={item}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </nav>

                {/* Mobile Language Switch */}
                <div className="pt-4 border-t border-muted">
                  <h4 className="text-sm font-medium text-foreground mb-3">{t('language')}</h4>
                  <LanguageSwitch isMobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
