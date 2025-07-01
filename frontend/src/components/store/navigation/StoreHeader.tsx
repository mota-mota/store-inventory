import Link from 'next/link';
import { Home, ShoppingCart, User, Menu, ChevronDown, Search } from 'lucide-react';
import { Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import Image from "next/image";

export const StoreHeader = () => {
  return (
    <header className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center h-16">
            <Image 
              src="/CemacoLogo.png" 
              alt="Cemaco Logo" 
              width={120} 
              height={64}
              className="max-w-35"
              priority
            />
          </Link>
          <div className="flex-1 max-w-2xl mx-4">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full"
              startContent={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              href="/login"
              variant="light"
              className="text-white hover:text-green-300"
              startContent={<User className="h-5 w-5" />}
            >
              <span className="hidden md:inline">Iniciar sesión</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;