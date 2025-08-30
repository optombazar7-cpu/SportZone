import React, { useState } from 'react';
import { Link } from 'wouter';
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Email obuna funksiyasini qo'shish
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      <div className="relative py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">SZ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-montserrat font-bold">SportZone</h3>
                  <p className="text-slate-400 text-sm">Sport dunyosi</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed font-inter">
                O'zbekistondagi eng ishonchli sport mahsulotlari do'koni. 
                Professional sportchilar va sport ishqibozlari uchun eng sifatli mahsulotlar.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-300">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  <span>+998 90 123 45 67</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  <span>info@sportzone.uz</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <MapPin className="h-4 w-4 mr-3 text-primary" />
                  <span>Toshkent, Amir Temur ko'chasi 42</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 group" data-testid="facebook-link">
                  <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 group" data-testid="instagram-link">
                  <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 group" data-testid="telegram-link">
                  <MessageCircle className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-poppins font-semibold mb-6 text-white">Tezkor Havolalar</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-home">
                    Bosh sahifa
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-products">
                    Mahsulotlar
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-about">
                    Biz haqimizda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-contact">
                    Aloqa
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="text-lg font-poppins font-semibold mb-6 text-white">Kategoriyalar</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products?category=kiyim" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="category-clothing">
                    Sport Kiyimlar
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=poyabzal" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="category-shoes">
                    Poyabzallar
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=jihozlar" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="category-equipment">
                    Fitnes Jihozlari
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=aksessuarlar" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="category-accessories">
                    Aksessuarlar
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-poppins font-semibold mb-6 text-white">Mijozlar Xizmati</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-help">
                    Yordam
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-shipping">
                    Yetkazib berish
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-returns">
                    Qaytarish
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="text-slate-400 hover:text-white transition-colors duration-300 font-inter" data-testid="footer-warranty">
                    Kafolat
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-poppins font-semibold mb-6 text-white">Yangiliklar</h3>
              <p className="text-slate-400 mb-4 font-inter">
                Aksiyalar va yangi mahsulotlar haqida birinchi bo'lib xabar oling
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input 
                  type="email"
                  placeholder="Email manzilingiz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  data-testid="newsletter-email"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  data-testid="newsletter-subscribe"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Obuna bo'lish
                </Button>
              </form>
              
              {/* Payment Methods */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3 text-slate-300">To'lov usullari</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-800 text-xs px-3 py-2 rounded-lg text-center" data-testid="payment-click">Click</div>
                  <div className="bg-slate-800 text-xs px-3 py-2 rounded-lg text-center" data-testid="payment-payme">Payme</div>
                  <div className="bg-slate-800 text-xs px-3 py-2 rounded-lg text-center" data-testid="payment-cash">Naqd</div>
                  <div className="bg-slate-800 text-xs px-3 py-2 rounded-lg text-center" data-testid="payment-uzcard">Uzcard</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-slate-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-400 font-inter" data-testid="copyright">
                &copy; 2024 SportZone. Barcha huquqlar himoyalangan.
              </p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm font-inter" data-testid="privacy-link">
                  Maxfiylik
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-inter" data-testid="terms-link">
                  Shartlar
                </Link>
                <Link href="/sitemap" className="text-slate-400 hover:text-white transition-colors text-sm font-inter" data-testid="sitemap-link">
                  Sayt xaritasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}