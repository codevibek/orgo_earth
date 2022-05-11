import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Task } from './useGetCommunityTasks'

function getAllCommunityAccounts(): Promise<Task[]> {
  return axios
    .get(`${apiBaseUrl}/api/users/communityusers`)
    .then((res) => res.data.users)
}

export function useGetAllCommunityAccounts() {
  return useQuery(['communityaccounts', 'all'], () => {
    return getAllCommunityAccounts()
  })
}
