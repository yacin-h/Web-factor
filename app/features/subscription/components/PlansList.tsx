// features/subscription/components/PlansList.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";

import { usePlans } from "../hooks/useSubscription";
import type { Plan } from "../types/subscription.types";

export function PlansList() {
    const { data: plans, isLoading, error } = usePlans();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                خطا در بارگذاری پلن‌ها
            </div>
        );
    }

    const getDurationText = (plan: Plan) => {
        switch (plan.duration_unit) {
            case "day":
                return `${plan.duration} روز`;
            case "month":
                return `${plan.duration} ماه`;
            case "year":
                return `${plan.duration} سال`;
            default:
                return `${plan.duration} روز`;
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans?.map((plan) => (
                <Card key={plan.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        {plan.is_trial && (
                            <CardDescription className="text-primary">
                                ✨ دوره آزمایشی رایگان
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">
                                {formatPrice(plan.price)}
                            </span>
                            <span className="text-muted-foreground">
                                {" "}
                                تومان
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            برای {getDurationText(plan)}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
