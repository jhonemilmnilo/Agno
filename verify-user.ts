import prisma from "./lib/db/prisma";

async function main() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: "admin@agno.com" }
        });
        if (user) {
            console.log("User found:", { id: user.id, email: user.email, role: user.role });
        } else {
            console.log("User admin@agno.com NOT found in database.");
        }
    } catch (e) {
        console.error("Query failed:", e);
    } finally {
        process.exit(0);
    }
}

main();
