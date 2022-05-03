import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Select,
} from '@chakra-ui/react'

export interface CustomInputProps {
  name: string
  label: string
  formik: any
  helperText?: string
  type?: string
  isTouched?: boolean
  isInvalid?: boolean
  errorMessage?: string
}

export const CustomTextInput: React.FC<CustomInputProps> = ({
  formik,
  label,
  name,
  helperText,
  type = 'text',
  isTouched,
  isInvalid,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={isInvalid && isTouched} my="3">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...formik.getFieldProps(name)}
        variant="filled"
        id={name}
        type={type}
        name={name}
      />
      {helperText && !errorMessage && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      {isTouched && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export const CustomTextAreaInput: React.FC<CustomInputProps> = ({
  formik,
  label,
  name,
  helperText,
  isTouched,
  isInvalid,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={isInvalid && isTouched} my="3">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        {...formik.getFieldProps(name)}
        variant="filled"
        id={name}
        name={name}
      />
      {helperText && !errorMessage && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      {isTouched && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export const CustomSelectInput: React.FC<CustomInputProps> = ({
  formik,
  label,
  name,
  helperText,
  isTouched,
  isInvalid,
  errorMessage,
  children,
}) => {
  return (
    <FormControl isInvalid={isInvalid && isTouched} my="6">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        {...formik.getFieldProps(name)}
        variant="filled"
        id={name}
        name={name}
        placeholder="Select an option"
      >
        {children}
      </Select>
      {helperText && !errorMessage && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      {isTouched && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
