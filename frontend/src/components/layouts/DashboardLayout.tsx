'use client';

import type React from 'react';

import { DashboardSidebar } from '@/components/navigation/DashboardSidebar';
import { DashboardHeader } from '../navigation/DashboardHeader';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="main-dashboard">
        <DashboardHeader />
        <motion.main
          className="p-4 lg:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
