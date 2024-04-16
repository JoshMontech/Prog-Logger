'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {  MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}