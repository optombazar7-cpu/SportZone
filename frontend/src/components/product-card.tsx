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
    <div className="bg-card rounded-xl shadow-lg overflow-hidden product-card group cursor-pointer" data-testid={`product-card-${product.id}`}>
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-testid={`product-image-${product.id}`}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-1">
            {product.isSpecialOffer && discountPercentage > 0 && (
              <Badge variant="secondary" className="text-xs font-semibold" data-testid={`discount-badge-${product.id}`}>
                -{discountPercentage}%
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-accent text-accent-foreground text-xs font-semibold" data-testid={`bestseller-badge-${product.id}`}>
                <Flame className="h-3 w-3 mr-1" />
                TOP
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-poppins font-semibold text-foreground mb-2" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`product-description-${product.id}`}>
            {product.description}
          </p>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-foreground" data-testid={`product-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`product-original-price-${product.id}`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      {showQuickAdd && (
        <div className="flex items-center justify-between p-4 pt-0">
          <Link href={`/product/${product.id}`}>
            <Button variant="outline" size="sm" data-testid={`view-details-${product.id}`}>
              Batafsil
            </Button>
          </Link>
          
          <Button 
            size="sm" 
            className="btn-accent"
            onClick={handleAddToCart}
            data-testid={`add-to-cart-${product.id}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
