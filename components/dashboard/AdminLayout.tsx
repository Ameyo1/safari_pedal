'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Users, BarChart, Settings, FileText, ClipboardList } from "lucide-react";

// components/AdminLayout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse for desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false); // open/close for mobile

  const navItems = [
    { href: "/dashboard/submissions", label: "Submissions", icon: FileText },
    { href: "/dashboard/waivers", label: "Waivers", icon: ClipboardList },
    { href: "/dashboard/logs", label: "Logs", icon: FileText },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen mt-24 flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          ${isCollapsed ? "w-20" : "w-64"} 
          fixed md:static top-0 left-0 h-full bg-white shadow-md dark:bg-gray-800 
          transition-all duration-300 z-50 flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <h2 className="text-xl font-bold dark:text-gray-100">Pedal Safari</h2>
          )}
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-2 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <Icon size={20} />
              {!isCollapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
          {/* <h1 className="text-lg font-bold dark:text-gray-100">Dashboard</h1> */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 ">{children}</main>
      </div>
    </div>
  );
}
