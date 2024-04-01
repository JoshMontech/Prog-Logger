import { Box, Heading, Link as ChakraLink, Card, CardBody, GridItem, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import { StaticGroupWithPlayers } from '@/types/PrismaExpandedTypes';
import { getStaticGroups } from '@/lib/staticService';
import CreateStaticGroupForm from '@/components/CreateStaticForm';
import StaticGroupTable from '@/components/StaticGroupTable';

const StaticGroupsPage = async () => {
    const staticGroups:StaticGroupWithPlayers[] = await getStaticGroups()
    return (
        <Box p={5}>
            <Heading mb={4}>Your Static Groups</Heading>
            <SimpleGrid columns={{ md: 2, lg: 3 }} gap={{base:'1rem'}}>
                {staticGroups.map((group) => (
                <GridItem key={group.id}>
                    <Card size="md">
                    <CardBody>
                    <Link href={`/static/${group.id}`}>
                        <ChakraLink as="span">{group.name}</ChakraLink>
                    <StaticGroupTable players={group.players} />
                    </Link>
                    </CardBody>
                </Card>
                </GridItem>
                ))}
            </SimpleGrid>
            <CreateStaticGroupForm />
        </Box>
    );
};

export default StaticGroupsPage;