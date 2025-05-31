import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopSidebar from "../topSidebar";


export default function LayoutDashboard() {
  const [isFixedExpanded, setIsFixedExpanded] = useState(false);

  const expandedWidth = 270;
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
        className="w-full h-full flex flex-col"
        >
          <TopSidebar />
          <div className="w-full h-full p-6 bg-[#f8f8f8]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
