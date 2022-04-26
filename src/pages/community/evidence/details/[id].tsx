import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react'
import React from 'react'

//TODO: When clicked on user avatar should open user profile
//TODO: We might use the carousel to show the evidence images
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
        <Box>
          <Text fontWeight="bold" my="2">
            Tagged Volunteers
          </Text>
          <AvatarGroup size="md">
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </Box>
      </Box>

      <Box my="6">
        <Flex>
          <Input placeholder="Write your comments here" variant="filled" />
          <Button mx="4">Post</Button>
        </Flex>

        <HStack my="4">
          <Text bg="gray.200" color="gray.500" w="80%" borderRadius="5px" p="2">
            Please update your description keep it short so that everyone can
            understand it well
          </Text>
          <Avatar
            name="Dan Abrahmov"
            size="lg"
            cursor="pointer"
            src="https://bit.ly/dan-abramov"
          />
        </HStack>

        <HStack my="4">
          <Avatar
            name="Ryan Florence"
            size="lg"
            src="https://bit.ly/ryan-florence"
          />

          <Text bg="gray.200" color="gray.500" w="80%" borderRadius="5px" p="2">
            okay give me some time
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default EvidenceDetails
