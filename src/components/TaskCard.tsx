import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export interface TaskCardProps {
  title: string
  status: 'active' | 'inactive'
  deadline: string
  location: string
  isEvidence?: boolean
}

const TaskStatusToBGColor = {
  active: 'green.300',
  inactive: 'gray.300',
}

const TaskStatusToLabel = {
  active: 'Active',
  inactive: 'In Active',
}

export const TaskCard: React.FC<TaskCardProps> = ({
  deadline,
  location,
  status,
  title,
  isEvidence = false,
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
        See {isEvidence ? 'evidence' : 'details'}
      </Button>
    </Box>
  )
}
