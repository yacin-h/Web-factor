// features/products/components/header.tsx
import { FolderTree, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/features/shared/components/ui/button";
import { useHasActiveSubscription } from "@/features/subscription/hooks/useSubscription";

import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "../../shared/components/ui/input-group";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../shared/components/ui/tooltip";
import AddProductModal from "./addProductModal";

export default function Header({
    setSearchQuery,
}: {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [searchInput, setSearchInput] = useState("");
    const { hasAccess } = useHasActiveSubscription();

    const handleSearch = () => setSearchQuery(searchInput);
    const handleReset = () => {
        setSearchInput("");
        setSearchQuery("");
    };

    return (
        <header className="mx-5 mb-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="title">کالا ها</h1>
                <div className="flex items-center gap-2">
                    {/* دکمه مدیریت دسته‌بندی - لینک به صفحه جداگانه */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <Link to="/categories">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!hasAccess}
                                    >
                                        <FolderTree className="h-4 w-4 ml-1" />
                                        مدیریت دسته‌بندی
                                    </Button>
                                </Link>
                            </span>
                        </TooltipTrigger>
                        {!hasAccess && (
                            <TooltipContent>
                                برای مدیریت دسته‌بندی ابتدا اشتراک تهیه کنید
                            </TooltipContent>
                        )}
                    </Tooltip>

                    <AddProductModal disabled={!hasAccess} />
                </div>
            </div>

            <div className="flex justify-between gap-3">
                <InputGroup className="w-64 px-1">
                    <InputGroupInput
                        placeholder="جستجو بر اساس نام کالا"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="text-right"
                    />

                    <InputGroupButton
                        onClick={handleSearch}
                        className="bg-primary text-primary-foreground"
                    >
                        <SearchIcon className="w-4 h-4" />
                    </InputGroupButton>

                    {searchInput && (
                        <InputGroupButton onClick={handleReset}>
                            <XIcon className="w-4 h-4" />
                        </InputGroupButton>
                    )}
                </InputGroup>
            </div>
        </header>
    );
}
