import { getAbsoluteUrl } from "@/lib/apiHelpers"

getAbsoluteUrl
type WipeObject = {
    remainingHealthbars: number
    selectedWipeTags: SelectObject[]
    remainingTime: string
    selectedBoss: string
    selectedGate: string
    selectedPlayer: string
    optionalNote: string
}

export type WipePayload = {
    remainingHealthBars: number,
    remainingTime: number
    selectedWipeTags: string[],
    selectedBossId: string,
    selectedBossGateId: string,
    selectedPlayerId: string,
    optionalNote: string,
}

type SelectObject = {
    label: string,
    value: string
}

export async function createWipe(wipeObject: WipeObject, staticId: string, progSessionId: string) {
    const data: WipePayload = formatWipeObject(wipeObject);
    
    const response = await fetch(`${getAbsoluteUrl()}/api/static/${staticId}/progsession/${progSessionId}/wipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        cache: 'no-store',
    });


    return response.json();
}

const formatWipeObject = (wipeObject: WipeObject) => {
    return {
        remainingHealthBars: Number(wipeObject.remainingHealthbars),
        remainingTime: formatRemainingTime(wipeObject.remainingTime),
        selectedWipeTags: formatWipeTags(wipeObject.selectedWipeTags),
        selectedBossId: wipeObject.selectedBoss,
        selectedBossGateId: wipeObject.selectedGate,
        selectedPlayerId: wipeObject.selectedPlayer,
        optionalNote: wipeObject.optionalNote,

    }
}

const formatRemainingTime = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}

const formatWipeTags = (wipeTagArray: SelectObject[]) => {
    return wipeTagArray.map(wipeTag => wipeTag.value)
}