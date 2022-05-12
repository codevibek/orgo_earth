import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'

export interface SwitchButtonProps {
  path: string
  label: string
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ label, path }) => {
  const router = useRouter()
  return (
    <Button
      colorScheme="blue"
      leftIcon={<HiOutlineSwitchHorizontal size={25} />}
      onClick={() => router.push(path)}
    >
      {label}
    </Button>
  )
}
