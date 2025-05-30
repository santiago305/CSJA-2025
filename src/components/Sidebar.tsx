import { useState, useEffect, useRef } from "react";
import { Menu, X } from "react-feather";

interface SidebarProps {
  isFixedExpanded: boolean;
  setIsFixedExpanded: (value: boolean) => void;
  expandedWidth?: number;
  collapsedWidth?: number;
}

export default function Sidebar({
  isFixedExpanded,
  setIsFixedExpanded,
  expandedWidth = 400,
  collapsedWidth = 70,
}: SidebarProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const onMouseEnter = () => {
    if (isFixedExpanded) return;

    setIsOverlay(true);
    setIsHovering(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsHovering(true);
    }, 100);
  };

  const onMouseLeave = () => {
    if (isFixedExpanded) return;

    setIsHovering(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOverlay(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const width = isFixedExpanded || isHovering ? expandedWidth : collapsedWidth;

  return (
    <aside
      className={`
        bg-gray-800 text-white h-full
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${isOverlay ? "absolute z-50 shadow-lg" : "relative"}
        ${!isFixedExpanded ? "cursor-pointer" : ""}
      `}
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
        {(isFixedExpanded || isHovering) && (
          <button
            className="self-end m-2 p-1 rounded bg-gray-700 hover:bg-gray-600 transition"
            onClick={() => {
              setIsFixedExpanded(!isFixedExpanded);
              setIsHovering(false);
              setIsOverlay(false);
            }}
            title={isFixedExpanded ? "Colapsar sidebar" : "Expandir sidebar"}
          >
            {isFixedExpanded ? <X size={16} /> : <Menu size={16} />}
          </button>
        )}

        <nav className="flex-1 p-4 space-y-4 select-none">
          <div className="flex items-center space-x-3">
            <Menu size={24} />
            {(isFixedExpanded || isHovering) && (
              <span className="whitespace-nowrap">Inicio</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Menu size={24} />
            {(isFixedExpanded || isHovering) && (
              <span className="whitespace-nowrap">Usuarios</span>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
