import { Box, Text, Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CustomTextInput } from '../../components/CustomInput'
import { useRegister } from '../../data/hooks/mutations/useRegister'
import { useRedirectToDashboard } from '../../data/hooks/useUser'

function Register() {
  const { isLoading, mutate } = useRegister({
    successRedirectionPath: '/community/dashboard',
  })
  useRedirectToDashboard()
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      type: 'community',
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

      // if everything is ok, then submit the form
      mutate({
        phone: Math.random(),
        email,
        name,
        password,
        type,
        userName: username,
      })
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
        width="100%"
      >
        <Text alignSelf="self-start" my="10px" fontSize="2xl" fontWeight="bold">
          Community Account Register
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <CustomTextInput
            isTouched={formik.touched.name}
            isInvalid={!!formik.errors.name}
            errorMessage={formik.errors.name}
            name="name"
            formik={formik}
            label="Community Name"
          />
          <CustomTextInput
            isTouched={formik.touched.username}
            isInvalid={!!formik.errors.username}
            errorMessage={formik.errors.username}
            name="username"
            formik={formik}
            label="Community Username"
            helperText="This needs to unique"
          />
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

        <NextLink href="/community/login" passHref>
          <Link fontWeight="semibold" my="4">
            Already Have A Community Account ? Login
          </Link>
        </NextLink>
      </Box>
    </Box>
  )
}
export default Register