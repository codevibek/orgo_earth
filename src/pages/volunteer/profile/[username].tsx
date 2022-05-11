import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  IconButton,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React from 'react'
import {
  AiFillCamera,
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from 'react-icons/ai'
import { EditProfileDrawer } from '../../../components/EditProfileDrawer'
import { useGetUserProfile } from '../../../data/hooks/query/useGetUserProfile'
import { useIsMe } from '../../../data/hooks/useIsMe'
import { EditProfilePictureModal } from '../../../components/EditProfilePictureModal'

function Profile() {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const {
    onOpen: onOpenProfileModal,
    isOpen: isOpenProfileModal,
    onClose: onCloseProfileModal,
  } = useDisclosure()

  const router = useRouter()
  const username = router.query.username as string
  const { isLoading, data } = useGetUserProfile(username)

  const isMe = useIsMe(username)

  if (isLoading) {
    return <Skeleton height="100px" isLoaded={!isLoading} />
  }
  return (
    <Box>
      <VStack spacing="4">
        <EditProfileDrawer
          initialData={data}
          isOpen={isOpen}
          onClose={onClose}
        />

        <Avatar name={data.name} size="2xl" cursor="pointer" src={data.avatar}>
          {isMe && (
            <AvatarBadge boxSize="1.3em" border="none">
              <IconButton
                rounded="xl"
                bg="gray.600"
                aria-label="button"
                onClick={onOpenProfileModal}
                _hover={{ bg: 'black' }}
                icon={<AiFillCamera color="white" size={25} />}
              />
            </AvatarBadge>
          )}
        </Avatar>

        {isMe && (
          <EditProfilePictureModal
            userData={data}
            isOpen={isOpenProfileModal}
            onClose={onCloseProfileModal}
          />
        )}

        <Text fontWeight="bold" fontSize="xl">
          {data.name}
        </Text>
        <HStack>
          {data.facebookLink && (
            <NextLink href={data.facebookLink} passHref>
              <a target="_blank">
                <AiFillFacebook size={20} />
              </a>
            </NextLink>
          )}

          {data.instagramLink && (
            <NextLink href={data.instagramLink} passHref>
              <a target="_blank">
                <AiFillInstagram size={20} />
              </a>
            </NextLink>
          )}

          {data.twitterLink && (
            <NextLink href={data.twitterLink} passHref>
              <a target="_blank">
                <AiFillTwitterCircle size={20} />
              </a>
            </NextLink>
          )}
        </HStack>
        {isMe && <Button onClick={onOpen}>Edit Profile</Button>}

        <Box width="100%" bg="gray.300" p="8" borderRadius="10px">
          <Text fontWeight="bold" fontSize="lg" mt="2">
            Bio
          </Text>
          <Text>{data.bio ? data.bio : 'No Bio Provided'}</Text>

          <Text fontWeight="bold" fontSize="lg" mt="2">
            Address
          </Text>
          <Text>{data.address ? data.address : 'No address provided'}</Text>

          <Text fontWeight="bold" fontSize="lg" mt="2">
            Email Address
          </Text>
          <Text>{data.email}</Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default Profile
