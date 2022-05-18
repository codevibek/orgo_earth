import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { CreateTaskForm } from '../../../components/CreateTaskForm'
import GoBack from '../../../components/GoBack'

function NewTask() {
  return (
    <Box>
      <Head>
        <title>Create New Task</title>
      </Head>
      <GoBack />
      <Text fontSize="xl" fontWeight="bold">
        Create A New Task
      </Text>
      <CreateTaskForm />
    </Box>
  )
}

export default NewTask
