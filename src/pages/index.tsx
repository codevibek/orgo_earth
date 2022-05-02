import { Box, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRedirectToDashboard } from '../data/hooks/useUser'

export default function Home() {
  // if already authenticated then redirect to dashboard
  useRedirectToDashboard()
  return (
    <Box>
      <Text fontWeight="extrabold" fontSize="2xl">
        Hello Welcome to orgo earth app
      </Text>
      <Box>
        <NextLink href="/community">Go to community</NextLink>
      </Box>
      <Box>
        <NextLink href="/volunteer">Go to volunteer</NextLink>
      </Box>
      <Box>
        <NextLink href="/community/profile/123">
          Go to community profile page
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/volunteer/profile/1234">
          Go to volunteer profile page
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/task/123">Go to task detail page</NextLink>
      </Box>
      <Box>
        <NextLink href="/community/evidence/summary">
          Go to task evidence summary page for community
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/community/evidence/details/12">
          Go to task evidence details page for community
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/community/task/new">
          Go to create new task page
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/community/notifications">
          Go to community notifications page
        </NextLink>
      </Box>
    </Box>
  )
}
