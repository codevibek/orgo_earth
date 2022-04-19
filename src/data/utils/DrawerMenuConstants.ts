import { CgProfile } from 'react-icons/cg'
import {
  AiOutlineClockCircle,
  AiOutlineDashboard,
  AiOutlinePlus,
} from 'react-icons/ai'
import { BiTask } from 'react-icons/bi'
import { MdRateReview } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

export interface Menu {
  name: string
  path: string
  icon: IconType
}

/////// Admin menus

// View Profile
// Create A Task
// View All Tasks
// Recent Activities
// Review Tasks Evidence

/////// Volunteer menus

// View Profile
// View All Active Tasks
// DashBoard (Show Tasks Claimed)
// Review Tasks Evidence status

export const AdminMenus: Menu[] = [
  {
    name: 'View Profile',
    icon: CgProfile,
    path: '/profile',
  },
  {
    name: 'Create A Task',
    icon: AiOutlinePlus,
    path: '/create-task',
  },
  {
    name: 'View All Tasks',
    icon: BiTask,
    path: '/tasks',
  },
  {
    name: 'Recent Activities',
    icon: AiOutlineClockCircle,
    path: '/recent-activities',
  },
  {
    name: 'Review Tasks Evidence',
    icon: MdRateReview,
    path: '/review-evidence',
  },
]

export const VolunteerMenus: Menu[] = [
  {
    name: 'View Profile',
    icon: CgProfile,
    path: '/profile',
  },
  {
    name: 'View All Active Tasks',
    icon: BiTask,
    path: '/tasks',
  },
  {
    name: 'DashBoard',
    icon: AiOutlineDashboard,
    path: '/dashboard',
  },
  {
    name: 'Review Tasks Evidence Status',
    icon: MdRateReview,
    path: '/review-evidence-status',
  },
]
