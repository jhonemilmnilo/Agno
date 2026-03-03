import prisma from "@/lib/db/prisma";
import { EventsPage } from "../content/Events";

export default async function Page() {
    const events = await prisma.event.findMany({
        orderBy: { startDate: "asc" },
    });

    return <EventsPage initialData={events} />;
}
