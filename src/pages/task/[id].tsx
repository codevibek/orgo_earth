import { Box, Button, HStack, Skeleton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import GoBack from '../../components/GoBack'
import { TaskCard } from '../../components/TaskCard'
import { useGetTaskDetails } from '../../data/hooks/query/useGetTaskDetails'
import { useIsCommunity } from '../../data/hooks/useIsCommunity'

const TaskDetail = () => {
  const router = useRouter()
  const taskId = router.query.id as string
  const { data: TaskDetails, isLoading } = useGetTaskDetails(taskId)
  const isCommunity = useIsCommunity()

  return (
    <Box>
      <GoBack />
      <Skeleton isLoaded={!isLoading}>
        <TaskCard
          creatorUsername={TaskDetails?.creator.username}
          creatorCommunityName={TaskDetails?.creatorCommunityName}
          id={TaskDetails?._id}
          location={TaskDetails?.address}
          priority={TaskDetails?.priority}
          rewards={TaskDetails?.rewards}
          title={TaskDetails?.name}
          status={TaskDetails?.status}
          showStatus={isCommunity}
          showDetails={false}
        />

        <Text my="2">{TaskDetails?.description}</Text>

        <Text mt="6" fontSize="2xl" fontWeight="bold">
          Submission Requirements
        </Text>

        <Text>{TaskDetails?.evidence}</Text>
      </Skeleton>

      <HStack spacing="5" my="5">
        {isCommunity ? (
          <Button onClick={() => router.push(`/community/task/edit/${taskId}`)}>
            Edit Task
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => router.push(`/volunteer/evidence/submit/${taskId}`)}
          >
            Start this task
          </Button>
        )}
      </HStack>
    </Box>
  )
}

export default TaskDetail
