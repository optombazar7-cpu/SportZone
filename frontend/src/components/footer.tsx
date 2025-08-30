import React from 'react';
import { Link } from 'wouter';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-dumbbell text-white"></i>
              </div>
              <span className="text-xl font-poppins font-bold">SportZone</span>
            </div>
            <p className="text-gray-400 mb-4">
              O'zbekistondagi eng yaxshi sport mahsulotlari do'koni. Sizning sport maqsadlaringizga erishishda yordamchi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="facebook-link">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="instagram-link">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="telegram-link">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Tezkor Havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-home">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-products">
                  Mahsulotlar
                </Link>
              </li>
              <li>
                <Link href="/products?filter=special" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-offers">
                  Aksiyalar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-contact">
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Kategoriyalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=kiyim" className="text-gray-400 hover:text-white transition-colors" data-testid="category-clothing">
                  Sport Kiyimlar
                </Link>
              </li>
              <li>
                <Link href="/products?category=poyabzal" className="text-gray-400 hover:text-white transition-colors" data-testid="category-shoes">
                  Poyabzallar
                </Link>
              </li>
              <li>
                <Link href="/products?category=jihozlar" className="text-gray-400 hover:text-white transition-colors" data-testid="category-equipment">
                  Fitnes Jihozlari
                </Link>
              </li>
              <li>
                <Link href="/products?category=aksessuarlar" className="text-gray-400 hover:text-white transition-colors" data-testid="category-accessories">
                  Aksessuarlar
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">To'lov Usullari</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-800 text-xs px-2 py-1 rounded" data-testid="payment-click">Click</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded" data-testid="payment-payme">Payme</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded" data-testid="payment-cash">Naqd</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded" data-testid="payment-uzcard">Uzcard</span>
            </div>
            <p className="text-gray-400 text-sm">Barcha to'lovlar xavfsiz va himoyalangan</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400" data-testid="copyright">
            &copy; 2024 SportZone. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
