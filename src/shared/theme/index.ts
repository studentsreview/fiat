import { extendTheme } from '@chakra-ui/react'
import Values from 'values.js'

const generateSwatchForColor = (hex: string) => {
	const color = new Values(hex)
	const all = color.all()
	return {
		100: `#${all[6].hex}`,
		200: `#${all[7].hex}`,
		300: `#${all[8].hex}`,
		400: `#${all[9].hex}`,
		500: `#${all[10].hex}`,
		600: `#${all[11].hex}`,
		700: `#${all[12].hex}`,
		800: `#${all[13].hex}`,
		900: `#${all[14].hex}`,
	}
}

const overrides = {
	colors: {
		pluto: {
			steel: generateSwatchForColor('#B4C7E7'),
			crayola: generateSwatchForColor('#F7D06F'),
			independence: generateSwatchForColor('#53587C'),
			charm: generateSwatchForColor('#EF86B0'),
		},
	},
	styles: {
		global: {
			'#__next, body, html': {
				height: '100%',
			},
		},
	},
}

export const FiatTheme = extendTheme(overrides)
