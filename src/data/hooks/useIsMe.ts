// gets the current logged in user from localstorage and tests it against
// the userId passed in
// and returns true or false depending upon the test

export function useIsMe(userId: string) {
  console.log(`useIsMe: ${userId}`)
  const userData = JSON.parse(localStorage.getItem('userData'))
  console.log(userData)
  return userData?.id == userId
}

// 626e1145fe0e9d0004a9ca4a
// 626e1145fe0e9d0004a9ca4a
