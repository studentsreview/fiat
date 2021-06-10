import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Head from 'next/head'

const App = ({ Component, pageProps }) => (
	<GeistProvider themeType="light">
		<Head>
			<title>studentsreview.me</title>
			<meta
				name="description"
				content="Archive of Lowell High School teachers and courses"
			/>
		</Head>
		<CssBaseline />
		<Component {...pageProps} />
	</GeistProvider>
)

export default App
