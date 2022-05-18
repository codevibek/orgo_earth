import {
  Box,
  Button,
  Flex,
  Text,
  Skeleton,
  Input,
  Avatar,
  HStack,
  FormLabel,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useGetTaskDetails } from '../../../../data/hooks/query/useGetTaskDetails'
import { CustomTextAreaInput } from '../../../../components/CustomInput'
import { useSubmitEvidence } from '../../../../data/hooks/mutations/useSubmitEvidence'
import { useUserData } from '../../../../data/hooks/useUserData'
import { useGetUserByPartialUsername } from '../../../../data/hooks/query/useGetUserByPartialUsername'
import { useDebounce } from '../../../../data/hooks/useDebounce'
import { User } from '../../../../data/hooks/mutations/useRegister'
import { CloseIcon } from '@chakra-ui/icons'
import { Camera } from '../../../../components/Camera'
import axios from 'axios'
import {
  cloudinaryCloudName,
  cloudinaryUploadPreset,
} from '../../../../data/utils/constants'
import GoBack from '../../../../components/GoBack'
import { TaskCard } from '../../../../components/TaskCard'
import Head from 'next/head'

export interface UsersLocation {
  latitude: string
  longitude: string
}
function EvidenceSubmitPage() {
  const router = useRouter()
  const taskId = router.query.id as string
  const { data: TaskDetails, isLoading } = useGetTaskDetails(taskId)
  const { mutate: submitEvidence, isLoading: submitEvidenceLoading } =
    useSubmitEvidence()

  const userData = useUserData()

  const [searchUsername, setSearchUsername] = useState('')
  const [taggedVolunteers, setTaggedVolunteers] = useState<User[]>([])

  const debouncedUsername = useDebounce(searchUsername, 500)

  const { isLoading: userSearchLoading, data: foundUsers } =
    useGetUserByPartialUsername(debouncedUsername)
  const [urls, setUrls] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [usersLocation, setUsersLocation] = useState<UsersLocation>(null)
  const [usersLocationError, setUsersLocationError] = useState('')

  const uploadFileHandler = async (url) => {
    const formData = new FormData()
    formData.append('file', url)
    formData.append('upload_preset', cloudinaryUploadPreset)

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      )
      .then((res) => {
        setImages([...images, res.data.secure_url])
      })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUsersLocation({
            latitude: String(position.coords.latitude),
            longitude: String(position.coords.longitude),
          })
        },
        (error) => {
          setUsersLocationError(error.message)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (usersLocation && usersLocation.latitude && usersLocation.longitude) {
      setUsersLocationError('')
    }
  }, [usersLocation, usersLocationError])

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      evidenceDetails: '',
    },
    validationSchema: Yup.object({
      evidenceDetails: Yup.string()
        .min(5, 'Description must be atleast 5 character long')
        .required('Description is required'),
    }),
    onSubmit: async (values) => {
      for (const url of urls) {
        await uploadFileHandler(url)
      }

      if (usersLocation.latitude && usersLocation.longitude) {
        submitEvidence({
          evidenceDetails: values.evidenceDetails,
          evidenceImages: images,
          taskId,
          latitude: usersLocation?.latitude,
          longitude: usersLocation?.longitude,
          userId: userData._id,
          tags: [...taggedVolunteers.map((volunteer) => volunteer._id)],
        })
      } else {
        toast({
          title: 'Please allow location permission to submit evidence',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    },
  })

  return (
    <Box height="90vh" overflow="auto" pb="44">
      <Head>
        <title>Submit Evidence</title>
      </Head>
      <GoBack />
      {usersLocationError && (
        <Alert my="6" status="error">
          <AlertIcon />
          <AlertTitle>{usersLocationError}</AlertTitle>
          <AlertDescription>Please allow location permission</AlertDescription>
        </Alert>
      )}
      <TaskCard
        creatorUsername={TaskDetails?.creator.username}
        creatorCommunityName={TaskDetails?.creatorCommunityName}
        id={TaskDetails?._id}
        location={TaskDetails?.address}
        priority={TaskDetails?.priority}
        rewards={TaskDetails?.rewards}
        title={TaskDetails?.name}
        status={TaskDetails?.status}
        showStatus={false}
        showDetails={false}
      />
      <Text mt="6" fontSize="xl" fontWeight="bold">
        Submission Requirements
      </Text>

      <Text>{TaskDetails?.evidence}</Text>

      <Skeleton isLoaded={!isLoading}>
        <Text mt="6">Picture Evidence</Text>
        <Camera
          images={images}
          setImages={setImages}
          urls={urls}
          setUrls={setUrls}
        />
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <CustomTextAreaInput
              isTouched={formik.touched.evidenceDetails}
              isInvalid={!!formik.errors.evidenceDetails}
              errorMessage={formik.errors.evidenceDetails}
              name="evidenceDetails"
              formik={formik}
              placeholder="Evidence description"
              label="Task Evidence"
            />

            <Box my="4">
              <FormLabel htmlFor="tags">Who else worked on this?</FormLabel>
              <Input
                id="tags"
                name="tags"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                variant="filled"
                placeholder="tag who helped and split the rewards"
              />
              {userSearchLoading && <Skeleton my="2" p="4" height="20px" />}
              {!userSearchLoading && debouncedUsername && (
                <Box>
                  {foundUsers && foundUsers.length === 0 && (
                    <Text color="gray.500">
                      Sorry we can’t find any user with ‘{debouncedUsername}’ as
                      username
                    </Text>
                  )}
                  {foundUsers &&
                    foundUsers.length > 0 &&
                    foundUsers.map((user) => (
                      <UserCard
                        onAdd={() => {
                          setTaggedVolunteers((prev) => [...prev, user])
                        }}
                        username={user.username}
                        avatar={user.avatar}
                        key={user._id}
                      />
                    ))}
                </Box>
              )}
              <Box my="6">
                <Text>Tagged Volunteers</Text>
                {taggedVolunteers.length === 0 && (
                  <Text mx="4" color="gray.400">
                    No volunteers tagged
                  </Text>
                )}
                <HStack spacing={2} my="4">
                  {taggedVolunteers.map((user) => {
                    return (
                      <Box key={user._id}>
                        <Avatar
                          size="lg"
                          name={user.username}
                          src={user.avatar}
                          position="relative"
                        />
                        <CloseIcon
                          mx="2"
                          cursor="pointer"
                          onClick={() => {
                            setTaggedVolunteers((prev) =>
                              prev.filter((u) => u._id !== user._id)
                            )
                          }}
                        />
                      </Box>
                    )
                  })}
                </HStack>
              </Box>
            </Box>
          </Box>

          <Box my="4">
            <Button
              colorScheme="blue"
              isLoading={submitEvidenceLoading}
              type="submit"
            >
              Submit for review
            </Button>
          </Box>
        </form>
      </Skeleton>
    </Box>
  )
}

export interface UserCardProps {
  username: string
  onAdd: () => void
  avatar: string
}

export const UserCard: React.FC<UserCardProps> = ({
  username,
  onAdd,
  avatar,
}) => {
  return (
    <Flex
      alignItems="center"
      bg="gray.300"
      borderRadius="5px"
      p="4"
      my="2"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <Avatar name={username} src={avatar} />
        <Text ml="4">{username}</Text>
      </Flex>
      <Button onClick={onAdd}>add</Button>
    </Flex>
  )
}

export default EvidenceSubmitPage
