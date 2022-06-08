
import { useRouter } from 'next/router'
import { useIsMe } from './useIsMe'

export function useShowContactInfo() {
  const router = useRouter()
  const username = router.query.username as string
  // const userData = useUserData()
  const isMe = useIsMe(username)
  if (isMe) return true
  // if (!userData) return false
  // if (userData.type === 'community') return true
  return false
}
