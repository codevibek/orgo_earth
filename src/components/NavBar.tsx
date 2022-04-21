import { Avatar, Flex, useDisclosure, Box } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { DrawerMenu } from './DrawerMenu'

export const NavBar: React.FC = () => {
  const { onClose, isOpen, onOpen } = useDisclosure()
  const drawerRef = useRef()
  const { pathname } = useRouter()
  // TODO: use backend data to determine these values
  // instead of using pathname
  const showUserAvatar = useMemo(() => {
    return pathname.includes('community') || pathname.includes('volunteer')
  }, [pathname])
  const isAdmin = useMemo(() => {
    return pathname.includes('community')
  }, [pathname])
  return (
    <Box>
      <Flex justifyContent="space-between" my="5">
        <Box cursor="pointer">
          <NextLink href="/" passHref>
            <Image
              src="/images/logo.png"
              alt="Orgo_Earth"
              height="50px"
              width="120px"
            />
          </NextLink>
        </Box>
        {showUserAvatar && (
          <>
            <Avatar
              name="Dan Abrahmov"
              ref={drawerRef}
              cursor="pointer"
              src="https://bit.ly/dan-abramov"
              onClick={onOpen}
            />
            <DrawerMenu
              finalFocusRef={drawerRef}
              isAdmin={isAdmin}
              isOpen={isOpen}
              onClose={onClose}
            />
          </>
        )}
      </Flex>
    </Box>
  )
}
