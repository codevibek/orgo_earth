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
  evidenceId: string,
  status = 'To be approved'
): Promise<CommunityEvidence> {
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
    .then(
      (res) => res.data.filter((evidence) => evidence._id === evidenceId)[0]
    )
}

export function useGetEvidenceById(communityId: string, evidenceId: string) {
  return useQuery(['evidence', communityId, evidenceId], () => {
    return getCommunityEvidences(communityId, evidenceId)
  })
}
