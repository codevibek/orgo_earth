import { Box, Button, Divider, Flex, HStack, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRef, useState, useCallback, useMemo } from 'react'
import Webcam from 'react-webcam'
import {
  cloudinaryCloudName,
  cloudinaryUploadPreset,
} from '../data/utils/constants'

interface CameraProps {
  urls: string[]
  setUrls: React.Dispatch<React.SetStateAction<string[]>>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export const Camera: React.FC<CameraProps> = ({
  setUrls,
  urls,
  images,
  setImages,
}) => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false)
  const webcamRef = useRef<Webcam>(null)
  const [cameraSide, setCameraSide] = useState<'front' | 'back'>('front')

  const uploadFileHandler = async (url) => {
    const formData = new FormData()
    formData.append('file', url)
    formData.append('upload_preset', cloudinaryUploadPreset)

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      )
      .then((res) => {
        setImages([...images, res.data.url])
      })
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setUrls([...urls, imageSrc])
    }
    uploadFileHandler(imageSrc)
  }, [webcamRef, urls, setUrls])

  const videoConstraints = useMemo(() => {
    return {
      width: 720,
      height: 460,
      facingMode:
        cameraSide === 'front' ? { exact: 'user' } : { exact: 'environment' },
    }
  }, [cameraSide])

  return (
    <Box>
      <Flex my="2">
        {isCaptureEnable || (
          <Button display="inline" onClick={() => setCaptureEnable(true)}>
            Enable Camera
          </Button>
        )}
      </Flex>
      {isCaptureEnable && (
        <>
          <Button my="4" onClick={() => setCaptureEnable(false)}>
            Disable camera
          </Button>
          <Webcam
            audio={false}
            width={540}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <HStack spacing={4}>
            <Button my="4" onClick={capture}>
              Capture Image
            </Button>

            <Button
              display="inline"
              onClick={() =>
                setCameraSide((prev) => (prev === 'back' ? 'front' : 'back'))
              }
            >
              Toggle Camera Side
            </Button>
          </HStack>
        </>
      )}
      {urls && (
        <VStack>
          {urls.map((currentUrl) => {
            return (
              <Box key={currentUrl} my="4">
                <Button
                  onClick={() =>
                    setUrls((prev) =>
                      prev.filter((oldUrl) => oldUrl !== currentUrl)
                    )
                  }
                >
                  Remove This Image
                </Button>
                <img key={currentUrl} src={currentUrl} />
                <Divider />
              </Box>
            )
          })}
        </VStack>
      )}
    </Box>
  )
}
