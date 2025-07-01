'use client';

import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { Plus, Users } from 'lucide-react';

const actions = [
  {
    title: 'Agregar Producto',
    description: 'Añadir nuevo producto al inventario',
    icon: Plus,
    color: 'btn-brand',
  },
  {
    title: 'Gestionar Usuarios',
    description: 'Administrar usuarios del sistema',
    icon: Users,
    color: 'btn-brand-secondary',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
      </CardHeader>
      <CardBody className="space-y-3">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant="flat"
              className="w-full justify-start h-auto p-4"
              startContent={<Icon size={20} />}
            >
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-gray-600">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </CardBody>
    </Card>
  );
}
