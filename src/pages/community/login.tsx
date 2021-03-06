import { Box, Text, Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLogin } from '../../data/hooks/mutations/useLogin'
import { CustomTextInput } from '../../components/CustomInput'
import { useRedirectToDashboard } from '../../data/hooks/useUser'
import { SwitchButton } from '../../components/SwitchButton'
import Head from 'next/head'

function Login() {
  const { isLoading, mutate } = useLogin({
    isCommunity: true,
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
      <Head>
        <title>Community - Login</title>
      </Head>
      <Box
        bg="gray.300"
        alignItems="center"
        borderRadius="10px"
        mt="40px"
        mb="20px"
        p={{ base: '10px', sm: '15px', md: '30px' }}
        flexDirection="column"
      >
        <Text
          alignSelf="self-start"
          my="10px"
          fontSize={{ base: 'lg', lg: '2xl' }}
          fontWeight="bold"
        >
          Login as Community
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <CustomTextInput
            isTouched={formik.touched.email}
            isInvalid={!!formik.errors.email}
            errorMessage={formik.errors.email}
            name="email"
            formik={formik}
            label="Email Address"
            type="email"
            helperText="Email address is case sensitive"
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
          <Link>
            <Text
              my="2"
              mx="1"
              fontWeight="semibold"
              fontSize={{ base: 'sm', lg: 'lg' }}
            >
              Don't have an account yet? Sign up
            </Text>
          </Link>
        </NextLink>
      </Box>

      <SwitchButton
        label="Switch to Volunteer Account"
        path="/volunteer/login"
      />
    </Box>
  )
}

export default Login
