import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/About.tsx"),
    route("invoice/:invoiceId", "routes/invoice.tsx"),

    // layout
    layout("routes/dashboard.tsx", [
        route("finances","routes/finances.tsx"),
        route("personal-info","routes/personalInfo.tsx"),

    ]),
] satisfies RouteConfig;
