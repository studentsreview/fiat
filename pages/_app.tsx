import { GeistProvider, CssBaseline } from '@geist-ui/react'

const App = ({ Component, pageProps }) => (
	<GeistProvider themeType="light">
		<CssBaseline />
		<Component {...pageProps} />
	</GeistProvider>
)

export default App
