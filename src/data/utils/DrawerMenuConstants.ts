import { CgProfile } from 'react-icons/cg'
import { AiOutlineDashboard, AiOutlinePlus } from 'react-icons/ai'
import { MdRateReview } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

export interface Menu {
  name: string
  path: string
  icon: IconType
}

export const AdminMenus: Menu[] = [
  {
    name: 'View Profile',
    icon: CgProfile,
    path: '/profile',
  },
  {
    name: 'Create A Task',
    icon: AiOutlinePlus,
    path: '/community/task/new',
  },
  {
    name: 'Dashboard',
    icon: AiOutlineDashboard,
    path: '/community/dashboard',
  },
  // {
  //   name: 'Recent Activities',
  //   icon: AiOutlineClockCircle,
  //   path: '/',
  // },
  {
    name: 'Review Tasks Evidence',
    icon: MdRateReview,
    path: '/community/evidence/summary',
  },
]

export const VolunteerMenus: Menu[] = [
  {
    name: 'View Profile',
    icon: CgProfile,
    path: '/profile',
  },

  {
    name: 'DashBoard',
    icon: AiOutlineDashboard,
    path: '/volunteer/dashboard',
  },
  {
    name: 'Review Tasks Evidence Status',
    icon: MdRateReview,
    path: '/volunteer/evidence/summary',
  },
]
