import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from '@chakra-ui/react'

export interface EditProfileDrawer {
  isOpen: boolean
  onClose: () => void
}

export const EditProfileDrawer: React.FC<EditProfileDrawer> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Your Profile</DrawerHeader>

        <DrawerBody>
          <FormControl my="3">
            <FormLabel htmlFor="CommunityName">Community Name</FormLabel>
            <Input variant="filled" id="CommunityName" type="text" />
          </FormControl>
          <FormControl my="3">
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <Textarea id="bio" variant="filled" />
          </FormControl>
          <FormControl my="3">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input variant="filled" id="email" type="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl my="3">
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input variant="filled" id="location" type="Location" />
          </FormControl>
          <FormControl my="3">
            <FormLabel htmlFor="facebook">Facebook</FormLabel>
            <Input variant="filled" id="facebook" type="text" />
            <FormHelperText>Your profile Link</FormHelperText>
          </FormControl>
          <FormControl my="3">
            <FormLabel htmlFor="instagram">Instagram</FormLabel>
            <Input variant="filled" id="instagram" type="text" />
            <FormHelperText>Your profile Link</FormHelperText>
          </FormControl>
          <FormControl my="3">
            <FormLabel htmlFor="twitter">Twitter</FormLabel>
            <Input variant="filled" id="twitter" type="twitter" />
            <FormHelperText>Your profile Link</FormHelperText>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
