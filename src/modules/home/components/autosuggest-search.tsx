import { useState } from 'react'
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

type AutosuggestSearchProps = Partial<
	AutosuggestPropsBase<(Teacher | Course) & { type: 'TEACHER' | 'COURSE' }>
> & {
	searchData: ((Teacher | Course) & { type: string })[]
}

export const AutosuggestSearch: React.FC<AutosuggestSearchProps> = ({
	searchData,
	...props
}) => {
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])

	const router = useRouter()

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
				<Flex
					direction="row"
					alignItems="center"
					cursor="pointer"
					bg="white"
					color="pluto.independence.700"
					_hover={{ bg: 'pluto.independence.200', color: 'white' }}
					p={2}>
					<Icon color="pluto.independence.900" as={BsHash} mr={4} boxSize={6} />
					<Flex direction="column">
						<Text
							fontSize="sm"
							fontWeight="thin"
							color="pluto.independence.700">
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
						w="100%"
						maxH={250}
						overflowY="scroll">
						{children}
					</Box>
				</Box>
			)}
			renderInputComponent={(inputProps) => (
				<InputGroup w="100%" maxW={500}>
					<InputLeftElement h="100%" pointerEvents="none">
						<Icon
							color="pluto.independence.600"
							as={AiOutlineSearch}
							boxSize={6}
						/>
					</InputLeftElement>
					<Input
						roundedTop="xl"
						roundedBottom="none"
						border="none"
						bg="white"
						_placeholder={{ color: 'pluto.independence.500' }}
						color="pluto.independence.700"
						{...inputProps}
						size="lg"
					/>
				</InputGroup>
			)}
			{...props}
		/>
	)
}
