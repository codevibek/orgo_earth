import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { User } from './useRegister'

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
  isCommunity: boolean
}

export function useLogin({ isCommunity }: UseLoginInputs) {
  const router = useRouter()
  const toast = useToast()

  return useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(`isCommunity: ${isCommunity}, data.type: ${data.type}`)
      if (isCommunity && data.type !== 'community') {
        toast({
          title: 'Invalid login',
          description:
            'Please switch to the volunteer page since this user is not a community user',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return null
      }

      if (!isCommunity && data.type !== 'volunteer') {
        toast({
          title: 'Invalid login',
          description:
            'Please switch to the community page since this user is not a volunteer user',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return null
      }
      const userData = JSON.stringify(data)
      localStorage.setItem('userData', userData)
      router.push(isCommunity ? `/community/dashboard` : `/volunteer/dashboard`)
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
