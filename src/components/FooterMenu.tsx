import { Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { BiHistory, BiTask } from 'react-icons/bi'
import { MdRateReview } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

export interface FooterMenuProps {
  isCommunity?: boolean
}

const FooterMenu: React.FC<FooterMenuProps> = ({ isCommunity = true }) => {
  return (
    <Flex
      bg="blue.200"
      alignItems="center"
      justifyContent="space-around"
      p="4"
      borderRadius="5px"
      position="fixed"
      bottom="4"
      width={{ base: '400px', lg: '550px' }}
    >
      <FooterMenuItem text="Profile" icon={CgProfile} />
      <FooterMenuItem text="Tasks" icon={BiTask} />
      {isCommunity ? (
        <FooterMenuItem icon={MdRateReview} text="Review" />
      ) : (
        <FooterMenuItem icon={BiHistory} text="History" />
      )}
    </Flex>
  )
}

export interface FooterMenuItemProps {
  text: string
  icon: IconType
}

export const FooterMenuItem: React.FC<FooterMenuItemProps> = ({
  icon: Icon,
  text,
}) => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <IconButton aria-label="Profile" icon={<Icon size={30} />} />
      <Text my="2">{text}</Text>
    </Flex>
  )
}

export default FooterMenu
