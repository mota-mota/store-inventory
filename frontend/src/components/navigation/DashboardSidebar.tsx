"use client"

import { useState, useEffect } from "react"
import { Button, Avatar, Divider } from "@heroui/react"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import LogoutBtn from "@/components/auth/Logout";

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const getFilteredMenuItems = () => {
    const allMenuItems = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ['admin', 'collaborator'] },
      { name: "Productos", href: "/dashboard/products", icon: Package, roles: ['admin', 'collaborator'] },
      { name: "Categorías", href: "/dashboard/categories", icon: ShoppingBag, roles: ['admin'] },
      { name: "Usuarios", href: "/dashboard/users", icon: Users, roles: ['admin'] }
    ]
    
    if (!user) return []
    return allMenuItems.filter(item => item.roles.includes(user.role.name))
  }
  
  const menuItems = getFilteredMenuItems()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])



  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {(!isCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <h1 className="text-brand-primary">Cemaco</h1>
              </motion.div>
            )}
          </AnimatePresence>

          {!isMobile && (
            <Button isIconOnly variant="light" size="sm" onPress={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          )}

          {isMobile && (
            <Button isIconOnly variant="light" size="sm" onPress={() => setIsMobileOpen(false)}>
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar src="/placeholder.svg?height=40&width=40" size="md" className="flex-shrink-0" />
          <AnimatePresence>
            {(!isCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 truncate">{user?.username || 'Usuario'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                <p className="text-xs font-medium text-blue-600 capitalize">{user?.role.name || ''}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Divider />

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.name} href={item.href} onClick={() => isMobile && setIsMobileOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <AnimatePresence>
                  {(!isCollapsed || isMobile) && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <LogoutBtn isMobile={isMobile} isCollapsed={isCollapsed} />
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          isIconOnly
          variant="light"
          className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
          onPress={() => setIsMobileOpen(true)}
        >
          <Menu size={20} />
        </Button>

        {/* Para mobile */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden shadow-xl"
              >
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <motion.div
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 hidden lg:block"
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
    >
      {sidebarContent}
    </motion.div>
  )
}
