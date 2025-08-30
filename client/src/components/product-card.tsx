import React from 'react';
import { Link } from 'wouter';
import { Plus, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product.id);
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

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card rounded-2xl professional-shadow overflow-hidden product-card group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-border/50" data-testid={`product-card-${product.id}`}>
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            data-testid={`product-image-${product.id}`}
          />
          
          {/* Professional Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isSpecialOffer && discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg" data-testid={`discount-badge-${product.id}`}>
                -{discountPercentage}%
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg" data-testid={`bestseller-badge-${product.id}`}>
                <Flame className="h-4 w-4 mr-1" />
                TOP
              </Badge>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        </div>
        
        <div className="p-6">
          <h3 className="font-poppins font-bold text-lg text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed" data-testid={`product-description-${product.id}`}>
            {product.description}
          </p>
          
          <div className="flex items-baseline space-x-3 mb-4">
            <span className="text-2xl font-bold text-primary font-montserrat" data-testid={`product-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through font-medium" data-testid={`product-original-price-${product.id}`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating Stars (Static for now) */}
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {'★'.repeat(5)}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">(4.8)</span>
          </div>
        </div>
      </Link>
      
      {showQuickAdd && (
        <div className="flex items-center gap-3 p-6 pt-0">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-medium"
              data-testid={`view-details-${product.id}`}
            >
              Batafsil
            </Button>
          </Link>
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            onClick={handleAddToCart}
            data-testid={`add-to-cart-${product.id}`}
          >
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Savatga
          </Button>
        </div>
      )}
    </div>
  );
}
