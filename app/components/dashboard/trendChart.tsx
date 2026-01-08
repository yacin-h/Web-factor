import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    trend: {
        label: "فروش کل",
    },
} satisfies ChartConfig;

export function TrendChart({
    chartData,
}: {
    chartData: { date: string; total: number }[];
}) {
    return (
        <Card>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-[250px] w-full"
                >
                    <LineChart data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => value.slice(5)} 
                        />

                        <YAxis />

                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelKey="date"
                                    nameKey="total"
                                />
                            }
                        />

                        <Line
                            type="monotone"
                            dataKey="total"
                            name="فروش کل"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>

                <p className="text-center mt-2 text-sm text-muted-foreground">
                    ترند فروش هفتگی
                </p>
            </CardContent>
        </Card>
    );
}
