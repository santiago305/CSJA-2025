import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Estado para posición dropdown
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  async function fetchNotifications() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
      const data = res.data;
      const notifs = data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        message: item.body,
        read: false,
      }));
      setNotifications(notifs);
    } catch (e) {
      setError("Error cargando notificaciones");
    } finally {
      setLoading(false);
    }
  }

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // async function markNotificationReadAPI(id: string) {
  //   try {
  //     await axios.post(`/api/notifications/${id}/read`);
  //   } catch (error) {
  //     console.error("Error marcando notificación leída en backend", error);
  //   }
  // }

  // Marca notificación individual como leída
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );

    // Llamar a la API para marcar como leída (comentado)
    // markNotificationReadAPI(id);
  };


  const calculateDropdownPosition = useCallback(() => {
    if (!iconRef.current || !dropdownRef.current) return;

    const iconRect = iconRef.current.getBoundingClientRect();
    const dropdownWidth = dropdownRef.current.offsetWidth;
    const dropdownHeight = dropdownRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Posición top justo debajo del icono, sumando scroll vertical
    let top = iconRect.bottom + window.scrollY;

    // Posición left inicialmente alineada al icono
    let left = iconRect.left + window.scrollX;

    // Ajuste para que no se salga del viewport horizontal
    if (left + dropdownWidth > viewportWidth) {
      left = viewportWidth - dropdownWidth - 10; // 10px margen del borde derecho
      if (left < 0) left = 0; // que no quede negativo
    }

    // Ajuste para que no se salga del viewport vertical (por si es muy baja la ventana)
    if (top + dropdownHeight > viewportHeight + window.scrollY) {
      // Lo mostramos arriba del icono
      top = iconRect.top + window.scrollY - dropdownHeight;
      if (top < 0) top = 0;
    }

    setDropdownPos({ top, left });
  }, []);

  const toggleNotifications = () => {
    setIsOpen(prev => {
      const newOpen = !prev;
      if (newOpen) {
        markAllRead();
        setTimeout(() => {
          calculateDropdownPosition();
        }, 0); // aseguramos que el dropdown ya está en DOM
      }
      return newOpen;
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Recalcular posición al hacer resize para que el dropdown se mantenga visible
  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("resize", calculateDropdownPosition);
    return () => window.removeEventListener("resize", calculateDropdownPosition);
  }, [isOpen, calculateDropdownPosition]);

  const bellAnimation = {
    animate: {
      rotate: [0, 15, -15, 15, -15, 0],
    },
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 3,
    },
  };

  return (
    <div className="relative" style={{ width: 24, height: 24 }}>
      <div
        className="relative inline-block cursor-pointer"
        onClick={toggleNotifications}
        ref={iconRef}
      >
        <motion.div {...bellAnimation}>
          <FontAwesomeIcon icon={faBell} size="xl" color="#333" />
        </motion.div>

        {notifications.filter(n => !n.read).length > 0 && (
          <span
            className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-1 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full"
            style={{ minWidth: 10, height: 15 }}
          >
            {notifications.filter(n => !n.read).length}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-50"
          style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: 320,
            maxHeight: 384,
            overflowY: "auto",
          }}
        >
          {loading && <div className="p-4 text-center text-gray-500">Cargando...</div>}
          {error && <div className="p-4 text-center text-red-500">{error}</div>}
          {!loading && notifications.length === 0 && (
            <div className="p-4 text-center text-gray-500">No hay notificaciones</div>
          )}

          <ul>
            {notifications.map(({ id, title, message, read }) => (
              <li
                key={id}
                onClick={() => markAsRead(id)}
                className={`border-b border-gray-100 last:border-none p-3 hover:bg-gray-50 cursor-pointer ${
                  read ? "bg-white text-gray-600" : "bg-gray-100 text-gray-900"
                }`}
              >
                <div
                  style={{ display: "block", fontWeight: read ? "normal" : "bold" }}
                  className="text-sm"
                >
                  {title}
                </div>
                <div className="text-xs">{message}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}




// [
//   {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum..."
//   },
//   {
//     "userId": 1,
//     "id": 2,
//     "title": "qui est esse",
//     "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque..."
//   },
//   // ...otros posts
// ]
