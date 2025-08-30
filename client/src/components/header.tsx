import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, Menu, X, User, LogIn, UserPlus, Settings, Zap, Percent, BookOpen, Info, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { CartModal } from './cart-modal.tsx';
import logoUrl from '../assets/logo.png';

export function Header() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navigationLinks = [
    { href: '/', label: 'Bosh sahifa', icon: null },
    { href: '/products', label: 'Mahsulotlar', icon: null },
    { href: '/products?filter=special', label: 'Aksiyalar', icon: Percent },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/about', label: 'Biz haqimizda', icon: Info },
    { href: '/contact', label: 'Aloqa', icon: Phone },
  ];

  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border professional-shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 lg:h-22">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group" data-testid="logo-link">
              <div className="relative">
                <img 
                  src={logoUrl} 
                  alt="SportZone Logo" 
                  className="h-14 lg:h-18 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-montserrat font-bold text-primary">SportZone</h1>
                <p className="text-xs text-muted-foreground font-inter">Sport dunyosi</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <Button 
                      variant="ghost" 
                      className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium px-4 py-2 rounded-lg group"
                      data-testid={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {IconComponent && <IconComponent className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full group">
                <Input
                  type="text"
                  placeholder="Mahsulot qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-3 rounded-full border-2 focus:border-primary transition-all duration-300 bg-background/80 backdrop-blur-sm"
                  data-testid="search-input"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors duration-300" />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
                  data-testid="search-submit"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            {/* User Menu, Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid="user-menu-trigger">
                      <div className="w-8 h-8 hero-gradient rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer" data-testid="menu-profile">
                        <User className="mr-2 h-4 w-4" />
                        Profil
                      </Link>
                    </DropdownMenuItem>
                    {user.isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer" data-testid="menu-admin">
                            <Settings className="mr-2 h-4 w-4" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600" data-testid="menu-logout">
                      <LogIn className="mr-2 h-4 w-4" />
                      Chiqish
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild data-testid="button-login">
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Kirish
                    </Link>
                  </Button>
                  <Button size="sm" asChild data-testid="button-register">
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Ro'yxat
                    </Link>
                  </Button>
                </div>
              )}

              {/* Professional Cart */}
              <Button
                variant="ghost"
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 hover:bg-primary/10 transition-all duration-300 group rounded-full"
                data-testid="cart-button"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-300" />
                  {totalItems > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-accent text-accent-foreground animate-pulse"
                      data-testid="cart-badge"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </div>
                <span className="ml-2 hidden sm:inline font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  Savat
                </span>
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
              <img 
                src={logoUrl} 
                alt="SportZone Logo" 
                className="h-12 w-auto object-contain"
              />
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
