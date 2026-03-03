import prisma from "@/lib/db/prisma";
import { HotlinesPage } from "./HotlinesPage";

export default async function Page() {
    const hotlines = await prisma.hotline.findMany({
        orderBy: { order: "asc" },
    });

    return <HotlinesPage initialData={hotlines} />;
}
