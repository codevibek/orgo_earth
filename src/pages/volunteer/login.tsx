import { Box, Text, Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLogin } from '../../data/hooks/mutations/useLogin'
import { useRedirectToDashboard } from '../../data/hooks/useUser'
import { CustomTextInput } from '../../components/CustomInput'
import { SwitchButton } from '../../components/SwitchButton'

function Login() {
  const { isLoading, mutate } = useLogin({
    isCommunity: false,
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
        <Text
          alignSelf="self-start"
          my="10px"
          fontSize={{ base: 'lg', lg: '2xl' }}
          fontWeight="bold"
        >
          Login as Volunteer
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <CustomTextInput
            isTouched={formik.touched.email}
            isInvalid={!!formik.errors.email}
            errorMessage={formik.errors.email}
            name="email"
            formik={formik}
            type="email"
            label="Email Address"
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

        <NextLink href="/volunteer/register" passHref>
          <Link fontWeight="semibold" my="4">
            <Text
              my="2"
              mx="1"
              fontWeight="semibold"
              fontSize={{ base: 'sm', lg: '2xl' }}
            >
              Don't have an account yet ? Sign up
            </Text>
          </Link>
        </NextLink>
      </Box>

      <SwitchButton
        label="Switch to Community Account"
        path="/community/login"
      />
    </Box>
  )
}

export default Login
