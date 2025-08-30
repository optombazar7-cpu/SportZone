import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Truck, Shield, Headphones, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product-card';
import { SEOHead, seoConfigs } from '@/components/SEOHead';
import type { Product } from '@shared/schema';

export default function Home() {
  const { data: specialOffers = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/special/offers'],
  });

  const { data: newArrivals = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/special/newarrivals'],
  });

  const { data: bestSellers = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/special/bestsellers'],
  });

  const categories = [
    {
      title: 'Sport Kiyimlar',
      description: 'Har qanday mashq uchun qulay va zamonaviy sport kiyimlar',
      image: 'https://pixabay.com/get/g4dd5fce9b9ca8b6bba9b7e7b1eac8b51acd1722470a5063dddeb9da970173bdb720520f9b74410f05e1ea5daa427622ded5211209b43d4828ba727165b920982_1280.jpg',
      href: '/products?category=kiyim',
    },
    {
      title: 'Sport Poyabzallar',
      description: 'Yuqori sifatli va qulaylik uchun mo\'ljallangan poyabzallar',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      href: '/products?category=poyabzal',
    },
    {
      title: 'Sport Jihozlari',
      description: 'Professional mashqlar uchun zamonaviy jihozlar',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      href: '/products?category=jihozlar',
    },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Tez Yetkazib Berish',
      description: 'Butun O\'zbekiston bo\'yicha 1-3 kun ichida yetkazib berish',
    },
    {
      icon: Shield,
      title: 'Sifat Kafolati',
      description: 'Barcha mahsulotlar 100% original va sifat kafolati bilan',
    },
    {
      icon: Headphones,
      title: '24/7 Qo\'llab-quvvatlash',
      description: 'Kun-tun mijozlarga yordam va maslahat xizmati',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoConfigs.home} />
      {/* Hero Section */}
      <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 hero-section"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Professional athletes training" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-6 inline-block">
              <Badge className="bg-accent text-accent-foreground font-montserrat font-semibold">
                <Zap className="mr-1 h-4 w-4" />
                Sport bilan hayotingizni o'zgartiring!
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-7xl font-poppins font-bold mb-8 leading-tight text-white" data-testid="hero-title">
              Professional <span className="text-accent">Sport</span> Dunyosiga Xush Kelibsiz
            </h1>
            <p className="text-xl lg:text-2xl mb-10 text-white/90 font-inter leading-relaxed" data-testid="hero-description">
              Eng sifatli sport mahsulotlari va jihozlari bilan sportda yangi cho'qqilarni zabt eting. 
              Professional sportchilar va foydalanuvchilar tanlovini kashf qiling.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-montserrat font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-accent/25 transition-all duration-300 group"
                  data-testid="hero-shop-button"
                >
                  Hozir Xarid Qiling
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/products?filter=new">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-montserrat font-bold text-xl px-8 py-4 rounded-full backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                  data-testid="hero-new-products-button"
                >
                  Yangi Mahsulotlar
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
            <div className="text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold font-montserrat mb-2">500+</div>
              <div className="text-white/80 font-inter">Mahsulotlar</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold font-montserrat mb-2">10K+</div>
              <div className="text-white/80 font-inter">Mijozlar</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold font-montserrat mb-2">99%</div>
              <div className="text-white/80 font-inter">Mamnunlik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24 bg-background" data-testid="categories-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-4" data-testid="categories-title">
              Kategoriyalar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="categories-description">
              Har qanday sport turlari uchun kerakli mahsulotlarni toping
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <div className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 product-card cursor-pointer" data-testid={`category-card-${index}`}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-poppins font-semibold text-foreground mb-2" data-testid={`category-title-${index}`}>
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4" data-testid={`category-description-${index}`}>
                      {category.description}
                    </p>
                    <span className="text-primary font-montserrat font-semibold hover:text-primary/80 transition-colors inline-flex items-center" data-testid={`category-link-${index}`}>
                      Ko'rish <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {specialOffers.length > 0 && (
        <section className="py-16 lg:py-24 relative overflow-hidden" data-testid="special-offers-section">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20"></div>
          
          <div className="relative container mx-auto px-4">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🔥 Chegirmalar
              </div>
              <h2 className="text-3xl lg:text-5xl font-poppins font-bold text-foreground mb-4" data-testid="offers-title">
                Aksiyadagi Mahsulotlar
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter" data-testid="offers-description">
                50% gacha chegirmalar va maxsus takliflar
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {specialOffers.slice(0, 4).map((product) => (
                <div key={product.id} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/products?filter=special">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 professional-shadow">
                  Barcha aksiyalarni ko'rish
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 lg:py-24 bg-background" data-testid="new-arrivals-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-4" data-testid="new-arrivals-title">
                Yangi Kelganlar
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="new-arrivals-description">
                Eng so'nggi sport mahsulotlari va texnologiyalar
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/20" data-testid="best-sellers-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground mb-4" data-testid="best-sellers-title">
                Eng Ko'p Sotilganlar
              </h3>
              <p className="text-lg text-muted-foreground" data-testid="best-sellers-description">
                Mijozlarimiz eng ko'p tanlagan mahsulotlar
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellers.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center" data-testid={`feature-${index}`}>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-foreground mb-2" data-testid={`feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
