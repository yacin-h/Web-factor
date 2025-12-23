import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BrandingContextType } from "@/types/brandingContext";
import { generateBrandingColors } from "@/lib/brandingColors";

const useBranding = create<BrandingContextType>()(
    persist(
        (set) => ({
            color: null,
            colors: null,
            logo: null,

            setColor: (color: string) => {
                const colors = generateBrandingColors(color);
                set({ color, colors });
            },

            setLogo: (logo: string) => set({ logo }),
        }),
        {
            name: "branding",
        }
    )
);

export default useBranding;
