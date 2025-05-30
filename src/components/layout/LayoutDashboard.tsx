import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";


export default function LayoutDashboard() {
  const [isFixedExpanded, setIsFixedExpanded] = useState(false);

  const expandedWidth = 400;
  const collapsedWidth = 70;

  const sidebarMargin = isFixedExpanded ? expandedWidth : collapsedWidth;

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Paso el estado y setter al Sidebar */}
      <Sidebar
        isFixedExpanded={isFixedExpanded}
        setIsFixedExpanded={setIsFixedExpanded}
        expandedWidth={expandedWidth}
        collapsedWidth={collapsedWidth}
      />
      <main
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarMargin }}
      >
        <div
        className="w-full h-full"
        >
          <div
          className="w-full px-7 py-3 lg:py-5 bg-pink-400"
          >
            top
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
