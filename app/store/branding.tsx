import type { BrandingContextType } from "@/types/brandingContext";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBranding = create<BrandingContextType>()(
    persist(
        (set) => ({
            color: null,
            logo: null,
            setColor: (color: string) => set({ color }),
            setLogo: (logo: string) => set({ logo }),
        }),
        {
            name: "branding", // Key for localStorage
        }
    )
);

export default useBranding;
