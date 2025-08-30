import React from 'react';
import { Target, Users, Award, Heart, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  const stats = [
    { icon: Users, number: '10,000+', label: 'Mijozlar' },
    { icon: Award, number: '500+', label: 'Mahsulotlar' },
    { icon: Shield, number: '99%', label: 'Mamnunlik' },
    { icon: Truck, number: '24/7', label: 'Yetkazib berish' }
  ];

  const team = [
    {
      name: 'Alisher Karimov',
      position: 'Asoschi va Boshqaruvchi Direktor',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
      description: 'Sport sohasida 10 yillik tajriba va professional sportchilar bilan ish tajribasi'
    },
    {
      name: 'Malika Tosheva',
      position: 'Marketing Direktorii',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
      description: 'Mijozlar bilan aloqa va marketing strategiyalarini ishlab chiqish bo\'yicha mutahassis'
    },
    {
      name: 'Bobur Rahimov',
      position: 'Mahsulot Mutahassisi',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
      description: 'Sport jihozlari va texnologiyalari bo\'yicha chuqur bilimga ega mutahassis'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Biz haqimizda - SportZone" 
        description="SportZone jamoasi va bizning missiyamiz haqida batafsil ma'lumot" 
      />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 hero-gradient text-white" data-testid="about-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-poppins font-bold mb-8" data-testid="about-title">
              Biz haqimizda
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-inter" data-testid="about-description">
              SportZone - O'zbekistondagi eng ishonchli sport mahsulotlari do'koni. 
              Bizning maqsadimiz har bir odamni sportga jalb qilish va sog'liq hayot tarzini targ'ib qilishdir.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-6" data-testid="mission-title">
                Bizning Maqsadimiz
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="mission-description">
                SportZone sifatida bizning asosiy maqsadimiz O'zbekistondagi har bir sport sevarga 
                eng sifatli va qulay narxdagi sport mahsulotlarini taqdim etishdir. Biz sportni 
                hayotning ajralmas qismi deb hisoblaymiz va har bir odamni faol hayot tarziga 
                undashga harakat qilamiz.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="h-6 w-6 text-primary mr-3" />
                  <span className="font-medium">Sifatli mahsulotlar va xizmatlar</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-primary mr-3" />
                  <span className="font-medium">Mijozlar mamnunligi birinchi o'rinda</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <span className="font-medium">Ishonchli va xavfsiz xaridlar</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Team working together"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-foreground font-montserrat mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-inter">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-4" data-testid="team-title">
              Bizning Jamoa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="team-description">
              Professional va tajribali mutahassislar jamoasi sizga xizmat ko'rsatish uchun tayyor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-2xl professional-shadow p-6 text-center hover:shadow-2xl transition-all duration-500 border border-border/50" data-testid={`team-member-${index}`}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                />
                <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}