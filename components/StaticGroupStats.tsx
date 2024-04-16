'use client'
import { Box, Divider, Flex, Heading, StackDivider, VStack } from "@chakra-ui/react"
import WipeCharts from "@/components/WipeCharts"
import { useSelectedBossGatesStore } from "@/lib/zustand/selectedBossGatesStore"
import WipeStats from "@/components/WipeStats"

const StaticGroupStats = ({progSessions, players}) => {
    const {selectedBossGates} = useSelectedBossGatesStore()
    const wipes = []

    function getBossGateStringFromWipe(wipe) {
        return `${wipe.bossGate.boss.name},${wipe.bossGate.name}`
    }

    function progSessionHasSelectedBossGates(progSession) {
        if (selectedBossGates.length === 0) return true;
        return progSession.wipes.some(wipe => {
            const bossGateString = getBossGateStringFromWipe(wipe)
            if (selectedBossGates.includes(bossGateString)) return true
        })
    }

    progSessions
        .filter(progSession => progSessionHasSelectedBossGates(progSession))
        .map(progSession => {
            progSession.wipes.map(wipe => wipes.push(wipe))
        })
    return (
        <Flex flexDirection={'column'} minW={'600px'} p={4}>
            <Heading size={'md'}>Stats</Heading>
            <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
                <VStack divider={<StackDivider borderColor="gray.200" />} align={'stretch'} spacing={4}>

                    <WipeCharts wipes={wipes} players={players} />
                    <WipeStats wipes={wipes} />
                </VStack>
            </Flex>
        </Flex>
    )
    }

export default StaticGroupStats