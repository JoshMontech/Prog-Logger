import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { StaticGroupWithPlayersAndProgSessions } from '@/types/PrismaExpandedTypes';
import { getStaticGroup } from '@/lib/staticService';
import CreateStaticGroupForm from '@/components/CreateStaticForm';
import StaticGroupTable from '@/components/StaticGroupTable';
import CreateProgSessionForm from '@/components/CreateProgSessionForm';
import ProgSessionList from '@/components/ProgSessionsList';

const StaticGroupDashboardPage = async ({params}: {params:any}) => {
    const { staticId } = params;
    const staticGroup: StaticGroupWithPlayersAndProgSessions = await getStaticGroup(staticId)
    return (
        <Box p={5}>
            <Heading mb={4}>{staticGroup.name}</Heading>
            {/* <SimpleGrid columns={{ md: 2, lg: 3 }} gap={{base:'1rem'}}> */}
                <StaticGroupTable players={staticGroup.players} />
                <ProgSessionList progSessions={staticGroup.progSessions} />
                {/* {staticGroups.map((group) => (
                <GridItem key={group.id}>
                    <Card size="md">
                    <CardBody>
                    <Link href={`/static/${group.id}`}>
                        <ChakraLink as="span">{group.name}</ChakraLink>

                    </Link>
                    </CardBody>
                </Card>
                </GridItem>
                ))} */}
            {/* </SimpleGrid> */}
            <CreateProgSessionForm staticId={staticId} />
        </Box>
    );
};

export default StaticGroupDashboardPage;