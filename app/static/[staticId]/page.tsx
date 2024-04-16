import { Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getStaticGroup } from '@/lib/staticService';
import StaticGroupTable from '@/components/StaticGroupTable';
import ProgSessionList from '@/components/ProgSessionsList';
import NextLink from 'next/link';
import StaticGroupStats from '@/components/StaticGroupStats';

const StaticGroupDashboardPage = async ({params}: {params:any}) => {
    const { staticId } = params;
    const staticGroup = await getStaticGroup(staticId)
    return (
        <>
        <Flex as="nav" h={'10vh'} alignItems={'center'} paddingLeft={8}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink as={NextLink} href='/static'>
                    Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>
                    Static
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Flex>
        <Flex justifyContent={'center'} alignItems={'center'} h={'90vh'}>
        <Box p={5}>
            <Flex border={'1px solid lightgray'} borderRadius={'lg'}>
                <StaticGroupTable players={staticGroup.players} />
                <StaticGroupStats progSessions={staticGroup.progSessions} players={staticGroup.players} />
                <ProgSessionList progSessions={staticGroup.progSessions} staticId={staticId} />
            </Flex>
        </Box>
        </Flex>
        </>
    );
};

export default StaticGroupDashboardPage;