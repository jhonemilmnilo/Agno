const { PrismaClient } = require('@prisma/client');

try {
    const p = new PrismaClient({ log: ['error', 'warn'] });
    p.$connect().then(() => console.log('Connected')).catch(e => console.error('Connect error:', e));
} catch (e) {
    console.error('Init error:', e);
}
