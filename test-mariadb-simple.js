const mariadb = require('mariadb');

async function test() {
    const pool = mariadb.createPool({
        host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
        port: 4000,
        user: 'WmSk2xEwFA7sk9q.root',
        password: '8BszwNfkdkZl3IdY',
        database: 'fortune500',
        ssl: { rejectUnauthorized: false }
    });

    try {
        const conn = await pool.getConnection();
        console.log("Connected successfully to DB!");
        const rows = await conn.query("SELECT 1 as val");
        console.log("Query result:", rows);
        conn.release();
    } catch (err) {
        console.error("Connection failed:");
        console.error(err);
    } finally {
        await pool.end();
    }
}

test();
