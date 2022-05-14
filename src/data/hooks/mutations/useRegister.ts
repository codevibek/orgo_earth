import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export interface User {
  _id: string
  name: string
  email: string
  type: string
  phone: string
  token: string
  username: string
  address?: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  bio?: string
  avatar?: string
  city?: string
}

export interface RegisterUserInput {
  name: string
  email: string
  password: string
  type?: string
  phone?: number
  username?: string
}

function registerUser(input: RegisterUserInput): Promise<User> {
  return axios
    .post(`${apiBaseUrl}/api/users/register`, input)
    .then((res) => res.data)
}

interface UseRegisterInputs {
  isCommunity: boolean
}

export function useRegister({ isCommunity }: UseRegisterInputs) {
  const router = useRouter()
  const toast = useToast()
  return useMutation(registerUser, {
    onSuccess: (data) => {
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
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        title: 'Failed to register',
        description: error.response?.data?.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    },
  })
}
