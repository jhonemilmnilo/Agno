import prisma from "@/lib/db/prisma";
import { HouseholdProvider } from "./providers";
import { HouseholdsPage } from "./HouseholdsPage";

export default async function Page() {
    const households = await prisma.household.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <HouseholdProvider initialHouseholds={households}>
            <HouseholdsPage />
        </HouseholdProvider>
    );
}
