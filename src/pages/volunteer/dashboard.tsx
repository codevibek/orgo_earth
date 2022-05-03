import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { TaskCard } from '../../components/TaskCard'
import { useUser } from '../../data/hooks/useUser'

// TODO: the ability to filter them with their status and location
function Dashboard() {
  useUser({ redirectTo: '/volunteer/login' })
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Welcome to Volunteer Dashboard
      </Text>

      <Box>
        <TaskCard
          priority="low"
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="active"
          creator="Apple"
          id="0909090"
        />
        <TaskCard
          priority="high"
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="inactive"
          creator="Apple"
          id="0909090"
        />
        <TaskCard
          priority="medium"
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="inactive"
          creator="Apple"
          id="0909090"
        />
      </Box>
    </Box>
  )
}

export default Dashboard
