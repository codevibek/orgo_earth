import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { VideoPlayer } from '../../components/VideoPlayer'

function about() {
  return (
    <Box>
      <Head>
        <title>Volunteer - Tutorials</title>
      </Head>
      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="xl">
          How Do I Start Finding Tasks on the ORGO App?
        </Text>
        <VideoPlayer videoId="XQScPZeBxiM" />
      </Box>
      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="xl">
          How Do I Submit Evidence for a Task on the ORGO App?
        </Text>
        <VideoPlayer videoId="UccY8C0qI9A" />
      </Box>
      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="xl">
          How Do I Review My Submissions on the ORGO App?
        </Text>
        <VideoPlayer videoId="d751XjUyH7Y" />
      </Box>

      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="xl">
          How Do I Edit My Profile?
        </Text>
        <VideoPlayer videoId="dzURvzz1d7s" />
      </Box>
      <Box my="16">
        <Text textAlign="center" my="4" fontWeight="bold" fontSize="xl">
          How Do I Find Other Users on the ORGO App?
        </Text>
        <VideoPlayer videoId="9rnuHID6LjA" />
      </Box>
    </Box>
  )
}

export default about
