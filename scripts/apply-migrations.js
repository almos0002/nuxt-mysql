import { createConnection } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function applyMigrations() {
  console.log('Starting database migration process...');
  
  // Create a connection to the MySQL database
  const connection = await createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'nxdirectory',
    multipleStatements: true // Important for running multiple SQL statements
  });

  try {
    console.log('Connected to MySQL database');
    
    // Read the migration SQL file
    const migrationsDir = path.join(__dirname, '..', 'server', 'database', 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'));
    
    if (migrationFiles.length === 0) {
      console.error('No migration files found!');
      return;
    }
    
    // Apply each migration file
    for (const migrationFile of migrationFiles) {
      console.log(`Applying migration: ${migrationFile}`);
      const migrationPath = path.join(migrationsDir, migrationFile);
      const sql = fs.readFileSync(migrationPath, 'utf8');
      
      // Split SQL by statement-breakpoint to handle multiple statements
      const statements = sql.split('--> statement-breakpoint');
      
      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await connection.query(statement);
            console.log('Successfully executed SQL statement');
          } catch (error) {
            console.error(`Error executing SQL statement: ${error.message}`);
            // If the error is about table already existing, we can continue
            if (!error.message.includes('already exists')) {
              throw error;
            } else {
              console.log('Table already exists, continuing...');
            }
          }
        }
      }
    }
    
    console.log('All migrations applied successfully!');
  } catch (error) {
    console.error('Error applying migrations:', error);
  } finally {
    await connection.end();
    console.log('Database connection closed');
  }
}

applyMigrations().catch(console.error);
