import { Avatar, Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const TaskDetail = () => {
  //TODO: hide the claim this task button if user is admin
  const router = useRouter()
  return (
    <Box>
      <Text my="5" fontSize="3xl" fontWeight="bold">
        Complete the apple assignment
      </Text>
      <Text my="2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eius
        eveniet quos laborum iure repellendus, neque harum, libero distinctio
        amet sapiente repudiandae fuga consectetur accusamus vitae molestiae
        eaque sed magnam. Iure a quam corporis, similique amet quasi saepe
        tempore nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Odio, magnam. Aut vitae tempore laudantium, magni maxime quas aperiam
        voluptatibus explicabo fugit odit aliquid architecto facilis incidunt
        vel quisquam laboriosam ea atque quia beatae voluptatem quibusdam quis
        sunt. Architecto sit laboriosam facere distinctio, assumenda quisquam
        sunt commodi eum quas hic provident rerum voluptatem iure, ex dolores
        nostrum id asperiores officia placeat ut vero maiores. Suscipit vel
        doloribus iste dicta perspiciatis earum.
      </Text>

      <Box my="4">
        <Text mb="2" fontWeight="semibold">
          Location: Butwal-11,Devinagar
        </Text>
      </Box>

      <Box my="6">
        <Text fontSize="xl" my="2">
          Task Creator
        </Text>
        <Flex>
          <Avatar src="https://bit.ly/prosper-baba" size="lg" name="John Doe" />
          <Text fontWeight="semibold" mx="4" fontSize="lg">
            Apple
          </Text>
        </Flex>
      </Box>

      <HStack spacing="5" my="5">
        <Button onClick={() => router.push('/community/task/edit/123')}>
          Edit Task
        </Button>
        <Button>Submit Evidence</Button>
      </HStack>
    </Box>
  )
}

export default TaskDetail
