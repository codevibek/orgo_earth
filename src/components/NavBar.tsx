import { Box } from '@chakra-ui/react'
import Image from 'next/image'

export const NavBar: React.FC = () => {
  return (
    <Box>
      <Image
        src="/images/logo.png"
        alt="Orgo_Earth"
        height="50px"
        width="120px"
      />
    </Box>
  )
}
