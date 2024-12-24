export interface IProduct {
  id: string;
  name: string;
  description: string;
  inventoryCount: number;
  images: any;
  price: number;
  discount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shopId: string;
  customerId: any;
  quantity: number;
  shop: IShop;
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
