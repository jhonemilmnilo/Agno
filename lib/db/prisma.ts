import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    const time = new Date().toISOString();
    const pid = process.pid;
    console.warn(`[PRISMA_SINGLETON_INIT] Time: ${time} | PID: ${pid} | Status: New Instance Created`);

    return new PrismaClient({
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
