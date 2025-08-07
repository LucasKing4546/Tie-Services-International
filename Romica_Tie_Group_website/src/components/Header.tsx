import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Quality & Compliance', href: '#quality' },
    { name: 'Projects', href: '#projects' },
    { name: 'Global Network', href: '#network' },
    { name: 'Support & Service', href: '#support' },
    { name: 'Resources', href: '#resources' },
    { name: 'About Us', href: '#about' }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold ocean-text-gradient">
              ROMICA TIE GROUP
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-9 h-9"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Find Local Agent
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Partner With Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background shadow-lg rounded-lg mt-2 border border-border">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="w-full justify-start"
                >
                  {theme === 'light' ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary">
                  Find Local Agent
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
