import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@shared/schema';

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryFromUrl = urlParams.get('category');
  const searchFromUrl = urlParams.get('search');
  const filterFromUrl = urlParams.get('filter');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply URL-based filters
    if (filterFromUrl === 'special') {
      filtered = filtered.filter(p => p.isSpecialOffer);
    } else if (categoryFromUrl) {
      filtered = filtered.filter(p => p.category === categoryFromUrl);
    }

    // Apply search filter
    const query = searchFromUrl || searchQuery;
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, categoryFromUrl, searchFromUrl, filterFromUrl]);

  const categories = [
    { value: 'all', label: 'Barcha kategoriyalar' },
    { value: 'kiyim', label: 'Sport Kiyimlar' },
    { value: 'poyabzal', label: 'Poyabzallar' },
    { value: 'jihozlar', label: 'Jihozlar' },
    { value: 'aksessuarlar', label: 'Aksessuarlar' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Nomi bo\'yicha' },
    { value: 'price-low', label: 'Narxi: Arzondan qimmaga' },
    { value: 'price-high', label: 'Narxi: Qimmatdan arzonga' },
  ];

  const getPageTitle = () => {
    if (filterFromUrl === 'special') return 'Aksiyadagi Mahsulotlar';
    if (categoryFromUrl) {
      const category = categories.find(c => c.value === categoryFromUrl);
      return category?.label || 'Mahsulotlar';
    }
    if (searchFromUrl) return `"${searchFromUrl}" qidiruv natijalari`;
    return 'Barcha Mahsulotlar';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-4" data-testid="page-title">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="page-description">
            {filteredProducts.length} ta mahsulot topildi
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm" data-testid="filters-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Mahsulot qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-input"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger data-testid="category-filter">
                <SelectValue placeholder="Kategoriya tanlang" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value} data-testid={`category-option-${category.value}`}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger data-testid="sort-filter">
                <SelectValue placeholder="Saralash" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} data-testid={`sort-option-${option.value}`}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-loading">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16" data-testid="no-products">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Mahsulot topilmadi</h3>
            <p className="text-muted-foreground">Qidiruv shartlarini o'zgartiring yoki boshqa kategoriyani tanlang</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
