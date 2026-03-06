import prisma from "@/lib/db/prisma";
import { DisasterWorkspace } from "./DisasterWorkspace";

export default async function DisastersPage() {
    // Fetch all households once for the impact analysis
    const households = await prisma.household.findMany({
        orderBy: { createdAt: "desc" }
    });

    return <DisasterWorkspace initialHouseholds={households as any} />;
}
