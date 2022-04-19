import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react'
import { AiOutlineLogout } from 'react-icons/ai'
import React from 'react'
import { AdminMenus, VolunteerMenus } from '../data/utils/DrawerMenuConstants'
import NextLink from 'next/link'
import { IconType } from 'react-icons/lib'

export interface DrawerMenuProps {
  isAdmin: boolean
  isOpen: boolean
  onClose: () => void
  finalFocusRef: React.RefObject<HTMLElement>
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isAdmin,
  finalFocusRef,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Flex mt="16" mb="5">
            <Avatar
              name="Dan Abrahmov"
              size="lg"
              cursor="pointer"
              src="https://bit.ly/dan-abramov"
            />
            <Box mx="4">
              <Text>Dan Abrahmov</Text>
              <Text fontSize="xs">I'm the don</Text>
            </Box>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          {isAdmin
            ? AdminMenus.map((menu) => {
                return <DrawerMenuLinkItem key={menu.path} {...menu} />
              })
            : VolunteerMenus.map((menu) => {
                return <DrawerMenuLinkItem key={menu.path} {...menu} />
              })}
          <DrawerMenuLinkItem
            icon={AiOutlineLogout}
            name="Logout"
            path="/logout"
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export interface DrawerMenuLinkItemProps {
  icon: IconType
  name: string
  path: string
}

export const DrawerMenuLinkItem: React.FC<DrawerMenuLinkItemProps> = ({
  icon: Icon,
  name,
  path,
}) => {
  return (
    <NextLink href={path} passHref>
      <Flex cursor="pointer" my="6" alignItems="center">
        <Icon size={30} />
        <Text mx="6" fontSize="xl" fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </NextLink>
  )
}
