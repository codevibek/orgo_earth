import { Box, Button, Skeleton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { TaskCard } from '../../components/TaskCard'
import { useGetCommunityTasks } from '../../data/hooks/query/useGetCommunityTasks'
import { useUser } from '../../data/hooks/useUser'
import { useUserData } from '../../data/hooks/useUserData'

// TODO: the ability to filter them with their status and location
function Dashboard() {
  const router = useRouter()
  useUser({ redirectTo: '/community/login' })
  const userData = useUserData()
  const { data: Tasks, isLoading } = useGetCommunityTasks(userData?._id)

  return (
    <Box height="90vh" overflowY="auto">
      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold">
        Welcome to Community Dashboard
      </Text>
      <Button my="2" onClick={() => router.push('/community/task/new')}>
        Create A New Task
      </Button>
      <Box>
        <Skeleton my="4" height="80px" isLoaded={!isLoading}>
          {!isLoading && Tasks?.length === 0 && (
            <Text fontSize="lg" mx="2" color="gray.500">
              You've not created any task yet
            </Text>
          )}
          {!isLoading &&
            Tasks?.map((task) => {
              return (
                <TaskCard
                  rewards={task.rewards}
                  key={task?._id}
                  creatorCommunityName={task?.creatorCommunityName}
                  location={task?.address}
                  priority={task?.priority ?? 'medium'}
                  status={task?.status ?? 'active'}
                  title={task?.name}
                  id={task?._id}
                />
              )
            })}
        </Skeleton>
      </Box>
    </Box>
  )
}

export default Dashboard
