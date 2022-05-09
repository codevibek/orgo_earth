import { Box, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { EvidenceCard } from '../../../components/EvidenceCard'
import GoBack from '../../../components/GoBack'
import { useGetToBeReviewedCommunityEvidences } from '../../../data/hooks/query/useGetCommunityEvidences'
import { useUserData } from '../../../data/hooks/useUserData'

function EvidenceReview() {
  const userData = useUserData()

  const { data, isLoading } = useGetToBeReviewedCommunityEvidences(
    userData?._id
  )

  if (isLoading) {
    return <Skeleton isLoaded={!isLoading} height="200px" />
  }
  return (
    <Box>
      <GoBack />
      <Text
        mt="4"
        fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
        fontWeight="extrabold"
      >
        These are the task that submitted evidence for
      </Text>
      <Text
        fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}
        fontWeight="extrabold"
      >
        you can review them:
      </Text>

      <Box my="12">
        <Text fontWeight="medium" fontSize="xl">
          To Be Reviewed:
        </Text>
        <Skeleton isLoaded={!isLoading}>
          {data && data.length === 0 && <Text>No Evidence to Review </Text>}
          {data &&
            data.map((evidence) => (
              <EvidenceCard
                key={evidence._id}
                creatorCommunityName={evidence.userId.username}
                id={evidence._id}
                title={evidence.taskId.name}
                status={evidence.taskId.status}
                priority={evidence.taskId.priority}
                location={evidence.taskId.address}
              />
            ))}
        </Skeleton>
      </Box>
    </Box>
  )
}

export default EvidenceReview
