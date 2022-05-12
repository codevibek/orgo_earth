import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { User } from '../mutations/useRegister'

function searchUsers(): Promise<User[]> {
  return axios.get(`${apiBaseUrl}/api/users/all`).then((res) => res.data)
}

export function useGetAllUsers() {
  return useQuery(['users', 'all'], () => {
    return searchUsers()
  })
}
