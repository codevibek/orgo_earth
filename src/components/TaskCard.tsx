import { Badge, Box, Button, Flex, Text, Tooltip, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React from 'react'

export interface TaskCardProps {
  title: string
  status: 'active' | 'inactive'
  priority: 'low' | 'medium' | 'high'
  location: string
  creatorCommunityName: string
  creatorUsername: string
  id: string
  rewards: string
  showStatus?: boolean
}

const TaskStatusToBGColor = {
  active: 'green.300',
  inactive: 'gray.300',
}

const TaskPriorityToColor = {
  low: 'gray.300',
  medium: 'yellow.300',
  high: 'red.400',
}

const TaskStatusToLabel = {
  active: 'Active',
  inactive: 'In Active',
}

const TaskPriorityToLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const TaskCard: React.FC<TaskCardProps> = ({
  location,
  status,
  title,
  priority,
  creatorCommunityName,
  id,
  rewards,
  showStatus = true,
  creatorUsername,
}) => {
  const router = useRouter()
  return (
    <Box
      cursor="pointer"
      onClick={() => router.push(`/task/${id}`)}
      bg="gray.200"
      p="2"
      my="5"
      borderRadius="5px"
    >
      <Box mx="4">
        <Flex alignItems="center" my="1" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Box>
            {showStatus && (
              <Tooltip label="Task Status">
                <Badge mr="2" bg={TaskStatusToBGColor[status]}>
                  {TaskStatusToLabel[status]}
                </Badge>
              </Tooltip>
            )}
            <Tooltip label="Task Priority">
              <Badge bg={TaskPriorityToColor[priority]}>
                {TaskPriorityToLabel[priority]}
              </Badge>
            </Tooltip>
          </Box>
        </Flex>
        <Text fontSize="sm">{location}</Text>

        <Text>Rewards: {rewards}</Text>

        <NextLink href={`/community/profile/${creatorUsername}`} passHref>
          <Link
            onClick={(e) => e.stopPropagation()}
            fontSize="sm"
            color="gray.500"
          >
            Task created by {creatorCommunityName}
          </Link>
        </NextLink>
      </Box>
      <Button onClick={() => router.push(`/task/${id}`)} variant="ghost">
        See details
      </Button>
    </Box>
  )
}
