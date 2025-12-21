import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useBranding from "@/store/branding";

export default function Branding() {
    const { color, image, setColor, setImage } = useBranding();
    const [loading, setLoading] = useState(false);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Invoice Branding</h1>

                {/* Color Selection */}
                <div className="border rounded-lg p-6">
                    <label className="block text-lg font-semibold mb-4">
                        Invoice Color
                    </label>
                    <div className="flex items-center gap-4">
                        <Input
                            type="color"
                            value={color || "#000000"}
                            onChange={handleColorChange}
                            className="w-20 h-20 cursor-pointer"
                        />
                        <div>
                            <p className="text-gray-600">
                                Selected: {color || "#000000"}
                            </p>
                            <div
                                className="w-32 h-16 border-2 mt-2"
                                style={{ backgroundColor: color || "#000000" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Logo Upload */}
                <div className="border rounded-lg p-6">
                    <label className="block text-lg font-semibold mb-4">
                        Upload Logo
                    </label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="block mb-4"
                    />
                    {image && (
                        <div>
                            <p className="text-gray-600 mb-2">Preview:</p>
                            <img
                                src={image}
                                alt="Logo preview"
                                className="w-32 h-32 object-contain border rounded"
                            />
                        </div>
                    )}
                </div>
        </div>
    );
}
