import { Box, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRedirectToDashboard } from '../data/hooks/useUser'

function Home() {
  // if already authenticated then redirect to dashboard
  useRedirectToDashboard()
  const router = useRouter()
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
          <img src="/images/circlehigh.png" />
          <img src="images//text.png" />
        </Flex>

        <Flex flexDir="column" width="full">
          <Button my="4" onClick={() => router.push('/about')}>
            Get Started
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => router.push('/volunteer/login')}
          >
            I already have an account
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

Home.landingPage = true

export default Home
