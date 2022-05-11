import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Task } from '../mutations/useEditTask'
import { User } from '../mutations/useRegister'

export interface Comment {
  _id: string
  sender: User
  message: string
  createdAt: string
  updatedAt: string
}

export interface Helper {
  _id: string
  id: User
}

export interface Evidence {
  _id: string
  status: string
  evidenceImages: string[]
  helpers: Helper[]
  taskId: Task
  userId: User
  evidenceDetails: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

function getCommunityEvidences(
  communityId: string,
  status = 'To be approved'
): Promise<Evidence[]> {
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
