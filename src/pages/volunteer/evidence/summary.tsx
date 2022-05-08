import { Box, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { EvidenceCard } from '../../../components/EvidenceCard'
import { useGetEvidenceForVolunteer } from '../../../data/hooks/query/useGetEvidenceForVolunteer'
import { useUserData } from '../../../data/hooks/useUserData'

function EvidenceReview() {
  const userData = useUserData()

  const { data, isLoading } = useGetEvidenceForVolunteer(userData?._id)

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="extrabold">
        These are the evidence that you submitted
      </Text>
      <Text fontSize="2xl" fontWeight="extrabold">
        you can check the complete status of them by clicking on see details:
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
