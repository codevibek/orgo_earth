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

function getCommunityEvidences(evidenceId: string): Promise<CommunityEvidence> {
  const token = JSON.parse(localStorage.getItem('userData'))

  return axios
    .get(`${apiBaseUrl}/api/evidences/evidence/${evidenceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
}

export function useGetEvidenceById(evidenceId: string) {
  return useQuery(['evidence', evidenceId], () => {
    return getCommunityEvidences(evidenceId)
  })
}
