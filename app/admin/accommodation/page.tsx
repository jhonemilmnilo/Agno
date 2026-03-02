import prisma from "@/lib/db/prisma";
import { AccommodationPage } from "../content/Accommodation";

export default async function Page() {
    const accommodations = await prisma.accommodation.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <AccommodationPage initialData={accommodations} />;
}
