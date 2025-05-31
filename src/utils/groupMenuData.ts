import type { MenuItem, GroupedMenu } from "../types/menu";

export function groupMenuData(data: MenuItem[]): GroupedMenu[] {
  const result: GroupedMenu[] = [];
  let currentSection: GroupedMenu | null = null;

  for (const item of data) {
    if (item.menu_cabecera === 1) {
      if (currentSection) result.push(currentSection);
      currentSection = { header: item.nombre, items: [] };
    } else {
      currentSection?.items.push(item);
    }
  }

  if (currentSection) result.push(currentSection);

  return result;
}
