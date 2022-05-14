import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useEditProfile } from '../data/hooks/mutations/useEditProfile'
import { User } from '../data/hooks/mutations/useRegister'
import { CustomTextAreaInput, CustomTextInput } from './CustomInput'

export interface EditProfileDrawer {
  isOpen: boolean
  onClose: () => void
  initialData: User
}

export const EditProfileDrawer: React.FC<EditProfileDrawer> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const { isLoading, mutate: editProfile, isSuccess } = useEditProfile()
  const formik = useFormik({
    initialValues: {
      name: initialData?.name,
      bio: initialData?.bio,
      address: initialData?.address,
      facebookLink: initialData?.facebookLink,
      instagramLink: initialData?.instagramLink,
      twitterLink: initialData?.twitterLink,
      city: initialData?.city,
      phone: initialData?.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 5 characters long')
        .required('Name is required'),
      bio: Yup.string().min(5, 'Bio must be at least 5 characters long'),
      address: Yup.string(),
      facebookLink: Yup.string().url('Facebook URL is not valid'),
      instagramLink: Yup.string().url('Instagram URL is not valid'),
      twitterLink: Yup.string().url('Twitter URL is not valid'),
      city: Yup.string(),
      phone: Yup.string().min(
        10,
        'Phone number must be at least 10 characters long'
      ),
    }),
    onSubmit: (value) => {
      editProfile(value)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])
  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <form onSubmit={formik.handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Your Profile</DrawerHeader>

          <DrawerBody>
            <CustomTextInput
              isTouched={formik.touched.name}
              isInvalid={!!formik.errors.name}
              errorMessage={formik.errors.name}
              name="name"
              formik={formik}
              label="Name"
            />

            <CustomTextAreaInput
              isTouched={formik.touched.bio}
              isInvalid={!!formik.errors.bio}
              errorMessage={formik.errors.bio}
              name="bio"
              formik={formik}
              label="Bio"
            />

            <CustomTextInput
              isTouched={formik.touched.address}
              isInvalid={!!formik.errors.address}
              errorMessage={formik.errors.address}
              name="address"
              formik={formik}
              label="Address"
            />

            <CustomTextInput
              isTouched={formik.touched.city}
              isInvalid={!!formik.errors.city}
              errorMessage={formik.errors.city}
              name="city"
              formik={formik}
              label="City"
              helperText="Optional field"
            />

            <CustomTextInput
              isTouched={formik.touched.phone}
              isInvalid={!!formik.errors.phone}
              errorMessage={formik.errors.phone}
              name="phone"
              formik={formik}
              label="Phone Number"
              helperText="Optional field"
            />

            <CustomTextInput
              isTouched={formik.touched.facebookLink}
              isInvalid={!!formik.errors.facebookLink}
              errorMessage={formik.errors.facebookLink}
              name="facebookLink"
              formik={formik}
              label="Facebook"
              helperText="Link to your profile"
            />

            <CustomTextInput
              isTouched={formik.touched.instagramLink}
              isInvalid={!!formik.errors.instagramLink}
              errorMessage={formik.errors.instagramLink}
              name="instagramLink"
              formik={formik}
              label="Instagram"
              helperText="Link to your profile"
            />

            <CustomTextInput
              isTouched={formik.touched.twitterLink}
              isInvalid={!!formik.errors.twitterLink}
              errorMessage={formik.errors.twitterLink}
              name="twitterLink"
              formik={formik}
              label="Twitter"
              helperText="Link to your profile"
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={isLoading} type="submit" colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  )
}
