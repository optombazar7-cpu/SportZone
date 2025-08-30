import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({ 
  title = "SportZone - O'zbekistondagi Eng Yaxshi Sport Magazini",
  description = "SportZone'da sport kiyimlari, poyabzallar va jihozlarning keng assortimentini toping. Yuqori sifat, qulay narxlar va tez yetkazib berish. Nike, Adidas va boshqa brendlar.",
  keywords = "sport, kiyim, poyabzal, jihozlar, fitnes, nike, adidas, sport magazin, o'zbekiston, toshkent",
  image = "/og-image.jpg",
  url = "https://sportzone.uz",
  type = "website"
}: SEOHeadProps) {
  
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic Meta Tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow');
    updateMeta('viewport', 'width=device-width, initial-scale=1.0');
    updateMeta('author', 'SportZone');
    
    // Open Graph Meta Tags
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    updateMeta('og:url', url);
    updateMeta('og:type', type);
    updateMeta('og:site_name', 'SportZone');
    updateMeta('og:locale', 'uz_UZ');
    
    // Twitter Card Meta Tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    
    // Additional SEO tags
    updateMeta('theme-color', '#1e40af');
    updateMeta('msapplication-TileColor', '#1e40af');
    
  }, [title, description, keywords, image, url, type]);

  return null;
}

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: "SportZone - O'zbekistondagi Eng Yaxshi Sport Magazini",
    description: "SportZone'da sport kiyimlari, poyabzallar va jihozlarning keng assortimentini toping. Nike, Adidas va premium brandlar. Bepul yetkazib berish va qulay to'lov.",
    keywords: "sport magazin, sport kiyim, sport poyabzal, fitnes jihozlari, nike, adidas, toshkent, o'zbekiston"
  },
  
  products: {
    title: "Sport Mahsulotlari - SportZone Katalogi",
    description: "Sportga oid barcha mahsulotlar: kiyimlar, poyabzallar, jihozlar va aksessuarlar. Yuqori sifat va qulay narxlarda.",
    keywords: "sport mahsulotlar, sport kiyim, poyabzal, jihozlar, katalog, sport aksesuarlar"
  },
  
  cart: {
    title: "Savat - SportZone",
    description: "Sizning tanlagan sport mahsulotlaringiz. Tez va oson buyurtma berish jarayoni.",
    keywords: "savat, buyurtma, sport mahsulotlar xarid"
  },
  
  checkout: {
    title: "Buyurtma Berish - SportZone",
    description: "SportZone'da xavfsiz va qulay buyurtma berish. Click, Payme, Uzcard to'lov usullari qo'llab-quvvatlanadi.",
    keywords: "buyurtma, to'lov, checkout, click, payme, uzcard"
  },
  
  login: {
    title: "Tizimga Kirish - SportZone",
    description: "SportZone akkauntingizga kiring va maxsus takliflardan foydalaning.",
    keywords: "kirish, akkaunt, login, sport magazin"
  },
  
  register: {
    title: "Ro'yxatdan O'tish - SportZone",
    description: "SportZone'da ro'yxatdan o'ting va maxsus chegirmalardan foydalaning. Tez va bepul ro'yxatdan o'tish.",
    keywords: "ro'yxat, akkaunt yaratish, register, sport magazin"
  },
  
  profile: {
    title: "Shaxsiy Kabinet - SportZone",
    description: "Shaxsiy ma'lumotlaringizni boshqaring, buyurtmalar tarixini ko'ring va sevimli mahsulotlarni saqlang.",
    keywords: "profil, shaxsiy kabinet, buyurtmalar tarixi, account"
  },
  
  contact: {
    title: "Aloqa - SportZone",
    description: "SportZone bilan bog'laning. Mijozlarni qo'llab-quvvatlash xizmati va do'kon manzillari.",
    keywords: "aloqa, kontakt, qo'llab-quvvatlash, manzil, telefon"
  }
};

// Dynamic SEO for product pages
export const getProductSEO = (productName: string, productDescription: string, category: string) => ({
  title: `${productName} - SportZone`,
  description: `${productName}: ${productDescription}. SportZone'da eng yaxshi narxlarda. Tez yetkazib berish va kafolat.`,
  keywords: `${productName}, ${category}, sport, ${productName.toLowerCase()}, sportzone`
});

// Dynamic SEO for category pages  
export const getCategorySEO = (category: string, productCount: number) => {
  const categoryNames: Record<string, string> = {
    'kiyim': 'Sport Kiyimlari',
    'poyabzal': 'Sport Poyabzallari', 
    'jihozlar': 'Sport Jihozlari',
    'aksessuarlar': 'Sport Aksessuarlari'
  };
  
  const categoryName = categoryNames[category] || 'Mahsulotlar';
  
  return {
    title: `${categoryName} - SportZone`,
    description: `${categoryName} bo'yicha ${productCount} ta mahsulot. SportZone'da eng yaxshi narxlar va sifat kafolati.`,
    keywords: `${category}, sport ${category}, ${categoryName.toLowerCase()}, sport magazin`
  };
};