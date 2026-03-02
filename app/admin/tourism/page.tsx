import prisma from "@/lib/db/prisma";
import { TourismPage } from "../content/Tourism";

export default async function Page() {
    const tourismSpots = await prisma.tourismSpot.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <TourismPage initialData={tourismSpots} />;
}
