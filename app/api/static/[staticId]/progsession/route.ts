import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,
    { params }: { params: { staticId: string }}
) {
    const { staticId } = params
    try {
        const progSessions = await prisma.progSession.findMany({
            where: {staticGroupId: staticId},
            include: {
                players: true,
            },
        });
        return NextResponse.json(progSessions);
      }catch (e: any) {
        if (typeof e === "string") {
            return NextResponse.json({error: `${e}`}, {status: 500});
        } else if (e instanceof Error) {
            return NextResponse.json({error: e.message}, {status: 500});
        }
    } 
    return NextResponse.json({error: 'unknown error'}, {status: 500});
  }

export async function POST(request: NextRequest,
    { params }: { params: { staticId: string }}
) {
    const { staticId } = params
    try {
        const newProgSession = await prisma.progSession.create({
            data: {
                staticGroupId: staticId,
            },
        });
        return NextResponse.json(newProgSession)
    } catch (e: any) {
        if (typeof e === "string") {
            return NextResponse.json({error: `${e}`}, {status: 500});
        } else if (e instanceof Error) {
            return NextResponse.json({error: e.message}, {status: 500});
        }
    } 
    return NextResponse.json({error: 'unknown error'}, {status: 500});
  }