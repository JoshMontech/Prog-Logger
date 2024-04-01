import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Handles only GET requests to fetch all static groups
export async function GET() {
  try {
    const bosses = await prisma.boss.findMany({
        include: {
          bossGates: {
            select: {
              id: true,
              name: true,
              description: true,
              totalhealthInBars: true,
              totalTimeInSeconds: true,
              wipeTags: {
                select: {
                    id: true,
                    description: true
                }
              }
            },
          },
        },
      });
    return NextResponse.json(bosses);
  } catch (e: any) {
    if (typeof e === "string") {
        console.error('Failed to fetch static groups:', e);
    } else if (e instanceof Error) {
        NextResponse.error();
    }
  }
}
