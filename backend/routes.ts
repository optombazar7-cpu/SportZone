import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertOrderSchema, insertOrderItemSchema, insertUserSchema, loginUserSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

// Email simulation function
async function simulateEmailSend(to: string, subject: string, content: string) {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`📧 Email sent to: ${to}`);
  console.log(`📧 Subject: ${subject}`);
  console.log(`📧 Content: ${content}`);
  console.log('---');
  
  return { success: true, messageId: `msg_${Date.now()}` };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/special/offers", async (req, res) => {
    try {
      const products = await storage.getSpecialOffers();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch special offers" });
    }
  });

  app.get("/api/products/special/bestsellers", async (req, res) => {
    try {
      const products = await storage.getBestSellers();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch best sellers" });
    }
  });

  app.get("/api/products/special/newarrivals", async (req, res) => {
    try {
      const products = await storage.getNewArrivals();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch new arrivals" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  // Cart routes
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.params.sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ message: "Cart item removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Bu email bilan foydalanuvchi allaqachon mavjud" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      // Send welcome email
      const welcomeSubject = `Xush kelibsiz SportZone'ga, ${user.firstName}!`;
      const welcomeContent = `
Hurmatli ${user.firstName} ${user.lastName},

SportZone'ga xush kelibsiz! 🏃‍♂️⚽

Sizning akkauntingiz muvaffaqiyatli yaratildi. Endi siz bizning keng sport mahsulotlari assortimentimizdan foydalanishingiz mumkin.

Bizning imkoniyatlar:
✅ Yuqori sifatli sport kiyimlari va poyabzallari
✅ Professional sport jihozlari  
✅ Tez va bepul yetkazib berish
✅ Qulay to'lov usullari (Click, Payme, Uzcard)
✅ 24/7 mijozlarni qo'llab-quvvatlash

Birinchi xaridingizda 10% chegirma olish uchun SPORT10 promo kodini ishlating!

Sport bilan band bo'ling, sog'lom bo'ling!

Rahmat,
SportZone jamoasi
      `;
      
      try {
        await simulateEmailSend(user.email, welcomeSubject, welcomeContent);
      } catch (emailError) {
        console.error('Welcome email sending failed:', emailError);
        // Don't fail registration if email fails
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Noto'g'ri ma'lumotlar", errors: error.errors });
      }
      res.status(500).json({ message: "Ro'yxatdan o'tishda xatolik yuz berdi" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
      }
      
      // Check password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Noto'g'ri ma'lumotlar", errors: error.errors });
      }
      res.status(500).json({ message: "Tizimga kirishda xatolik yuz berdi" });
    }
  });

  // User profile routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Foydalanuvchi ma'lumotlarini olishda xatolik" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const { order, items } = req.body;
      
      const validatedOrder = insertOrderSchema.parse(order);
      const createdOrder = await storage.createOrder(validatedOrder);
      
      const orderItems = [];
      for (const item of items) {
        const validatedItem = insertOrderItemSchema.parse({
          ...item,
          orderId: createdOrder.id,
        });
        const orderItem = await storage.createOrderItem(validatedItem);
        orderItems.push(orderItem);
      }
      
      // Send confirmation email if email is provided
      if (createdOrder.customerEmail) {
        const emailSubject = `SportZone - Buyurtma tasdigi #${createdOrder.id}`;
        const emailContent = `
Hurmatli ${createdOrder.customerName},

Sizning buyurtmangiz muvaffaqiyatli qabul qilindi!

Buyurtma raqami: ${createdOrder.id}
Jami summa: ${createdOrder.totalAmount.toLocaleString()} so'm
To'lov usuli: ${createdOrder.paymentMethod}
Yetkazib berish manzili: ${createdOrder.deliveryAddress}

Buyurtma tarkibi:
${orderItems.map((item, index) => `${index + 1}. Mahsulot ID: ${item.productId}, Miqdor: ${item.quantity}, Narx: ${item.price.toLocaleString()} so'm`).join('\n')}

Sizning buyurtmangiz tez orada ishga tushiriladi va yetkazib berish haqida telefon orqali xabar beriladi.

Rahmat,
SportZone jamoasi
        `;
        
        try {
          await simulateEmailSend(createdOrder.customerEmail, emailSubject, emailContent);
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Don't fail the order creation if email fails
        }
      }
      
      res.status(201).json({ order: createdOrder, items: orderItems });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
