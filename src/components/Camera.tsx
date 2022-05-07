import { Box, Button, Divider, VStack } from '@chakra-ui/react'
import { useRef, useState, useCallback, useMemo } from 'react'
import Webcam from 'react-webcam'

interface CameraProps {
  urls: string[]
  setUrls: React.Dispatch<React.SetStateAction<string[]>>
}

export const Camera: React.FC<CameraProps> = ({ setUrls, urls }) => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false)
  const webcamRef = useRef<Webcam>(null)
  const [cameraSide, setCameraSide] = useState<'front' | 'back'>('front')
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setUrls([...(urls || []), imageSrc])
    }
  }, [webcamRef, urls, setUrls])

  const videoConstraints = useMemo(() => {
    return {
      width: 720,
      height: 460,
      facingMode: cameraSide === 'front' ? 'user' : { exact: 'user' },
    }
  }, [cameraSide])

  return (
    <>
      <Button
        mr="4"
        onClick={() =>
          setCameraSide((prev) => (prev === 'back' ? 'front' : 'back'))
        }
      >
        Toggle Camera Side ({cameraSide})
      </Button>
      {isCaptureEnable || (
        <Button ml="4" onClick={() => setCaptureEnable(true)}>
          Capture Image
        </Button>
      )}
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
          <Button my="4" onClick={capture}>
            Capture Image
          </Button>
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
    </>
  )
}
