import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { VideoPlayer } from '../components/VideoPlayer'

function About() {
  const router = useRouter()
  return (
    <Box>
      <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
        About
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non corrupti
        beatae, voluptates excepturi dolorem assumenda dignissimos temporibus ab
        nostrum doloribus ducimus distinctio sit, aspernatur et mollitia debitis
        molestias in voluptate ex ipsam? Dolores assumenda ducimus excepturi
        quod deserunt harum odio beatae blanditiis suscipit? Architecto
        blanditiis voluptates consectetur tempore beatae similique?
      </Text>

      <Text textAlign="center" my="6" fontSize="xl">
        Watch the video tutorial
      </Text>

      <VideoPlayer videoId="7tQIJMXIG1Q" />

      <Flex
        my="6"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Button my="4" onClick={() => router.push('/volunteer/register')}>
          Create volunteer account
        </Button>
        <Button
          onClick={() => router.push('/community/register')}
          colorScheme="blue"
        >
          Create community account
        </Button>
      </Flex>
    </Box>
  )
}

export default About
