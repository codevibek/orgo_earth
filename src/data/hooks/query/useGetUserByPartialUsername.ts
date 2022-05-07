import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { User } from '../mutations/useRegister'

function getUserByPartialUsername(partialUsername: string): Promise<User[]> {
  const token = JSON.parse(localStorage.getItem('userData')).token

  return axios
    .get(`${apiBaseUrl}/api/users/user/${partialUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.users)
}

export function useGetUserByPartialUsername(partialUsername: string) {
  return useQuery(
    ['users', partialUsername],
    () => {
      return getUserByPartialUsername(partialUsername)
    },
    { enabled: partialUsername.length > 0 }
  )
}
