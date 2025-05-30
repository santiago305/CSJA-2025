import { useState, useEffect, useRef } from "react";
import { Menu, X } from "react-feather";
import { Outlet } from "react-router-dom";

export default function LayoutDashboard() {
  const [isFixedExpanded, setIsFixedExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  // Controlamos si está en modo "overlay" (absolute)
  const [isOverlay, setIsOverlay] = useState(false);

  const expandedWidth = 400;
  const collapsedWidth = 70;

  const sidebarWidthForLayout = isFixedExpanded ? expandedWidth : collapsedWidth;

  // Para manejar los timeouts y evitar conflictos
  const timeoutRef = useRef<number | null>(null);

  const onMouseEnter = () => {
    if (isFixedExpanded) return; // si está fijo expandido no hacemos nada

    // Primero activar overlay (absolute) y tamaño colapsado
    setIsOverlay(true);
    setIsHovering(true);

    // Después de 100ms expandimos el ancho
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsHovering(true); // aseguramos que el estado de hovering sigue siendo true para expandir
    }, 100);
  };

  const onMouseLeave = () => {
    if (isFixedExpanded) return;

    // Primero reducimos ancho a 70px (seguimos en overlay)
    setIsHovering(false);

    // Después de la duración de la transición, quitamos overlay
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOverlay(false);
    }, 300); // debe coincidir con duración de la animación CSS (300ms)
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full relative">
      <aside
        className={`
          bg-gray-800 text-white h-full
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isFixedExpanded || isHovering ? "w-[400px]" : "w-[70px]"}
          ${isOverlay ? "absolute z-50 shadow-lg" : "relative"}
          ${!isFixedExpanded ? "cursor-pointer" : ""}
        `}
        style={{
          top: 0,
          left: 0,
          height: "100vh",
          position: isOverlay ? "absolute" : "relative",
          zIndex: isOverlay ? 1000 : "auto",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex flex-col h-full">
          {(isFixedExpanded || isHovering) && (
            <button
              className="self-end m-2 p-1 rounded bg-gray-700 hover:bg-gray-600 transition"
              onClick={() => {
                if (isFixedExpanded) {
                  setIsFixedExpanded(false);
                  setIsHovering(false);
                  setIsOverlay(false);
                } else {
                  setIsFixedExpanded(true);
                  setIsHovering(false);
                  setIsOverlay(false);
                }
              }}
              title={isFixedExpanded ? "Colapsar sidebar" : "Expandir sidebar"}
            >
              {isFixedExpanded ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}

          <nav className="flex-1 p-4 space-y-4 select-none">
            <div className="flex items-center space-x-3">
              <Menu size={24} />
              {(isFixedExpanded || isHovering) && <span className="whitespace-nowrap">Inicio</span>}
            </div>
            <div className="flex items-center space-x-3">
              <Menu size={24} />
              {(isFixedExpanded || isHovering) && <span className="whitespace-nowrap">Usuarios</span>}
            </div>
          </nav>
        </div>
      </aside>

      <main
        className="flex-1 transition-margin duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidthForLayout }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
