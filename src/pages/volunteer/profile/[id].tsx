import {
  Avatar,
  Box,
  Button,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { EditProfileDrawer } from '../../../components/EditProfileDrawer'

function Profile() {
  const { onOpen, isOpen, onClose } = useDisclosure()
  return (
    <VStack spacing="4">
      <EditProfileDrawer isOpen={isOpen} onClose={onClose} />
      <Avatar
        name="Dan Abrahmov"
        size="2xl"
        cursor="pointer"
        src="https://bit.ly/dan-abramov"
      />
      <Text fontWeight="bold" fontSize="xl">
        Apple Foundation
      </Text>
      <Button onClick={onOpen}>Edit Profile</Button>

      <Box bg="gray.300" p="8" borderRadius="10px">
        <Text>
          We're here to make the world a better place by innovating the best
          products
        </Text>

        <Text fontWeight="bold" fontSize="lg" mt="2">
          Location
        </Text>
        <Text>Location not provided yet.</Text>

        <Text fontWeight="bold" fontSize="lg" mt="2">
          Email Address
        </Text>
        <Text>foundation@apple.com</Text>
      </Box>
    </VStack>
  )
}

export default Profile
