"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useWorkspaceConfigurator } from "@/viewmodels/useWorkspaceConfigurator";
import WorkspaceScene from "@/components/WorkspaceScene";
import Hotspot from "@/components/Hotspot";
import SelectionDrawer from "@/components/SelectionDrawer";
import CheckoutPanel from "@/components/CheckoutPanel";
import { Product, AccessorySlot } from "@/models/types";
import { desks, chairs, accessories } from "@/models/catalog";
import { Sparkles, ShoppingBag, RotateCcw } from "lucide-react";

type HotspotSlot = "desk" | "chair" | AccessorySlot;

type DrawerTarget =
  | { type: "desk" }
  | { type: "chair" }
  | { type: "accessory"; slot: AccessorySlot; label: string; products: Product[] };

export default function WorkspaceConfigurator() {
  const vm = useWorkspaceConfigurator();
  const [drawer, setDrawer] = useState<DrawerTarget | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const hasDesk = !!vm.selectedDesk;
  const supportedDeskSlots = new Set(vm.selectedDesk?.slots ?? []);

  const hotspotConfig = useMemo(
    () => [
      {
        slot: "desk" as HotspotSlot,
        x: "50%",
        y: "58%",
        label: "Add Desk",
        product: vm.selectedDesk,
        disabled: false,
      },
      {
        slot: "chair" as HotspotSlot,
        x: "50%",
        y: "72%",
        label: "Add Chair",
        product: vm.selectedChair,
        disabled: false,
      },
      {
        slot: "chair" as HotspotSlot,
        x: "50%",
        y: "72%",
        label: "Add Chair",
        product: vm.selectedChair,
        disabled: !hasDesk,
      },
      {
        slot: "monitorCenter" as AccessorySlot,
        x: "44%",
        y: "46%",
        label: "Center Monitor",
        product: vm.configuration.accessories.monitorCenter
          ? accessories.find((p) => p.id === vm.configuration.accessories.monitorCenter)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("monitorCenter"),
      },
      {
        slot: "monitorLeft" as AccessorySlot,
        x: "27%",
        y: "48%",
        label: "Left Monitor",
        product: vm.configuration.accessories.monitorLeft
          ? accessories.find((p) => p.id === vm.configuration.accessories.monitorLeft)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("monitorLeft"),
      },
      {
        slot: "monitorRight" as AccessorySlot,
        x: "62%",
        y: "48%",
        label: "Right Monitor",
        product: vm.configuration.accessories.monitorRight
          ? accessories.find((p) => p.id === vm.configuration.accessories.monitorRight)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("monitorRight"),
      },
      {
        slot: "laptop" as AccessorySlot,
        x: "56%",
        y: "54%",
        label: "Laptop",
        product: vm.configuration.accessories.laptop
          ? accessories.find((p) => p.id === vm.configuration.accessories.laptop)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("laptop"),
      },
      {
        slot: "keyboard" as AccessorySlot,
        x: "42%",
        y: "58%",
        label: "Keyboard",
        product: vm.configuration.accessories.keyboard
          ? accessories.find((p) => p.id === vm.configuration.accessories.keyboard)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("keyboard"),
      },
      {
        slot: "mouse" as AccessorySlot,
        x: "58%",
        y: "60%",
        label: "Mouse",
        product: vm.configuration.accessories.mouse
          ? accessories.find((p) => p.id === vm.configuration.accessories.mouse)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("mouse"),
      },
      {
        slot: "lamp" as AccessorySlot,
        x: "66%",
        y: "44%",
        label: "Lamp",
        product: vm.configuration.accessories.lamp
          ? accessories.find((p) => p.id === vm.configuration.accessories.lamp)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("lamp"),
      },
      {
        slot: "plantLeft" as AccessorySlot,
        x: "24%",
        y: "47%",
        label: "Plant",
        product: vm.configuration.accessories.plantLeft
          ? accessories.find((p) => p.id === vm.configuration.accessories.plantLeft)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("plantLeft"),
      },
      {
        slot: "plantRight" as AccessorySlot,
        x: "72%",
        y: "47%",
        label: "Plant",
        product: vm.configuration.accessories.plantRight
          ? accessories.find((p) => p.id === vm.configuration.accessories.plantRight)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("plantRight"),
      },
      {
        slot: "coffeeStation" as AccessorySlot,
        x: "70%",
        y: "53%",
        label: "Coffee",
        product: vm.configuration.accessories.coffeeStation
          ? accessories.find((p) => p.id === vm.configuration.accessories.coffeeStation)
          : null,
        disabled: !hasDesk || !supportedDeskSlots.has("coffeeStation"),
      },
    ],
    [vm, hasDesk, supportedDeskSlots]
  );

  const handleHotspotClick = (slot: HotspotSlot) => {
    if (slot === "desk") {
      setDrawer({ type: "desk" });
    } else if (slot === "chair") {
      setDrawer({ type: "chair" });
    } else {
      const slotProducts = accessories.filter((p) => p.slots?.includes(slot));
      setDrawer({
        type: "accessory",
        slot,
        label: hotspotConfig.find((h) => h.slot === slot)?.label ?? "Accessory",
        products: slotProducts,
      });
    }
  };

  const drawerTitle = drawer
    ? drawer.type === "desk"
      ? "Choose Your Desk"
      : drawer.type === "chair"
      ? "Choose Your Chair"
      : `Add ${drawer.label}`
    : "";

  const drawerSelectedId = drawer
    ? drawer.type === "desk"
      ? vm.configuration.deskId
      : drawer.type === "chair"
      ? vm.configuration.chairId
      : vm.configuration.accessories[drawer.slot]
    : null;

  const handleDrawerSelect = (productId: string) => {
    if (!drawer) return;
    if (drawer.type === "desk") {
      vm.setDesk(productId);
    } else if (drawer.type === "chair") {
      vm.setChair(productId);
    } else {
      vm.toggleAccessory(drawer.slot, productId);
    }
    setDrawer(null);
  };

  const handleDrawerRemove = () => {
    if (!drawer) return;
    if (drawer.type === "desk") {
      // Keep at least one desk selected
      return;
    } else if (drawer.type === "chair") {
      return;
    } else {
      vm.removeAccessoryFromSlot(drawer.slot);
    }
    setDrawer(null);
  };

  const drawerProducts = drawer
    ? drawer.type === "desk"
      ? desks
      : drawer.type === "chair"
      ? chairs
      : drawer.products
    : [];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#2d3748]">
      {/* Fullscreen workspace preview */}
      <div className="relative h-full w-full">
        <WorkspaceScene
          desk={vm.selectedDesk}
          chair={vm.selectedChair}
          accessories={vm.selectedAccessories}
        />

        {/* Dark vignette overlay for app-like depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(45,55,72,0.15)_100%)]" />

        {/* Hotspots */}
        {hotspotConfig.map((item) => (
          <Hotspot
            key={item.slot}
            x={item.x}
            y={item.y}
            label={item.label}
            product={item.product ?? null}
            disabled={item.disabled}
            onClick={() => handleHotspotClick(item.slot)}
          />
        ))}
      </div>

      {/* Floating header */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c86b4a] text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-sm font-black leading-none text-[#2d3748]">monis.rent</h1>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#a0aec0]">
              Workspace Builder
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={vm.reset}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#718096] shadow-lg backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            title="Start over"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={() => setShowSummary(true)}
            className="flex items-center gap-2 rounded-full bg-[#2d3748] px-5 py-3 text-sm font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={16} />
            <span>${vm.summary.totalPerMonth}</span>
          </button>
        </motion.div>
      </header>

      {/* Floating bottom bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between gap-4 rounded-3xl bg-white/95 p-4 shadow-2xl backdrop-blur-md md:left-auto md:right-6 md:min-w-[360px]"
      >
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#a0aec0]">
            Monthly Total
          </p>
          <p className="text-2xl font-black text-[#2d3748]">
            ${vm.summary.totalPerMonth}
            <span className="ml-1 text-sm font-medium text-[#a0aec0]">/mo</span>
          </p>
        </div>
        <button
          onClick={() => setShowSummary(true)}
          className="group relative overflow-hidden rounded-2xl bg-[#c86b4a] px-6 py-3.5 font-black text-white shadow-lg transition-transform active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Rent Setup
            <Sparkles size={16} />
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </motion.div>

      {/* Helper hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pointer-events-none absolute bottom-24 left-0 right-0 z-10 text-center text-xs font-medium text-white/70 md:bottom-6 md:left-6 md:right-auto"
      >
        Tap the + buttons to build your workspace
      </motion.p>

      {/* Selection drawer */}
      <SelectionDrawer
        isOpen={drawer !== null}
        onClose={() => setDrawer(null)}
        title={drawerTitle}
        subtitle={drawer?.type === "accessory" ? "Choose one for this spot" : undefined}
        products={drawerProducts}
        selectedId={drawerSelectedId}
        onSelect={handleDrawerSelect}
        onRemove={drawer?.type === "accessory" ? handleDrawerRemove : undefined}
      />

      {/* Checkout panel */}
      <CheckoutPanel
        summary={vm.summary}
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        onRent={() => {
          alert(
            `Thanks for designing your workspace with monis.rent!\n\nMonthly total: $${vm.summary.totalPerMonth}\nWe'll be in touch within 24h to confirm delivery in Bali.`
          );
          setShowSummary(false);
        }}
      />
    </div>
  );
}
