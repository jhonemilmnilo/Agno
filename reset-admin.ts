import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as mariadb from 'mariadb';
import bcrypt from "bcryptjs";
import 'dotenv/config';

async function main() {
    const config = {
        host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
        user: 'WmSk2xEwFA7sk9q.root',
        password: '8BszwNfkdkZl3IdY',
        database: 'fortune500',
        port: 4000,
        ssl: { rejectUnauthorized: false }
    };
    // @ts-ignore
    const adapter = new PrismaMariaDb(config);
    const prisma = new PrismaClient({ adapter });

    try {
        const email = "admin@agno.com";
        const plainPassword = "password123";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        console.log(`Successfully reset password for ${email} to: ${plainPassword}`);
    } catch (e) {
        console.error(e);
    }
}
main();
