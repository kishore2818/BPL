import { ReactNode } from 'react';
import {
  LayoutDashboard,
  DollarSign,
  Bed,
  FileText,
  CreditCard,
  Calendar,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentPage, navigate } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'charges' as const, label: 'Hospital Charges', icon: DollarSign },
    { id: 'beds' as const, label: 'Bed Management', icon: Bed },
    { id: 'templates' as const, label: 'Print Templates', icon: FileText },
    { id: 'payments' as const, label: 'Payment Config', icon: CreditCard },
    { id: 'appointments' as const, label: 'Appointments', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-[#EDF2F7]">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-[#2C7BE5] p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#2D3748]">MediCare Hospital</h1>
                <p className="text-sm text-[#718096]">Management System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-[#2D3748]">Admin User</p>
              <p className="text-xs text-[#718096]">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-[#2C7BE5] rounded-full flex items-center justify-center text-white font-semibold">
              AU
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#E8F0FE] text-[#2C7BE5] font-medium'
                        : 'text-[#718096] hover:bg-gray-50 hover:text-[#2D3748]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
