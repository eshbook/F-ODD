import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT 1 as connected`);
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to MariaDB!',
      data: result[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to the database',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
