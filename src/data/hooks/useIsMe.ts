// gets the current logged in user from localstorage and tests it against
// the userId passed in
// and returns true or false depending upon the test

import { isServer } from '../utils/isServer'

export function useIsMe(userId: string) {
  console.log(`useIsMe: ${userId}`)
  if (isServer) return
  const userData = JSON.parse(localStorage.getItem('userData'))
  console.log(userData)
  return userData?.id == userId
}
