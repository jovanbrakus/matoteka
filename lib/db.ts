import { neon, Pool } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzlePool } from "drizzle-orm/neon-serverless";
import * as schema from "@/drizzle/schema";

// HTTP driver for regular queries — stateless, no persistent connection to expire.
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzleHttp(sql, { schema });

// For routes that need db.transaction(): create a fresh Pool per call so there
// is no idle WebSocket connection left open between serverless invocations.
export async function withTransaction<T>(
  cb: (tx: ReturnType<typeof drizzlePool<typeof schema>>) => Promise<T>,
): Promise<T> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL!, max: 1 });
  const txDb = drizzlePool(pool, { schema });
  try {
    return await txDb.transaction(cb as any);
  } finally {
    await pool.end();
  }
}
