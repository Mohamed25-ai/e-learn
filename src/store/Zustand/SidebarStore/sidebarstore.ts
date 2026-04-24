import { create } from "zustand";
import { SidebarStoreType } from "./sidebarstore.types";

export const useSidebar = create<SidebarStoreType>((set) => ({
    isOpen: false,
    setOpen: (open: boolean) => set({ isOpen: open }),
    toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));