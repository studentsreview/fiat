import { GeistProvider, CssBaseline } from '@geist-ui/react'
import 'styles/global.css'

const App = ({ Component, pageProps }) => (
	<GeistProvider themeType="light">
		<CssBaseline />
		<Component {...pageProps} />
	</GeistProvider>
)

export default App
