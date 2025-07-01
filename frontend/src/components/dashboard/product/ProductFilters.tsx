'use client';

import { Input, Button } from '@heroui/react';
import { Search, X } from 'lucide-react';
import { useState, useCallback } from 'react';

type ProductStatus = 'all' | 'active' | 'inactive';

interface StatusOption {
  key: ProductStatus;
  label: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: { search?: string; status?: ProductStatus }) => void;
  className?: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activo' },
  { key: 'inactive', label: 'Inactivo' },
];

export function ProductFilters({ onFilterChange, className = '' }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus>('all');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      onFilterChange({
        search: value,
        status: selectedStatus,
      });
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleStatusChange = (status: ProductStatus) => {
    setSelectedStatus(status);
    onFilterChange({
      search: searchTerm,
      status,
    });
  };

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedStatus('all');
    onFilterChange({
      search: '',
      status: 'all',
    });
  }, []);

  const hasActiveFilters = searchTerm || selectedStatus !== 'all';

  return (
    <div
      className={`flex flex-row flex-wrap gap-4 p-4 bg-white rounded-lg border border-gray-200 ${className}`}
    >
      <div className="relative w-full md:w-1/2">
        <Input
          placeholder="Buscar productos..."
          startContent={<Search size={20} className="text-gray-400" />}
          value={searchTerm}
          onChange={e => handleSearchChange(e.target.value)}
          aria-label="Buscar productos"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Filtrar por estado:
          </span>
          {STATUS_OPTIONS.map(status => (
            <Button
              key={status.key}
              size="sm"
              variant={selectedStatus === status.key ? 'solid' : 'bordered'}
              className={`transition-colors ${
                selectedStatus === status.key
                  ? 'bg-brand-primary/10 text-brand-primary border hover:bg-brand-600'
                  : 'hover:bg-gray-100'
              }`}
              onPress={() => handleStatusChange(status.key)}
              aria-pressed={selectedStatus === status.key}
              aria-label={`Filtrar por ${status.label}`}
            >
              {status.label}
            </Button>
          ))}
        </div>

        {hasActiveFilters && (
          <Button
            variant="light"
            onPress={clearFilters}
            size="sm"
            startContent={<X size={16} />}
            className="whitespace-nowrap"
            aria-label="Limpiar todos los filtros"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
