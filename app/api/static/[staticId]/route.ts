import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';



// Handles only GET requests to fetch all static groups
export async function GET(request: NextRequest,
    { params }: { params: { staticId: string }}
) {
    const { staticId } = params
    try {
        const staticGroup = await prisma.staticGroup.findUnique({
          where: { id: staticId },
          include: {
            players: true, 
            progSessions: {
              orderBy: {
                dateCreated: 'desc'
              },
              include: {
                wipes: {
                  include: {
                    player: true,
                    bossGate: {
                     select: {
                      name: true,
                      boss: {
                        select: {
                          name: true
                        }
                      }
                     }
                    },
                  }
                }
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