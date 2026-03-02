const mariadb = require('mariadb');
require('dotenv').config();

async function main() {
    console.log("URL:", process.env.DATABASE_URL);

    // Test 1: string
    let pool = mariadb.createPool(process.env.DATABASE_URL);
    try {
        let conn = await pool.getConnection();
        console.log("Test 1 success!");
        conn.release();
    } catch (err) {
        console.log("Test 1 failed:", err.message);
    } finally {
        pool.end();
    }
}
main();
