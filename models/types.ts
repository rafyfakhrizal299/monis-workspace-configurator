export type Category = "desks" | "chairs" | "accessories" | "lifestyle";

export type AccessorySlot =
  | "monitorLeft"
  | "monitorCenter"
  | "monitorRight"
  | "laptop"
  | "lamp"
  | "plantLeft"
  | "plantRight"
  | "coffeeStation"
  | "keyboard"
  | "mouse"
  | "beanBag"
  | "surfboard"
  | "motorcycle";

export interface Product {
  id: string;
  name: string;
  category: Category;
  pricePerMonth: number;
  description: string;
  image?: string;
  color: string;
  slots?: AccessorySlot[];
}

export interface WorkspaceConfiguration {
  deskId: string | null;
  chairId: string | null;
  accessories: Record<AccessorySlot, string | null>;
}

export interface LineItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  items: LineItem[];
  totalPerMonth: number;
  depositEstimate: number;
}

export const ACCESSORY_SLOTS: AccessorySlot[] = [
  "monitorCenter",
  "monitorLeft",
  "monitorRight",
  "laptop",
  "keyboard",
  "mouse",
  "lamp",
  "plantLeft",
  "plantRight",
  "coffeeStation",
  "beanBag",
  "surfboard",
  "motorcycle",
];
