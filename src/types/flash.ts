export interface TFlash {
  id: string;
  name: string;
  description: string;
  inventoryCount: number;
  images: string;
  price: number;
  discount: number;
  flashSale: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shopId: string;
  customerId: any;
  shop: Shop;
  categories: Category[];
}

export interface Shop {
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
}

export interface Category {
  productId: string;
  categoryId: string;
  productCategory: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
  categoryImage: string;
}
