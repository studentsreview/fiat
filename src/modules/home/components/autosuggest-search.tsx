import { useEffect, useState } from 'react'
import {
	Box,
	Flex,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
} from '@chakra-ui/react'
import Autosuggest, { AutosuggestPropsBase } from 'react-autosuggest'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsHash } from 'react-icons/bs'
import { useRouter } from 'next/router'

import { Teacher } from 'shared/models/teacher'
import { Course } from 'shared/models/course'
import { api } from 'shared/modules/api'

type AutosuggestSearchProps = Partial<
	AutosuggestPropsBase<(Teacher | Course) & { type: 'TEACHER' | 'COURSE' }>
>

export const AutosuggestSearch: React.FC<AutosuggestSearchProps> = (props) => {
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
				const prefix = type === 'TEACHER' ? '/teacher/' : '/course/'
				router.push(prefix.concat(name.replace(/ /g, '_')))
			}}
			getSuggestionValue={({ name }) => name}
			renderSuggestion={({ name, type }) => (
				<Flex
					direction="row"
					alignItems="center"
					cursor="pointer"
					bg="white"
					color="gray.700"
					_hover={{ bg: 'purple.600', color: 'white' }}
					p={2}>
					<Icon color="black" as={BsHash} mr={4} boxSize={6} />
					<Flex direction="column">
						<Text fontSize="sm" color="gray.400">
							{type.charAt(0).concat(type.substr(1).toLowerCase())}
						</Text>
						<Text>{name}</Text>
					</Flex>
				</Flex>
			)}
			inputProps={{
				placeholder: 'search teachers and courses...',
				value,
				onChange: (_, { newValue }) => setValue(newValue),
			}}
			renderSuggestionsContainer={({ containerProps, children }) => (
				<Box position="relative" {...containerProps}>
					<Box
						position="absolute"
						roundedBottom="lg"
						w={500}
						maxH={250}
						overflowY="scroll">
						{children}
					</Box>
				</Box>
			)}
			renderInputComponent={(inputProps) => (
				<InputGroup w={500}>
					<InputLeftElement h="100%" pointerEvents="none">
						<Icon color="gray.600" as={AiOutlineSearch} boxSize={6} />
					</InputLeftElement>
					<Input
						roundedTop="xl"
						roundedBottom="none"
						border="none"
						bg="white"
						_placeholder={{ color: 'gray.500' }}
						color="gray.700"
						{...inputProps}
						size="lg"
					/>
				</InputGroup>
			)}
			{...props}
		/>
	)
}
