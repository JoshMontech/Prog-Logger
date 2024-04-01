"use client"
import React, { useState } from 'react'
import {  Wipe } from '@prisma/client'
import { Box, StackDivider,  VStack, List, ListItem} from '@chakra-ui/react'

const SimpleForm = ({data}: {data: any}) => {
    const [formData, setFormData] = useState(data);
    if (!data || data.length === 0) return <Box>no data reported</Box>
    return (
    <Box>there is data?</Box>
    )
}
export default SimpleForm