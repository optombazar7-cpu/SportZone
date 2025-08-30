import React from 'react';
import { Link } from 'wouter';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';

const blogPosts = [
  {
    id: 1,
    title: 'Tog\' turizmida zarur jihozlar',
    excerpt: 'Tog\' turizmiga chiqishdan oldin qanday jihozlar kerakligi haqida to\'liq qo\'llanma',
    content: 'Tog\' turizmi juda qiziqarli va sog\'liq uchun foydali mashg\'ulotdir...',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    author: 'Ali Karimov',
    date: '2024-08-25',
    readTime: '5 daqiqa',
    category: 'Turizm'
  },
  {
    id: 2,
    title: 'Uy sharoitida sport mashqlari',
    excerpt: 'Uy sharoitida qanday qilib samarali sport mashqlari qilish mumkinligi haqida',
    content: 'Uy sharoitida sport mashqlari qilish uchun maxsus jihozlar...',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    author: 'Malika Tosheva',
    date: '2024-08-20',
    readTime: '7 daqiqa',
    category: 'Fitness'
  },
  {
    id: 3,
    title: 'Professional futbol jihozlari',
    excerpt: 'Futbol o\'yinchilari uchun eng zarur jihozlar va ularni tanlash bo\'yicha maslahatlar',
    content: 'Professional futbolda yuqori natijaga erishish uchun...',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    author: 'Bobur Rahimov',
    date: '2024-08-15',
    readTime: '6 daqiqa',
    category: 'Futbol'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Blog - SportZone" 
        description="Sport, fitness va sog'liq hayot tarzi haqida foydali maqolalar" 
      />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 hero-gradient" data-testid="blog-hero">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-poppins font-bold mb-6" data-testid="blog-title">
              Sport Blogi
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-inter" data-testid="blog-description">
              Sport, fitness va sog'liq hayot tarzi haqida foydali maslahatlar, yangiliklar va qo'llanmalar
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-card rounded-2xl professional-shadow overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-border/50" data-testid={`blog-post-${post.id}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-poppins font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`post-title-${post.id}`}>
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`post-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary w-full group" data-testid={`read-more-${post.id}`}>
                    To'liq o'qish
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}