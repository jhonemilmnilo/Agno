import prisma from './lib/db/prisma';

async function main() {
    try {
        const zones = await (prisma as any).disasterZone.findMany();
        console.log('Zones found:', zones.length);
    } catch (error) {
        console.error('Error fetching zones:', error);
    } finally {
        process.exit(0);
    }
}

main();
