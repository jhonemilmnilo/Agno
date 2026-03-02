import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as mariadb from 'mariadb';

const prismaClientSingleton = () => {
    const config: mariadb.PoolConfig = {
        host: process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
        user: process.env.TIDB_USER || 'WmSk2xEwFA7sk9q.root',
        password: process.env.TIDB_PASSWORD || '8BszwNfkdkZl3IdY',
        database: process.env.TIDB_DATABASE || 'fortune500',
        port: 4000,
        ssl: { rejectUnauthorized: false }
    };

    // @ts-ignore: Type definitions for mariadb are incompatible between the project and Prisma's internal dependency
    const adapter = new PrismaMariaDb(config);

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
