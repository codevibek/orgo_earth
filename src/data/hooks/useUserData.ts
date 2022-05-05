import { useMemo } from 'react'
import { isServer } from '../utils/isServer'
import { User } from './mutations/useRegister'

export const useUserData = () => {
  const userData: User = useMemo(() => {
    if (isServer) return null
    return JSON.parse(localStorage.getItem('userData'))
  }, [])
  return userData
}
