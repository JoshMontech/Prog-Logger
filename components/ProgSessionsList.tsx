'use client'
import React, { useState } from 'react'
import { ProgSessionWithWipeName } from '@/types/PrismaExpandedTypes'
import { Box, StackDivider,  VStack, Link, Heading, Divider, HStack, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td} from '@chakra-ui/react'
import NextLink from 'next/link'
import CreateProgSessionForm from '@/components/CreateProgSessionForm'
import { useSelectedPlayerStore } from '@/lib/zustand/playerStore'
import { useSelectedBossGatesStore } from '@/lib/zustand/selectedBossGatesStore'
import ProgSessionTable from './ProgSessionsTable'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {  hour12: true, hour:"numeric", timeZone: "EST"}) 
}

const getBossAndGates = (progSessions) => {
    const bosses = {};
    progSessions.map(progSession => {
        progSession.wipes.map(wipe => {
            const gate = wipe.bossGate;
            const boss = gate.boss;
            // create empty array of gates of boss if it doesn't exist
            if (!bosses.hasOwnProperty(boss.name)) bosses[boss.name] = []
            if (!bosses[boss.name].includes(gate.name)) bosses[boss.name].push(gate.name)
        })
    })
    return bosses;
}

const ProgSessionList = ({progSessions, staticId}) => {
    const {selectedPlayer} = useSelectedPlayerStore();
    const bossesAndGates = getBossAndGates(progSessions);
    const {selectedBossGates, toggleSelectedBossGates, clearSelectedBossGates } = useSelectedBossGatesStore()

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

    return (
    <Box p={4} borderLeft={'1px solid lightgray'}>
        <Heading size={'md'}>Prog Sessions</Heading>
        <HStack p={4}>
        <Button alignSelf={'flex-end'} size={'sm'} bg={selectedBossGates.length === 0 ? 'darkgray' : ''} border={'1px solid lightgray'} onClick={clearSelectedBossGates}>All</Button>
            {Object.keys(bossesAndGates).map((bossName, i) => {
                const gates = bossesAndGates[bossName].sort().map((gate, i) => <Button key={i} size={'xs'} border={'1px solid lightgray'} bg={selectedBossGates.includes(`${bossName},${gate}`) ? 'darkgray' : 'white'} onClick={() => toggleSelectedBossGates(`${bossName},${gate}`)}>{gate.replace('Gate ', '')}</Button>);
                return (
                    <VStack key={i} alignItems={'flex-start'} border={'1px solid lightgray'} p={2} rounded={'lg'}>
                        <label>{bossName}</label>
                        <HStack justifyContent={'flex-start'}>{gates}</HStack>
                    </VStack>
                )
            })}
        </HStack>
        <Box>
            <TableContainer mb={4}>
                <Table variant='striped' colorScheme='gray' size='sm' w={'full'}>
                    <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Boss</Th>
                        <Th>Wipes</Th>
                        <Th>Link</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {progSessions
                            .filter(progSession => progSessionHasSelectedBossGates(progSession))
                            .map((progSession, i) => {
                            const date = new Date(progSession.dateCreated);
                            let totalWipes = 0;
                            let selectedPlayerWipes = 0;
                            let gateList = {};
                            let bossName = '';
                            progSession.wipes.map(wipe => {
                                if (wipe?.player?.id === selectedPlayer?.id) selectedPlayerWipes = selectedPlayerWipes + 1;
                                totalWipes = totalWipes + 1;
                                gateList[wipe.bossGate.name] = wipe.bossGate.name;
                                bossName = wipe.bossGate.boss.name;
                            })

                            return (
                                <Tr key={i}>
                                    {/* {wipe.note !== '' ?
                                    <Popover>
                                    <PopoverTrigger>
                                        <Button size={'xs'} border={'1px solid lightgray'}><ExternalLinkIcon /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Note</PopoverHeader>
                                        <PopoverBody whiteSpace={'break-spaces'}>{wipe.note}</PopoverBody>
                                    </PopoverContent>
                                    </Popover> :
                                    ''} */}
                                    <Td>{getFormattedDate(date)}</Td>
                                    <Td>{`${bossName} ${Object.keys(gateList).join(', ').replaceAll('Gate ', '')}`}</Td>
                                    <Td>{selectedPlayer && <span style={{fontWeight: 700}}>{Math.trunc((selectedPlayerWipes/totalWipes) * 100) + '%'} {selectedPlayerWipes} / </span>} {`${totalWipes} wipes`}</Td>
                                    <Td>
                                    <Link as={NextLink} key={i} href={`/static/${progSession.staticGroupId}/progsession/${progSession.id}`}><Button size={'xs'} border={'1px solid lightgray'}><ExternalLinkIcon /></Button></Link>
                                    </Td>
                                </Tr>
                            )
                        })} 
                    </Tbody>
                </Table>
            </TableContainer>
                {/* <>
                <Link as={NextLink} key={i} href={`/static/${progSession.staticGroupId}/progsession/${progSession.id}`}>
                    <Box>
                        <span>{`${getFormattedDate(date)}`}</span> - <span></span> - <span>{</span>
                    </Box>
                </Link>
                </> */}
            <CreateProgSessionForm staticId={staticId} />
        </Box>
    </Box>
    )
}

export default ProgSessionList