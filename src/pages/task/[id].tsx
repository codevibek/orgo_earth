import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useGetTaskDetails } from '../../data/hooks/query/useGetTaskDetails'
import { useIsCommunity } from '../../data/hooks/useIsCommunity'

const TaskDetail = () => {
  const router = useRouter()
  const taskId = router.query.id as string
  const { data: TaskDetails, isLoading } = useGetTaskDetails(taskId)
  const isCommunity = useIsCommunity()

  return (
    <Box>
      <Skeleton isLoaded={!isLoading}>
        <Text my="5" fontSize="3xl" fontWeight="bold">
          {TaskDetails?.name}
        </Text>
        <Text my="2">{TaskDetails?.description}</Text>

        <Box my="4">
          <Text mb="2" fontWeight="semibold">
            Location: {TaskDetails?.address}
          </Text>
        </Box>
      </Skeleton>

      <Box my="6">
        <Text fontSize="xl" my="2">
          Task Creator
        </Text>
        <Flex>
          <Avatar src="https://bit.ly/prosper-baba" size="lg" name="John Doe" />
          <Text fontWeight="semibold" mx="4" fontSize="lg">
            {TaskDetails?.creatorCommunityName}
          </Text>
        </Flex>
      </Box>

      <HStack spacing="5" my="5">
        {isCommunity ? (
          <Button onClick={() => router.push(`/community/task/edit/${taskId}`)}>
            Edit Task
          </Button>
        ) : (
          <Button
            onClick={() => router.push(`/volunteer/evidence/submit/${taskId}`)}
          >
            Submit Evidence
          </Button>
        )}
      </HStack>
    </Box>
  )
}

export default TaskDetail
