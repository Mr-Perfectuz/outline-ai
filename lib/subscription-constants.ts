export const PLANS = {
    FREE: 'free',
    PRO: 'pro',
} as const;

export type PlanType = (typeof PLANS)[keyof typeof PLANS];

export const PLAN_LIMITS: Record<PlanType, { maxBooks: number; maxSessionsPerMonth: number; maxDurationMinutes: number }> = {
    [PLANS.FREE]: {
        maxBooks: 3,
        maxSessionsPerMonth: 5,
        maxDurationMinutes: 10,
    },
    [PLANS.PRO]: {
        maxBooks: 50,
        maxSessionsPerMonth: 100,
        maxDurationMinutes: 60,
    },
};
