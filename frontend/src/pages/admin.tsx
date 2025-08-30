import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Package, ShoppingCart, Users, BarChart3, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    imageUrl: '',
    sizes: [] as string[],
    inStock: true,
    isSpecialOffer: false,
    isBestSeller: false,
    isNewArrival: false
  });

  // Check if user is admin
  if (!user || !user.isAdmin) {
    setLocation('/');
    return null;
  }

  // Fetch products for admin
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products'],
  }) as { data: any[], isLoading: boolean };

  const mockOrders = [
    {
      id: "ORD001",
      customerName: "Ali Karimov",
      customerPhone: "+998901234567",
      customerEmail: "ali@example.com",
      deliveryAddress: "Toshkent sh., Chilonzor tumani",
      paymentMethod: "click",
      totalAmount: 450000,
      status: "yangi",
      createdAt: "2024-01-15T10:30:00Z",
      items: [
        { productName: "Nike Air Max", quantity: 1, price: 450000 }
      ]
    },
    {
      id: "ORD002",
      customerName: "Malika Toshmatova",
      customerPhone: "+998901234568",
      customerEmail: "malika@example.com",
      deliveryAddress: "Samarqand sh., Registon ko'chasi",
      paymentMethod: "payme",
      totalAmount: 330000,
      status: "qayta ishlanyapti",
      createdAt: "2024-01-14T15:45:00Z",
      items: [
        { productName: "Sport Ko'ylak", quantity: 1, price: 160000 },
        { productName: "Yoga Matı", quantity: 1, price: 120000 }
      ]
    }
  ];

  const mockUsers = [
    { id: "1", firstName: "Ali", lastName: "Karimov", email: "ali@example.com", isAdmin: false, createdAt: "2024-01-10" },
    { id: "2", firstName: "Malika", lastName: "Toshmatova", email: "malika@example.com", isAdmin: false, createdAt: "2024-01-12" },
    { id: "3", firstName: "Admin", lastName: "User", email: "admin@sportzone.uz", isAdmin: true, createdAt: "2024-01-01" }
  ];

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'yangi': return 'bg-blue-100 text-blue-800';
      case 'qayta ishlanyapti': return 'bg-yellow-100 text-yellow-800';
      case 'jo\'natilmoqda': return 'bg-purple-100 text-purple-800';
      case 'yetkazilgan': return 'bg-green-100 text-green-800';
      case 'bekor qilingan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      toast({
        title: "Xatolik",
        description: "Barcha majburiy maydonlarni to'ldiring",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Muvaffaqiyat!",
      description: "Mahsulot muvaffaqiyatli qo'shildi",
    });

    // Reset form
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      subcategory: '',
      imageUrl: '',
      sizes: [],
      inStock: true,
      isSpecialOffer: false,
      isBestSeller: false,
      isNewArrival: false
    });
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Muvaffaqiyat!",
      description: `Buyurtma #${orderId} holati ${newStatus}ga o'zgartirildi`,
    });
  };

  const categories = [
    "poyabzal", "kiyim", "jihozlar", "aksessuarlar"
  ];

  const subcategories = {
    poyabzal: ["yugurish", "basketbol", "futbol", "tennis"],
    kiyim: ["ko'ylak", "short", "shim", "jaket"],
    jihozlar: ["fitnes", "yoga", "ağırlık", "kardio"],
    aksessuarlar: ["audio", "texnologiya", "mashq", "hydration"]
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "38", "39", "40", "41", "42", "43", "44", "45"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">Admin Panel</CardTitle>
                <CardDescription className="text-lg">
                  SportZone boshqaruv paneli
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Salom, {user.firstName}!</p>
                <Badge className="bg-green-100 text-green-800">Admin</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Mahsulotlar</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Buyurtmalar</p>
                  <p className="text-2xl font-bold">{mockOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Foydalanuvchilar</p>
                  <p className="text-2xl font-bold">{mockUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Oylik savdo</p>
                  <p className="text-2xl font-bold">₹2.8M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
            <TabsTrigger value="products">Mahsulotlar</TabsTrigger>
            <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
            <TabsTrigger value="analytics">Statistika</TabsTrigger>
          </TabsList>

          {/* Orders Management */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Buyurtmalarni boshqarish</CardTitle>
                <CardDescription>Barcha buyurtmalar va ularning holatlari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Buyurtma #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.customerName} • {order.customerPhone}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{order.totalAmount.toLocaleString()} so'm</p>
                          <Badge className={getOrderStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Email:</strong> {order.customerEmail}</p>
                          <p><strong>Manzil:</strong> {order.deliveryAddress}</p>
                        </div>
                        <div>
                          <p><strong>To'lov:</strong> {order.paymentMethod}</p>
                          <p><strong>Sana:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Mahsulotlar:</h4>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            {item.productName} × {item.quantity} = {item.price.toLocaleString()} so'm
                          </p>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Select
                          defaultValue={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yangi">Yangi</SelectItem>
                            <SelectItem value="qayta ishlanyapti">Qayta ishlanyapti</SelectItem>
                            <SelectItem value="jo'natilmoqda">Jo'natilmoqda</SelectItem>
                            <SelectItem value="yetkazilgan">Yetkazilgan</SelectItem>
                            <SelectItem value="bekor qilingan">Bekor qilingan</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Batafsil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Management */}
          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add New Product */}
              <Card>
                <CardHeader>
                  <CardTitle>Yangi mahsulot qo'shish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Mahsulot nomi *</Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Nike Air Max"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Tavsif *</Label>
                    <Textarea
                      id="productDescription"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="Mahsulot haqida batafsil ma'lumot"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Narx (so'm) *</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="450000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productImageUrl">Rasm URL</Label>
                      <Input
                        id="productImageUrl"
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Kategoriya *</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({...newProduct, category: value, subcategory: ''})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategoriya tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Subkategoriya</Label>
                      <Select
                        value={newProduct.subcategory}
                        onValueChange={(value) => setNewProduct({...newProduct, subcategory: value})}
                        disabled={!newProduct.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Subkategoriya tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {newProduct.category && subcategories[newProduct.category as keyof typeof subcategories]?.map(subcat => (
                            <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleAddProduct} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Mahsulot qo'shish
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Mavjud mahsulotlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {productsLoading ? (
                      <p>Yuklanmoqda...</p>
                    ) : (
                      products.map((product: any) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {product.price?.toLocaleString()} so'm
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Foydalanuvchilarni boshqarish</CardTitle>
                <CardDescription>Barcha ro'yxatdan o'tgan foydalanuvchilar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{user.firstName} {user.lastName}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Ro'yxatdan o'tdi: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.isAdmin && (
                          <Badge className="bg-green-100 text-green-800">Admin</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eng ko'p sotilgan mahsulotlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Nike Air Max</span>
                      <Badge>45 ta</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sport Ko'ylak</span>
                      <Badge>32 ta</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Yoga Matı</span>
                      <Badge>28 ta</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Oylik hisobot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Umumiy savdo:</span>
                      <span className="font-bold">12,450,000 so'm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Buyurtmalar soni:</span>
                      <span className="font-bold">156 ta</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yangi mijozlar:</span>
                      <span className="font-bold">23 ta</span>
                    </div>
                    <div className="flex justify-between">
                      <span>O'rtacha buyurtma:</span>
                      <span className="font-bold">79,800 so'm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}