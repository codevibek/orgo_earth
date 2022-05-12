import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { User } from '../mutations/useRegister'

function searchUsers(partialUsername: string): Promise<User[]> {
  const userData = JSON.parse(localStorage.getItem('userData'))

  return axios
    .get(`${apiBaseUrl}/api/users/user/${partialUsername}`)
    .then((res) =>
      res.data.users.filter(
        (user) => user.type !== 'community' && user._id !== userData._id
      )
    )
}

export function useSearchUsers(
  type: 'community' | 'volunteer',
  partialUsername: string
) {
  return useQuery(['search', 'user', 'type', partialUsername], () => {
    return searchUsers(partialUsername)
  })
}
