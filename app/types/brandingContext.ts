// types/brandingContext.ts
export type BrandingColors = {
    base: string; //base color
    text: string; // high contrast 
    muted: string; // muted
    border: string; //  border
    hover: string; // hover / active
};

export type BrandingContextType = {
    color: string | null;
    colors: BrandingColors | null;
    logo: string | null;

    setColor: (color: string) => void;
    setLogo: (logo: string) => void;
};
