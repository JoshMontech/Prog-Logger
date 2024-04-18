'use client'
import React from 'react'
import {  Wipe, WipeTag } from '@prisma/client'
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Tag,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverHeader,
} from '@chakra-ui/react'
import { ExternalLinkIcon}  from '@chakra-ui/icons'

const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString('en-us', { hour12: true, hour:"numeric", timeZone: "EST" }) 
}

const convertSecondsToMMSS = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    // Pad the minutes and seconds with leading zeros if necessary
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${paddedMinutes}:${paddedSeconds}`;
}

const getFormattedBossAndGateString = (wipe) => {
    const gate = wipe.bossGate;
    const gateName = gate.name;
    const bossName = gate.boss.name;
    return `${bossName} ${gateName}`
}

const generateWipeTagElements = (wipe) => {
    const wipeTags = wipe.wipeTags as WipeTag[];
    return (
        <HStack justifyContent={'flex-start'}>
            {wipeTags.map((tag, i) => (
                <Tag size={'sm'} key={i} variant='solid' colorScheme='teal'>
                {tag.description}
                </Tag>
            ))}
</HStack>
    )
}

const WipeList = ({wipes}) => {
    if (!wipes || wipes.length === 0) return <span>no wipes reported</span>
    return (
        <TableContainer mb={4}  maxH={'250px'} overflowY={'scroll'}>
            <Table variant='striped' colorScheme='gray' size='sm' w={'full'} >
                <Thead>
                <Tr>
                    <Th>Player</Th>
                    <Th>Time left</Th>
                    <Th>Healthbars left</Th>
                    <Th>Wipe Tags</Th>
                    <Th>Boss</Th>
                    <Th>Note</Th>
                    <Th>Date</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {wipes.map((wipe, i) => {
                        return (
                            <Tr key={i}>
                                <Td>{wipe.player ? wipe.player.name : 'none'}</Td>
                                <Td>{convertSecondsToMMSS(wipe.remainingTimeInSeconds)}</Td>
                                <Td>{wipe.remainingHealthInBars}</Td>
                                <Td>{generateWipeTagElements(wipe)}</Td>
                                <Td>{getFormattedBossAndGateString(wipe)}</Td>
                                <Td>
                                {wipe.note !== '' ?
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
                                ''}
                                </Td>
                                <Td>{getFormattedDate(new Date(wipe.dateCreated))}</Td>
                            </Tr>
                        )
                    })} 
                </Tbody>
            </Table>
        </TableContainer>
    )
}


export default WipeList