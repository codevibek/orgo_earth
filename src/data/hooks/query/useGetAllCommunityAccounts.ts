import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Task } from './useGetCommunityTasks'

const VerifiedCommunityAccountsEmail = [
  'info@orgo.earth',
  'info@deceuvel.nl',
  'littlegrowersinc@gmail.com',
  'deceuvel@ceven.tech',
]

function getAllCommunityAccounts(): Promise<Task[]> {
  return axios
    .get(`${apiBaseUrl}/api/users/communityusers`)
    .then((res) =>
      res.data.users.filter((user) =>
        VerifiedCommunityAccountsEmail.includes(user.email)
      )
    )
}

export function useGetAllCommunityAccounts() {
  return useQuery(['communityaccounts', 'all'], () => {
    return getAllCommunityAccounts()
  })
}
