export interface Iorder {
  id: string;
  orderDate: string;
  orderStatus: string;
  PaymentStatus: string;
  customerId: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  inventoryCount: number;
  images: string;
  price: number;
  discount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shopId: string;
  customerId: any;
}
