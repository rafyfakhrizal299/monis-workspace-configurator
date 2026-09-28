"use client";

import { motion } from "framer-motion";
import { useWorkspaceConfigurator, TabCategory } from "@/viewmodels/useWorkspaceConfigurator";
import WorkspaceScene from "@/components/WorkspaceScene";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import CheckoutPanel from "@/components/CheckoutPanel";
import { AccessorySlot, Product } from "@/models/types";
import { Sparkles, ShoppingBag, RotateCcw, MapPin } from "lucide-react";

export default function WorkspaceConfigurator() {
  const vm = useWorkspaceConfigurator();

  const accessoryGroups: { slot: AccessorySlot; label: string; compatible: Product[] }[] = [
    {
      slot: "monitorCenter",
      label: "Center Monitor",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("monitorCenter")),
    },
    {
      slot: "monitorLeft",
      label: "Left Monitor",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("monitorLeft")),
    },
    {
      slot: "monitorRight",
      label: "Right Monitor",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("monitorRight")),
    },
    {
      slot: "laptop",
      label: "Laptop",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("laptop")),
    },
    {
      slot: "keyboard",
      label: "Keyboard",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("keyboard")),
    },
    {
      slot: "mouse",
      label: "Mouse",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("mouse")),
    },
    {
      slot: "lamp",
      label: "Desk Lamp",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("lamp")),
    },
    {
      slot: "plantLeft",
      label: "Left Plant",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("plantLeft")),
    },
    {
      slot: "plantRight",
      label: "Right Plant",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("plantRight")),
    },
    {
      slot: "coffeeStation",
      label: "Coffee Station",
      compatible: vm.currentTabProducts.filter((p) => p.slots?.includes("coffeeStation")),
    },
  ];

  const supportedSlots = new Set(vm.selectedDesk?.slots ?? []);

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#2d3748]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#eaddcf] bg-[#fffaf0]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c86b4a] text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black leading-none tracking-tight">monis.rent</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a0aec0]">
                Workspace Builder
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs font-medium text-[#718096] md:flex">
            <MapPin size={14} />
            <span>Delivering across Bali</span>
          </div>
          <button
            onClick={() => vm.setIsCheckoutOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-[#2d3748] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Summary</span>
            {vm.summary.totalPerMonth > 0 && (
              <span className="flex h-5 items-center justify-center rounded-full bg-[#c86b4a] px-2 text-[10px]">
                ${vm.summary.totalPerMonth}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[380px_1fr]">
        {/* Left panel — product catalog */}
        <section className="order-2 space-y-4 lg:order-1">
          <div className="rounded-3xl border border-[#eaddcf] bg-white p-5 shadow-sm">
            <CategoryTabs activeTab={vm.activeTab} onChange={vm.setActiveTab} />

            <div className="mt-5">
              {vm.activeTab !== "accessories" ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {vm.currentTabProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={
                        vm.activeTab === "desks"
                          ? vm.configuration.deskId === product.id
                          : vm.configuration.chairId === product.id
                      }
                      onClick={() =>
                        vm.activeTab === "desks"
                          ? vm.setDesk(product.id)
                          : vm.setChair(product.id)
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                  {accessoryGroups.map((group) => {
                    const isSupported = supportedSlots.has(group.slot);
                    const selectedId = vm.configuration.accessories[group.slot];
                    const selectedProduct = group.compatible.find((p) => p.id === selectedId);

                    if (!isSupported) return null;

                    return (
                      <div key={group.slot}>
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-xs font-black uppercase tracking-wider text-[#a0aec0]">
                            {group.label}
                          </h3>
                          {selectedProduct && (
                            <button
                              onClick={() => vm.removeAccessoryFromSlot(group.slot)}
                              className="text-xs font-medium text-[#c86b4a] hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                          {group.compatible.map((product) => (
                            <ProductCard
                              key={`${group.slot}-${product.id}`}
                              product={product}
                              isSelected={selectedId === product.id}
                              onClick={() => vm.toggleAccessory(group.slot, product.id)}
                              accessorySlot={group.slot}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={vm.reset}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#eaddcf] bg-white py-3 text-sm font-bold text-[#718096] transition-colors hover:bg-[#fff7ed] hover:text-[#c86b4a]"
          >
            <RotateCcw size={16} />
            Start Over
          </button>
        </section>

        {/* Right panel — workspace preview */}
        <section className="order-1 flex flex-col gap-4 lg:order-2">
          <div className="relative overflow-hidden rounded-3xl border border-[#eaddcf] bg-white shadow-sm">
            <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-white/80 to-transparent px-6 py-5">
              <h2 className="text-2xl font-black text-[#2d3748]">Design Your Workspace</h2>
              <p className="text-sm text-[#718096]">
                Pick furniture, add gear, and watch your Bali office come to life.
              </p>
            </div>

            <motion.div
              layout
              className="relative aspect-[4/3] w-full bg-[#fffaf0]"
            >
              <WorkspaceScene
                desk={vm.selectedDesk}
                chair={vm.selectedChair}
                accessories={vm.selectedAccessories}
              />
            </motion.div>
          </div>

          {/* Bottom quick summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#eaddcf] bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#a0aec0]">
                Monthly Total
              </p>
              <p className="text-2xl font-black text-[#2d3748]">
                ${vm.summary.totalPerMonth}
                <span className="ml-1 text-sm font-medium text-[#a0aec0]">/mo</span>
              </p>
            </div>
            <button
              onClick={() => vm.setIsCheckoutOpen(true)}
              disabled={vm.summary.items.length === 0}
              className="flex items-center gap-2 rounded-xl bg-[#2f855a] px-6 py-3 font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Rent Your Setup
              <Sparkles size={16} />
            </button>
          </div>
        </section>
      </main>

      <CheckoutPanel
        summary={vm.summary}
        isOpen={vm.isCheckoutOpen}
        onClose={() => vm.setIsCheckoutOpen(false)}
        onRent={() => {
          alert(
            `Thanks for designing your workspace with monis.rent!\n\nMonthly total: $${vm.summary.totalPerMonth}\nWe'll be in touch within 24h to confirm delivery in Bali.`
          );
          vm.setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
}
