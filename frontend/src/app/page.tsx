"use client";

import {Button} from "@heroui/react";

import { StoreHeader } from '@/components/store/navigation/StoreHeader';
import { StoreFooter } from '@/components/store/navigation/StoreFooter';
import { ProductCard } from '@/components/store/product/ProductCard';
import ProductSkeleton from '@/components/store/product/ProductSkeleton';
import {useGetProducts} from "@/services/products/productsService";
import {useEffect, useState} from "react";
import {GetProductsParams, Product} from "@/services/products/types";

const INITIAL_FILTERS: GetProductsParams = {
    page: 1,
    limit: 12,
    status: 'active',
    inStock: true
}

export default function Home() {
  const { loading, error, response: products, fetchProducts, paginationInfo } = useGetProducts();
  const [crrFilters, setCrrFilters] = useState<GetProductsParams>(INITIAL_FILTERS);
  const [allProducts, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts(INITIAL_FILTERS);
  }, []);

  const handleLoadProducts = (filters: GetProductsParams) => {
    fetchProducts(filters);
    setCrrFilters(filters);
  }

  useEffect(() => {
    if(!loading && products) {
      setProducts(prev => [...prev, ...products]);
    }
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      
      <main className="flex-grow">
        <section className="bg-primary-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Bienvenido a Nuestra Tienda
            </h1>
            <p className="text-lg text-foreground-700 max-w-2xl">
              Descubre nuestra amplia selección de productos de calidad para tu hogar y más.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Productos Destacados</h2>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">Error al cargar los productos. Por favor, intente de nuevo más tarde.</p>
                <Button 
                  color="primary" 
                  className="mt-4"
                  onPress={() => window.location.reload()}
                >
                  Reintentar
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allProducts?.map((product: Product) => (
                    <ProductCard
                      key={product.id+product.SKU}
                      id={product.id}
                      name={product.name}
                      price={product.price.toString()}
                      rating={4.5}
                      reviewCount={0}
                    />
                  ))}
                </div>
                <div className="mt-10 text-center">
                  {paginationInfo && paginationInfo.hasNextPage ? (
                      <Button
                          color="primary"
                          size="lg"
                          className="font-medium"
                          onPress={() => handleLoadProducts({
                            ...crrFilters,
                            page: (crrFilters?.page || 1) + 1
                          })}
                      >
                        Ver más productos
                      </Button>
                  ) : (
                      <p className="text-foreground-600">No hay más productos</p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
