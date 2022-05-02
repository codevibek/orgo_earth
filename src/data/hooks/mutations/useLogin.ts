import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { User } from './useRegister'
import { useStore } from '../../store'

export interface LoginUserInput {
  email: string
  password: string
}

function loginUser(input: LoginUserInput): Promise<User> {
  return axios
    .post(`${apiBaseUrl}/api/users/login`, input)
    .then((res) => res.data)
}

interface UseLoginInputs {
  successRedirectionPath: string
}

export function useLogin({ successRedirectionPath }: UseLoginInputs) {
  const router = useRouter()
  const toast = useToast()
  const setUserData = useStore((state) => state.setUserData)

  return useMutation(loginUser, {
    onSuccess: (data) => {
      const userData = JSON.stringify(data)
      localStorage.setItem('userData', userData)
      setUserData(data)
      router.push(successRedirectionPath)
      toast({
        title: 'Successfully Logged In',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        title: 'Failed to login',
        description: error.response?.data?.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    },
  })
}
