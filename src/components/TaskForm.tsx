import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'

export const TaskForm = () => {
  return (
    <Box my="5" bg="gray.200" borderRadius="5px" p="4">
      <FormControl my="3">
        <FormLabel htmlFor="task">Task Name</FormLabel>
        <Input variant="filled" id="task" type="text" />
      </FormControl>
      <FormControl my="3">
        <FormLabel htmlFor="location">Location</FormLabel>
        <Input variant="filled" id="location" type="text" />
      </FormControl>
      <FormControl my="3">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea variant="filled" id="description" />
      </FormControl>
      <FormControl my="3">
        <FormLabel htmlFor="hoursRequired">Hours Required</FormLabel>
        <Input variant="filled" id="hoursRequired" type="number" />
      </FormControl>
      <FormControl my="3">
        <FormLabel htmlFor="peopleRequired">People Required</FormLabel>
        <Input variant="filled" id="peopleRequired" type="number" />
      </FormControl>
      <FormControl my="3">
        <FormLabel htmlFor="deadline">Deadline</FormLabel>
        <Input variant="filled" id="deadline" type="date" />
      </FormControl>
      <FormControl my="3">
        <FormLabel htmlFor="evidence">Evidence Needed</FormLabel>
        <Textarea variant="filled" id="evidence" />
      </FormControl>
      <Button>Submit</Button>
    </Box>
  )
}
