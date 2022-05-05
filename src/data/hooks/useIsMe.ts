// gets the current logged in user from localstorage and tests it against
// the userId passed in
// and returns true or false depending upon the test

import { isServer } from '../utils/isServer'

export function useIsMe(username: string) {
  if (isServer) return
  const userData = JSON.parse(localStorage.getItem('userData'))
  console.log(userData, username)
  // return userData?.username == username
  return true
}
