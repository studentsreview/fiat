import { useEffect, useState } from 'react'
import { Box, Input } from '@chakra-ui/react'
import Autosuggest from 'react-autosuggest'

import { api } from 'shared/modules/api'

export const Home: React.FC = () => {
	const [data, setData] = useState<any>({})
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])
	useEffect(() => {
		api
			.request(
				`
        query {
          teachers(take: 1000) {
            name
          }
					courses(take: 1000) {
						name
					}
        }
      `
			)
			.then(setData)
	}, [])

	return (
		<Box>
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={({ value }) =>
					setSuggestions(
						data.teachers
							.filter(({ name }) => name.toLowerCase().includes(value))
							.concat(
								data.courses.filter(({ name }) =>
									name.toLowerCase().includes(value)
								)
							)
					)
				}
				onSuggestionsClearRequested={() => setSuggestions([])}
				getSuggestionValue={({ name }) => name}
				renderSuggestion={({ name }) => (
					<Box cursor="pointer" bg="white" p={2}>
						{name}
					</Box>
				)}
				inputProps={{
					placeholder: 'Search Teachers and Courses...',
					value,
					onChange: (_, { newValue }) => setValue(newValue),
				}}
				renderSuggestionsContainer={({ containerProps, children }) => (
					<Box position="relative" {...containerProps}>
						<Box position="absolute" w={500} maxH={250} overflowY="scroll">
							{children}
						</Box>
					</Box>
				)}
				renderInputComponent={(inputProps) => (
					// @ts-ignore
					<Input w={500} {...inputProps} />
				)}
			/>
		</Box>
	)
}
