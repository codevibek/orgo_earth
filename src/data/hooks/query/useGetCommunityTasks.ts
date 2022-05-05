import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'

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
  _id: string
  enrolledPeople: string[]
  rewards: string
  creatorCommunityName: string
}

function getCommunityTasks(communityId: string): Promise<Task[]> {
  const token = JSON.parse(localStorage.getItem('userData')).token

  return axios
    .get(`${apiBaseUrl}/api/tasks/community/${communityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.tasks)
}

export function useGetCommunityTasks(communityId: string) {
  return useQuery(['tasks', communityId], () => {
    return getCommunityTasks(communityId)
  })
}
