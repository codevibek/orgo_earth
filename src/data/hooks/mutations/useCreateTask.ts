import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export interface CreateTaskInput {
  name: string
  description: string
  address: string
  hours: string
  evidence: string
  status: string
  priority: string
}

function createTask(input: CreateTaskInput): Promise<CreateTaskInput> {
  const token = JSON.parse(localStorage.getItem('userData')).token
  return axios
    .post(`${apiBaseUrl}/api/tasks/create`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
}

export function useCreateTask() {
  const router = useRouter()
  const toast = useToast()

  return useMutation(createTask, {
    onSuccess: () => {
      router.push('/community/dashboard')
      toast({
        title: 'Task Created Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        title: 'Failed to Create Task',
        description: error.response?.data?.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    },
  })
}
