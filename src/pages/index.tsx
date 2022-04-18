import { Box, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Home() {
  return (
    <Box>
      <Text fontWeight="extrabold" fontSize="2xl">
        Hello Welcome to orgo earth app
      </Text>
      <Box>
        <NextLink href="/community">Go to community</NextLink>
      </Box>
    </Box>
  )
}
