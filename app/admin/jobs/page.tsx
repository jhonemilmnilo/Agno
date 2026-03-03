import prisma from "@/lib/db/prisma";
import { JobsPage } from "./JobsPage";

export default async function Page() {
    const jobs = await prisma.job.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <JobsPage initialData={jobs} />;
}
