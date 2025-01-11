export interface IProduct {
  id?: string;
  name: string;
  description: string;
  inventoryCount: number;
  images: string;
  price: number;
  discount: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  shopId?: string;
  customerId?: any;
  quantity: number;
  shop: IShop;
  categories?: string[];
}

export interface PProduct {
  name: string;
  description: string;
  inventoryCount: number;
  images: string;
  price: number;
  discount: number;
  categories?: string[];
}

export interface IShop {
  id: string;
  shopName: string;
  shopLogo: string;
  description: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
}
