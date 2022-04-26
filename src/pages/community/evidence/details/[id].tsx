import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function EvidenceDetails() {
  return (
    <Box>
      <Text fontWeight="bold">Evidence For:</Text>
      <Text mb="4" fontSize="2xl" fontWeight="extrabold">
        Complete the ball assignment
      </Text>
      <Text color="gray.500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos voluptas
        amet neque autem, modi, sed perspiciatis quia magni reiciendis molestiae
        corrupti adipisci est repudiandae sequi, numquam odit minima
        consequatur? Voluptate expedita quis sequi laboriosam autem saepe amet
        dolor eum error iste iusto voluptates quos inventore officiis
        perferendis aperiam earum architecto rerum, recusandae aspernatur. Odit
        cumque adipisci neque nostrum quae deserunt consequatur dolores dicta,
        officia in repellendus quis pariatur harum nam mollitia. Voluptatibus
        iusto culpa, voluptatum temporibus a aliquid quos, ratione tempora
        beatae excepturi aperiam sunt nulla unde fugiat cum labore ut, sint
        dolores quasi. Quaerat consequuntur corrupti assumenda porro
        dignissimos?
      </Text>

      <Box my="4" p="4" height="500px" bg="gray.400">
        Geo-Tagged Image here
      </Box>

      <Box my="6">
        <Text fontWeight="bold">Evidence Submitted By: </Text>
        <Flex my="4">
          <Avatar
            name="Dan Abrahmov"
            size="lg"
            cursor="pointer"
            src="https://bit.ly/dan-abramov"
          />
          <Text mx="4" fontWeight="semibold">
            Dan Abrohmov
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default EvidenceDetails
