export interface ShopT {
  id: string;
  shopName: string;
  shopLogo: string;
  description: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  restricted: boolean;
  follower: number;
  vendorId: string;
  products: Product[];
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
