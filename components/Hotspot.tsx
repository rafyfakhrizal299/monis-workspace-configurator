"use client";

import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Product } from "@/models/types";

interface HotspotProps {
  x: string;
  y: string;
  label: string;
  product?: Product | null;
  disabled?: boolean;
  onClick: () => void;
}

export default function Hotspot({ x, y, label, product, disabled, onClick }: HotspotProps) {
  const isEmpty = !product;

  if (disabled) return null;

  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 outline-none group"
      style={{ left: x, top: y }}
    >
      <div
        className={`
          relative flex h-10 w-10 items-center justify-center rounded-xl shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95
          ${
            isEmpty
              ? "border border-white/60 bg-white/25 text-white"
              : "bg-white text-[#2f855a]"
          }
        `}
      >
        {isEmpty ? (
          <Plus size={18} strokeWidth={2.5} />
        ) : (
          <Check size={16} strokeWidth={3} />
        )}
        {isEmpty && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-white"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <span
        className={`
          max-w-[100px] truncate rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-md backdrop-blur-md transition-opacity
          ${isEmpty ? "bg-[#2d3748]/70 text-white" : "bg-white text-[#2d3748]"}
          opacity-0 group-hover:opacity-100
        `}
      >
        {isEmpty ? label : product.name}
      </span>
    </motion.button>
  );
}
