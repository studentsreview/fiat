import { useState } from 'react'
import { Input, Row, Spacer, Text, useTheme } from '@geist-ui/react'
import Autosuggest, { AutosuggestPropsBase } from 'react-autosuggest'
import { Hash } from '@geist-ui/react-icons'
import { useRouter } from 'next/router'

import { Teacher } from 'shared/models/teacher'
import { Course } from 'shared/models/course'

type AutosuggestSearchProps = Partial<
	AutosuggestPropsBase<(Teacher | Course) & { type: 'TEACHER' | 'COURSE' }>
> & {
	searchData: ((Teacher | Course) & { type: string })[]
}

const AutosuggestSearch: React.FC<AutosuggestSearchProps> = ({
	searchData,
	...props
}) => {
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])

	const router = useRouter()
	const theme = useTheme()

	return (
		<Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={({ value }) =>
				setSuggestions(
					searchData.filter(({ name }) => name.toLowerCase().includes(value))
				)
			}
			onSuggestionsClearRequested={() => setSuggestions([])}
			onSuggestionSelected={(_, { suggestion: { name, type } }) => {
				const prefix = type === 'TEACHER' ? '/teacher/' : '/course/'
				router.push(prefix.concat(name.replace(/ /g, '_')))
			}}
			getSuggestionValue={({ name }) => name}
			renderSuggestion={({ name, type }) => (
				<>
					<Row
						className="suggestion"
						align="middle"
						style={{ cursor: 'pointer', padding: 12 }}>
						<Hash size={32} />
						<Spacer y={2} />
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<Text i style={{ margin: 0 }}>
								{type.charAt(0).concat(type.substr(1).toLowerCase())}
							</Text>
							<Text b style={{ margin: 0 }}>
								{name}
							</Text>
						</div>
					</Row>
				</>
			)}
			inputProps={{
				placeholder: 'search teachers and courses...',
				value,
				onChange: (_, { newValue }) => setValue(newValue),
			}}
			renderSuggestionsContainer={({ containerProps, children }) => (
				<div style={{ zIndex: 1, position: 'relative' }} {...containerProps}>
					<div
						style={{
							position: 'absolute',
							width: '100%',
							maxHeight: 400,
							overflowY: 'scroll',
							borderBottomLeftRadius: 16,
							borderWidth: suggestions.length > 0 ? '0 1px 1px 1px' : '0',
							borderColor: 'black',
							borderStyle: 'solid',
						}}>
						{children}
					</div>
					<style global jsx>{`
						.react-autosuggest__suggestion:hover {
							background-color: ${theme.palette.selection};
						}

						li.react-autosuggest__suggestion::before {
							content: '';
						}

						.react-autosuggest__suggestions-list,
						.react-autosuggest__suggestion {
							margin: 0;
						}
					`}</style>
				</div>
			)}
			renderInputComponent={(inputProps) => (
				<Input {...inputProps} size="large" width="100%" />
			)}
			{...props}
		/>
	)
}

export default AutosuggestSearch
