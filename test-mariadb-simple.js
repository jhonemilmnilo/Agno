const mariadb = require('mariadb');

async function test() {
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'db',
        connectionLimit: 5
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
