"use client";

import { motion } from "framer-motion";
import { TabCategory } from "@/viewmodels/useWorkspaceConfigurator";
import { Armchair, Lamp, LayoutGrid } from "lucide-react";

interface CategoryTabsProps {
  activeTab: TabCategory;
  onChange: (tab: TabCategory) => void;
}

const tabs: { id: TabCategory; label: string; icon: React.ReactNode }[] = [
  { id: "desks", label: "Desks", icon: <LayoutGrid size={16} /> },
  { id: "chairs", label: "Chairs", icon: <Armchair size={16} /> },
  { id: "accessories", label: "Accessories", icon: <Lamp size={16} /> },
];

export default function CategoryTabs({ activeTab, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 rounded-2xl bg-[#f5e6d3] p-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition-all
              ${isActive ? "text-[#2d3748]" : "text-[#a0aec0] hover:text-[#718096]"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
