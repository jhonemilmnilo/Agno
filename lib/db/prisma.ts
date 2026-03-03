import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
    const time = new Date().toISOString();
    const pid = process.pid;
    console.warn(`[PRISMA_SINGLETON_INIT] Time: ${time} | PID: ${pid} | Status: New Instance Created`);

    const connectionString = process.env.DATABASE_URL;

    // Fallback if env variable is missing during build time
    if (!connectionString) {
        return new PrismaClient({ log: ["error", "warn"] });
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({
        adapter,
        log: ["error", "warn"],
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

console.warn(`[PRISMA_MODULE_EXEC] PID: ${process.pid} | Singleton: ${globalThis.prisma ? 'Reused' : 'Initialized'}`);

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
