import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { TaskCard } from '../../components/TaskCard'
import { useGetActiveCommunityTasks } from '../../data/hooks/query/useGetActiveCommunityTasks'
import { useGetAllCommunityAccounts } from '../../data/hooks/query/useGetAllCommunityAccounts'
import { useUser } from '../../data/hooks/useUser'

function Dashboard() {
  useUser({ redirectTo: '/volunteer/login' })

  useEffect(() => {
    setSelectedCommunityId(localStorage.getItem('selectedCommunityId') || '')
  }, [])

  const [selectedCommunityId, setSelectedCommunityId] = useState('')
  const { isLoading, data: Tasks } =
    useGetActiveCommunityTasks(selectedCommunityId)

  const handleCommunityChange = (e) => {
    setSelectedCommunityId(e.target.value)
    localStorage.setItem('selectedCommunityId', e.target.value)
  }

  const { data: communityAccounts, isLoading: communityAccountsLoading } =
    useGetAllCommunityAccounts()
  return (
    <Box height="90vh" overflow="auto" pb="44">
      <Head>
        <title>Available Tasks</title>
      </Head>
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
          onChange={handleCommunityChange}
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
                creatorUsername={task?.creator.username}
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
