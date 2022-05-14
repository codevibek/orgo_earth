import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { useCreateTask } from '../data/hooks/mutations/useCreateTask'
import { useGetCommunityTasks } from '../data/hooks/query/useGetCommunityTasks'
import { useUserData } from '../data/hooks/useUserData'
import {
  CustomSelectInput,
  CustomTextAreaInput,
  CustomTextInput,
} from './CustomInput'

export const CreateTaskForm = () => {
  const { isLoading, mutate: createTask } = useCreateTask()
  const userData = useUserData()
  const { data: templateTaskData, isLoading: templateLoading } =
    useGetCommunityTasks(userData?._id)

  const [templateTaskId, setTemplateTaskId] = useState()

  const selectedTemplateTaskData = useMemo(() => {
    if (templateTaskData && templateTaskId) {
      return templateTaskData.find((task) => task._id === templateTaskId)
    }
    return null
  }, [templateTaskData, templateTaskId])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      status: '',
      priority: '',
      address: '',
      hours: '',
      evidence: '',
      rewards: '',
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
    onSubmit: (value) => {
      createTask(value)
    },
  })

  useEffect(() => {
    if (selectedTemplateTaskData) {
      formik.setValues(selectedTemplateTaskData)
    }
  }, [selectedTemplateTaskData])

  return (
    <Box my="5" bg="gray.200" borderRadius="5px" p="4">
      <form onSubmit={formik.handleSubmit}>
        <FormControl my="6">
          <FormLabel htmlFor="template">Select a template</FormLabel>
          <Select
            id="template"
            value={templateTaskId}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onChange={(e) => setTemplateTaskId(e.target.value)}
            bg="whiteAlpha.600"
            placeholder="Use previous task as template"
          >
            {!templateLoading &&
              templateTaskData?.map((task) => (
                <option value={task._id} key={task._id}>
                  {task.name}
                </option>
              ))}
          </Select>
          <FormHelperText>Use previous tasks as starter</FormHelperText>
        </FormControl>
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
          placeholder="Example: We’re planting trees at the memorial. Please bring gloves!"
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

        <Button isLoading={isLoading} type="submit">
          Create Task
        </Button>
      </form>
    </Box>
  )
}
