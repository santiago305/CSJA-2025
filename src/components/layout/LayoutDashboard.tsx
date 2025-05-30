import { useState } from "react";
import { Menu } from "react-feather";
import { Outlet } from "react-router-dom";

export default function LayoutDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-full bg-gray-800 text-white
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-[70px]" : "w-[400px]"}
          ${showSidebarOnMobile ? "block" : "hidden"} md:block
        `}
      >
        {/* Toggle button (visible only when expanded and on desktop) */}
        <div className="relative">
          {!isCollapsed && (
            <button
              className="absolute top-4 right-4 w-5 h-5 bg-gray-600 text-xs flex items-center justify-center rounded"
              onClick={() => setIsCollapsed(true)}
            >
              –
            </button>
          )}

          {isCollapsed && (
            <button
              className="absolute top-4 left-4 w-5 h-5 bg-gray-600 text-xs flex items-center justify-center rounded"
              onClick={() => setIsCollapsed(false)}
            >
              +
            </button>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              <Menu />
            </span>
            {!isCollapsed && <span className="text-sm">Inicio</span>}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              <Menu />
            </span>
            {!isCollapsed && <span className="text-sm">Usuarios</span>}
          </div>
          {/* Agrega más ítems según lo necesites */}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-[70px] md:ml-[400px] transition-all duration-300 ease-in-out">
        {/* Toggle button for mobile */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setShowSidebarOnMobile(!showSidebarOnMobile)}
            className="p-2 bg-gray-800 text-white rounded"
          >
            <Menu />
          </button>
        </div>

        {/* Page content via Outlet */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}