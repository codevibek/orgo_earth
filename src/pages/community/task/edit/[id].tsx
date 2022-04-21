import { Box, Text } from '@chakra-ui/react'
import { TaskForm } from '../../../../components/TaskForm'

const EditTask = () => {
  // TODO: Prepopulate the task data
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Edit A Task
      </Text>
      <TaskForm />
    </Box>
  )
}

export default EditTask
