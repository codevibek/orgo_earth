import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetEvidenceById } from '../../../../data/hooks/query/useGetEvidenceById'
import { useUserData } from '../../../../data/hooks/useUserData'

//TODO: When clicked on user avatar should open user profile
//TODO: We might use the carousel to show the evidence images

// using the id evidence id get the details about the evidence
function EvidenceDetails() {
  const router = useRouter()
  const userData = useUserData()
  const evidenceId = router.query.id as string

  const { data, isLoading } = useGetEvidenceById(userData?._id, evidenceId)

  if (isLoading) {
    return <Skeleton height="400px" />
  }

  return (
    <Box>
      <Text fontWeight="bold">Evidence For:</Text>
      <Text mb="4" fontSize="2xl" fontWeight="extrabold">
        {data?.taskId.name}
      </Text>
      <Text color="gray.500">{data?.evidenceDetails}</Text>

      <Box my="6">
        <Text>Attached Images</Text>
        {data?.evidenceImages.length === 0 && (
          <Box my="4" borderRadius="5px" p="4" bg="gray.400">
            <Text>No images attached</Text>
          </Box>
        )}
        {data?.evidenceImages.map((image) => (
          <img key={image} src={image} />
        ))}
      </Box>

      <Box my="6">
        <Text fontWeight="bold">Evidence Submitted By: </Text>
        <Flex my="4">
          <Avatar
            name={data?.userId.username}
            size="lg"
            cursor="pointer"
            src={data.userId.avatar}
          />
          <Text mx="4" fontWeight="semibold">
            {data?.userId.username}
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
