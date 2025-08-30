import { type User, type InsertUser, type Product, type InsertProduct, type CartItem, type InsertCartItem, type Order, type InsertOrder, type OrderItem, type InsertOrderItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getSpecialOffers(): Promise<Product[]>;
  getBestSellers(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart methods
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrder(id: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Nike Air Max",
        description: "Premium yugurish poyabzali, qulay va zamonaviy dizayn",
        price: 450000,
        originalPrice: 600000,
        category: "poyabzal",
        subcategory: "yugurish",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        sizes: ["40", "41", "42", "43", "44"],
        inStock: true,
        isSpecialOffer: true,
        isBestSeller: false,
        isNewArrival: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Fitnes Rezinalari",
        description: "Professional mashqlar uchun yuqori sifatli rezina to'plami",
        price: 85000,
        originalPrice: 120000,
        category: "jihozlar",
        subcategory: "fitnes",
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: null,
        sizes: [],
        inStock: true,
        isSpecialOffer: true,
        isBestSeller: false,
        isNewArrival: false,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Sport Ko'ylak",
        description: "Naf oladigan, professional sport ko'ylak",
        price: 160000,
        originalPrice: 200000,
        category: "kiyim",
        subcategory: "ko'ylak",
        imageUrl: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/abc123",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        isSpecialOffer: true,
        isBestSeller: false,
        isNewArrival: false,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Basketbol Poyabzali",
        description: "Professional basketbol o'yini uchun maxsus poyabzal",
        price: 520000,
        originalPrice: 800000,
        category: "poyabzal",
        subcategory: "basketbol",
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/xyz789",
        sizes: ["40", "41", "42", "43", "44", "45"],
        inStock: true,
        isSpecialOffer: true,
        isBestSeller: false,
        isNewArrival: false,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Sport Naushnik",
        description: "Simsiz, suvga chidamli sport naushnik",
        price: 250000,
        originalPrice: null,
        category: "aksessuarlar",
        subcategory: "audio",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: null,
        sizes: [],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: false,
        isNewArrival: true,
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "Yoga Matı",
        description: "Professional yoga va fitnes uchun mat",
        price: 120000,
        originalPrice: null,
        category: "jihozlar",
        subcategory: "yoga",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1506629905531-f2c4d15ddc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/yoga123",
        sizes: [],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: false,
        isNewArrival: true,
        createdAt: new Date(),
      },
      {
        id: "7",
        name: "Smart Soat",
        description: "Fitnes kuzatuv va sport rejimi bilan",
        price: 890000,
        originalPrice: null,
        category: "aksessuarlar",
        subcategory: "texnologiya",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: null,
        sizes: [],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: false,
        isNewArrival: true,
        createdAt: new Date(),
      },
      {
        id: "8",
        name: "Mashq Qo'lqoplari",
        description: "Ağırlık ko'tarish va mashq uchun",
        price: 75000,
        originalPrice: null,
        category: "aksessuarlar",
        subcategory: "mashq",
        imageUrl: "https://pixabay.com/get/gbfe5de2c076fd5c45e4b5bd9b7ae34fe83e1b0ebba0bd6f390c7a0e9cd33bdd75b9c2a85b34af26df88bc2c5c23fe892f49c7128c79d49a60e93c0b244d611b5_1280.jpg",
        images: [
          "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: null,
        sizes: ["S", "M", "L"],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: false,
        isNewArrival: true,
        createdAt: new Date(),
      },
      {
        id: "9",
        name: "Sport Suv Idishi",
        description: "750ml sig'imli, harorat saqlovchi",
        price: 45000,
        originalPrice: null,
        category: "aksessuarlar",
        subcategory: "hydration",
        imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1624969862293-b749659ccc4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/hydration123",
        sizes: [],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: true,
        isNewArrival: false,
        createdAt: new Date(),
      },
      {
        id: "10",
        name: "Yugurish Shorti",
        description: "Naf oladigan, yengil sport shorti",
        price: 95000,
        originalPrice: null,
        category: "kiyim",
        subcategory: "short",
        imageUrl: "https://pixabay.com/get/g790492e2ef04ae814d42c61fc39a60e7d422d28b430996dff04248b06f113042ba2e239573da9d7e48fc673bafcff9f3729fe13bb2466c573974c34c251cdc79_1280.jpg",
        images: [
          "https://images.unsplash.com/photo-1506629905531-f2c4d15ddc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/shorts123",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: true,
        isNewArrival: false,
        createdAt: new Date(),
      },
      {
        id: "11",
        name: "Gantel To'plami",
        description: "2x5kg, chidamli va professional",
        price: 280000,
        originalPrice: null,
        category: "jihozlar",
        subcategory: "ağırlık",
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: [
          "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        videoUrl: "https://www.youtube.com/embed/weights123",
        sizes: [],
        inStock: true,
        isSpecialOffer: false,
        isBestSeller: true,
        isNewArrival: false,
        createdAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getSpecialOffers(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isSpecialOffer
    );
  }

  async getBestSellers(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isBestSeller
    );
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isNewArrival
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct,
      originalPrice: insertProduct.originalPrice ?? null,
      subcategory: insertProduct.subcategory ?? null,
      images: insertProduct.images ?? null,
      videoUrl: insertProduct.videoUrl ?? null,
      sizes: insertProduct.sizes ?? null,
      inStock: insertProduct.inStock ?? true,
      isSpecialOffer: insertProduct.isSpecialOffer ?? false,
      isBestSeller: insertProduct.isBestSeller ?? false,
      isNewArrival: insertProduct.isNewArrival ?? false,
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const cartItems = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
    
    return cartItems.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      return { ...item, product };
    });
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertCartItem,
      size: insertCartItem.size ?? null,
      quantity: insertCartItem.quantity ?? 1,
      id, 
      createdAt: new Date() 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder,
      customerEmail: insertOrder.customerEmail ?? null,
      id, 
      status: "pending",
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { 
      ...insertOrderItem,
      size: insertOrderItem.size ?? null,
      id 
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
