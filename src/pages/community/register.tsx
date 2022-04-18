import {
  Box,
  Flex,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Link,
} from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

function register() {
  return (
    <Box>
      <Flex
        bg="gray.300"
        alignItems="center"
        borderRadius="10px"
        my="40px"
        p={{ sm: '15px', md: '30px' }}
        flexDirection="column"
      >
        <Text alignSelf="self-start" my="10px" fontSize="2xl" fontWeight="bold">
          Community Account Register
        </Text>
        <FormControl my="3">
          <FormLabel htmlFor="CommunityName">Community Name</FormLabel>
          <Input variant="filled" id="CommunityName" type="text" />
        </FormControl>
        <FormControl my="3">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input variant="filled" id="email" type="email" />
          <FormHelperText>Well never share your email.</FormHelperText>
        </FormControl>
        <FormControl my="3">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input variant="filled" id="password" type="password" />
        </FormControl>
        <FormControl my="3">
          <FormLabel htmlFor="repeatpassword">Repeat Password</FormLabel>
          <Input variant="filled" id="repeatpassword" type="password" />
        </FormControl>
        <Button alignSelf="self-start" my="2">
          Create Account
        </Button>
        <NextLink href="/community/login" passHref>
          <Link fontWeight="semibold" my="4">
            Already Have A Community Account ? Login
          </Link>
        </NextLink>
      </Flex>
    </Box>
  )
}

export default register
