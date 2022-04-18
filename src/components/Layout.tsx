import { Container } from '@chakra-ui/react'
import React from 'react'
import { NavBar } from './NavBar'

export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  )
}
