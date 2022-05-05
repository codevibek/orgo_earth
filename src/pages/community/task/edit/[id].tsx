import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { EditTaskForm } from '../../../../components/EditTaskForm'

const EditTask = () => {
  const router = useRouter()
  const taskId = router.query.id as string
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Edit A Task
      </Text>
      <EditTaskForm taskId={taskId} />
    </Box>
  )
}

export default EditTask
