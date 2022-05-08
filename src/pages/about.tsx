import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

function about() {
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

      <VideoPlayer />

      <Flex flexDirection="column">
        <Button my="4">Create volunteer account</Button>
        <Button colorScheme="blue">Create community account</Button>
      </Flex>
    </Box>
  )
}

// TODO: make it responsive
export const VideoPlayer = () => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps['opts'] = {
    // height: '390',
    // width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return <YouTube videoId="h1Pa2QW2VyU" opts={opts} onReady={onPlayerReady} />
}

export default about
