'use client';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { CircleUserRound } from 'lucide-react';
import LogoutBtn from '@/components/auth/Logout';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <Dropdown>
            <DropdownTrigger>
              <CircleUserRound size={32} color={'#969696'} cursor={'pointer'} />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              {/*<DropdownItem key="profile" startContent={<User size={16} />}>
                Mi Perfil
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Settings size={16} />}>
                Configuración
              </DropdownItem>*/}
              <DropdownItem key="logout">
                <LogoutBtn />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
