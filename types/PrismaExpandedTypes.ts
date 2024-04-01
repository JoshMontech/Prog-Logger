import { Prisma } from "@prisma/client"

export type WipeForm = {
    characterName: string
    bossName: string
    bossHealth: number
    elapsedTime: string
}
const progSessionWithWipes = Prisma.validator<Prisma.ProgSessionDefaultArgs>()({
    include: { wipes: true }
  });
export type ProgSessionWithDeaths = Prisma.ProgSessionGetPayload<typeof progSessionWithWipes>;

const staticGroupWithPlayers = Prisma.validator<Prisma.StaticGroupDefaultArgs>()({
  include: { players: true }
});
export type StaticGroupWithPlayers = Prisma.StaticGroupGetPayload<typeof staticGroupWithPlayers>;

const staticGroupWithPlayersAndProgSessions = Prisma.validator<Prisma.StaticGroupDefaultArgs>()({
  include: { players: true, progSessions: true }
});
export type StaticGroupWithPlayersAndProgSessions = Prisma.StaticGroupGetPayload<typeof staticGroupWithPlayersAndProgSessions>;
