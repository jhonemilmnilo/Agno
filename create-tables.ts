import * as mariadb from 'mariadb';

async function main() {
    const pool = mariadb.createPool({
        host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
        user: 'WmSk2xEwFA7sk9q.root',
        password: '8BszwNfkdkZl3IdY',
        database: 'fortune500',
        port: 4000,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true
    });

    try {
        const conn = await pool.getConnection();
        console.log("Connected to TiDB correctly.");

        const createDiningTable = `
      CREATE TABLE IF NOT EXISTS Dining (
        id VARCHAR(191) NOT NULL,
        name VARCHAR(191) NOT NULL,
        description TEXT,
        address VARCHAR(191) NOT NULL,
        cuisineType VARCHAR(191),
        openingHours VARCHAR(191),
        contactNumber VARCHAR(191),
        facebookUrl VARCHAR(191),
        imageUrl VARCHAR(191),
        latitude DOUBLE,
        longitude DOUBLE,
        googleMapsUrl TEXT,
        isPublished BOOLEAN NOT NULL DEFAULT true,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL,
        PRIMARY KEY (id)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
      `;

        const createAccommodationTable = `
      CREATE TABLE IF NOT EXISTS Accommodation (
        id VARCHAR(191) NOT NULL,
        name VARCHAR(191) NOT NULL,
        description TEXT,
        address VARCHAR(191) NOT NULL,
        type VARCHAR(191) NOT NULL,
        priceRange VARCHAR(191),
        amenities TEXT,
        contactNumber VARCHAR(191),
        websiteUrl VARCHAR(191),
        imageUrl VARCHAR(191),
        latitude DOUBLE,
        longitude DOUBLE,
        googleMapsUrl TEXT,
        isPublished BOOLEAN NOT NULL DEFAULT true,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL,
        PRIMARY KEY (id)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
      `;

        await conn.query(createDiningTable);
        console.log("Dining table created.");
        await conn.query(createAccommodationTable);
        console.log("Accommodation table created.");

        conn.release();
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        await pool.end();
    }
}

main();
