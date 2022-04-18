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

function login() {
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
          Community Account Login
        </Text>

        <FormControl my="3">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input variant="filled" id="email" type="email" />
          <FormHelperText>Well never share your email.</FormHelperText>
        </FormControl>
        <FormControl my="3">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input variant="filled" id="password" type="password" />
        </FormControl>
        <Button alignSelf="self-start" my="2">
          Login
        </Button>
        <NextLink href="/community/register" passHref>
          <Link fontWeight="semibold" my="4">
            Don't Have A Community Account ? Register
          </Link>
        </NextLink>
      </Flex>
    </Box>
  )
}

export default login
