import prisma from "@/lib/db/prisma";
import { ProjectsPage } from "./ProjectsPage";

export default async function Page() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <ProjectsPage initialData={projects} />;
}
