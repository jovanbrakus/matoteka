import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/drizzle/schema";

// HTTP driver: each query is a stateless HTTP request — no persistent WebSocket
// connection that Neon can terminate while the function instance is idle.
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
