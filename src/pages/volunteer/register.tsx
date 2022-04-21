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

function Register() {
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
          Volunteer Account Register
        </Text>
        <FormControl my="3">
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <Input variant="filled" id="fullName" type="text" />
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
        <NextLink href="/volunteer/login" passHref>
          <Link fontWeight="semibold" my="4">
            Already Have A Volunteer Account ? Login
          </Link>
        </NextLink>
      </Flex>
    </Box>
  )
}

export default Register
