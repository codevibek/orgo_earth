import { Box, Button } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEditTask } from '../data/hooks/mutations/useEditTask'
import { useGetTaskDetails } from '../data/hooks/query/useGetTaskDetails'
import {
  CustomSelectInput,
  CustomTextAreaInput,
  CustomTextInput,
} from './CustomInput'

export const EditTaskForm = ({ taskId }: { taskId: string }) => {
  const { isLoading: taskEditLoading, mutate: editTask } = useEditTask()
  const { data: initialTaskData } = useGetTaskDetails(taskId)
  const formik = useFormik({
    initialValues: {
      name: initialTaskData?.name,
      description: initialTaskData?.description,
      status: initialTaskData?.status,
      priority: initialTaskData?.priority,
      address: initialTaskData?.address,
      hours: initialTaskData?.hours,
      evidence: initialTaskData?.evidence,
      rewards: initialTaskData?.rewards,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Name must be at least 5 characters long')
        .required('Name is required'),
      address: Yup.string().required('Location is required'),
      description: Yup.string()
        .min(5, 'Description must be at least 5 characters long')
        .required('Description is required'),
      hours: Yup.string().required('Hours is required'),
      evidence: Yup.string().required('Evidence is required'),
      status: Yup.string().required('Status is required'),
      priority: Yup.string().required('Priority is required'),
      rewards: Yup.string().required('Rewards is required'),
    }),
    onSubmit: (values) => {
      editTask({ ...values, taskId })
    },
  })
  return (
    <Box my="5" bg="gray.200" borderRadius="5px" p="4">
      <form onSubmit={formik.handleSubmit}>
        <CustomTextInput
          isTouched={formik.touched.name}
          isInvalid={!!formik.errors.name}
          errorMessage={formik.errors.name}
          name="name"
          formik={formik}
          label="Task Name"
        />

        <CustomTextInput
          isTouched={formik.touched.address}
          isInvalid={!!formik.errors.address}
          errorMessage={formik.errors.address}
          name="address"
          formik={formik}
          label="Location"
        />

        <CustomTextAreaInput
          isTouched={formik.touched.description}
          isInvalid={!!formik.errors.description}
          errorMessage={formik.errors.description}
          name="description"
          formik={formik}
          label="Description"
        />

        <CustomTextInput
          isTouched={formik.touched.hours}
          isInvalid={!!formik.errors.hours}
          errorMessage={formik.errors.hours}
          name="hours"
          formik={formik}
          label="Hours Required"
        />

        <CustomTextAreaInput
          isTouched={formik.touched.evidence}
          isInvalid={!!formik.errors.evidence}
          errorMessage={formik.errors.evidence}
          name="evidence"
          formik={formik}
          label="Evidence Needed"
        />

        <CustomTextAreaInput
          isTouched={formik.touched.rewards}
          isInvalid={!!formik.errors.rewards}
          errorMessage={formik.errors.rewards}
          name="rewards"
          formik={formik}
          label="Rewards"
        />

        <CustomSelectInput
          isTouched={formik.touched.priority}
          isInvalid={!!formik.errors.priority}
          errorMessage={formik.errors.priority}
          name="priority"
          formik={formik}
          label="Priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </CustomSelectInput>

        <CustomSelectInput
          isTouched={formik.touched.status}
          isInvalid={!!formik.errors.status}
          errorMessage={formik.errors.status}
          name="status"
          formik={formik}
          label="Status"
        >
          <option value="active">Active</option>
          <option value="inactive">In Active</option>
        </CustomSelectInput>

        <Button isLoading={taskEditLoading} type="submit">
          Edit Task
        </Button>
      </form>
    </Box>
  )
}
