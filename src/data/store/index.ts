import create from 'zustand'
import { User } from '../hooks/mutations/useRegister'

interface UserState {
  userData: User | null
  setUserData: (userData: User) => void
}

export const useStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (userData) => set((state) => ({ ...state, userData })),
}))
