import { extendTheme } from '@chakra-ui/react'

const overrides = {
	styles: {
		global: {
			'#__next, body, html': {
				height: '100%',
			},
		},
	},
}

export const FiatTheme = extendTheme(overrides)
