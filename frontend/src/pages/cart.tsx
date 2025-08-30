import React from 'react';
import { Link } from 'wouter';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, isLoading } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantity(cartItemId, newQuantity);
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Miqdorni o'zgartirishda xatolik yuz berdi",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId);
      toast({
        title: "Mahsulot o'chirildi",
        description: "Mahsulot savatdan o'chirildi",
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Mahsulotni o'chirishda xatolik yuz berdi",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center" data-testid="cart-loading">
            <p>Yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" className="mb-4" data-testid="back-to-products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Xaridni davom ettirish
            </Button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground" data-testid="cart-title">
            Savatcha
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16" data-testid="empty-cart">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Savat bo'sh</h2>
            <p className="text-muted-foreground mb-8">Hozircha hech qanday mahsulot qo'shilmagan</p>
            <Link href="/products">
              <Button size="lg" data-testid="start-shopping">
                Xarid qilishni boshlash
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-card rounded-lg p-6 shadow-sm" data-testid={`cart-item-${item.id}`}>
                  <div className="flex items-center space-x-4">
                    <Link href={`/product/${item.product.id}`}>
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        data-testid={`cart-item-image-${item.id}`}
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-poppins font-semibold text-foreground hover:text-primary cursor-pointer" data-testid={`cart-item-name-${item.id}`}>
                          {item.product.name}
                        </h3>
                      </Link>
                      
                      {item.size && (
                        <p className="text-sm text-muted-foreground" data-testid={`cart-item-size-${item.id}`}>
                          O'lcham: {item.size}
                        </p>
                      )}
                      
                      <p className="text-lg font-semibold text-foreground" data-testid={`cart-item-price-${item.id}`}>
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        data-testid={`decrease-quantity-${item.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="font-semibold min-w-[2rem] text-center" data-testid={`cart-item-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        data-testid={`increase-quantity-${item.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground" data-testid={`cart-item-total-${item.id}`}>
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive mt-2"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-sm sticky top-8" data-testid="order-summary">
                <h3 className="text-xl font-poppins font-semibold text-foreground mb-4">
                  Buyurtma xulosasi
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mahsulotlar soni:</span>
                    <span className="font-medium" data-testid="total-items">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)} ta
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yetkazib berish:</span>
                    <span className="font-medium text-green-600">Bepul</span>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Jami:</span>
                      <span data-testid="cart-total">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button size="lg" className="w-full btn-primary font-montserrat font-semibold" data-testid="proceed-to-checkout">
                    Buyurtma berish
                  </Button>
                </Link>
                
                <Link href="/products">
                  <Button variant="outline" size="lg" className="w-full mt-3" data-testid="continue-shopping">
                    Xaridni davom ettirish
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
