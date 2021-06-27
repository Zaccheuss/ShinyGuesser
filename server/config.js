import pg from "pg";
import dotenv from "dotenv";
import { pwd } from "./directoryHelper.js";

dotenv.config({ path: pwd + "/.env" });

export const dbPool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});