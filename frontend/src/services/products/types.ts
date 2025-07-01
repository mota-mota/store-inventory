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

export interface PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
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
  inStock?: boolean;
}

export interface CreateProductData {
  name: string;
  description?: string | null;
  price: number;
  quantity?: number;
  SKU?: string | null;
  categoryId: number;
  image?: string | null;
}

export interface ValidationError {
  message: string;
  input: {
    label: string;
    key: string;
  };
}

// Add this interface near the top of the file with other types
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  errors?: ValidationError[];
  data: T;
}