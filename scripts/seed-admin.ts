import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as schema from "../drizzle/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.");
    process.exit(1);
  }

  console.log("Seeding admin user...");

  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(schema.users)
      .set({ passwordHash, role: "admin" })
      .where(eq(schema.users.email, email));
    console.log(`  Updated existing user ${email} to admin with password.`);
  } else {
    await db.insert(schema.users).values({
      email,
      displayName: "Admin",
      passwordHash,
      role: "admin",
    });
    console.log(`  Created admin user ${email}.`);
  }

  console.log("Done!");
}

main().catch(console.error);
