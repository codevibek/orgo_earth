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
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GoBack from '../../../../components/GoBack'
import { useApproveEvidence } from '../../../../data/hooks/mutations/useApproveEvidence'
import { useCommentOnEvidence } from '../../../../data/hooks/mutations/useCommentOnEvidence'
import { useGetEvidenceById } from '../../../../data/hooks/query/useGetEvidenceById'
import { useUserData } from '../../../../data/hooks/useUserData'

function EvidenceDetails() {
  const router = useRouter()
  const toast = useToast()

  const evidenceId = router.query.id as string
  const userData = useUserData()
  const { data, isLoading } = useGetEvidenceById(evidenceId)
  const [comment, setComment] = useState('')
  const { mutate: commentOnEvidence, isLoading: commentAddLoading } =
    useCommentOnEvidence()

  const {
    isLoading: approvingEvidence,
    mutate: approveEvidence,
    isSuccess,
  } = useApproveEvidence()

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment && comment.length > 0) {
      setComment('')
      return commentOnEvidence({ evidenceId, message: comment.trim() })
    }
    return toast({
      title: 'Comment is empty',
      status: 'error',
      duration: 8000,
      isClosable: true,
    })
  }

  if (isLoading) {
    return <Skeleton height="400px" />
  }

  return (
    <Box height="90vh" overflow="auto">
      <GoBack />
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

      <Button
        colorScheme="green"
        isLoading={approvingEvidence}
        disabled={isSuccess}
        onClick={() =>
          approveEvidence({ taskId: data?.taskId._id, userId: userData?._id })
        }
      >
        Approve Evidence
      </Button>

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
            {data.helpers.map((helper) => (
              <Avatar
                cursor="pointer"
                key={helper._id}
                onClick={() =>
                  router.push(`/volunteer/profile/${helper.id.username}`)
                }
                name={helper.id.name}
                src={helper.id.avatar}
              />
            ))}
          </AvatarGroup>
        </Box>
      </Box>

      <Box my="6">
        <form onSubmit={handleCommentSubmit}>
          <Flex>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comments here"
              variant="filled"
            />
            <Button type="submit" isLoading={commentAddLoading} mx="4">
              Post
            </Button>
          </Flex>
        </form>

        {data.comments.map((comment) => {
          return (
            <HStack my="4" key={comment._id}>
              <Text
                bg="gray.200"
                color="gray.500"
                w="80%"
                borderRadius="5px"
                p="2"
              >
                {comment.message}
              </Text>
              <Avatar
                name={comment.sender.username}
                size="lg"
                cursor="pointer"
                onClick={() =>
                  router.push(
                    `/${comment.sender.type}/profile/${comment.sender.username}`
                  )
                }
                src={comment.sender.avatar}
              />
            </HStack>
          )
        })}
      </Box>
    </Box>
  )
}

export default EvidenceDetails
