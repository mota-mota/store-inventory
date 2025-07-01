"use client"

import { useEffect, useState} from 'react';
import { ProductsTable } from "@/components/dashboard/product/ProductsTable"
import {Button, Card, CardBody, useDisclosure} from "@heroui/react"
import { Plus, RefreshCw } from "lucide-react"
import { useGetProducts } from "@/services/products/productsService"
import {ProductStats} from "@/components/dashboard/product/ProductStats";
import {ProductFilters} from "@/components/dashboard/product/ProductFilters";
import {GetProductsParams, Pagination, Product, ProductStatus} from "@/services/products/types";
import {CreateProduct} from "@/components/dashboard/product/CreateProduct";
import DeleteProductConfirmation from "@/components/dashboard/product/DeleteProductConfirmation";
import {useAuth} from "@/context/AuthContext";

export default function ProductsPage() {
  const { isAdmin } = useAuth();
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false
  });

  const [filters, setFilters] = useState<{ search: string; status: ProductStatus }>({
    search: '',
    status: 'all',
  });

  const {
    response,
    loading,
    error,
    fetchProducts,
  } = useGetProducts();

  const handleFetchProducts = async (params: GetProductsParams) => {
    const {page, limit, ...filters} = params;
    const data = await fetchProducts({
      ...params,
    });
    setPagination(data.pagination);
    setFilters({
      search: filters.search || '',
      status: params.status || 'all',
    });
  };

  useEffect(() => {
    handleFetchProducts({
      page: pagination.currentPage,
      limit: pagination.itemsPerPage,
      status: 'all',
    });
  }, []);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (currentProduct?.id) {
      if (!isOpen) onOpen();
    }
  }, [currentProduct, isOpen]);

  const [id, setId] = useState<number | null>(null);
  const {isOpen: isConfirmOpen, onOpen: onOpenConfirm, onOpenChange: onOpenConfirmChange} = useDisclosure();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-1 sm:mt-2">Gestiona tu inventario de productos</p>
        </div>
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
          <Button 
            variant="light" 
            onPress={() => {
              handleFetchProducts({});
            }}
            startContent={<RefreshCw size={18} className={loading ? 'animate-spin' : ''} />}
            isDisabled={loading}
            className="sm:order-2"
          >
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
          <Button 
            color="primary" 
            startContent={<Plus size={18} />} 
            className="btn-brand sm:order-1"
            onPress={() => onOpen()}
          >
            <span className="hidden sm:inline">Nuevo Producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </div>
      </div>

      <CreateProduct
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setCurrentProduct(null);
          }
          onOpenChange();
        }}
        product={currentProduct}
        callback={(product) => {
          setCurrentProduct(product);
          if (!product) {
            onOpenChange();
          }
        }}
      />

      <ProductStats />

      <ProductFilters onFilterChange={(filters) => {
        handleFetchProducts({
          page: 1,
          limit: pagination.itemsPerPage,
          search: filters.search,
          status: filters.status,
        })
      }} />
      
      <Card className="mt-6">
        <CardBody className="p-0">
          {loading ? (
            <div className="space-y-4 p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Error al cargar los productos: {error}</p>
              <Button 
                variant="light" 
                onPress={() => {}}
                startContent={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
                disabled={loading}
              >
                Reintentar
              </Button>
            </div>
          ) : (
            <>
              <ProductsTable
                products={response || []}
                pagination={pagination}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={(page) => {
                  handleFetchProducts({
                    ...filters,
                    page,
                    limit: pagination.itemsPerPage
                  })
                }}
                onItemsPerPageChange={(itemsPerPage) => setPagination((prev) => ({ ...prev, itemsPerPage }))}
                isLoading={loading}
                handleEdit={(product: Product) => {
                  setCurrentProduct(product);
                }}
                handleDelete={(id: number) => {
                  setId(id);

                  onOpenConfirm();
                }}
                isAdmin={isAdmin}
              />
            </>
          )}
        </CardBody>
      </Card>
      <DeleteProductConfirmation
          isOpen={isConfirmOpen}
          onOpenChange={onOpenConfirmChange}
          id={id}
          onSuccess={() => {
            handleFetchProducts({
              ...filters,
              page: 1,
              limit: pagination.itemsPerPage,
            });
            setId(null);
            onOpenConfirmChange();
          }}
      />
    </div>
  )
}
