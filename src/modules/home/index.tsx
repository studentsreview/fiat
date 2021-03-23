import { useEffect, useState } from 'react'
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
			renderSuggestion={({ name }) => <div>{name}</div>}
			inputProps={{
				placeholder: 'Search...',
				value,
				onChange: (_, { newValue }) => setValue(newValue),
			}}
		/>
	)
}
