import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { SEOHead, seoConfigs, getCategorySEO } from '@/components/SEOHead';
import type { Product } from '@shared/schema';

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showSpecialOffers, setShowSpecialOffers] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryFromUrl = urlParams.get('category');
  const searchFromUrl = urlParams.get('search');
  const filterFromUrl = urlParams.get('filter');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Calculate price range from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000000;
    return Math.max(...products.map(p => p.price));
  }, [products]);

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
        p.category.toLowerCase().includes(lowercaseQuery) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply special offers filter
    if (showSpecialOffers) {
      filtered = filtered.filter(p => p.isSpecialOffer);
    }

    // Apply in stock filter
    if (showInStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, categoryFromUrl, searchFromUrl, filterFromUrl, priceRange, showSpecialOffers, showInStock]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('name');
    setPriceRange([0, maxPrice]);
    setShowSpecialOffers(false);
    setShowInStock(false);
  };

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
    { value: 'popularity', label: 'Mashhurligi bo\'yicha' },
    { value: 'newest', label: 'Yangi mahsulotlar' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const getPageTitle = () => {
    if (filterFromUrl === 'special') return 'Aksiyadagi Mahsulotlar';
    if (categoryFromUrl) {
      const category = categories.find(c => c.value === categoryFromUrl);
      return category?.label || 'Mahsulotlar';
    }
    if (searchFromUrl) return `"${searchFromUrl}" qidiruv natijalari`;
    return 'Barcha Mahsulotlar';
  };

  // Dynamic SEO based on current page
  const getSEOConfig = () => {
    if (categoryFromUrl) {
      return getCategorySEO(categoryFromUrl, filteredProducts.length);
    }
    if (filterFromUrl === 'special') {
      return {
        title: 'Aksiyadagi Mahsulotlar - SportZone',
        description: `SportZone'da aksiyadagi ${filteredProducts.length} ta sport mahsulot. Chegirmalar va maxsus takliflar.`,
        keywords: 'aksiya, chegirma, sport mahsulotlar, arzon narx, sportzone'
      };
    }
    if (searchFromUrl) {
      return {
        title: `"${searchFromUrl}" qidiruv natijalari - SportZone`,
        description: `"${searchFromUrl}" bo'yicha ${filteredProducts.length} ta natija topildi. SportZone'da eng yaxshi sport mahsulotlari.`,
        keywords: `${searchFromUrl}, qidiruv, sport mahsulotlar, sportzone`
      };
    }
    return seoConfigs.products;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHead {...getSEOConfig()} />
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
          {/* Top Row - Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-2"
              data-testid="advanced-filters-toggle"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Kengaytirilgan filtrlar
            </Button>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={isFiltersOpen}>
            <CollapsibleContent className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Narx oralig'i</Label>
                  <div className="px-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={maxPrice}
                      min={0}
                      step={10000}
                      className="w-full"
                      data-testid="price-range-slider"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Qo'shimcha filtrlar</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="special-offers"
                        checked={showSpecialOffers}
                        onCheckedChange={setShowSpecialOffers}
                        data-testid="filter-special-offers"
                      />
                      <Label htmlFor="special-offers" className="text-sm cursor-pointer">
                        Faqat aksiyalar
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={showInStock}
                        onCheckedChange={setShowInStock}
                        data-testid="filter-in-stock"
                      />
                      <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                        Faqat mavjud mahsulotlar
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Amallar</Label>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                      data-testid="clear-filters"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Filtrlarni tozalash
                    </Button>
                    <div className="text-xs text-muted-foreground text-center">
                      {filteredProducts.length} ta mahsulot topildi
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
