import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { TaskCard } from '../../components/TaskCard'
import { useGetAllCommunityAccounts } from '../../data/hooks/query/useGetAllCommunityAccounts'
import { useGetCommunityTasks } from '../../data/hooks/query/useGetCommunityTasks'
import { useUser } from '../../data/hooks/useUser'

// TODO: the ability to filter them with their status and location
// get only the tasks after the user selects the community

// we need to show a selector that allows user to select a community and after that fetch the active tasks
// from the community id api
function Dashboard() {
  useUser({ redirectTo: '/volunteer/login' })

  const [selectedCommunityId, setSelectedCommunityId] = useState('')
  const { isLoading, data: Tasks } = useGetCommunityTasks(selectedCommunityId)

  const { data: communityAccounts, isLoading: communityAccountsLoading } =
    useGetAllCommunityAccounts()
  return (
    <Box height="90vh" overflow="auto" pb="44">
      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold">
        Welcome to Volunteer Dashboard
      </Text>
      <FormControl my="6">
        <FormLabel htmlFor="template">Select a community</FormLabel>
        <Select
          id="template"
          value={selectedCommunityId}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onChange={(e) => setSelectedCommunityId(e.target.value)}
          bg="whiteAlpha.600"
          placeholder="Choose a community"
        >
          {!communityAccountsLoading &&
            communityAccounts &&
            communityAccounts?.map((task) => (
              <option value={task._id} key={task._id}>
                {task.name}
              </option>
            ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>

      {!selectedCommunityId && (
        <Text fontSize="xl" fontWeight="bold">
          Please select a community to check for available tasks
        </Text>
      )}

      {!isLoading && selectedCommunityId && (
        <Text fontSize="xl" fontWeight="bold">
          Available tasks for selected community
        </Text>
      )}
      <Skeleton my="4" height="80px" isLoaded={!isLoading}>
        {!isLoading && Tasks?.length === 0 && (
          <Text fontSize="lg" mx="2" color="gray.500">
            No tasks available
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
                showStatus={false}
              />
            )
          })}
      </Skeleton>
    </Box>
  )
}

export default Dashboard
