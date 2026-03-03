const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({ take: 1 });
        console.log('Prisma query successful:', users);
    } catch (error) {
        console.error('Prisma query failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}
main();
