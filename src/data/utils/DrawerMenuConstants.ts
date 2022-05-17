import { CgProfile } from 'react-icons/cg'
import { AiOutlinePlus, AiOutlineCompass } from 'react-icons/ai'
import { MdRateReview } from 'react-icons/md'
import { IconType } from 'react-icons/lib'
import { GiTeacher } from 'react-icons/gi'
import { GrInfo } from 'react-icons/gr'
import { BiTask } from 'react-icons/bi'

export interface Menu {
  name: string
  path: string
  icon: IconType
}

export const AdminMenus: Menu[] = [
  {
    name: 'My Profile',
    icon: CgProfile,
    path: '/profile',
  },
  {
    name: 'Explore',
    icon: AiOutlineCompass,
    path: '/explore',
  },
  {
    name: 'Create New Task',
    icon: AiOutlinePlus,
    path: '/community/task/new',
  },
  {
    name: 'My Tasks',
    icon: BiTask,
    path: '/community/dashboard',
  },
  // {
  //   name: 'Recent Activities',
  //   icon: AiOutlineClockCircle,
  //   path: '/',
  // },
  {
    name: 'Review Submissions',
    icon: MdRateReview,
    path: '/community/evidence/summary',
  },
  {
    name: 'Tutorials',
    icon: GiTeacher,
    path: '/community/tutorials',
  },
  {
    name: 'About Us',
    icon: GrInfo,
    path: '/about',
  },
]

export const VolunteerMenus: Menu[] = [
  {
    name: 'My Profile',
    icon: CgProfile,
    path: '/profile',
  },
  {
    name: 'Explore',
    icon: AiOutlineCompass,
    path: '/explore',
  },

  {
    name: 'Available Tasks',
    icon: BiTask,
    path: '/volunteer/dashboard',
  },
  {
    name: 'My Submissions',
    icon: MdRateReview,
    path: '/volunteer/evidence/summary',
  },
  {
    name: 'Tutorials',
    icon: GiTeacher,
    path: '/volunteer/tutorials',
  },
  {
    name: 'About Us',
    icon: GrInfo,
    path: '/about',
  },
]
