import { ChakraProvider, Container } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Layout } from '../components/Layout'
import { theme } from '../theme'
import '../styles/globals.css'
import '@fontsource/poppins'

export const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        {Component.landingPage ? (
          <Container>
            <Component {...pageProps} />
          </Container>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
