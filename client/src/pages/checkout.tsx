import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, CreditCard, MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { OrderRequest } from '@/lib/types';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Ism kiritish majburiy';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Telefon raqam kiritish majburiy';
    } else if (!/^(\+998|998)?[0-9]{9}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = 'Telefon raqam formati noto\'g\'ri';
    }

    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email formati noto\'g\'ri';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Yetkazib berish manzili kiritish majburiy';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'To\'lov usulini tanlang';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: OrderRequest) => {
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
    onSuccess: async (data) => {
      await clearCart();
      toast({
        title: "Buyurtma muvaffaqiyatli yaratildi!",
        description: `Buyurtma raqami: ${data.order.id}`,
      });
      setLocation('/');
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Buyurtma yaratishda xatolik yuz berdi",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Savat bo'sh",
        description: "Buyurtma berish uchun mahsulot qo'shing",
        variant: "destructive",
      });
      return;
    }

    const orderData: OrderRequest = {
      order: {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || undefined,
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod,
        totalAmount: getTotalPrice(),
      },
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size || undefined,
        price: item.product.price,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16" data-testid="empty-cart-checkout">
            <h1 className="text-2xl font-bold text-foreground mb-4">Savat bo'sh</h1>
            <p className="text-muted-foreground mb-8">Buyurtma berish uchun avval mahsulot qo'shing</p>
            <Link href="/products">
              <Button size="lg" data-testid="go-to-products">
                Mahsulotlarga o'tish
              </Button>
            </Link>
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
          <Link href="/cart">
            <Button variant="ghost" className="mb-4" data-testid="back-to-cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Savatga qaytish
            </Button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground" data-testid="checkout-title">
            Buyurtma Berish
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card data-testid="customer-info-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Shaxsiy Ma'lumotlar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Ism va Familiya *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="Ismingizni kiriting"
                      className={errors.customerName ? 'border-destructive' : ''}
                      data-testid="input-customer-name"
                    />
                    {errors.customerName && (
                      <p className="text-sm text-destructive mt-1" data-testid="error-customer-name">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Telefon Raqam *</Label>
                    <Input
                      id="customerPhone"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className={errors.customerPhone ? 'border-destructive' : ''}
                      data-testid="input-customer-phone"
                    />
                    {errors.customerPhone && (
                      <p className="text-sm text-destructive mt-1" data-testid="error-customer-phone">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerEmail">Email (ixtiyoriy)</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      placeholder="email@example.com"
                      className={errors.customerEmail ? 'border-destructive' : ''}
                      data-testid="input-customer-email"
                    />
                    {errors.customerEmail && (
                      <p className="text-sm text-destructive mt-1" data-testid="error-customer-email">
                        {errors.customerEmail}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card data-testid="delivery-info-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Yetkazib Berish Ma'lumotlari
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="deliveryAddress">To'liq Manzil *</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      placeholder="Shahar, ko'cha, uy raqami, kvartira raqami"
                      rows={3}
                      className={errors.deliveryAddress ? 'border-destructive' : ''}
                      data-testid="input-delivery-address"
                    />
                    {errors.deliveryAddress && (
                      <p className="text-sm text-destructive mt-1" data-testid="error-delivery-address">
                        {errors.deliveryAddress}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card data-testid="payment-method-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    To'lov Usuli
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    className="space-y-3"
                    data-testid="payment-method-group"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="click" id="click" data-testid="payment-click" />
                      <Label htmlFor="click" className="flex items-center cursor-pointer">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">Click</span>
                        Click orqali to'lash
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="payme" id="payme" data-testid="payment-payme" />
                      <Label htmlFor="payme" className="flex items-center cursor-pointer">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2">Payme</span>
                        Payme orqali to'lash
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" data-testid="payment-cash" />
                      <Label htmlFor="cash" className="flex items-center cursor-pointer">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm mr-2">Naqd</span>
                        Yetkazib berganda to'lash
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="uzcard" id="uzcard" data-testid="payment-uzcard" />
                      <Label htmlFor="uzcard" className="flex items-center cursor-pointer">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm mr-2">Uzcard</span>
                        Uzcard orqali to'lash
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.paymentMethod && (
                    <p className="text-sm text-destructive mt-2" data-testid="error-payment-method">
                      {errors.paymentMethod}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8" data-testid="order-summary-card">
                <CardHeader>
                  <CardTitle>Buyurtma Xulosasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3" data-testid={`checkout-item-${item.id}`}>
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          data-testid={`checkout-item-image-${item.id}`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm" data-testid={`checkout-item-name-${item.id}`}>
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground" data-testid={`checkout-item-details-${item.id}`}>
                            {item.size && `O'lcham: ${item.size} • `}Miqdor: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-sm" data-testid={`checkout-item-price-${item.id}`}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mahsulotlar:</span>
                      <span data-testid="subtotal">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Yetkazib berish:</span>
                      <span className="text-green-600" data-testid="shipping-cost">Bepul</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                      <span>Jami:</span>
                      <span data-testid="total-amount">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-primary font-montserrat font-semibold"
                    disabled={createOrderMutation.isPending}
                    data-testid="place-order-button"
                  >
                    {createOrderMutation.isPending ? 'Buyurtma berilmoqda...' : 'Buyurtma Berish'}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Buyurtma berish orqali siz bizning <br />
                    <a href="#" className="text-primary underline">Xizmat shartlari</a> bilan rozisiz
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
