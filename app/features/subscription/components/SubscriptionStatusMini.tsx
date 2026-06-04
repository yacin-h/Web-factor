import { Badge } from "@/features/shared/components/ui/badge";
import { Card } from "@/features/shared/components/ui/card";

import { useSubscription } from "../hooks/useSubscription";

export function SubscriptionStatusMini() {
    const { data: subscription, isLoading } = useSubscription();
    console.log("Subscription data:", subscription);
    console.log("Subscription loading:", isLoading);
    if (isLoading) return null;
    if (!subscription) return null;

    const getStatusVariant = () => {
        if (!subscription.is_active) return "destructive";
        if (subscription.days_remaining <= 7) return "destructive";
        return "default";
    };

    const getStatusText = () => {
        if (!subscription.is_active) return "غیرفعال";
        if (subscription.plan.is_trial) return "آزمایشی";
        if (subscription.days_remaining <= 7)
            return `در حال اتمام (${subscription.days_remaining} روز)`;
        return `فعال (${subscription.days_remaining} روز)`;
    };

    return (
        <Card className="p-3">
            <div className="flex items-center gap-3">
                <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>
                <span className="text-sm font-medium">
                    {subscription.plan.name}
                </span>
            </div>
        </Card>
    );
}
