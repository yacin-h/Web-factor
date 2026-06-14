import { useQueryClient } from "@tanstack/react-query";
import {
    ChevronDown,
    CircleDollarSign,
    CircleUserRound,
    Home,
    LogOut,
    Package,
    ScrollText,
    Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/features/shared/components/ui/sidebar";
import { SubscriptionStatusMini } from "@/features/subscription/components/SubscriptionStatusMini";
import useAuth from "@/store/auth";
import type { AuthContextType } from "@/types/authContext";

import { ModeToggle } from "./modeToggle";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const productItems = [
    {
        title: "داشبورد",
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
        url: "/customers",
        icon: Users,
    },
    {
        title: "اشتراک",
        url: "/subscription",
        icon: CircleDollarSign,
    },
    {
        title: "پروفایل",
        url: "/profile",
        icon: CircleUserRound,
    },
];



export function AppSidebar() {
    const path = useLocation().pathname;
    const logOut = useAuth((state: AuthContextType) => state.logOut);
    const queryClient = useQueryClient();
    const handleLogOut = () => {
        queryClient.clear();
        logOut();
    };
    const sidebarButtonGradientClass =
        "bg-linear-to-r from-sidebar-primary/30 to-sidebar-accent/40 hover:from-sidebar-primary/45 hover:to-sidebar-accent/55 data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-accent data-[active=true]:text-white";
    return (
        <Sidebar
            className="print:hidden print:m-0 border-l "
            dir="ltr"
            side="right"
        >
            <SidebarHeader>
                <img src="/logo.svg" alt="Logo" className="w-6/12 mx-auto " />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {productItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`flex-row-reverse sm:flex-row   ${sidebarButtonGradientClass}`}
                                        isActive={path === item.url}
                                    >
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
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1.5 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors">
                                <span>تنظیمات</span>
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent className="mt-1 space-y-1">
                                    <ModeToggle />

                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SubscriptionStatusMini />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogOut}
                            className={`flex-row-reverse sm:flex-row ${sidebarButtonGradientClass}`}
                        >
                            <LogOut />
                            <span>خروج از حساب کاربری</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
