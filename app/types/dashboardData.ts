type Trends = {
    month: string;
  total: number;
}
type TopProducts = {
    product__name: string;
    revenue: number;
}
export type DashboardData = {
    total_revenue: number;
    outstanding_amount: number;
    pending_count: number;
    trends: Trends[];
    top_products: TopProducts[];
};
