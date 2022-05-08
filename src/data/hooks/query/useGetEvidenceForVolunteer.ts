import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Evidence } from './useGetCommunityEvidences'

function getEvidenceForVolunteer(userId: string): Promise<Evidence[]> {
  const token = JSON.parse(localStorage.getItem('userData'))

  return axios
    .get(`${apiBaseUrl}/api/evidences/submit/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
}

export function useGetEvidenceForVolunteer(userId: string) {
  return useQuery(['evidences', userId], () => {
    return getEvidenceForVolunteer(userId)
  })
}
