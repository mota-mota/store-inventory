'use client';

import { useEffect } from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { Package, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStats } from '@/services/products/productsService';

const statConfigs = [
  {
    key: 'totalProducts',
    title: 'Total Productos',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    key: 'activeProducts',
    title: 'Productos Activos',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    key: 'lowStockCount',
    title: 'Stock Bajo',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export function ProductStats() {
  const { response: statsData, fetchStats, loading, error } = useProductStats();

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = async () => {
    await fetchStats();
  };

  if (loading && !statsData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statConfigs.map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardBody className="p-6">
              <div className="h-24 bg-gray-200 rounded"></div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-3 text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button
          variant="light"
          onPress={handleRefresh}
          startContent={<RefreshCw size={16} />}
          isLoading={loading}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        isIconOnly
        variant="light"
        onPress={handleRefresh}
        isLoading={loading}
        className="absolute right-0 -top-10"
        size="sm"
        title="Actualizar estadísticas"
      >
        <RefreshCw size={16} />
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statConfigs.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="card-hover h-full">
              <CardBody className="p-6">
                <div className="flex items-center justify-between h-full">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {statsData ? statsData[stat.key as keyof typeof statsData] : '--'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
