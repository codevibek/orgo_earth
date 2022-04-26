import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { TaskCard } from '../../components/TaskCard'

// TODO: the ability to filter them with their status
function Dashboard() {
  const router = useRouter()
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Welcome to volunteer Dashboard
      </Text>
      <Button my="2" onClick={() => router.push('/community/task/new')}>
        Create A New Task
      </Button>
      <Box>
        <TaskCard
          title="Complete Apple Assignment"
          deadline="2022, 15th May"
          location="Butwal-11, Devinagar"
          status="active"
        />
        <TaskCard
          title="Complete Apple Assignment"
          deadline="2022, 15th May"
          location="Butwal-11, Devinagar"
          status="inactive"
        />
        <TaskCard
          title="Complete Apple Assignment"
          deadline="2022, 15th May"
          location="Butwal-11, Devinagar"
          status="inactive"
        />
      </Box>
    </Box>
  )
}

export default Dashboard
