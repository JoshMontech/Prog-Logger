import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(
    res: NextResponse, 
    { params }: { params: { staticId: string, progSessionId: string }}
) {
    const { progSessionId } = params
    try {
        const progSession = await prisma.progSession.findUnique({
            where: {id: progSessionId},
            include: {
                staticGroup: {
                    select: {
                        players: true
                    }
                },
                wipes: true
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

// export async function POST(
//     res: NextResponse, 
//     { params }: { params: { staticId: string }}
// ) {
//     const { staticId } = params
//     try {
//         const newProgSession = await prisma.progSession.create({
//             data: {
//                 staticGroupId: parseInt(staticId),
//             },
//         });
//         return NextResponse.json(newProgSession)
//     } catch (e: any) {
//         if (typeof e === "string") {
//             return NextResponse.json({error: `${e}`}, {status: 500});
//         } else if (e instanceof Error) {
//             return NextResponse.json({error: e.message}, {status: 500});
//         }
//     } 
//     return NextResponse.json({error: 'unknown error'}, {status: 500});
//   }