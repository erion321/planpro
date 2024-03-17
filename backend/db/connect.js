import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
