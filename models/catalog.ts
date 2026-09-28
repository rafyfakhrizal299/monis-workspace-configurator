import { Product } from "./types";

export const desks: Product[] = [
  {
    id: "desk-bamboo-standing",
    name: "Bali Bamboo Standing Desk",
    category: "desks",
    pricePerMonth: 49,
    description: "Sustainable bamboo top with electric height adjustment. Work seated or standing with a view of the rice terraces.",
    color: "#d4a574",
    slots: ["monitorCenter", "monitorLeft", "monitorRight", "laptop", "keyboard", "mouse", "lamp", "plantLeft", "plantRight"],
  },
  {
    id: "desk-teak-minimal",
    name: "Canggu Teak Minimal Desk",
    category: "desks",
    pricePerMonth: 39,
    description: "Reclaimed teak with clean lines and a hidden cable tray. The classic nomad command center.",
    color: "#8b6f4e",
    slots: ["monitorCenter", "monitorLeft", "monitorRight", "laptop", "keyboard", "mouse", "lamp", "plantLeft"],
  },
  {
    id: "desk-white-floating",
    name: "Uluwatu Floating Desk",
    category: "desks",
    pricePerMonth: 45,
    description: "Wall-mounted white surface that keeps your villa floor plan open and airy.",
    color: "#f5f0e8",
    slots: ["monitorCenter", "laptop", "keyboard", "mouse", "lamp", "plantLeft"],
  },
];

export const chairs: Product[] = [
  {
    id: "chair-ergonomic-mesh",
    name: "Ubud Ergonomic Mesh Chair",
    category: "chairs",
    pricePerMonth: 29,
    description: "Breathable mesh, lumbar support, and smooth casters for those 10-hour build sprints.",
    color: "#2d3748",
  },
  {
    id: "chair-terracotta-lounge",
    name: "Seminyak Terracotta Lounge Chair",
    category: "chairs",
    pricePerMonth: 24,
    description: "Soft boucle upholstery in warm terracotta. For calls, reading, and power naps.",
    color: "#c86b4a",
  },
  {
    id: "chair-wooden-kneeling",
    name: "Pererenan Kneeling Chair",
    category: "chairs",
    pricePerMonth: 19,
    description: "Active sitting wooden kneeler that keeps your core engaged between surf sessions.",
    color: "#a67c52",
  },
];

export const accessories: Product[] = [
  {
    id: "monitor-27",
    name: "27\" 4K Monitor",
    category: "accessories",
    pricePerMonth: 22,
    description: "Crisp 4K for design, code, and Bali sunset wallpapers.",
    color: "#1a202c",
    slots: ["monitorCenter", "monitorLeft", "monitorRight"],
  },
  {
    id: "monitor-32-ultrawide",
    name: "32\" Ultrawide Monitor",
    category: "accessories",
    pricePerMonth: 32,
    description: "One screen to rule them all. Split views never looked this good.",
    color: "#171923",
    slots: ["monitorCenter", "monitorLeft", "monitorRight"],
  },
  {
    id: "laptop-macbook",
    name: "MacBook Pro 16\"",
    category: "accessories",
    pricePerMonth: 89,
    description: "Ready-to-code Apple Silicon laptop, fully charged on arrival.",
    color: "#9ca3af",
    slots: ["laptop"],
  },
  {
    id: "lamp-arc",
    name: "Bamboo Arc Desk Lamp",
    category: "accessories",
    pricePerMonth: 8,
    description: "Warm LED task light with a natural bamboo arch.",
    color: "#e9c46a",
    slots: ["lamp"],
  },
  {
    id: "plant-monstera",
    name: "Monstera Deliciosa",
    category: "accessories",
    pricePerMonth: 6,
    description: "A touch of tropical jungle for your desk corner.",
    color: "#2f855a",
    slots: ["plantLeft", "plantRight"],
  },
  {
    id: "plant-snake",
    name: "Snake Plant",
    category: "accessories",
    pricePerMonth: 4,
    description: "Indestructible air purifier. Thrives on neglect while you travel.",
    color: "#276749",
    slots: ["plantLeft", "plantRight"],
  },
  {
    id: "keyboard-mechanical",
    name: "Wireless Mechanical Keyboard",
    category: "accessories",
    pricePerMonth: 12,
    description: "Tactile switches and a compact layout for your backpack.",
    color: "#4a5568",
    slots: ["keyboard"],
  },
  {
    id: "mouse-ergo",
    name: "Ergonomic Wireless Mouse",
    category: "accessories",
    pricePerMonth: 7,
    description: "Vertical grip that keeps your wrist happy during long sessions.",
    color: "#edf2f7",
    slots: ["mouse"],
  },
  {
    id: "coffee-machine",
    name: "Bali Coffee Station",
    category: "accessories",
    pricePerMonth: 18,
    description: "French press, local beans, and a keep-warm carafe for ritual morning brews.",
    color: "#744210",
    slots: ["coffeeStation"],
  },
];

export const lifestyle: Product[] = [
  {
    id: "bean-bag",
    name: "Outdoor Bean Bag",
    category: "lifestyle",
    pricePerMonth: 15,
    description: "Water-resistant lounge seat for poolside standups.",
    color: "#dd6b20",
    slots: ["beanBag"],
  },
  {
    id: "surfboard",
    name: "7' Soft-Top Surfboard",
    category: "lifestyle",
    pricePerMonth: 35,
    description: "Catch the morning swell before your first meeting.",
    color: "#3182ce",
    slots: ["surfboard"],
  },
  {
    id: "motorcycle",
    name: "Scooter (Monthly)",
    category: "lifestyle",
    pricePerMonth: 55,
    description: "Your island commute, delivered with a helmet.",
    color: "#e53e3e",
    slots: ["motorcycle"],
  },
];

export const allProducts: Product[] = [...desks, ...chairs, ...accessories, ...lifestyle];

export function getProductById(id: string | null): Product | undefined {
  return allProducts.find((p) => p.id === id);
}
