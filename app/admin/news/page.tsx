import prisma from "@/lib/db/prisma";
import { NewsPage } from "../content/News";

export default async function Page() {
    const news = await prisma.news.findMany({
        orderBy: { publishDate: "desc" },
    });

    return <NewsPage initialData={news} />;
}
