import { Box, Button, Skeleton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { TaskCard } from '../../components/TaskCard'
import { User } from '../../data/hooks/mutations/useRegister'
import { useGetCommunityTasks } from '../../data/hooks/query/useGetCommunityTasks'
import { useUser } from '../../data/hooks/useUser'
import { isServer } from '../../data/utils/isServer'

// TODO: the ability to filter them with their status and location
function Dashboard() {
  const router = useRouter()
  useUser({ redirectTo: '/community/login' })

  const userData: User = useMemo(() => {
    if (isServer) return null
    return JSON.parse(localStorage.getItem('userData'))
  }, [])

  const { data: Tasks, isLoading } = useGetCommunityTasks(userData?._id)

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
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
                  key={task?._id}
                  creator={task?.creater}
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
