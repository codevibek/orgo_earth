import { Box, Text, Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLogin } from '../../data/hooks/mutations/useLogin'
import { CustomTextInput } from '../../components/CustomInput'
import { useRedirectToDashboard } from '../../data/hooks/useUser'

function Login() {
  const { isLoading, mutate } = useLogin({
    successRedirectionPath: '/community/dashboard',
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
        my="40px"
        p={{ sm: '15px', md: '30px' }}
        flexDirection="column"
      >
        <Text alignSelf="self-start" my="10px" fontSize="2xl" fontWeight="bold">
          Community Account Login
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

        <NextLink href="/community/register" passHref>
          <Link fontWeight="semibold" my="4">
            Don't Have A Community Account ? Register
          </Link>
        </NextLink>
      </Box>
    </Box>
  )
}

export default Login
