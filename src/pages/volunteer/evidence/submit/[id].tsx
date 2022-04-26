import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  Select,
} from '@chakra-ui/react'
import React from 'react'

// TODO: Add multi select for tagging other volunteers
// TODO: Ask for location and camera permission before submitting
function EvidenceSubmitPage() {
  return (
    <Box>
      <Text fontWeight="extrabold" mt="6" fontSize="xl">
        Submit your evidence for
      </Text>
      <Text fontWeight="bold" fontSize="lg" color="gray.400">
        Complete the apple assignment task
      </Text>
      <Flex alignItems="center" my="2">
        <Text mr="2" color="gray.500">
          Task Created By :
        </Text>
        <Badge> Apple Foundation</Badge>
      </Flex>
      <Box>
        <FormControl my="3">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea size="lg" variant="filled" id="description" />
        </FormControl>

        <Box my="4">
          <Select placeholder="Tag other volunteer">
            <option value="amit">Amit</option>
            <option value="john">John</option>
            <option value="jenny">Jenny</option>
          </Select>
        </Box>

        <Button>Attach Image</Button>
      </Box>
      <Box
        my="4"
        height="100px"
        borderRadius="5px"
        p="2"
        border="1px dashed black"
      >
        Attached Image here
      </Box>
      <Box my="4">
        <Button>Submit Evidence</Button>
      </Box>
    </Box>
  )
}

export default EvidenceSubmitPage
