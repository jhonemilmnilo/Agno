const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({ take: 1 });
        fs.writeFileSync('test-error.txt', 'Success: ' + JSON.stringify(users));
    } catch (error) {
        fs.writeFileSync('test-error.txt', 'Error: ' + error.stack);
    } finally {
        await prisma.$disconnect();
    }
}
main();
