export type MenuItem = {
  row: number;
  menu_cabecera: number;
  nombre: string;
  accion: string | null;
  icon: string | null;
};

export type GroupedMenu = {
  header: string;
  items: MenuItem[];
};
