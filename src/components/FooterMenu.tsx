import { useRouter } from 'next/router'
import { AiOutlineCompass } from 'react-icons/ai'
import { BiTask } from 'react-icons/bi'
import { MdRateReview } from 'react-icons/md'

import BottomNavigation from 'reactjs-bottom-navigation'
import 'reactjs-bottom-navigation/dist/index.css'
import { useUserData } from '../data/hooks/useUserData'

export function FooterMenu() {
  const userData = useUserData()
  const router = useRouter()
  const bottomNavItems = [
    {
      title: 'Explore',
      icon: <AiOutlineCompass style={{ fontSize: '18px' }} />,
      activeIcon: (
        <AiOutlineCompass style={{ fontSize: '18px', color: '#fff' }} />
      ),
      onClick: () =>
        router.push(`/${userData.type}/profile/${userData.username}`),
    },

    {
      title: 'Tasks',
      icon: <BiTask style={{ fontSize: '18px' }} />,
      activeIcon: <BiTask style={{ fontSize: '18px', color: '#fff' }} />,
      onClick: () => router.push(`/${userData.type}/dashboard`),
    },

    {
      title: 'Submissions',
      icon: <MdRateReview style={{ fontSize: '18px' }} />,
      activeIcon: <MdRateReview style={{ fontSize: '18px', color: '#fff' }} />,
      onClick: () => router.push(`/${userData.type}/evidence/summary`),
    },
  ]

  return <BottomNavigation items={bottomNavItems} />
}

export default FooterMenu
