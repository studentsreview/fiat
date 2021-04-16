import { useEffect, useState } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

const App = ({ Component, pageProps }) => {
	let defaultThemeType
	if (typeof window !== 'undefined') {
		defaultThemeType = localStorage.getItem('theme-type')
	}
	if (!defaultThemeType) {
		defaultThemeType = 'light'
	}
	const [themeType, setThemeType] = useState(defaultThemeType)
	useEffect(() => {
		localStorage.setItem('theme-type', themeType)
	}, [themeType])

	const switchThemes = () => {
		setThemeType((lastThemeType) =>
			lastThemeType === 'dark' ? 'light' : 'dark'
		)
	}

	return (
		<GeistProvider themeType={themeType}>
			<CssBaseline />
			<Component switchThemes={switchThemes} {...pageProps} />
		</GeistProvider>
	)
}

export default App
