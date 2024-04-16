import { Prisma } from "@prisma/client"

export type WipeForm = {
    characterName: string
    bossName: string
    bossHealth: number
    elapsedTime: string
}
const progSessionWithWipeName = Prisma.validator<Prisma.ProgSessionDefaultArgs>()({
    include: { 
      wipes: {
        include: {
          bossGate: {
           select: {
            name: true
           }
          }
        }
      } 
    }
  });
export type ProgSessionWithWipeName = Prisma.ProgSessionGetPayload<typeof progSessionWithWipeName>;

const staticGroupWithPlayers = Prisma.validator<Prisma.StaticGroupDefaultArgs>()({
  include: { players: true }
});
export type StaticGroupWithPlayers = Prisma.StaticGroupGetPayload<typeof staticGroupWithPlayers>;

const staticGroupWithPlayersAndProgSessions = Prisma.validator<Prisma.StaticGroupDefaultArgs>()({
  include: { players: true, progSessions: true }
});
export type StaticGroupWithPlayersAndProgSessions = Prisma.StaticGroupGetPayload<typeof staticGroupWithPlayersAndProgSessions>;
