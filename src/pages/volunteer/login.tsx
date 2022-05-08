import { Box, Text, Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLogin } from '../../data/hooks/mutations/useLogin'
import { useRedirectToDashboard } from '../../data/hooks/useUser'
import { CustomTextInput } from '../../components/CustomInput'

function Login() {
  const { isLoading, mutate } = useLogin({
    successRedirectionPath: '/volunteer/dashboard',
  })
  useRedirectToDashboard()
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Password must be at least 5 characters long')
        .required('Password is required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
    }),
    onSubmit: (value) => {
      mutate(value)
    },
  })
  return (
    <Box>
      <Box
        bg="gray.300"
        alignItems="center"
        borderRadius="10px"
        mt="40px"
        mb="20px"
        p={{ base: '10px', sm: '15px', md: '30px' }}
        flexDirection="column"
      >
        <Text alignSelf="self-start" my="10px" fontSize="2xl" fontWeight="bold">
          Volunteer Account Login
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <CustomTextInput
            isTouched={formik.touched.email}
            isInvalid={!!formik.errors.email}
            errorMessage={formik.errors.email}
            name="email"
            formik={formik}
            label="Email Address"
            helperText="We'll never share your email"
          />

          <CustomTextInput
            isTouched={formik.touched.password}
            isInvalid={!!formik.errors.password}
            errorMessage={formik.errors.password}
            type="password"
            name="password"
            formik={formik}
            label="Password"
          />

          <Button
            type="submit"
            isLoading={isLoading}
            alignSelf="self-start"
            my="2"
          >
            Login
          </Button>
        </form>

        <NextLink href="/volunteer/register" passHref>
          <Link fontWeight="semibold" my="4">
            Don't Have A Volunteer Account ? Register
          </Link>
        </NextLink>
      </Box>

      <NextLink href="/community/login" passHref>
        <Link fontWeight="semibold" my="4">
          Switch to Community Account Login
        </Link>
      </NextLink>
    </Box>
  )
}

export default Login
