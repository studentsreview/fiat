import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { FiatTheme } from 'shared/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
	<ChakraProvider theme={FiatTheme}>
		<Component {...pageProps} />
	</ChakraProvider>
)

export default App
