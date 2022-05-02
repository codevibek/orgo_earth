import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
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
