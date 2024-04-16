import { Box, Divider, Heading, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getProgSession, getWipeFormProperties } from '@/lib/progSessionService';
import WipeList from '@/components/WipeList';
import WipeStats from '@/components/WipeCharts';
import CreateWipeForm from '@/components/CreateWipeForm';
import NextLink from 'next/link';

const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString('en-us', { weekday:"long",  hour12: true, hour:"numeric", year:"numeric", month:"short", day:"numeric", timeZone: "America/New_York"}) 
}

const progSessionDashboardPage = async ({params}: {params:any}) => {
    const { staticId, progSessionId } = params;
    const progSession = await getProgSession(staticId, progSessionId)
    const wipeFormProperties = await getWipeFormProperties()
    return (
            <>
                <Flex as="nav" h={'10vh'} alignItems={'center'} paddingLeft={8}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={NextLink} href='/static'>
                            Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={NextLink} href={`/static/${staticId}`}>
                            Static
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>Prog Session</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>
                <Flex justifyContent={'center'} alignItems={'center'} h={'90vh'}>
                    <Box p={4} borderWidth='1px' borderRadius='lg' borderColor={'lightgray'}>
                        <Heading mb={4}>{getFormattedDate(new Date(progSession.dateCreated))}</Heading>
                        <Divider mb={4} />
                        <WipeStats wipes={progSession.wipes} players={progSession.staticGroup.players} />
                        <Divider mt={4} mb={4} />
                        <WipeList wipes={progSession.wipes}  />
                        <CreateWipeForm wipeFormProperties={wipeFormProperties} players={progSession.staticGroup.players} staticId={staticId} progSessionId={progSessionId} />
                    </Box>
                </Flex>
            </>
    );
};

export default progSessionDashboardPage;