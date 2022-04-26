import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { TaskCard } from '../../components/TaskCard'

// TODO: the ability to filter them with their status and location
function Dashboard() {
  const router = useRouter()
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Welcome to Community Dashboard
      </Text>
      <Button my="2" onClick={() => router.push('/community/task/new')}>
        Create A New Task
      </Button>
      <Box>
        <TaskCard
          priority="low"
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="active"
          creator="Apple"
        />
        <TaskCard
          priority="high"
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="inactive"
          creator="Apple"
        />
        <TaskCard
          priority="medium"
          title="Complete Apple Assignment"
          location="Butwal-11, Devinagar"
          status="inactive"
          creator="Apple"
        />
      </Box>
    </Box>
  )
}

export default Dashboard
