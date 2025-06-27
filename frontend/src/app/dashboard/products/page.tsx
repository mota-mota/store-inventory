"use client"

import { useEffect, useState} from 'react';
import { ProductsTable } from "@/components/dashboard/ProductsTable"
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import { Plus, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { useGetProducts } from "@/services/products/productsService"
import {ProductStats} from "@/components/dashboard/ProductStats";
import {ProductFilters} from "@/components/dashboard/ProductFilters";
import {GetProductsParams, Pagination, ProductStatus} from "@/services/products/types";

export default function ProductsPage() {
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
    const { page, limit, ...filters } = params;
    const data = await fetchProducts({
      ...params,
      status: params.status === 'all' ? undefined : params.status
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
            onClick={() => {}}
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
            onClick={() => {/* TODO: Implement create product */}}
          >
            <span className="hidden sm:inline">Nuevo Producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ProductStats />

      <ProductFilters onFilterChange={(filters) => {
        handleFetchProducts({
          page: pagination.currentPage,
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
                onClick={() => {}}
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
              />
            </>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
