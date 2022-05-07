import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Task } from '../mutations/useEditTask'
import { User } from '../mutations/useRegister'

export interface CommunityEvidence {
  _id: string
  status: string
  evidenceImages: string[]
  helpers: string[]
  taskId: Task
  userId: User
  evidenceDetails: string
  createdAt: string
  updatedAt: string
  comments: string[]
}

function getCommunityEvidences(
  communityId: string,
  status = 'To be approved'
): Promise<CommunityEvidence[]> {
  const token = JSON.parse(localStorage.getItem('userData'))

  return axios
    .get(
      `${apiBaseUrl}/api/evidences/community/${communityId}?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
}

export function useGetToBeReviewedCommunityEvidences(communityId: string) {
  return useQuery(['evidences', communityId], () => {
    return getCommunityEvidences(communityId)
  })
}
