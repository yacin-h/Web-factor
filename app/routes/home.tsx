import { NavLink } from "react-router";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Invoice web app" },
        { name: "description", content: "Welcome to Invoice maker!" },
    ];
}

export default function Home() {
    return<>
        <Button>test</Button>
    </>;
}
