'use client'
import React from 'react'
import { Player } from '@prisma/client'
import { Box, Heading, StackDivider, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { useSelectedPlayerStore } from '@/lib/zustand/playerStore'
const StaticGroupTable = ({players}: {players: Player[]}) => {
    const {setSelectedPlayer, selectedPlayer, clearSelectedPlayer} = useSelectedPlayerStore();
    if (!players || players.length === 0) return <span>no players</span>
    return (
        <>
        <Box borderRight={'1px solid lightgray'} p={4}>
            <Heading size={'md'} mb={4}>Players</Heading>
            <VStack 
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
                {players.map((player, i) => (
                    <Box key={i}><button onClick={() => player.id === selectedPlayer?.id ? clearSelectedPlayer() : setSelectedPlayer(player)} style={{fontWeight: player.id === selectedPlayer?.id ? '700' : '400'}}>{player.name}</button></Box>
                ))}
            </VStack>
        </Box>
        </>
    )
}

export default StaticGroupTable