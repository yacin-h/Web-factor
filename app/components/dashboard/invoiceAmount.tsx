import { CircleDollarSign } from "lucide-react";
import num2persian from "num2persian";

import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
export default function InvoiceAmount({
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
                    <CircleDollarSign />
                </CardAction>
            </CardHeader>
            <CardContent >
                <div className="flex gap-2">
                    <p>{value}</p>
                <span>تومان </span>
                </div>
                <div className="text-muted-foreground flex gap-1">
                    {num2persian(value)}
                </div>
            </CardContent>
        </Card>
    );
}
