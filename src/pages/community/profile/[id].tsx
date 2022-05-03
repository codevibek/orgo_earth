import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from 'react-icons/ai'
import { EditProfileDrawer } from '../../../components/EditProfileDrawer'
import { useGetUserProfile } from '../../../data/hooks/query/useGetUserProfile'
import { useIsMe } from '../../../data/hooks/useIsMe'

function Profile() {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const router = useRouter()
  const profileUserId = router.query.id as string
  const { isLoading, data } = useGetUserProfile(profileUserId)
  console.log(isLoading, data)

  const isMe = useIsMe(profileUserId)

  console.log(isMe)

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
      <HStack>
        <AiFillFacebook size={20} />
        <AiFillInstagram size={20} />
        <AiFillTwitterCircle size={20} />
      </HStack>
      {isMe && <Button onClick={onOpen}>Edit Profile</Button>}

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
