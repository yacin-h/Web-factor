import type { BrandingContextType } from "@/types/brandingContext";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBranding = create<BrandingContextType>()(
    persist(
        (set) => ({
            color: null,
            image: null,
            setColor: (color: string) => set({ color }),
            setImage: (image: string) => set({ image }),
        }),
        {
            name: "branding", // Key for localStorage
        }
    )
);

export default useBranding;
