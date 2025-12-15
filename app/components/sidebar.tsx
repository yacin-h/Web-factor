import {
    Users,
    Home,
    Package,
    Settings,
    ScrollText,
    User2,
    ChevronUp,
    LogOut,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useAuth } from "@/store/auth";
import { Button } from "./ui/button";
// Menu items.
const productItems = [
    {
        title: "خانه",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "فاکتور ها",
        url: "/invoices",
        icon: ScrollText,
    },
    {
        title: "کالا ها",
        url: "/products",
        icon: Package,
    },
    {
        title: "مشتریان",
        url: "#",
        icon: Users,
    },

    {
        title: "تنظیمات",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    const { logOut } = useAuth();
    return (
        <Sidebar side="right">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {productItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarSeparator />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> حساب کاربری
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <Button onClick={logOut} asChild>
                                    <DropdownMenuItem className="flex justify-end">
                                        <span>خروج</span>
                                        <LogOut />
                                    </DropdownMenuItem>
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
