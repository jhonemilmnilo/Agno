import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import DiningClient from "@/components/admin/DiningClient";

export const dynamic = "force-dynamic";

export default async function DiningPage() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/auth/login");
    }

    const diningData = await prisma.dining.findMany({
        orderBy: { createdAt: "desc" }
    });

    return <DiningClient diningData={diningData} />;
}
