import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { useUserData } from '../data/hooks/useUserData'
import FooterMenu from './FooterMenu'
import { NavBar } from './NavBar'

export const Layout: React.FC = ({ children }) => {
  const userData = useUserData()

  return (
    <Box>
      <NavBar />
      <Container height="90vh" overflow="auto" pb="48">
        {children}
      </Container>
      {userData && <FooterMenu />}
    </Box>
  )
}
