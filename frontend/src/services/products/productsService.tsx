import {
  ApiResponse,
  CreateProductData,
  GetProductsParams,
  InventoryStats,
  PaginationInfo,
  Product,
  ProductsResponse,
} from './types';
import { useCallback, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/api/v1';

export const getInventoryStats = async (): Promise<InventoryStats> => {
  const response = await fetch(`${API_BASE_URL}/products/inventory-stats`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener las estadísticas');
  }

  if (data.status && data.data) {
    return data.data;
  }

  throw new Error(data.message || 'Error al procesar la respuesta del servidor');
};

/**
 * Fetches products from the API with pagination and filtering
 */
export const getProducts = async (params: GetProductsParams = {}): Promise<ProductsResponse> => {
  const { page = 1, limit = 10, ...filters } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.categoryId && { categoryId: filters.categoryId.toString() }),
    ...(filters.status && { status: filters.status }),
    ...(typeof filters.isActive === 'boolean' && { isActive: filters.isActive.toString() }),
  });

  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener los productos');
  }

  if (data.status && data.data) {
    return data.data;
  }

  throw new Error(data.message || 'Error al procesar la respuesta del servidor');
};

/**
 * Hook to fetch and manage product statistics
 */
export const useProductStats = () => {
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInventoryStats();
      setStats(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error fetching inventory stats:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    response: stats,
    loading,
    error,
    fetchStats,
  };
};

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (customParams?: GetProductsParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts(customParams);

      setProducts(data.products);
      setPaginationInfo(data.pagination);

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error fetching products:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    response: products,
    loading: isLoading,
    error,
    fetchProducts,
    paginationInfo,
  };
};

const createProductService = async (
  productData: CreateProductData
): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.post<ApiResponse<Product>>(
      `${API_BASE_URL}/products`,
      {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        SKU: productData.SKU,
        categoryId: productData.categoryId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (!response.data.status) {
      throw new Error(response.data.message || 'Error al crear el producto');
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        typeof error.response?.data === 'object' &&
        error.response.data !== null &&
        'message' in error.response.data
          ? String(error.response.data.message)
          : 'Error al crear el producto';
      const customError: any = new Error(errorMessage);
      customError.response = error.response;
      throw customError;
    }
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
};

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse<Product> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (productData: CreateProductData) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await createProductService(productData);

      setResponse(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setResponse(null);
      // @ts-ignore
      setError(err?.response?.data || { message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    loading: isLoading,
    error,
    response,
  };
};

// Update product service
const updateProductService = async (
  productId: number,
  productData: Partial<CreateProductData>
): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.put<ApiResponse<Product>>(
      `${API_BASE_URL}/products/${productId}`,
      {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        SKU: productData.SKU,
        categoryId: productData.categoryId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (!response.data.status) {
      throw new Error(response.data.message || 'Error al actualizar el producto');
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        typeof error.response?.data === 'object' &&
        error.response.data !== null &&
        'message' in error.response.data
          ? String(error.response.data.message)
          : 'Error al actualizar el producto';
      const customError: any = new Error(errorMessage);
      customError.response = error.response;
      throw customError;
    }
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
};

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse<Product> | null>(null);
  const [error, setError] = useState<any>(null);

  const updateProduct = async (productId: number, productData: Partial<CreateProductData>) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await updateProductService(productId, productData);
      setResponse(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setResponse(null);
      // @ts-ignore
      setError(err?.response?.data || { message: errorMessage });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProduct,
    loading: isLoading,
    error,
    response,
  };
};

const deleteProductService = async (productId: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.delete<ApiResponse<null>>(
      `${API_BASE_URL}/products/${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (!response.data.status) {
      throw new Error(response.data.message || 'Error al eliminar el producto');
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        typeof error.response?.data === 'object' &&
        error.response.data !== null &&
        'message' in error.response.data
          ? String(error.response.data.message)
          : 'Error al eliminar el producto';
      const customError: any = new Error(errorMessage);
      customError.response = error.response;
      throw customError;
    }
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
};

export const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse<null> | null>(null);
  const [error, setError] = useState<any>(null);

  const deleteProduct = async (productId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await deleteProductService(productId);
      setResponse(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setResponse(null);
      // @ts-ignore
      setError(err?.response?.data || { message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteProduct,
    loading: isLoading,
    error,
    response,
  };
};
