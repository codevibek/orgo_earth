import { useMutation } from 'react-query'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/constants'
import { useToast } from '@chakra-ui/react'

export interface ApproveEvidenceInput {
  taskId: string
  userId: string
}

function approveEvidence({ taskId, userId }: ApproveEvidenceInput) {
  const token = JSON.parse(localStorage.getItem('userData')).token

  return axios
    .post(
      `${apiBaseUrl}/api/evidences/approve/${taskId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
}

export function useApproveEvidence() {
  const toast = useToast()

  return useMutation(approveEvidence, {
    onSuccess: () => {
      toast({
        title: 'Evidence successfully approved',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        title: 'Failed to approve evidence',
        description: error.response?.data?.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    },
  })
}
