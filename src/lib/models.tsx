export interface Book {
  id: number;
  title: string;
  description: string;
  short_description: string;
  category: string | string[];
  author: string;
  year: number;
  is_published: boolean;
}

export interface Menu {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  menu?: Menu;
  menu_id: number;
  quantity: number;
  remark: string;
}