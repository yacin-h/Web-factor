import { Link } from "react-router";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className="flex justify-between items-center">
            <Link to={"/"}>
                <img className="size-20" src="logo.png" alt="invoice logo" />
            </Link>
            <div>
            <Button className="text-lg">ورود/عضویت</Button>
            <Button className="text-lg mr-2" variant={"outline"}>درباره فاکتور ساز</Button>
            </div>
        </header>
    );
}
