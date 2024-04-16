import { useSelectedPlayerStore } from "@/lib/zustand/playerStore";
import { Box, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";



const WipeStats = ({wipes}) => {
    const {selectedPlayer} = useSelectedPlayerStore()
    const boss = {}
    const total = {}
    const generateWipeString = (gateNameString, bossObj, totalObj) => {
        const wipeCount = bossObj.gates[gateNameString]
        const totalWipeCount = totalObj.gates[gateNameString]
        const gateTitle = gateNameString.replace('-', ' ');
        return `${gateTitle}: ${wipeCount}/${totalWipeCount}, ${Math.round((wipeCount / totalWipeCount) * 100)}%`
    }
    wipes.map(wipe => {
        const bossGate = wipe.bossGate;
        const bossGateKey = bossGate.name.replace(' ', '-');
        const bossName = wipe.bossGate.boss.name;
        if (wipe?.player?.id === selectedPlayer?.id) {
            if(boss[bossName]) {
                if (boss[bossName].gates[bossGateKey]) boss[bossName].gates[bossGateKey] = boss[bossName].gates[bossGateKey] + 1;
                else boss[bossName].gates[bossGateKey] = 1;
            } else {
                boss[bossName] = {
                    gates: {
                        [bossGateKey]:1
                    }
                }
            }
        }

        if(total[bossName]) {
            if (total[bossName].gates[bossGateKey]) total[bossName].gates[bossGateKey] = total[bossName].gates[bossGateKey] + 1;
            else total[bossName].gates[bossGateKey] = 1;
        } else {
            total[bossName] = {
                gates: {
                    [bossGateKey]:1
                }
            }
        }
    })
    return (
        <VStack align={'stretch'}>
            <Heading size={'sm'}>Player: {selectedPlayer?.name ? selectedPlayer.name : 'none'}</Heading>
            <HStack>
                {Object.keys(boss).map((bossName, i) => {
                    const bossObject = boss[bossName];
                    const totalObject = total[bossName]
                    const gateKeysArray = Object.keys(bossObject.gates).sort();
                    return (
                        <VStack key={i} placeItems={'flex-start'} p={4} border={'1px solid lightgray'} rounded={'lg'}>
                            <Heading size={'xs'}>{bossName}</Heading>
                            <Divider />
                            {gateKeysArray.map((gateName, j) => <Text key={j} fontSize="xs">{generateWipeString(gateName, bossObject, totalObject)}</Text>)}
                        </VStack>
                    )
                })}
            </HStack>
        </VStack>
    )
}

export default WipeStats;