import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { WipePayload } from '@/lib/wipeService';

export async function POST(
    req: NextRequest, 
    { params }: { params: { progSessionId: string }}
) {
    const { progSessionId } = params
    const res:WipePayload = await req.json()

    try {
        const progSession = await prisma.wipe.create({
            data: {
                progSessionId: progSessionId,
                playerId: res.selectedPlayerId !== '' ? res.selectedPlayerId : null, 
                bossGateId: res.selectedBossGateId,
                remainingHealthInBars: res.remainingHealthBars,
                remainingTimeInSeconds: res.remainingTime,
                note: res.optionalNote,
                wipeTags: {
                    connect: res.selectedWipeTags.map(id => ({id}))
                }
            },
        });
        return NextResponse.json(progSession);
      }catch (e: any) {
        if (typeof e === "string") {
            return NextResponse.json({error: `${e}`}, {status: 500});
        } else if (e instanceof Error) {
            return NextResponse.json({error: e.message}, {status: 500});
        }
    } 
    return NextResponse.json({error: 'unknown error'}, {status: 500});
  }