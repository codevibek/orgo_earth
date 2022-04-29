import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { TaskCard } from '../../../components/TaskCard'

function EvidenceReview() {
  return (
    <Box>
      <Text fontSize="3xl" fontWeight="extrabold">
        These are the task that submitted evidence for
      </Text>
      <Text fontSize="3xl" fontWeight="extrabold">
        you can review them:
      </Text>

      <Box my="12">
        <Text fontWeight="medium" fontSize="xl">
          To Be Reviewed:
        </Text>
        <TaskCard
          creator="John Doe"
          priority="high"
          isEvidence
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="active"
        />

        <TaskCard
          creator="John Doe"
          priority="high"
          isEvidence
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="active"
        />
      </Box>

      <Box my="12">
        <Text fontWeight="medium" fontSize="xl">
          Reviewed:
        </Text>
        <TaskCard
          creator="John Doe"
          priority="high"
          isEvidence
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="inactive"
        />

        <TaskCard
          creator="John Doe"
          priority="high"
          isEvidence
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="inactive"
        />
      </Box>
    </Box>
  )
}

export default EvidenceReview
