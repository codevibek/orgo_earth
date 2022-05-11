import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { User } from '../mutations/useRegister'

export interface Task {
  name: string
  description: string
  address: string
  hours: string
  evidence: string
  status: 'active' | 'inactive'
  priority: 'high' | 'medium' | 'low'
  createdAt: string
  updatedAt: string
  creatorId: string
  creator: User
  _id: string
  enrolledPeople: string[]
  rewards: string
  creatorCommunityName: string
}

function getCommunityTasks(communityId: string): Promise<Task[]> {
  return axios
    .get(`${apiBaseUrl}/api/tasks/community/${communityId}`)
    .then((res) => res.data.tasks)
}

export function useGetCommunityTasks(communityId: string) {
  return useQuery(
    ['tasks', communityId],
    () => {
      return getCommunityTasks(communityId)
    },
    {
      enabled: communityId.length > 0,
    }
  )
}
