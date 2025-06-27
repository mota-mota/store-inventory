"use client"

import {
    Card,
    CardBody,
    Chip,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@heroui/react"
import { MoreVertical, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/services/products/types"

interface ProductsTableProps {
    products: Product[];
    pagination: {
        totalPages: number;
        totalItems: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (limit: number) => void;
    isLoading?: boolean;
}

export function ProductsTable({ 
    products = [], 
    pagination, 
    currentPage, 
    itemsPerPage, 
    onPageChange, 
    onItemsPerPageChange,
    isLoading = false 
}: ProductsTableProps) {
    const getStatusColor = (isActive: boolean) => {
        return isActive ? "success" : "danger";
    }

    const getStockColor = (stock: number) => {
        if (stock === 0) return "danger";
        if (stock < 20) return "warning";
        return "success";
    }

    return (
        <Card>
            <CardBody className="p-0">
                <div className="overflow-x-auto">
                    <div className="min-w-full">
                        <div className="hidden md:block bg-gray-50 px-4 lg:px-6 py-3 border-b border-gray-200">
                            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                                <div>PRODUCTO</div>
                                <div>CATEGORÍA</div>
                                <div>PRECIO</div>
                                <div>STOCK</div>
                                <div>ESTADO</div>
                                <div>ACCIONES</div>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {products.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No se encontraron productos
                                </div>
                            ) : products.map((product) => (
                                <div key={product.id} className="p-4 lg:px-6 hover:bg-gray-50 transition-colors">
                                    {/* Mobile Layout */}
                                    <div className="md:hidden space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3 flex-1">
                                                <Avatar src={product.image || "/placeholder.svg"} size="sm" />
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                                                    <p className="text-sm text-gray-600">{product.category.name}</p>
                                                </div>
                                            </div>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="light">
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Acciones del producto">
                                                    <DropdownItem key="view" startContent={<Eye size={16} />}>
                                                        Ver detalles
                                                    </DropdownItem>
                                                    <DropdownItem key="edit" startContent={<Edit size={16} />}>
                                                        Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="delete"
                                                        startContent={<Trash2 size={16} />}
                                                        className="text-danger"
                                                        color="danger"
                                                    >
                                                        Eliminar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <p className="text-sm text-gray-900">${product.price}</p>
                                                <Chip color={getStockColor(product.quantity || 0)} size="sm">
                                                    {product.quantity || 0} en stock
                                                </Chip>
                                            </div>
                                            <Chip size="sm" color={getStatusColor(product.isActive || false)} variant="flat">
                                                {product.isActive ? 'Activo' : 'Inactivo'}
                                            </Chip>
                                        </div>
                                    </div>

                                    <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                                        <div className="flex items-center space-x-3">
                                            <Avatar src={product.image || "/placeholder.svg"} size="sm" />
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>

                                        <div className="text-sm text-gray-600">{product.category?.name || 'Sin categoría'}</div>

                                        <div className="text-sm text-gray-900">${product.price}</div>

                                        <div>
                                            <Chip color={getStockColor(product.quantity || 0)} size="sm">
                                                {product.quantity || 0} en stock
                                            </Chip>
                                        </div>

                                        <div>
                                            <Chip color={getStatusColor(product.isActive || false)} size="sm">
                                                {product.isActive ? 'Activo' : 'Inactivo'}
                                            </Chip>
                                        </div>

                                        <div>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="light">
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Acciones del producto">
                                                    <DropdownItem key="view" startContent={<Eye size={16} />}>
                                                        Ver detalles
                                                    </DropdownItem>
                                                    <DropdownItem key="edit" startContent={<Edit size={16} />}>
                                                        Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="delete"
                                                        startContent={<Trash2 size={16} />}
                                                        className="text-danger"
                                                        color="danger"
                                                    >
                                                        Eliminar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {pagination?.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                            Mostrando {products?.length || 0} de {pagination.totalItems || 0} productos
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Mostrar:</span>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="light" size="sm">
                                            {itemsPerPage} por página
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        {[5, 10, 20, 50].map((limit) => (
                                            <DropdownItem 
                                                key={limit} 
                                                onClick={() => onItemsPerPageChange(limit)}
                                            >
                                                {limit} por página
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => onPageChange(currentPage - 1)}
                                    isDisabled={!pagination.hasPreviousPage || isLoading}
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (pagination.totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= pagination.totalPages - 2) {
                                            pageNum = pagination.totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        
                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={pageNum === currentPage ? "solid" : "light"}
                                                size="sm"
                                                onClick={() => onPageChange(pageNum)}
                                                className={`min-w-[32px] ${pageNum === currentPage ? 'bg-blue-600 text-white' : ''}`}
                                                isDisabled={isLoading}
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>
                                
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => onPageChange(currentPage + 1)}
                                    isDisabled={!pagination.hasNextPage || isLoading}
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
