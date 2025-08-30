import React, { useState } from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['/api/products', id],
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "O'lcham tanlang",
        description: "Iltimos, mahsulot o'lchamini tanlang",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart(product.id, quantity, selectedSize || undefined);
      toast({
        title: "Mahsulot qo'shildi",
        description: `${product.name} savatga qo'shildi`,
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Mahsulotni savatga qo'shishda xatolik yuz berdi",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16" data-testid="product-not-found">
            <h1 className="text-2xl font-bold text-foreground mb-4">Mahsulot topilmadi</h1>
            <p className="text-muted-foreground mb-8">So'ralgan mahsulot mavjud emas</p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Orqaga qaytish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
          data-testid="back-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga qaytish
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images and Video */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
                data-testid="product-main-image"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.isSpecialOffer && discountPercentage > 0 && (
                  <Badge variant="secondary" className="font-semibold" data-testid="discount-badge">
                    -{discountPercentage}%
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-accent text-accent-foreground font-semibold" data-testid="bestseller-badge">
                    TOP
                  </Badge>
                )}
                {product.isNewArrival && (
                  <Badge variant="outline" className="font-semibold" data-testid="new-badge">
                    YANGI
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Additional Images Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Qo'shimcha rasmlar</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={image}
                        alt={`${product.name} - Rasm ${index + 1}`}
                        className="w-full h-20 object-cover hover:scale-105 transition-transform cursor-pointer"
                        data-testid={`product-image-${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Video Section */}
            {product.videoUrl && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Mahsulot videosi</h3>
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <iframe
                    src={product.videoUrl}
                    title={`${product.name} - Video`}
                    className="w-full h-64 lg:h-80"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="product-video"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-4" data-testid="product-name">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl lg:text-3xl font-bold text-foreground" data-testid="product-price">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through" data-testid="original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="product-description">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">O'lcham</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full" data-testid="size-selector">
                    <SelectValue placeholder="O'lcham tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map(size => (
                      <SelectItem key={size} value={size} data-testid={`size-option-${size}`}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Miqdor</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="font-semibold text-lg min-w-[3rem] text-center" data-testid="quantity-display">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full btn-primary font-montserrat font-semibold text-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                data-testid="add-to-cart-button"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? 'Savatga qo\'shish' : 'Mavjud emas'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full font-semibold"
                data-testid="add-to-wishlist"
              >
                <Heart className="mr-2 h-5 w-5" />
                Sevimlilarga qo'shish
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">Kategoriya:</span>
                  <p className="text-muted-foreground capitalize" data-testid="product-category">
                    {product.category}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Holati:</span>
                  <p className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`} data-testid="product-stock">
                    {product.inStock ? 'Mavjud' : 'Mavjud emas'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
