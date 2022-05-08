import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, useDisclosure, Box, Container } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRef } from 'react'
import { useUserData } from '../data/hooks/useUserData'
import { DrawerMenu } from './DrawerMenu'

export const NavBar: React.FC = () => {
  const { onClose, isOpen, onOpen } = useDisclosure()
  const drawerRef = useRef()

  const userData = useUserData()

  return (
    <Box mt="-20px" pt="1" bg="blue.200" borderRadius="5px" px="4">
      <Container>
        <Flex alignItems="center" justifyContent="space-between" my="5">
          <Box cursor="pointer">
            <NextLink href="/" passHref>
              <img src="/images/logo.png" alt="Orgo_Earth" />
            </NextLink>
          </Box>
          {userData && (
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
                isAdmin={userData?.type === 'community'}
                isOpen={isOpen}
                onClose={onClose}
              />
            </>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
