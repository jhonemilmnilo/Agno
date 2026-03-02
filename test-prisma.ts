import { PrismaClient } from "@prisma/client";

async function main() {
    const prisma = new PrismaClient();
    try {
        console.log("Attempting to connect...");
        await prisma.$connect();
        console.log("Connected successfully!");
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
