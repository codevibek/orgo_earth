import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export interface CreateEvidenceInput {
  taskId: string
  userId: string
  evidenceDetails: string
  evidenceImages: string[]
  tags: string[]
}

function createEvidence(
  input: CreateEvidenceInput
): Promise<CreateEvidenceInput> {
  const token = JSON.parse(localStorage.getItem('userData')).token
  return axios
    .post(`${apiBaseUrl}/api/evidences/submit`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
}

export function useSubmitEvidence() {
  const router = useRouter()
  const toast = useToast()

  return useMutation(createEvidence, {
    // TODO: redirect to the evidence status page instead of the dashboard
    onSuccess: () => {
      router.push('/volunteer/dashboard')
      toast({
        title: 'Evidence Submitted Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        title: 'Failed to Submit Evidence',
        description: error.response?.data?.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    },
  })
}
