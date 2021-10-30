
import { createPool } from 'mysql2/promise';

export async function connect() {
  const connection = await createPool({
    host: 'mysqlroot2021.mysql.database.azure.com',
    user: 'masteradminpro',
    password: '$ARQUI2_123..$',
    database: 'proyecto2_ace2',
    connectionLimit: 10
  });

  return connection;
}

// $ARQUI2_123..$