import { useState } from "react";
import { Menu, X } from "react-feather";
import { Outlet } from "react-router-dom";

export default function LayoutDashboard() {
  const [isFixedExpanded, setIsFixedExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Sidebar width cuando está fijo expandido o en hover
  const expandedWidth = 400;
  // Sidebar width cuando está colapsado o fijo colapsado
  const collapsedWidth = 70;

  // Calcula el ancho efectivo para el layout principal (main)
  const sidebarWidthForLayout = isFixedExpanded ? expandedWidth : collapsedWidth;

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Sidebar */}
      <aside
        className={`
          bg-gray-800 text-white h-full
          transition-width duration-300 ease-in-out
          overflow-hidden
          ${isFixedExpanded ? "w-[400px] relative" : "w-[70px]"}
          ${!isFixedExpanded ? "cursor-pointer" : ""}
        `}
        // Hover solo aplica si NO está fijo expandido
        onMouseEnter={() => !isFixedExpanded && setIsHovering(true)}
        onMouseLeave={() => !isFixedExpanded && setIsHovering(false)}
        // Para que no afecte layout cuando esté hover expandido, lo hacemos absolute
        style={{
          position: !isFixedExpanded && isHovering ? "absolute" : "relative",
          width: !isFixedExpanded && isHovering ? expandedWidth : undefined,
          zIndex: !isFixedExpanded && isHovering ? 1000 : undefined,
          boxShadow: !isFixedExpanded && isHovering ? "2px 0 8px rgba(0,0,0,0.5)" : undefined,
        }}
      >
        {/* Contenido del sidebar */}
        <div className="flex flex-col h-full">
          {/* Botón para fijar estado solo visible cuando está expandido (hover o fijo) */}
          {(isFixedExpanded || isHovering) && (
            <button
              className="self-end m-2 p-1 rounded bg-gray-700 hover:bg-gray-600 transition"
              onClick={() => {
                if (isFixedExpanded) {
                  setIsFixedExpanded(false);
                  setIsHovering(false);
                } else {
                  setIsFixedExpanded(true);
                  setIsHovering(false);
                }
              }}
              title={isFixedExpanded ? "Colapsar sidebar" : "Expandir sidebar"}
            >
              {isFixedExpanded ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}

          {/* Menú: muestra iconos siempre, nombres solo si expandido fijo o en hover */}
          <nav className="flex-1 p-4 space-y-4 select-none">
            <div className="flex items-center space-x-3">
              <Menu size={24} />
              {(isFixedExpanded || isHovering) && <span className="whitespace-nowrap">Inicio</span>}
            </div>
            <div className="flex items-center space-x-3">
              <Menu size={24} />
              {(isFixedExpanded || isHovering) && <span className="whitespace-nowrap">Usuarios</span>}
            </div>
            {/* Agrega más items aquí */}
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main
        className="flex-1 transition-margin duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidthForLayout }}
      >
        {/* En móvil podrías añadir botón para mostrar sidebar si quieres */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
