import {GetProductsParams, InventoryStats, Pagination, Product, ProductsResponse} from "./types";
import {useCallback, useEffect, useMemo, useState} from "react";

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
    ...(typeof filters.isActive === 'boolean' && { isActive: filters.isActive.toString() })
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
    fetchStats
  };
};

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (customParams?: GetProductsParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts(customParams);
      
      setProducts(data.products);
      
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
  };
};