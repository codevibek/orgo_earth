import { useUserData } from './useUserData'

export function useIsMe(username: string) {
  const userData = useUserData()
  return userData.username === username
}
