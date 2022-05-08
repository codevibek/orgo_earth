import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { VideoPlayer } from '../../components/VideoPlayer'

function about() {
  return (
    <Box>
      <Box my="4">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          Select an active task
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>

      <Box my="4">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          Submit evidence for review
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>

      <Box my="4">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="2xl">
          View history of submissions
        </Text>
        <VideoPlayer videoId="7tQIJMXIG1Q" />
      </Box>
    </Box>
  )
}

export default about
