import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'

export const TaskForm = () => {
  return (
    <Box my="5" bg="gray.200" borderRadius="5px" p="4">
      <FormControl my="6">
        <FormLabel htmlFor="template">Select a template</FormLabel>
        <Select
          id="template"
          bg="whiteAlpha.600"
          placeholder="Use previous task as template"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <FormHelperText>This is optional</FormHelperText>
      </FormControl>
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
        <FormLabel htmlFor="evidence">Evidence Needed</FormLabel>
        <Textarea variant="filled" id="evidence" />
      </FormControl>

      <FormControl my="6">
        <FormLabel htmlFor="priority">Priority</FormLabel>
        <Select
          id="priority"
          bg="whiteAlpha.600"
          placeholder="Set the priority of your task"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </FormControl>

      <FormControl my="6">
        <FormLabel htmlFor="status">Status</FormLabel>
        <Select
          id="status"
          bg="whiteAlpha.600"
          placeholder="Set the status of your task"
        >
          <option value="active">Active</option>
          <option value="inactive">In Active</option>
        </Select>
      </FormControl>
      <Button>Submit</Button>
    </Box>
  )
}
