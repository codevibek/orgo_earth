import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { isServer } from '../utils/isServer'
import { User } from './mutations/useRegister'

export const useUserData = () => {
  const router = useRouter()
  const userData: User = useMemo(() => {
    if (isServer) return null
    console.log(router.pathname)
    return JSON.parse(localStorage.getItem('userData'))
  }, [router.pathname])
  return userData
}
