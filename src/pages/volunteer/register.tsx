import { Box, Text, Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRegister } from '../../data/hooks/mutations/useRegister'
import { useRedirectToDashboard } from '../../data/hooks/useUser'
import { CustomTextInput } from '../../components/CustomInput'
import { SwitchButton } from '../../components/SwitchButton'
import Head from 'next/head'

function Register() {
  const { isLoading, mutate } = useRegister({
    isCommunity: false,
  })
  useRedirectToDashboard()
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      type: 'volunteer',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is required'),
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),
      password: Yup.string()
        .min(5, 'Password must be at least 5 characters long')
        .required('Password is required'),
      repeatPassword: Yup.string().required('Repeat password is required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
    }),
    onSubmit: (
      { email, name, password, repeatPassword, type, username },
      { setErrors }
    ) => {
      // first check if the passwords match
      if (password !== repeatPassword) {
        return setErrors({
          repeatPassword: 'Passwords do not match',
        })
      }

      mutate({
        email,
        name,
        password,
        type,
        username,
      })
    },
  })
  return (
    <Box>
      <Head>
        <title>Volunteer - Register</title>
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
          fontSize={{ base: 'lg', lg: '2xl' }}
          my="10px"
          fontWeight="bold"
        >
          Create a Volunteer Account
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextInput
            isTouched={formik.touched.name}
            isInvalid={!!formik.errors.name}
            errorMessage={formik.errors.name}
            name="name"
            formik={formik}
            label="Name"
          />
          <CustomTextInput
            isTouched={formik.touched.username}
            isInvalid={!!formik.errors.username}
            errorMessage={formik.errors.username}
            name="username"
            formik={formik}
            label="Username"
            helperText="This needs to unique"
          />
          <CustomTextInput
            isTouched={formik.touched.email}
            isInvalid={!!formik.errors.email}
            errorMessage={formik.errors.email}
            name="email"
            type="email"
            formik={formik}
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
          <CustomTextInput
            isTouched={formik.touched.repeatPassword}
            isInvalid={!!formik.errors.repeatPassword}
            errorMessage={formik.errors.repeatPassword}
            name="repeatPassword"
            formik={formik}
            label="Repeat Password"
            type="password"
          />
          <Button
            isLoading={isLoading}
            type="submit"
            alignSelf="self-start"
            my="2"
          >
            Create Account
          </Button>
        </form>
        <NextLink href="/volunteer/login" passHref>
          <Link fontWeight="semibold" my="4">
            <Text
              my="2"
              mx="1"
              fontWeight="semibold"
              fontSize={{ base: 'sm', lg: '2xl' }}
            >
              Already have an account? Log in
            </Text>
          </Link>
        </NextLink>
      </Box>

      <SwitchButton
        label="Switch to Community Account"
        path="/community/register"
      />
    </Box>
  )
}

export default Register
