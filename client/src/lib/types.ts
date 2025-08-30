export interface CartItemWithProduct {
  id: string;
  sessionId: string;
  productId: string;
  quantity: number;
  size?: string;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    imageUrl: string;
    sizes?: string[];
  };
}

export interface OrderRequest {
  order: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryAddress: string;
    paymentMethod: string;
    totalAmount: number;
  };
  items: {
    productId: string;
    quantity: number;
    size?: string;
    price: number;
  }[];
}
