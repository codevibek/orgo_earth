import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export interface EditTaskInput {
  name: string
  description: string
  status: 'active' | 'inactive'
  priority: 'high' | 'medium' | 'low'
  address: string
  hours: string
  evidence: string
  rewards: string
  taskId: string
}
export interface Task {
  _id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  priority: 'high' | 'medium' | 'low'
  address: string
  hours: string
  evidence: string
  rewards: string
  taskId: string
}

function editTask(input: EditTaskInput): Promise<Task> {
  const token = JSON.parse(localStorage.getItem('userData')).token
  return axios
    .put(`${apiBaseUrl}/api/tasks/task/${input.taskId}`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.task)
}

export function useEditTask() {
  const toast = useToast()
  const router = useRouter()

  // after successfull edit route to task details page
  return useMutation(editTask, {
    onSuccess: (value) => {
      router.push(`/task/${value._id}`)
      toast({
        title: 'Task Updated Successfully Updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        title: 'Failed To Update Task',
        description: error.response?.data?.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    },
  })
}
