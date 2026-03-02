import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as mariadb from 'mariadb';
import 'dotenv/config';

async function main() {
    console.log("Creating MariaDB config directly and passing to adapter");

    try {
        const config: mariadb.PoolConfig = {
            host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
            user: 'WmSk2xEwFA7sk9q.root',
            password: '8BszwNfkdkZl3IdY',
            database: 'fortune500',
            port: 4000,
            ssl: { rejectUnauthorized: false }
        };
        // @ts-ignore: Type definitions for mariadb are incompatible between the project and Prisma's internal dependency
        const adapter = new PrismaMariaDb(config);

        const prisma = new PrismaClient({
            adapter,
        });
        console.log("Prisma client instantiated.")

        console.log("Executing simple query against DB via Prisma...");
        const result = await prisma.$queryRaw`SELECT 1 as val`;
        console.log("Query result:", result);
    } catch (err) {
        console.error("Prisma error:", err);
    }
}

main();
