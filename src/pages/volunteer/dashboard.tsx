import { Box, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { TaskCard } from '../../components/TaskCard'
import { useGetAllTasks } from '../../data/hooks/query/useGetAllTasks'
import { useUser } from '../../data/hooks/useUser'

// TODO: the ability to filter them with their status and location
function Dashboard() {
  useUser({ redirectTo: '/volunteer/login' })
  const { isLoading, data: Tasks } = useGetAllTasks()
  return (
    <Box>
      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold">
        Welcome to Volunteer Dashboard
      </Text>

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
