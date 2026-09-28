"use client";

import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Product } from "@/models/types";

interface HotspotProps {
  x: string;
  y: string;
  label: string;
  product?: Product | null;
  onClick: () => void;
}

export default function Hotspot({ x, y, label, product, onClick }: HotspotProps) {
  const isEmpty = !product;

  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
      style={{ left: x, top: y }}
    >
      <div
        className={`
          relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95
          ${
            isEmpty
              ? "border-2 border-white bg-white/30 text-white"
              : "bg-white text-[#2f855a]"
          }
        `}
      >
        {isEmpty ? (
          <Plus size={26} strokeWidth={2.5} />
        ) : (
          <Check size={22} strokeWidth={3} />
        )}
        {isEmpty && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <span
        className={`
          whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md
          ${isEmpty ? "bg-[#2d3748]/70 text-white" : "bg-white text-[#2d3748]"}
        `}
      >
        {isEmpty ? label : product.name}
      </span>
    </motion.button>
  );
}
