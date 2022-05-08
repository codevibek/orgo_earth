import { Box, Button, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRedirectToDashboard } from '../data/hooks/useUser'

function Home() {
  // if already authenticated then redirect to dashboard
  useRedirectToDashboard()
  return (
    <Box>
      <Flex
        mt="50px"
        height="80vh"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
      >
        <Flex flexDir="column">
          <img src="/images/circle.png" />
          <img src="images//text.png" />
        </Flex>

        <Flex flexDir="column" width="full">
          <Button my="4">
            <NextLink href="/about">Get Started</NextLink>
          </Button>
          <Button colorScheme="blue">
            <NextLink href="/community/login">
              I already have an account
            </NextLink>
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

Home.landingPage = true

export default Home
