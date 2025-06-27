export interface InventoryStats {
  lowStockCount: number;
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  SKU: string;
  quantity: number;
  categoryId: number;
  image: string;
  isActive: boolean;
  createdBy: number;
  updatedBy: number;
  deletedAt: string | null;
  deletedBy: number | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export type ProductStatus = 'all' | 'active' | 'inactive' | 'deleted' | undefined;

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  isActive?: boolean;
  status?: ProductStatus;
}
