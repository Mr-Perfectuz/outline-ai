import { auth } from '@clerk/nextjs/server';
import { PLANS, PlanType } from '@/lib/subscription-constants';

export async function getUserPlan(): Promise<PlanType> {
    const { userId, sessionClaims } = await auth();

    if (!userId) return PLANS.FREE;

    const plan = (sessionClaims?.metadata as { plan?: string } | undefined)?.plan;

    if (plan === PLANS.PRO) return PLANS.PRO;

    return PLANS.FREE;
}
