"use client";

import { useState, useMemo, useCallback } from "react";
import {
  WorkspaceConfiguration,
  AccessorySlot,
  CartSummary,
  LineItem,
  Category,
} from "@/models/types";
import {
  allProducts,
  desks,
  chairs,
  accessories,
  lifestyle,
  getProductById,
} from "@/models/catalog";

const DEPOSIT_MULTIPLIER = 1.5;

const initialConfiguration: WorkspaceConfiguration = {
  deskId: desks[0].id,
  chairId: chairs[0].id,
  accessories: {
    monitorCenter: null,
    monitorLeft: null,
    monitorRight: null,
    laptop: null,
    keyboard: null,
    mouse: null,
    lamp: null,
    plantLeft: null,
    plantRight: null,
    coffeeStation: null,
    beanBag: null,
    surfboard: null,
    motorcycle: null,
  },
};

export type TabCategory = Extract<Category, "desks" | "chairs" | "accessories">;

export function useWorkspaceConfigurator() {
  const [configuration, setConfiguration] = useState<WorkspaceConfiguration>(
    initialConfiguration
  );
  const [activeTab, setActiveTab] = useState<TabCategory>("desks");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const selectedDesk = useMemo(
    () => getProductById(configuration.deskId) ?? null,
    [configuration.deskId]
  );

  const selectedChair = useMemo(
    () => getProductById(configuration.chairId) ?? null,
    [configuration.chairId]
  );

  const selectedAccessories = useMemo(() => {
    const entries = Object.entries(configuration.accessories) as [
      AccessorySlot,
      string | null
    ][];
    return entries
      .map(([slot, productId]) => ({
        slot,
        product: productId ? getProductById(productId)! : null,
      }))
      .filter((item) => item.product !== null) as {
      slot: AccessorySlot;
      product: (typeof allProducts)[number];
    }[];
  }, [configuration.accessories]);

  const summary: CartSummary = useMemo(() => {
    const items: LineItem[] = [];
    const add = (product: typeof allProducts[number] | null) => {
      if (!product) return;
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({ product, quantity: 1 });
      }
    };

    add(selectedDesk);
    add(selectedChair);
    selectedAccessories.forEach(({ product }) => add(product));

    const totalPerMonth = items.reduce(
      (sum, item) => sum + item.product.pricePerMonth * item.quantity,
      0
    );
    const depositEstimate = Math.round(totalPerMonth * DEPOSIT_MULTIPLIER);

    return { items, totalPerMonth, depositEstimate };
  }, [selectedDesk, selectedChair, selectedAccessories]);

  const setDesk = useCallback((deskId: string) => {
    setConfiguration((prev) => ({
      ...prev,
      deskId,
      // Clear accessories that the new desk does not support
      accessories: Object.entries(prev.accessories).reduce(
        (acc, [slot, productId]) => {
          const desk = getProductById(deskId);
          const supported = desk?.slots?.includes(slot as AccessorySlot) ?? false;
          acc[slot as AccessorySlot] = supported ? productId : null;
          return acc;
        },
        {} as WorkspaceConfiguration["accessories"]
      ),
    }));
  }, []);

  const setChair = useCallback((chairId: string) => {
    setConfiguration((prev) => ({ ...prev, chairId }));
  }, []);

  const toggleAccessory = useCallback(
    (slot: AccessorySlot, productId: string) => {
      setConfiguration((prev) => {
        const current = prev.accessories[slot];
        const next = { ...prev.accessories };
        // If same product is already in this slot, remove it. Otherwise set it.
        next[slot] = current === productId ? null : productId;
        return { ...prev, accessories: next };
      });
    },
    []
  );

  const removeAccessoryFromSlot = useCallback((slot: AccessorySlot) => {
    setConfiguration((prev) => ({
      ...prev,
      accessories: { ...prev.accessories, [slot]: null },
    }));
  }, []);

  const reset = useCallback(() => {
    setConfiguration(initialConfiguration);
  }, []);

  const currentTabProducts = useMemo(() => {
    switch (activeTab) {
      case "desks":
        return desks;
      case "chairs":
        return chairs;
      case "accessories":
        return accessories;
    }
  }, [activeTab]);

  return {
    // State
    configuration,
    activeTab,
    isCheckoutOpen,

    // Derived state
    selectedDesk,
    selectedChair,
    selectedAccessories,
    summary,
    currentTabProducts,
    lifestyleProducts: lifestyle,

    // Actions
    setActiveTab,
    setDesk,
    setChair,
    toggleAccessory,
    removeAccessoryFromSlot,
    setIsCheckoutOpen,
    reset,
  };
}
