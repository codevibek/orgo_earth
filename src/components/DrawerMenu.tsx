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
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { AiOutlineLogout } from 'react-icons/ai'
import React from 'react'
import { AdminMenus, VolunteerMenus } from '../data/utils/DrawerMenuConstants'
import NextLink from 'next/link'
import { IconType } from 'react-icons/lib'
import { useRouter } from 'next/router'
import { useMe } from '../data/hooks/useUser'

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
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('userData')
    router.push('/')
  }
  const { isLoading, data } = useMe()

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <Skeleton isLoaded={!isLoading}>
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
            {!isLoading && isAdmin
              ? AdminMenus.map((menu) => {
                  return (
                    <DrawerMenuLinkItem
                      onClose={onClose}
                      key={menu.path}
                      name={menu.name}
                      path={
                        menu.path === '/profile'
                          ? `/community/profile/${data?.username}`
                          : menu.path
                      }
                      icon={menu.icon}
                    />
                  )
                })
              : !isLoading &&
                VolunteerMenus.map((menu) => {
                  return (
                    <DrawerMenuLinkItem
                      onClose={onClose}
                      key={menu.path}
                      name={menu.name}
                      path={
                        menu.path === '/profile'
                          ? `/volunteer/profile/${data?.username}`
                          : menu.path
                      }
                      icon={menu.icon}
                    />
                  )
                })}
            <DrawerMenuLinkItem
              onClose={() => {
                handleLogout()
                onClose()
              }}
              icon={AiOutlineLogout}
              name="Logout"
            />
          </DrawerBody>
        </DrawerContent>
      </Skeleton>
    </Drawer>
  )
}

export interface DrawerMenuLinkItemProps {
  icon: IconType
  name: string
  path?: string
  onClose: () => void
}

export const DrawerMenuLinkItem: React.FC<DrawerMenuLinkItemProps> = ({
  icon: Icon,
  name,
  path,
  onClose,
}) => {
  return (
    <Box onClick={onClose}>
      <NextLink href={path ? path : '/'} passHref>
        <Flex cursor="pointer" my="6" alignItems="center">
          <Icon size={30} />
          <Text mx="6" fontSize="xl" fontWeight="bold">
            {name}
          </Text>
        </Flex>
      </NextLink>
    </Box>
  )
}
