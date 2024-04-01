import React from 'react'
import {  Wipe } from '@prisma/client'
import { Box, StackDivider,  VStack, List, ListItem} from '@chakra-ui/react'

const WipeList = ({wipes}: {wipes: Wipe[]}) => {
    if (!wipes || wipes.length === 0) return <span>no wipes reported</span>
    return (
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        >
            <Box>
                <List>
                {wipes.map((wipe, i) => {
                    return (
                    <ListItem key={i}>
                        <List>
                            <ListItem>Date: {(new Date(wipe.dateCreated).toDateString())}</ListItem>
                            <ListItem>Character: {wipe.characterName}</ListItem>
                            <ListItem>Boss Health: {wipe.bossHealth}</ListItem>
                            <ListItem>Time Elapsed: {wipe.elapsedTime}</ListItem>
                            <ListItem>Cause: {wipe.cause}</ListItem>
                        </List>
                    </ListItem>
                    )
                })}
                </List>
            </Box>
    </VStack>
    )
}


export default WipeList