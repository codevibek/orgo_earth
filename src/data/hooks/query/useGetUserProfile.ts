import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { User } from '../mutations/useRegister'

function getUserProfile(userId: string): Promise<User> {
  return axios
    .get(`${apiBaseUrl}/api/users/profile/${userId}`)
    .then((res) => res.data)
}

export function useGetUserProfile(profileId: string) {
  return useQuery(['profiles', profileId], () => {
    return getUserProfile(profileId)
  })
}
