import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function Header() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        aboutSection?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <header className=" container mx-auto flex justify-between items-center  pt-4 h-16">
            <Link to={"/"}>
                <img className="size-16" src="logo.png" alt="invoice logo" />
            </Link>
            <div>
                <Button
                
                    onClick={scrollToAbout}
                    variant={"outline"}
                >
                    درباره فاکتور ساز
                </Button>
                <NavLink to={"/dashboard"} >
                    <Button className="mr-4">ورود/عضویت</Button>
                </NavLink>
            </div>
        </header>
    );
}
