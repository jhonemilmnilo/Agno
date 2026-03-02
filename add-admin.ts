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
        // EDIT THESE DETAILS PAL:
        const name = "Super Admin";
        const email = "superadmin@agno.com";
        const plainPassword = "adminpassword123";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const newAdmin = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role: "ADMIN"
            }
        });

        console.log(`Successfully created new admin: ${newAdmin.email}`);
    } catch (e) {
        console.error("Error creating admin:", e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
