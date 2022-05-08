import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { VideoPlayer } from '../../components/VideoPlayer'

function about() {
  return (
    <Box>
      <Box my="4">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          Create Task
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>

      <Box my="4">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          Review Evidence Submissions
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>

      <Box my="4">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          View Post Submissions
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>
    </Box>
  )
}

export default about
