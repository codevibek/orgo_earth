import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Link,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import NextLink from 'next/link'
import { EvidenceCard } from '../../../../components/EvidenceCard'
import GoBack from '../../../../components/GoBack'
import { useApproveEvidence } from '../../../../data/hooks/mutations/useApproveEvidence'
import { useCommentOnEvidence } from '../../../../data/hooks/mutations/useCommentOnEvidence'
import { useGetEvidenceById } from '../../../../data/hooks/query/useGetEvidenceById'
import Head from 'next/head'

function EvidenceDetails() {
  const router = useRouter()
  const toast = useToast()

  const evidenceId = router.query.id as string
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
      <Head>
        <title>Evidence Details</title>
      </Head>
      <GoBack />
      <Text fontWeight="bold">Submission For</Text>
      <EvidenceCard
        creatorCommunityName={data.taskId.name}
        id={data._id}
        location={data.taskId.address}
        priority={data.taskId.priority}
        title={data.taskId.name}
        status={data.status}
        rewards={data.taskId.rewards}
        showPriority={false}
        showDetails={false}
      />
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

      <Box>
        <NextLink
          href={`https://maps.google.com/?q=${data?.latitude},${data?.longitude}`}
          passHref
        >
          <Link target="_blank" textDecoration="underline">
            This image was shot at this location
          </Link>
        </NextLink>
      </Box>

      <Button
        colorScheme="green"
        isLoading={approvingEvidence}
        disabled={isSuccess || data.status === 'approved'}
        onClick={() => approveEvidence({ evidenceId })}
      >
        {data.status === 'approved' ? 'Already Approved' : 'Approve Evidence'}
      </Button>

      <Box my="6">
        <Text fontWeight="bold">Evidence Submitted By: </Text>
        <Flex my="4">
          <Avatar
            name={data?.userId.username}
            size="lg"
            cursor="pointer"
            src={data.userId.avatar}
            onClick={() =>
              router.push(`/${data.userId.type}/${data.userId.username}`)
            }
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
                  router.push(
                    `/${data.userId.type}/profile/${helper.id.username}`
                  )
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
