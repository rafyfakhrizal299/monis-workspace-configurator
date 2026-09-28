"use client";

import { motion } from "framer-motion";
import { Product, AccessorySlot } from "@/models/types";
import { Check, Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  accessorySlot?: AccessorySlot;
  quantityInSlot?: number;
}

export default function ProductCard({
  product,
  isSelected,
  isDisabled,
  onClick,
  accessorySlot,
  quantityInSlot,
}: ProductCardProps) {
  return (
    <motion.button
      whileHover={isDisabled ? {} : { y: -4 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        relative flex flex-col items-start text-left w-full rounded-2xl border-2 p-4 transition-colors
        ${
          isSelected
            ? "border-[#c86b4a] bg-[#fff7ed] shadow-md"
            : "border-[#eaddcf] bg-white hover:border-[#f6ad55]"
        }
        ${isDisabled ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer"}
      `}
    >
      {isSelected && (
        <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#c86b4a] text-white">
          <Check size={14} strokeWidth={3} />
        </span>
      )}

      {quantityInSlot !== undefined && quantityInSlot > 0 && !isSelected && (
        <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#2f855a] text-white text-xs font-bold">
          {quantityInSlot}
        </span>
      )}

      {/* Stylized product preview */}
      <div
        className="mb-3 h-20 w-full rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${product.color}22 0%, ${product.color}66 100%)`,
        }}
      >
        <svg viewBox="0 0 100 80" className="h-full w-full p-3">
          {product.category === "desks" && (
            <g transform="translate(10, 25)">
              <rect x="0" y="0" width="80" height="8" rx="2" fill={product.color} />
              <rect x="8" y="8" width="12" height="25" rx="2" fill="#5a4632" />
              <rect x="60" y="8" width="12" height="25" rx="2" fill="#5a4632" />
            </g>
          )}
          {product.category === "chairs" && (
            <g transform="translate(30, 15)">
              <rect x="10" y="0" width="20" height="35" rx="8" fill={product.color} />
              <rect x="5" y="32" width="30" height="8" rx="4" fill={product.color} />
              <rect x="18" y="40" width="4" height="18" fill="#4a5568" />
            </g>
          )}
          {product.category === "accessories" && (
            <>
              {product.id.includes("monitor") && (
                <g transform="translate(25, 15)">
                  <rect x="22" y="35" width="6" height="8" fill="#2d3748" />
                  <rect x="0" y="0" width="50" height="35" rx="3" fill={product.color} />
                  <rect x="4" y="4" width="42" height="27" rx="1" fill="#1a202c" />
                </g>
              )}
              {product.id.includes("laptop") && (
                <g transform="translate(30, 20)">
                  <rect x="5" y="0" width="35" height="25" rx="2" fill="#4b5563" />
                  <path d="M0 25 L45 25 L50 32 L-5 32 Z" fill="#9ca3af" />
                </g>
              )}
              {product.id.includes("lamp") && (
                <g transform="translate(35, 10)">
                  <rect x="10" y="45" width="6" height="12" fill="#5a4632" />
                  <path d="M13 45 L13 15 L35 25" stroke="#5a4632" strokeWidth="3" fill="none" />
                  <path d="M30 18 L42 30 L26 34 Z" fill={product.color} />
                </g>
              )}
              {product.id.includes("plant") && (
                <g transform="translate(38, 15)">
                  <path d="M5 45 Q3 25 12 15 Q20 25 18 45 Z" fill="#c05621" />
                  <path d="M12 15 Q0 5 5 25 Q10 28 12 15" fill={product.color} />
                  <path d="M12 18 Q24 8 20 28 Q15 30 12 18" fill={product.color} />
                </g>
              )}
              {product.id.includes("keyboard") && (
                <g transform="translate(15, 28)">
                  <rect x="0" y="0" width="70" height="20" rx="3" fill="#4a5568" />
                  <rect x="4" y="4" width="62" height="12" rx="1" fill="#2d3748" />
                </g>
              )}
              {product.id.includes("mouse") && (
                <g transform="translate(42, 25)">
                  <ellipse cx="8" cy="15" rx="7" ry="12" fill="#edf2f7" />
                </g>
              )}
              {product.id.includes("coffee") && (
                <g transform="translate(32, 18)">
                  <rect x="0" y="15" width="36" height="22" rx="2" fill={product.color} />
                  <rect x="12" y="5" width="12" height="14" rx="1" fill="#f6e05e" />
                </g>
              )}
            </>
          )}
        </svg>
      </div>

      <h3 className="text-sm font-bold text-[#2d3748] leading-tight">{product.name}</h3>
      <p className="mt-1 text-xs text-[#718096] line-clamp-2">{product.description}</p>
      <div className="mt-3 flex w-full items-center justify-between">
        <span className="text-sm font-black text-[#c86b4a]">${product.pricePerMonth}</span>
        <span className="text-[10px] font-medium text-[#a0aec0] uppercase tracking-wide">/mo</span>
      </div>

      {accessorySlot && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[#718096]">
          {isSelected ? <Minus size={12} /> : <Plus size={12} />}
          <span>{isSelected ? "Remove" : `Add to ${formatSlotName(accessorySlot)}`}</span>
        </div>
      )}
    </motion.button>
  );
}

function formatSlotName(slot: AccessorySlot): string {
  switch (slot) {
    case "monitorCenter":
      return "center";
    case "monitorLeft":
      return "left";
    case "monitorRight":
      return "right";
    case "plantLeft":
      return "left";
    case "plantRight":
      return "right";
    default:
      return slot;
  }
}
