import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Agar foydalanuvchi tizimga kirmagan bo'lsa, login sahifasiga yo'naltirish
  if (!user) {
    setLocation('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Muvaffaqiyat",
      description: "Tizimdan chiqib ketdingiz",
    });
    setLocation('/');
  };

  const mockOrders = [
    {
      id: "1",
      date: "2024-01-15",
      total: 450000,
      status: "yetkazilgan",
      items: 3
    },
    {
      id: "2", 
      date: "2024-01-10",
      total: 280000,
      status: "yo'lda",
      items: 2
    }
  ];

  const mockFavorites = [
    {
      id: "1",
      name: "Nike Air Max",
      price: 450000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "5",
      name: "Sport Naushnik", 
      price: 250000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yetkazilgan': return 'bg-green-100 text-green-800';
      case 'yo\'lda': return 'bg-blue-100 text-blue-800';
      case 'qayta ishlanyapti': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* User Info Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    @{user.username} • {user.email}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Chiqish
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Buyurtmalar</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Sevimlilar</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Manzillar</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Sozlamalar</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Buyurtmalar tarixi</CardTitle>
                <CardDescription>
                  Sizning barcha buyurtmalaringiz ro'yxati
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      data-testid={`order-${order.id}`}
                    >
                      <div className="space-y-1">
                        <div className="font-medium">Buyurtma #{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.date} • {order.items} ta mahsulot
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="font-bold">
                          {order.total.toLocaleString()} so'm
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sevimli mahsulotlar</CardTitle>
                <CardDescription>
                  Siz yoqtirgan mahsulotlar ro'yxati
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockFavorites.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      data-testid={`favorite-${product.id}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-primary font-bold">
                          {product.price.toLocaleString()} so'm
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Ko'rish
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Yetkazib berish manzillari</CardTitle>
                <CardDescription>
                  Sizning saqlangan manzillaringiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Yangi manzil qo'shish
                  </Button>
                  <div className="text-center text-muted-foreground py-8">
                    Hali manzil qo'shilmagan
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
                <CardDescription>
                  Hisobingiz ma'lumotlarini tahrirlang
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ism</Label>
                    <Input
                      id="firstName"
                      defaultValue={user.firstName}
                      data-testid="input-firstName"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Familiya</Label>
                    <Input
                      id="lastName"
                      defaultValue={user.lastName}
                      data-testid="input-lastName"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    data-testid="input-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue={user.phone || ''}
                    placeholder="+998 90 123 45 67"
                    data-testid="input-phone"
                  />
                </div>

                <Button className="w-full" data-testid="button-save">
                  Ma'lumotlarni saqlash
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}