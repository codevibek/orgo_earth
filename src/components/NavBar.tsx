import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, useDisclosure, Box } from '@chakra-ui/react'
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
      <Flex alignItems="center" justifyContent="space-between" my="5">
        <Box cursor="pointer">
          <NextLink href="/" passHref>
            <img src="/images/logo.png" alt="Orgo_Earth" />
          </NextLink>
        </Box>
        {showUserAvatar && (
          <>
            <HamburgerIcon
              h="8"
              w="8"
              ref={drawerRef}
              onClick={onOpen}
              cursor="pointer"
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
