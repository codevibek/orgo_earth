import { Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { BiHistory, BiTask } from 'react-icons/bi'
import { MdRateReview } from 'react-icons/md'
import { IconType } from 'react-icons/lib'
import { useUserData } from '../data/hooks/useUserData'
import { useRouter } from 'next/router'

const FooterMenu: React.FC = () => {
  const userData = useUserData()
  const router = useRouter()

  console.log(router.pathname)

  return (
    <Flex
      bg="blue.200"
      alignItems="center"
      justifyContent="space-around"
      p="4"
      borderRadius="5px"
      boxShadow="lg"
      position="fixed"
      bottom="4"
      width={{ base: '400px', lg: '570px' }}
    >
      <FooterMenuItem
        text="Profile"
        icon={CgProfile}
        isActive={router.pathname.includes('profile')}
        onClick={() =>
          router.push(`/${userData.type}/profile/${userData.username}`)
        }
      />
      <FooterMenuItem
        text="Tasks"
        icon={BiTask}
        isActive={router.pathname.includes('dashboard')}
        onClick={() => router.push(`/${userData.type}/dashboard`)}
      />
      {userData.type === 'community' ? (
        <FooterMenuItem
          icon={MdRateReview}
          text="Review"
          isActive={router.pathname.includes('summary')}
          onClick={() => router.push(`/${userData.type}/evidence/summary`)}
        />
      ) : (
        <FooterMenuItem
          icon={BiHistory}
          text="History"
          isActive={router.pathname.includes('summary')}
          onClick={() => router.push(`/${userData.type}/evidence/summary`)}
        />
      )}
    </Flex>
  )
}

export interface FooterMenuItemProps {
  text: string
  icon: IconType
  onClick?: () => void
  isActive?: boolean
}

export const FooterMenuItem: React.FC<FooterMenuItemProps> = ({
  icon: Icon,
  text,
  onClick,
  isActive = false,
}) => {
  return (
    <Flex onClick={onClick} alignItems="center" flexDirection="column">
      <IconButton
        bg={isActive ? 'blue.500' : 'blue.200'}
        aria-label="Profile"
        icon={<Icon size={30} />}
      />
      <Text my="2">{text}</Text>
    </Flex>
  )
}

export default FooterMenu
