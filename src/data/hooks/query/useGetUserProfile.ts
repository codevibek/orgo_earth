import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { User } from '../mutations/useRegister'

function getUserProfile(username: string): Promise<User> {
  return axios
    .get(`${apiBaseUrl}/api/users/profile/${username}`)
    .then((res) => res.data)
}

export function useGetUserProfile(username: string) {
  return useQuery(['profiles', username], () => {
    return getUserProfile(username)
  })
}
