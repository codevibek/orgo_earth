import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Evidence } from './useGetEvidenceByCommunityId'

function getCommunityEvidences(evidenceId: string): Promise<Evidence> {
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
