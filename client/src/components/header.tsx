import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { CartModal } from './cart-modal.tsx';

export function Header() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navigationLinks = [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/products', label: 'Mahsulotlar' },
    { href: '/products?filter=special', label: 'Aksiyalar' },
    { href: '/contact', label: 'Aloqa' },
  ];

  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
              <div className="w-8 h-8 lg:w-10 lg:h-10 hero-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-dumbbell text-white text-lg lg:text-xl"></i>
              </div>
              <span className="text-xl lg:text-2xl font-poppins font-bold text-foreground">
                SportZone
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Mahsulot qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2"
                  data-testid="search-input"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </form>
            </div>
            
            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
                data-testid="cart-button"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs cart-badge"
                    data-testid="cart-badge"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
                data-testid="mobile-menu-button"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu fixed top-0 left-0 w-full h-full bg-background z-50 lg:hidden ${isMenuOpen ? 'open' : ''}`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-poppins font-bold">SportZone</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-menu-close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-medium text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <form onSubmit={handleSearch} className="mt-8">
              <Input
                type="text"
                placeholder="Mahsulot qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-3"
                data-testid="mobile-search-input"
              />
            </form>
          </div>
        </div>
      </header>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
