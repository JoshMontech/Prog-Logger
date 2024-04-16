import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Table, TableContainer, Thead, Tr, Th, Td, Tbody, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from "@chakra-ui/react"

const ProgSessionTable = () => {
    return (
        <TableContainer mb={4}>
            <Table variant='striped' colorScheme='gray' size='sm' w={'full'}>
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

export default ProgSessionTable