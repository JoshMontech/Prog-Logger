import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';



// Handles only GET requests to fetch all static groups
export async function GET(
    res: NextResponse, 
    { params }: { params: { staticId: string }}
) {
    const { staticId } = params
    try {
        const staticGroup = await prisma.staticGroup.findUnique({
          where: { id: staticId },
          include: {
            players: true, 
            progSessions: {
              include: {
                wipes: true, 
              }
            },
          },
        });
        return NextResponse.json(staticGroup);
    } catch (e: any) {
        if (typeof e === "string") {
            return NextResponse.json({error: `${e}`}, {status: 500});
        } else if (e instanceof Error) {
            return NextResponse.json({error: e.message}, {status: 500});
        }
    } 
    return NextResponse.json({error: 'unknown error'}, {status: 500});
}