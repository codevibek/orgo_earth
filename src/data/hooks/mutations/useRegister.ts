import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { useStore } from '../../store'

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
  successRedirectionPath: string
}

export function useRegister({ successRedirectionPath }: UseRegisterInputs) {
  const router = useRouter()
  const toast = useToast()
  const setUserData = useStore((state) => state.setUserData)
  return useMutation(registerUser, {
    onSuccess: (data) => {
      // set the user data to localestorage
      // route use to the dashboard
      const userData = JSON.stringify(data)
      localStorage.setItem('userData', userData)
      setUserData(data)
      router.push(successRedirectionPath)
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
