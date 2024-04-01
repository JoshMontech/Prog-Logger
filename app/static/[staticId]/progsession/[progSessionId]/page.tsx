import { Box, Heading } from '@chakra-ui/react';
import { getProgSession, getWipeFormProperties } from '@/lib/progSessionService';
import WipeList from '@/components/WipeList';
import SimpleForm from '@/components/SimpleForm';
import CreateWipeForm from '@/components/CreateWipeForm';

const progSessionDashboardPage = async ({params}: {params:any}) => {
    const { staticId, progSessionId } = params;
    const progSession = await getProgSession(staticId, progSessionId)
    const wipeFormProperties = await getWipeFormProperties()
    
    return (
        <Box p={5}>
            <Heading mb={4}>{progSession.id}</Heading>
                <WipeList wipes={progSession.wipes} />
                <SimpleForm data={wipeFormProperties} />
                <CreateWipeForm wipeFormProperties={wipeFormProperties} players={progSession.staticGroup.players} />
            {/* <SimpleGrid columns={{ md: 2, lg: 3 }} gap={{base:'1rem'}}> */}
                {/* <StaticGroupTable players={staticGroup.players} />
                <ProgSessionList progSessions={staticGroup.progSessions} /> */}
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
            {/* <CreateProgSessionForm staticId={staticId} /> */}
        </Box>
    );
};

export default progSessionDashboardPage;