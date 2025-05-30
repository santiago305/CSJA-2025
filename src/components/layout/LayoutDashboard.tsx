import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";


export default function LayoutDashboard() {

  const collapsedWidth = 70;

  return (
    <div className="flex min-h-screen w-full relative">
      <Sidebar />
      <main
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: collapsedWidth }}
      >
        <div
        className="w-full h-full"
        >
          <div>
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
