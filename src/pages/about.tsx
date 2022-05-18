import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { VideoPlayer } from '../components/VideoPlayer'

function About() {
  const router = useRouter()
  return (
    <Box>
      <Head>
        <title>About Us</title>
      </Head>
      <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
        About Us
      </Text>
      <Text>
        Earth has lost its voice, and we're dedicated to giving it back. While
        established community organizations are working hard to make a positive
        environmental change, they often lack a simplified structure or system
        for recruiting volunteers, collecting data, managing workflows, or
        rewarding contributors. ORGO is on a mission to regenerate the planet by
        gamifying land stewardship and enabling decentralized governance of
        community assets. Through the ORGO app, volunteers can find community
        organizations with pending assignments and earn rewards by completing
        tasks. Additionally, participating community organizations gain insight
        from the eco-data collected, progress tracking of tasks, and volunteer
        hours worked.
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
        <Button
          colorScheme="blue"
          my="4"
          onClick={() => router.push('/volunteer/register')}
        >
          Create volunteer account
        </Button>
        <Button onClick={() => router.push('/community/register')}>
          Create community account
        </Button>
      </Flex>
    </Box>
  )
}

export default About
