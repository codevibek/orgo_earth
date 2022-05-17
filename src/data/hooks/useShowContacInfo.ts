// we need to hide the contact information for both
// the user and the community account if the current logged
// in user is either a guest or a volunteer only show the
// contact information for the community account
// also if current profile is logged in users then
// show it regardless of the user type

import { useRouter } from 'next/router'
import { useIsMe } from './useIsMe'
// import { useUserData } from './useUserData'

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
