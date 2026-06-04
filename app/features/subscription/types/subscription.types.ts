export type DurationUnit = "day" | "month" | "year";

export type Plan = {
    id: number;
    name: string;           
    code: string;           
    price: number;          
    duration: number;       
    duration_unit: DurationUnit; 
    is_trial: boolean;      
};


export type UserSubscription = {
    plan: Plan;             
    started_at: string;     
    expires_at: string;     
    days_remaining: number; 
    is_active: boolean;     
};


export type SubscriptionStatus = "active" | "expired" | "trial" | "cancelled";