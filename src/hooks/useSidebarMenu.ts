import { useState, useEffect } from "react";
import axios from "axios";
import type { GroupedMenu, MenuItem } from "../types/menu";
import { groupMenuData } from "../utils/groupMenuData";

export function useSidebarMenu(userId: number) {
  const [menu, setMenu] = useState<GroupedMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      setError(null);
      try {
        const BASE_URL = import.meta.env.PROD
        ? 'https://www.desarrolloaqp.somee.com'
        : '/api';
        const response = await axios.get<MenuItem[]>(
          `${BASE_URL}/api/MenuSistema/MenuListar/${userId}`
        );
        const grouped = groupMenuData(response.data);
        setMenu(grouped);
      } catch (e) {
        setError("Error cargando el menú");
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [userId]);

  return { menu, loading, error };
}
