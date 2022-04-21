import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export interface TaskCardProps {
  title: string
  status: 'active' | 'completed' | 'inReview' | 'inProgress'
  deadline: string
  location: string
}

const TaskStatusToBGColor = {
  active: 'green.300',
  completed: 'blue.300',
  inReview: '#17A2B8',
  inProgress: 'yellow.300',
}

const TaskStatusToLabel = {
  active: 'Active',
  completed: 'Completed',
  inReview: 'In Review',
  inProgress: 'In Progress',
}

export const TaskCard: React.FC<TaskCardProps> = ({
  deadline,
  location,
  status,
  title,
}) => {
  const router = useRouter()
  return (
    <Box bg="gray.200" p="2" my="5" borderRadius="5px">
      <Box mx="4">
        <Flex alignItems="center" my="2" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Badge bg={TaskStatusToBGColor[status]}>
            {TaskStatusToLabel[status]}
          </Badge>
        </Flex>
        <Text fontSize="sm">{location}</Text>
        <Text fontSize="md" fontWeight="semibold">
          Deadline: {deadline}
        </Text>
      </Box>
      <Button onClick={() => router.push('/task/123')} variant="ghost">
        See details
      </Button>
    </Box>
  )
}
