import { Box, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { EvidenceCard } from '../../../components/EvidenceCard'
import GoBack from '../../../components/GoBack'
import { useGetEvidenceForVolunteer } from '../../../data/hooks/query/useGetEvidenceForVolunteer'
import { useUserData } from '../../../data/hooks/useUserData'

function EvidenceReview() {
  const userData = useUserData()

  const { data, isLoading } = useGetEvidenceForVolunteer(userData?._id)

  if (isLoading) {
    return <Skeleton isLoaded={!isLoading} height="200px" />
  }

  return (
    <Box height="90vh" overflow="auto" pb="44">
      <GoBack />
      <Text
        mt="4"
        fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
        fontWeight="extrabold"
      >
        These are the evidence that you submitted
      </Text>
      <Text
        fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}
        fontWeight="extrabold"
      >
        you can check the complete status of them by clicking on see details:
      </Text>

      <Box my="12">
        <Text fontWeight="medium" fontSize="xl">
          Under review:
        </Text>
        <Skeleton isLoaded={!isLoading}>
          {data && data.length === 0 && (
            <Text>
              Sorry, we didn’t find anything. Make sure you submit evidence for
              a task and then come back.
            </Text>
          )}
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
