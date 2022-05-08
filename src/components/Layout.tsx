import { Container } from '@chakra-ui/react'
import React from 'react'
import FooterMenu from './FooterMenu'
import { NavBar } from './NavBar'

export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <NavBar />
      {children}
      <FooterMenu />
    </Container>
  )
}
