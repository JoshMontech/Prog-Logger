import React from 'react'
import { Player } from '@prisma/client'
import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'

const StaticGroupTable = ({players}: {players: Player[]}) => {
    if (!players || players.length === 0) return <span>no players</span>
    const tableRows = [];
    for(let i = 0; i < 8; i++) {
        if (i <= 5) {
            tableRows.push(
                <Tr key={i}>
                    <Td>{players[i++].name}</Td>
                    <Td>{players[i].name}</Td>
                </Tr>
            )
        } else {
            tableRows.push(
                <Tr key={i}>
                    <Td borderBottom={'unset'}>{players[i++].name}</Td>
                    <Td borderBottom={'unset'}>{players[i].name}</Td>
                </Tr>
            )
        }
    }
    return (
        <TableContainer>
        <Table variant='simple'>
            <Tbody>
                {tableRows}
            </Tbody>
        </Table>
        </TableContainer>
    )
}

export default StaticGroupTable