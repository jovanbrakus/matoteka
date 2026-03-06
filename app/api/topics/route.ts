import { db } from "@/lib/db";
import { topics } from "@/drizzle/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.select({ id: topics.id, name: topics.name }).from(topics).orderBy(asc(topics.name));
  return NextResponse.json(result);
}
