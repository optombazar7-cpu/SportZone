import React from 'react';
import { Link } from 'wouter';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="cart-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppins font-bold">Savat</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8" data-testid="cart-loading">
              <p>Yuklanmoqda...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8" data-testid="empty-cart">
              <p className="text-muted-foreground mb-4">Savat bo'sh</p>
              <Link href="/products">
                <Button onClick={onClose} data-testid="continue-shopping">
                  Xarid qilishni davom ettirish
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-border pb-4" data-testid={`cart-item-${item.id}`}>
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    data-testid={`cart-item-image-${item.id}`}
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-foreground" data-testid={`cart-item-name-${item.id}`}>
                      {item.product.name}
                    </h3>
                    {item.size && (
                      <p className="text-sm text-muted-foreground" data-testid={`cart-item-size-${item.id}`}>
                        O'lcham: {item.size}
                      </p>
                    )}
                    <p className="text-sm font-medium" data-testid={`cart-item-price-${item.id}`}>
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
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
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      data-testid={`increase-quantity-${item.id}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-foreground" data-testid={`cart-item-total-${item.id}`}>
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`remove-item-${item.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-6 border-t border-border">
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Jami:</span>
                  <span data-testid="cart-total">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="space-y-2">
                  <Link href="/checkout">
                    <Button 
                      className="w-full btn-primary font-montserrat font-semibold"
                      onClick={onClose}
                      data-testid="checkout-button"
                    >
                      Buyurtma Berish
                    </Button>
                  </Link>
                  
                  <Link href="/products">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={onClose}
                      data-testid="continue-shopping-button"
                    >
                      Xarid qilishni davom ettirish
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
