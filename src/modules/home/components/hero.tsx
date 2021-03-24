import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react'
import { BiPyramid } from 'react-icons/bi'
import { Course } from 'shared/models/course'
import { Teacher } from 'shared/models/teacher'
import { AutosuggestSearch } from './autosuggest-search'

export const Hero: React.FC<{
	searchData: ((Teacher | Course) & { type: string })[]
}> = ({ searchData }) => {
	console.log('hi')

	return (
		<Box
			bgGradient="linear(to-b, blue.700, blue.200)"
			color="white"
			position="relative"
			h="100%"
			maxH="100vh">
			<Flex direction="column" w="100%" h="100%" alignItems="center">
				<Box flexGrow={1} />
				<Container zIndex={1} maxW={1312}>
					<Flex
						direction="row"
						justifyContent="space-between"
						alignItems="center">
						<Stack
							bg="url(/images/abstract-360.svg)"
							bgSize="contain"
							bgRepeat="no-repeat"
							backgroundPosition="100%">
							<Flex direction="column">
								<Heading
									fontSize="6xl"
									fontWeight="extrabold"
									bgGradient="linear(to-r, purple.700, red.600)"
									bgClip="text">
									lowell database.
								</Heading>
								<Text fontSize="2xl" fontWeight="semibold">
									WIP.
								</Text>
							</Flex>
							<AutosuggestSearch searchData={searchData} />
						</Stack>
						<Stack
							textAlign="right"
							bg="url(/images/abstract-366.svg)"
							bgSize="contain"
							bgRepeat="no-repeat"
							backgroundPosition="center">
							<Heading fontSize="3xl">data from 2014-2021</Heading>
							<Heading fontSize="3xl">10,000+ reviews.</Heading>
							<Heading fontSize="3xl">8,000+ classes.</Heading>
							<Heading fontSize="3xl">arena seat stats.</Heading>
						</Stack>
					</Flex>
				</Container>
				<Box flexGrow={2} />
			</Flex>
			<Flex
				direction="row"
				alignItems="center"
				position="absolute"
				color="black"
				bottom="10px"
				left={10}>
				<Icon as={BiPyramid} mr={2} />
				<Text fontWeight="bold">fiat scientia.</Text>
			</Flex>
			<Box position="absolute" color="black" bottom="10px" right={10}>
				<Text fontWeight="bold">.made by kai chang</Text>
			</Box>
		</Box>
	)
}
