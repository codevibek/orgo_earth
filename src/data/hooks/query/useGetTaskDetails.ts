import axios from 'axios'
import { useQuery } from 'react-query'
import { apiBaseUrl } from '../../utils/constants'
import { Task } from './useGetCommunityTasks'

function getTaskDetails(taskId: string): Promise<Task> {
  return axios
    .get(`${apiBaseUrl}/api/tasks/task/${taskId}`, {})
    .then((res) => res.data)
}

export function useGetTaskDetails(taskId: string) {
  return useQuery(['task', taskId], () => {
    return getTaskDetails(taskId)
  })
}
