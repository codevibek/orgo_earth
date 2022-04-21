import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { TaskForm } from '../../../components/TaskForm'

function NewTask() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Create A New Task
      </Text>
      <TaskForm />
    </Box>
  )
}

export default NewTask
