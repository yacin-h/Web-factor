import { Scroll } from "lucide-react";

import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
export default function InvoiceNumber({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardAction>
                    <Scroll />
                </CardAction>
            </CardHeader>
            <CardContent className="flex gap-2">
                <p>{value}</p>
                <span>عدد </span>
            </CardContent>
        </Card>
    );
}
