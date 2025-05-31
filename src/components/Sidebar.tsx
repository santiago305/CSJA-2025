import { useState, useRef, useEffect, type ReactElement } from "react";
import { Menu, X, Grid, Layers, Users, Archive, Settings } from "react-feather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { useSidebarMenu } from "../hooks/useSidebarMenu";

interface SidebarProps {
  isFixedExpanded: boolean;
  setIsFixedExpanded: (value: boolean) => void;
  expandedWidth?: number;
  collapsedWidth?: number;
}

export default function Sidebar({
  isFixedExpanded,
  setIsFixedExpanded,
  expandedWidth = 250,
  collapsedWidth = 70,
}: SidebarProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const userId = 7; // Prueba. Cambiar dinámico luego.
  const { menu, loading, error } = useSidebarMenu(userId);

  const onMouseEnter = () => {
    if (isFixedExpanded) return;
    setIsOverlay(true);
    setIsHovering(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsHovering(true), 100);
  };

  const onMouseLeave = () => {
    if (isFixedExpanded) return;
    setIsHovering(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsOverlay(false), 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const width = isFixedExpanded || isHovering ? expandedWidth : collapsedWidth;
  const isExpanded = isFixedExpanded || isHovering;

  const iconMap: Record<string, ReactElement> = {
    Dashboard: <Grid size={16} />,
    Tickets: <Archive size={16} />,
    "Respuestas Predeterminada": <Settings size={16} />,
    Agenda: <Menu size={16} />,
    Areas: <Layers size={16} />,
    Usuarios: <Users size={16} />,
    Roles: <Settings size={16} />,
  };

  return (
    <aside
      className={`bg-white h-full overflow-hidden transition-all duration-300 ease-in-out shadow-md ${
        isOverlay ? "absolute z-50" : "relative"
      } ${!isFixedExpanded ? "cursor-pointer" : ""}`}
      style={{
        top: 0,
        left: 0,
        height: "100vh",
        width,
        position: isOverlay ? "absolute" : "fixed",
        zIndex: isOverlay ? 1000 : "auto",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        {isExpanded && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faReact} className="text-purple-600" />
              <span className="font-bold text-purple-600 text-lg">Cuba</span>
            </div>
            <button
              className="p-1 rounded"
              onClick={() => {
                setIsFixedExpanded(!isFixedExpanded);
                setIsHovering(false);
                setIsOverlay(false);
              }}
            >
              {isFixedExpanded ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        )}

        {/* Loading y error */}
        {loading && (
          <div className="p-4 text-center text-gray-500">Cargando menú...</div>
        )}
        {error && <div className="p-4 text-center text-red-500">{error}</div>}

        {/* Menú */}
        <nav className="flex-1 p-2 space-y-4 select-none overflow-auto">
          {menu.map((section, idx) => (
            <div key={idx}>
              {isExpanded && (
                <div className="text-xs font-bold text-purple-700 px-2 py-1 bg-purple-100 rounded">
                  {section.header}
                </div>
              )}
              <div className="mt-2 space-y-2">
                {section.items.map((item) => (
                  <div
                    key={item.row}
                    className="flex items-center space-x-3 px-2 py-1 hover:bg-purple-50 rounded cursor-pointer"
                  >
                    {iconMap[item.nombre] || <Menu size={16} />}
                    {isExpanded && (
                      <span className="whitespace-nowrap">{item.nombre}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
