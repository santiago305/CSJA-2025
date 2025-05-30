import { Outlet } from "react-router-dom";
import { RoutesPaths } from "../../router/config/routesPaths";

export default function LayoutAuth() {
  return (
    <div 
    className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
    style={{ 
      backgroundImage: `url('${RoutesPaths.root}/assets/auth/bg-auth.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
     }}
    >
      <div className="w-full max-w-sm">
          <Outlet/>
      </div>
    </div>
  );
}