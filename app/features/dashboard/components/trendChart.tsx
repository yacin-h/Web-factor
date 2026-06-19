// features/dashboard/components/TrendChart.tsx
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";

import { EmptyChartState } from "./EmptyChartState";

type TrendData = {
    date: string;
    total: number;
};

export function TrendChart({ chartData }: { chartData: TrendData[] }) {
    const hasData = chartData?.length > 0;
    const hasRealData = chartData?.some((d) => d.total > 0);

    if (!hasData) {
        return (
            <EmptyChartState
                title="ترند فروش"
                message="داده‌ای برای نمایش وجود ندارد"
                hint="پس از ثبت فاکتورها، ترند فروش اینجا نمایش داده می‌شود"
            />
        );
    }

    if (!hasRealData) {
        return (
            <EmptyChartState
                title="ترند فروش"
                message="هیچ فروشی ثبت نشده است"
                hint="پس از اولین فروش، نمودار اینجا نمایش داده می‌شود"
            />
        );
    }

    let processedData = [...chartData];
    if (chartData.length === 1) {
        const firstDate = new Date(chartData[0].date);
        const startDate = new Date(firstDate);
        startDate.setDate(startDate.getDate() - 1);

        processedData = [
            {
                date: startDate.toISOString().split("T")[0],
                total: 0,
            },
            ...chartData,
        ];
    }

    // پیدا کردن حداقل و حداکثر برای YAxis
    const maxValue = Math.max(...processedData.map((d) => d.total)) * 1.2;
    const minValue = 0;

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
                    ترند فروش
                </CardTitle>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={processedData}>
                        <defs>
                            <linearGradient
                                id="trendGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#14b8a6"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#14b8a6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgb(55 65 81 / 0.5)"
                        />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => value.slice(5)}
                            tick={{
                                fontSize: 12,
                                fill: "rgb(148 163 184)",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            domain={[minValue, maxValue]}
                            tick={{
                                fontSize: 12,
                                fill: "rgb(148 163 184)",
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) =>
                                value >= 1000000
                                    ? `${(value / 1000000).toFixed(1)}M`
                                    : value >= 1000
                                      ? `${(value / 1000).toFixed(0)}K`
                                      : value.toString()
                            }
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgb(30 41 59)",
                                borderRadius: "8px",
                                border: "1px solid rgb(55 65 81)",
                                fontSize: "12px",
                                color: "rgb(226 232 240)",
                            }}
                            labelFormatter={(label) =>
                                `تاریخ: ${label.slice(0, 10)}`
                            }
                            formatter={(value: number) => [
                                value.toLocaleString("fa-IR"),
                                "فروش",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#14b8a6"
                            strokeWidth={2}
                            dot={
                                processedData.length > 2
                                    ? { r: 3, fill: "#14b8a6" }
                                    : false
                            }
                            activeDot={{ r: 5 }}
                            fill="url(#trendGradient)"
                        />
                    </LineChart>
                </ResponsiveContainer>

                <p className="text-center mt-3 text-sm text-muted-foreground">
                    ترند فروش هفتگی
                </p>
            </CardContent>
        </Card>
    );
}
