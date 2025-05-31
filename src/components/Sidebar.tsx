import { useState, useRef, useEffect, type ReactElement } from "react";
import { Menu, Grid, Layers, Users, Archive, Settings, Award } from "react-feather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { useSidebarMenu } from "../hooks/useSidebarMenu";
import clsx from "clsx";
import ShimmerLoader from "./loadings/ShimmerLoader";

interface SidebarProps {
  isFixedExpanded: boolean;
  setIsFixedExpanded: (value: boolean) => void;
  expandedWidth?: number;
  collapsedWidth?: number;
}

export default function Sidebar({
  isFixedExpanded,
  setIsFixedExpanded,
  expandedWidth = 270,
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
    "Respuestas Predeterminada": <Award size={16} />,
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
      <div className={clsx("flex flex-col h-full", {
        "items-center": !isExpanded
      })}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faReact} size="2x" />
            {isExpanded && (
              <span className="font-bold  text-lg">Cuba</span>
            )}
          </div>
          {isExpanded && (
            <button
              className="p-1 rounded cursor-pointer"
              onClick={() => {
                setIsFixedExpanded(!isFixedExpanded);
                setIsHovering(false);
                setIsOverlay(false);
              }}
            >
              {/* {isFixedExpanded ? <Grid size={16} /> : <Grid size={16} />} */}
              <Grid size={16} />
            </button>
          )}
        </div>


        {/* Loading y error */}
        {loading && (
          <div className="p-4 w-full h-full">
            <ShimmerLoader />
          </div>
        )}

        {error && <div className={clsx("p-4 h-full flex justify-center items-center text-center text-red-500 break-words")}>
          {isExpanded ? (error) : ("Error")}
          
        </div>}

        {/* Menú */}
      <nav className="flex-1 p-2 space-y-4 select-none overflow-y-auto overflow-x-hidden custom-scroll">
          {menu.map((section, idx) => (
            <div key={idx}>
              {isExpanded && (
                <div className="mb-2 text-sm font-bold text-primary p-4 bg-[rgba(115,102,255,0.06)] rounded">
                  {section.header}
                </div>
              )}
              <div className=" space-y-2">
                {section.items.map((item) => (
                  <div
                    key={item.row}
                    className="flex items-center space-x-3 p-3 hover:bg-[rgba(115,102,255,0.06)] hover:text-primary rounded cursor-pointer transition-all duration-300"
                  >
                    {iconMap[item.nombre] || <Menu size={16} />}
                    {isExpanded && (
                    <span
                      className={`leading-snug ${
                        isExpanded
                          ? "break-words"
                          : "whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]"
                      }`}
                    >
                        {item.nombre}
                      </span>
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
