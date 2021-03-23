import { useEffect, useState } from 'react'
import { Box, Flex, Icon, Input, Text } from '@chakra-ui/react'
import Autosuggest, { AutosuggestPropsBase } from 'react-autosuggest'
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa'
import { useRouter } from 'next/router'

import { Teacher } from 'shared/models/teacher'
import { Course } from 'shared/models/course'
import { api } from 'shared/modules/api'

type AutosuggestSearchProps = Partial<
	AutosuggestPropsBase<(Teacher | Course) & { type: 'TEACHER' | 'COURSE' }>
>

const AutosuggestSearch: React.FC<AutosuggestSearchProps> = (props) => {
	const [data, setData] = useState<null | {
		teachers: Teacher[]
		courses: Course[]
	}>(null)
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])

	const router = useRouter()

	useEffect(() => {
		api
			.request(
				`
        query {
          teachers(semester: "Spring2021", take: 1000) {
            name
          }
					courses(take: 1000) {
						name
						classes(semester: "Spring2021", take: 1) {
							name
						}
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
					data
						? data.teachers
								.filter(({ name }) => name.toLowerCase().includes(value))
								.map((suggestion) => ({ type: 'TEACHER', ...suggestion }))
								.concat(
									data.courses
										.filter(
											({ name, classes }) =>
												name.toLowerCase().includes(value) && classes.length > 0
										)
										.map((suggestion) => ({ type: 'COURSE', ...suggestion }))
								)
						: []
				)
			}
			onSuggestionsClearRequested={() => setSuggestions([])}
			onSuggestionSelected={(_, { suggestion: { name, type } }) => {
				const prefix = type === 'TEACHER' ? '/teachers/' : '/courses/'
				router.push(prefix.concat(name))
			}}
			getSuggestionValue={({ name }) => name}
			renderSuggestion={({ name, type }) => (
				<Flex
					direction="row"
					alignItems="center"
					cursor="pointer"
					bg="white"
					color="gray.700"
					_hover={{ bg: 'green.500', color: 'white' }}
					p={2}>
					<Icon as={type === 'TEACHER' ? FaChalkboardTeacher : FaBook} mr={2} />
					<Text>{name}</Text>
				</Flex>
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
			{...props}
		/>
	)
}

export default AutosuggestSearch
