import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { VideoPlayer } from '../../components/VideoPlayer'

function about() {
  return (
    <Box>
      <Head>
        <title>Community - Tutorials</title>
      </Head>
      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          Create Task
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>

      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          Review Evidence Submissions
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>

      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          View Post Submissions
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>
    </Box>
  )
}

export default about
