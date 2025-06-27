"use client"
import { Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Badge } from "@heroui/react"
import { Search, Bell, Settings, User, LogOut } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden md:block">
            <Input placeholder="Buscar..." startContent={<Search size={18} />} className="w-48 lg:w-64" size="sm" />
          </div>

          {/* Search button for mobile */}
          <Button isIconOnly variant="light" className="md:hidden">
            <Search size={20} />
          </Button>

          {/* Notifications */}
          <Badge content="3" color="danger" size="sm">
            <Button isIconOnly variant="light">
              <Bell size={20} />
            </Button>
          </Badge>

          <Dropdown>
            <DropdownTrigger>
              <Avatar src="/placeholder.svg?height=32&width=32" size="sm" className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="profile" startContent={<User size={16} />}>
                Mi Perfil
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Settings size={16} />}>
                Configuración
              </DropdownItem>
              <DropdownItem key="logout" startContent={<LogOut size={16} />} className="text-danger" color="danger">
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
