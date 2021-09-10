
import { createPool } from 'mysql2/promise';

export async function connect() {
  const connection = await createPool({
    host: '104.197.117.240',
    user: 'root',
    password: '',
    database: 'proyecto1',
    connectionLimit: 10
  });

  return connection;
}