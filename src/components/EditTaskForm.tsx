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
        .min(3, 'task name must be at least 3 characters long')
        .required('Please enter a task name.'),
      address: Yup.string().required('Please enter a location'),
      description: Yup.string()
        .min(5, 'Description must be at least 5 characters long')
        .required('Please enter a description'),
      hours: Yup.string().required('Please enter an estimated time.'),
      evidence: Yup.string().required(
        'Please enter the submission requirements.'
      ),
      status: Yup.string().required('Please set the status.'),
      priority: Yup.string().required('Please set a priority level'),
      rewards: Yup.string().required('Please enter rewards offered'),
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

        <CustomSelectInput
          isTouched={formik.touched.hours}
          isInvalid={!!formik.errors.hours}
          errorMessage={formik.errors.hours}
          name="hours"
          formik={formik}
          label="Estimated time"
        >
          <option value="5 minutes">5 minutes</option>
          <option value="15 minutes">15 minutes</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="2 hours">2 hours</option>
          <option value="3 hours">3 hours</option>
          <option value="3+ hours">3+ hours</option>
        </CustomSelectInput>

        <CustomTextAreaInput
          isTouched={formik.touched.evidence}
          isInvalid={!!formik.errors.evidence}
          errorMessage={formik.errors.evidence}
          name="evidence"
          formik={formik}
          placeholder="Example: Take before and after pictures from a height of 5 feet"
          label="Submission requirements"
        />

        <CustomTextAreaInput
          isTouched={formik.touched.rewards}
          isInvalid={!!formik.errors.rewards}
          errorMessage={formik.errors.rewards}
          name="rewards"
          formik={formik}
          label="Rewards Offered"
          placeholder="Example: 10 ORGO Earth Points or $50 giftcard"
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
          <option value="active">Make public (active)</option>
          <option value="inactive">Hide from volunteers (inactive)</option>
        </CustomSelectInput>

        <Button isLoading={taskEditLoading} type="submit">
          Edit Task
        </Button>
      </form>
    </Box>
  )
}
