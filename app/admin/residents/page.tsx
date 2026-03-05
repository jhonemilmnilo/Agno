import prisma from "@/lib/db/prisma";
import { ResidentProvider } from "./providers";
import { ResidentsPage } from "./ResidentsPage";

export default async function Page() {
    const residents = await prisma.resident.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <ResidentProvider initialResidents={residents}>
            <ResidentsPage />
        </ResidentProvider>
    );
}
