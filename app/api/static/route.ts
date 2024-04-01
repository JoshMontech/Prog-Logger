import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Handles only GET requests to fetch all static groups
export async function GET() {
  try {
    const staticGroups = await prisma.staticGroup.findMany({
      include: {
        players: true
      },
    });
    return NextResponse.json(staticGroups);
  } catch (e: any) {
    if (typeof e === "string") {
        console.error('Failed to fetch static groups:', e);
    } else if (e instanceof Error) {
        NextResponse.error();
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const res = await req.json()
    const { name, players } = res; // Expecting 'name' of the static and an array of 'players'

      const newStaticGroup = await prisma.staticGroup.create({
        data: {
          name,
          players: {
            create: players, // Creates new player records linked to this static group
          },
        },
      });
    return NextResponse.json(newStaticGroup);
  } catch (e: any) {
    if (typeof e === "string") {
        console.error('Failed to add static group:', e);
    } else if (e instanceof Error) {
        NextResponse.error();
    }
  }
}