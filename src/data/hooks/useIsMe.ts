// gets the current logged in user from localstorage and tests it against
// the userId passed in
// and returns true or false depending upon the test

import { isServer } from '../utils/isServer'

export function useIsMe(userId: string) {
  if (isServer) return
  const userData = JSON.parse(localStorage.getItem('userData'))
  return userData?._id == userId
}
