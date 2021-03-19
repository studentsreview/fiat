import Head from 'next/head'
import { Home } from 'modules/home'

const HomePage = () => (
	<>
		<Head>
			<title>Create Next App</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Home />
	</>
)

export default HomePage
