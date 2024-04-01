import React from 'react'
import { ProgSession } from '@prisma/client'
import { Box, StackDivider,  VStack, Link} from '@chakra-ui/react'
import NextLink from 'next/link'

const ProgSessionList = ({progSessions}: {progSessions: ProgSession[]}) => {
    if (!progSessions || progSessions.length === 0) return <span>no prog sessions</span>
    return (
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        >
        {progSessions.map((progSession, i) => {
            const date = new Date(progSession.dateCreated);

            return (
                
                <Link as={NextLink} key={i} href={`/static/${progSession.staticGroupId}/progsession/${progSession.id}`}>
                    <Box>
                        <span>this will navigate to {`/static/${progSession.staticGroupId}/progsession/${progSession.id}`}</span>
                    </Box>
                </Link>
            )
        }
        )}
    </VStack>
    )
}

export default ProgSessionList