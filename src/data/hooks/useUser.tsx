import axios from 'axios'
import { useRouter } from 'next/router'
import { apiBaseUrl } from '../utils/constants'
import { User } from './mutations/useRegister'
import { useQuery } from 'react-query'

function getUserData(token: string): Promise<User> {
  return axios
    .get(`${apiBaseUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
}

interface UseUserProps {
  redirectTo: string
}
export function useUser({ redirectTo }: UseUserProps) {
  // console.log(`useUser triggered: ${redirectTo}`)
  const router = useRouter()
  // const userData = useMe()
  // console.log(`useUser triggered: ${userData}`)
  // if (!userData.isLoading && !userData.data) {
  //   router.push(redirectTo)
  // }
  // return userData
  const userData = localStorage.getItem('userData')
  if (!userData) {
    return router.push(redirectTo)
  }
  const parsedData: User = JSON.parse(userData)
  return parsedData
}

export function useMe() {
  return useQuery('me', () => {
    const userData = localStorage.getItem('userData')
    if (!userData) {
      return null
    }
    const parsedData: User = JSON.parse(userData)
    return getUserData(parsedData.token)
  })
}

export function useRedirectToDashboard() {
  const router = useRouter()
  const { isLoading, data } = useMe()
  if (!isLoading && data) {
    router.push(`/${data.type}/dashboard`)
  }
}
