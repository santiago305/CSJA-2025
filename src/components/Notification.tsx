import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import clsx from 'clsx';

interface NotificationProps {
  classNameDropdown?: string;
  classNameBadge?: string;
  classNameItem?: string;
}

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

const PAGE_LIMIT = 5;

export default function Notification({
  classNameDropdown,
  classNameBadge,
  classNameItem,
}: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalNotifications, setTotalNotifications] = useState(0);

  const iconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Llamada inicial solo para obtener el total de notificaciones
  useEffect(() => {
    async function fetchTotal() {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=1`);
        const totalCountHeader = res.headers["x-total-count"];
        const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
        setTotalNotifications(totalCount);
      } catch {
        // No hacemos nada especial si falla aquí, badge quedará vacío
      }
    }
    fetchTotal();
  }, []);

  // Fetch notifications page by page and read total count from header
  const fetchNotifications = useCallback(
    async (pageToLoad: number) => {
      if (!hasMore && pageToLoad !== 0) return;
      if (pageToLoad === 0) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_start=${pageToLoad * PAGE_LIMIT}&_limit=${PAGE_LIMIT}`
        );
        const data = res.data;
        const totalCountHeader = res.headers["x-total-count"];
        const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : totalNotifications;
        setTotalNotifications(totalCount);

        const newNotifs = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          message: item.body,
          read: false,
        }));

        if (pageToLoad === 0) {
          setNotifications(newNotifs);
        } else {
          setNotifications((prev) => [...prev, ...newNotifs]);
        }

        setHasMore(newNotifs.length === PAGE_LIMIT);
        setPage(pageToLoad);
      } catch (e) {
        setError("Error cargando notificaciones");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [hasMore, totalNotifications]
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  // async function markNotificationReadAPI(id: string) {
  //   try {
  //     await axios.post(`/api/notifications/${id}/read`);
  //   } catch (error) {
  //     console.error("Error marcando notificación leída en backend", error);
  //   }
  // }
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    // markNotificationReadAPI(id);
  }, []);


  const calculateDropdownPosition = useCallback(() => {
    if (!iconRef.current || !dropdownRef.current) return;

    const iconRect = iconRef.current.getBoundingClientRect();
    const dropdownWidth = dropdownRef.current.offsetWidth;
    const dropdownHeight = dropdownRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = iconRect.bottom + window.scrollY;
    let left = iconRect.left + window.scrollX;

    if (left + dropdownWidth > viewportWidth) {
      left = viewportWidth - dropdownWidth - 10;
      if (left < 0) left = 0;
    }

    if (top + dropdownHeight > viewportHeight + window.scrollY) {
      top = iconRect.top + window.scrollY - dropdownHeight;
      if (top < 0) top = 0;
    }

    setDropdownPos({ top, left });
  }, []);

  const toggleNotifications = useCallback(() => {
    setIsOpen((prev) => {
      const newOpen = !prev;
      if (newOpen) {
        markAllRead();
        fetchNotifications(0);
        setTimeout(() => {
          calculateDropdownPosition();
        }, 0);
      }
      return newOpen;
    });
  }, [markAllRead, fetchNotifications, calculateDropdownPosition]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Recalcular posición en resize
  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("resize", calculateDropdownPosition);
    return () => window.removeEventListener("resize", calculateDropdownPosition);
  }, [isOpen, calculateDropdownPosition]);

  // Lazy loading al hacer scroll
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown || !isOpen) return;

    function handleScroll() {
      if (loadingMore || loading || !hasMore) return;
      if (!dropdown) return;

      const scrollTop = dropdown.scrollTop;
      const scrollHeight = dropdown.scrollHeight;
      const clientHeight = dropdown.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        fetchNotifications(page + 1);
      }
    }

    dropdown.addEventListener("scroll", handleScroll);
    return () => {
      dropdown.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNotifications, hasMore, isOpen, loadingMore, loading, page]);

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

  // Calcular no leídos: total - leídos locales
  const readCount = useMemo(() => notifications.filter((n) => n.read).length, [notifications]);
  const unreadCount = useMemo(() => totalNotifications - readCount, [totalNotifications, readCount]);
  const displayCount = useMemo(() => (unreadCount > 99 ? "99+" : unreadCount), [unreadCount]);

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

        {unreadCount > 0 && (
           <span
            className={clsx(
              "absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-1 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full",
              classNameBadge
            )}
            style={{ minWidth: 10, height: 15 }}
            title={`${unreadCount} notificaciones no leídas`}
          >
            {displayCount}
          </span>
        )}
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "mt-3 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-50",
            classNameDropdown
          )}
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
            <motion.li
              key={id}
              onClick={() => markAsRead(id)}
              initial={false}
              animate={{
                backgroundColor: read ? "#ffffff" : "#f3f4f6", // gris claro cuando no está leído
                color: read ? "#4b5563" : "#111827", // texto más tenue si está leído
                opacity: read ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={clsx(
                  "border-b border-gray-100 last:border-none p-3 hover:bg-gray-50 cursor-pointer",
                  classNameItem
                )}
            >
              <div
                style={{ display: "block", fontWeight: read ? "normal" : "bold" }}
                className="text-sm"
              >
                {title}
              </div>
              <div className="text-xs">{message}</div>
            </motion.li>
          ))}
          </ul>
          {loadingMore && (
            <div className="p-2 text-center text-gray-500">Cargando más...</div>
          )}
          {!hasMore && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="p-4 text-center text-gray-500 text-sm flex flex-col items-center justify-center"
            >
              <div className="text-3xl mb-1">📭</div>
              <span>No hay más notificaciones</span>
            </motion.div>
          )}
        </motion.div>
      )}
      </AnimatePresence>
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
