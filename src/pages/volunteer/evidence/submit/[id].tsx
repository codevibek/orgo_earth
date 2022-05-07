import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
  Skeleton,
  Input,
  Avatar,
  HStack,
  FormLabel,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
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

// TODO: Ask for location and camera permission before submitting
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

  // as soon as the image is captured it is uploaded to cloudinary and the url is stored in the state

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
      submitEvidence({
        evidenceDetails: values.evidenceDetails,
        evidenceImages: images,
        taskId,
        userId: userData._id,
        tags: [...taggedVolunteers.map((volunteer) => volunteer._id)],
      })
    },
  })

  return (
    <Box>
      <Text fontWeight="extrabold" mt="6" fontSize="xl">
        Submit your evidence for
      </Text>
      <Skeleton isLoaded={!isLoading}>
        <Text fontWeight="bold" fontSize="lg" color="gray.400">
          {TaskDetails?.name}
        </Text>
        <Flex alignItems="center" my="2">
          <Text mr="2" color="gray.500">
            Task Created By :
          </Text>
          <Badge> {TaskDetails?.creatorCommunityName}</Badge>
        </Flex>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <CustomTextAreaInput
              isTouched={formik.touched.evidenceDetails}
              isInvalid={!!formik.errors.evidenceDetails}
              errorMessage={formik.errors.evidenceDetails}
              name="evidenceDetails"
              formik={formik}
              label="Evidence Description"
            />

            <Box my="4">
              <FormLabel htmlFor="tags">Tag a volunteer</FormLabel>
              <Input
                id="tags"
                name="tags"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                variant="filled"
                placeholder="type username"
              />
              {userSearchLoading && <Skeleton my="2" p="4" height="20px" />}
              {!userSearchLoading && debouncedUsername && (
                <Box>
                  {foundUsers && foundUsers.length === 0 && (
                    <Text color="gray.500">
                      Sorry didn't found any user with {debouncedUsername} as
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
                          src="https://bit.ly/sage-adebayo"
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

            <Camera
              images={images}
              setImages={setImages}
              urls={urls}
              setUrls={setUrls}
            />
          </Box>

          <Box my="4">
            <Button isLoading={submitEvidenceLoading} type="submit">
              Submit Evidence
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
}

export const UserCard: React.FC<UserCardProps> = ({ username, onAdd }) => {
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
        <Avatar name={username} src="https://bit.ly/sage-adebayo" />
        <Text ml="4">{username}</Text>
      </Flex>
      <Button onClick={onAdd}>add</Button>
    </Flex>
  )
}

export default EvidenceSubmitPage
