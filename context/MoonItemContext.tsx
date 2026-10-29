// Shared item data for all tabs (My List, Progress, About).
// Every screen can read the same list by calling useMoonItems().

import { createContext, ReactNode, useContext, useState } from 'react';
import { LayoutAnimation } from 'react-native';

// ---------- Types ----------
export type MoonItem = {
  itemId: string;
  text: string;
  checked: boolean;
};

type MoonItemContextValue = {
  items: MoonItem[];
  itemTotal: number;
  leftCount: number;
  finishedCount: number;
  finishedPercent: number;
  addItem: (text: string) => void;
  flipItem: (itemId: string) => void;
  dropItem: (itemId: string) => void;
  dropFinished: () => void;
};

const MoonItemContext = createContext<MoonItemContextValue | null>(null);

// Makes list changes smooth
const softMove = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

// ---------- Provider ----------
export function MoonItemProvider({ children }: { children: ReactNode }) {
  // The ONE list of items used by the whole app
  const [items, setItems] = useState<MoonItem[]>([
    { itemId: 'm1', text: 'Drink some water 💧', checked: true },
    { itemId: 'm2', text: 'Complete the lab task', checked: false },
    { itemId: 'm3', text: 'Go for an evening walk 🌙', checked: false },
  ]);

  const addItem = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    const newItem: MoonItem = {
      itemId: Date.now().toString(),
      text: cleanText,
      checked: false,
    };

    softMove();
    setItems([newItem, ...items]);
  };

  const flipItem = (itemId: string) => {
    softMove();
    setItems(
      items.map((item) => (item.itemId === itemId ? { ...item, checked: !item.checked } : item))
    );
  };

  const dropItem = (itemId: string) => {
    softMove();
    setItems(items.filter((item) => item.itemId !== itemId));
  };

  const dropFinished = () => {
    softMove();
    setItems(items.filter((item) => !item.checked));
  };

  // Numbers used on the screens
  const itemTotal = items.length;
  const leftCount = items.filter((item) => !item.checked).length;
  const finishedCount = itemTotal - leftCount;
  const finishedPercent = itemTotal === 0 ? 0 : Math.round((finishedCount / itemTotal) * 100);

  return (
    <MoonItemContext.Provider
      value={{
        items,
        itemTotal,
        leftCount,
        finishedCount,
        finishedPercent,
        addItem,
        flipItem,
        dropItem,
        dropFinished,
      }}
    >
      {children}
    </MoonItemContext.Provider>
  );
}

// ---------- Hook used by the screens ----------
export function useMoonItems() {
  const value = useContext(MoonItemContext);
  if (value === null) {
    throw new Error('useMoonItems must be used inside MoonItemProvider');
  }
  return value;
}
