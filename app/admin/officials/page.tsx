import prisma from "@/lib/db/prisma";
import { OfficialsPage } from "./OfficialsPage";

export default async function Page() {
    const officials = await prisma.official.findMany({
        orderBy: { order: "asc" },
    });

    return <OfficialsPage initialData={officials} />;
}
