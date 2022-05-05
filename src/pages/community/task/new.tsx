import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { CreateTaskForm } from '../../../components/CreateTaskForm'

function NewTask() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Create A New Task
      </Text>
      <CreateTaskForm />
    </Box>
  )
}

export default NewTask
