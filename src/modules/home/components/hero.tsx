import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	Stack,
	Stat,
	StatLabel,
	StatNumber,
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
		<Flex
			direction="column"
			color="white"
			position="relative"
			minH="100vh"
			alignItems="center"
			py={{ base: 8, md: 16 }}>
			<Box
				position="absolute"
				w="100%"
				h="100%"
				top={0}
				left={0}
				bgGradient="linear(to-b, pluto.steel.700, pluto.steel.600)"
			/>
			<Box flexGrow={1} />
			<Container zIndex={1} maxW={1312}>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					justifyContent="space-between"
					alignItems={{ base: 'flex-start', md: 'center' }}
					spacing={8}>
					<Stack
						bg="url(/images/taxi-844.svg)"
						bgSize="contain"
						bgRepeat="no-repeat"
						backgroundPosition="100%">
						<Flex direction="column">
							<Heading
								fontSize="6xl"
								fontWeight="extrabold"
								bgGradient="linear(to-r, pluto.crayola.200, pluto.charm.600)"
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
						alignSelf={{ base: 'flex-end', md: null }}
						textAlign="right"
						bg="url(/images/taxi-22.svg)"
						p={50}
						color="pluto.independence.900"
						bgSize="contain"
						bgRepeat="no-repeat"
						backgroundPosition="center">
						<Stat>
							<StatLabel fontSize="lg">Data sourced from</StatLabel>
							<StatNumber fontSize="4xl">2014-2021</StatNumber>
						</Stat>
						<Stat>
							<StatLabel fontSize="lg">Reviews</StatLabel>
							<StatNumber fontSize="4xl">10,000+</StatNumber>
						</Stat>
						<Stat>
							<StatLabel fontSize="lg">Classes</StatLabel>
							<StatNumber fontSize="4xl">8,000+</StatNumber>
						</Stat>
					</Stack>
				</Stack>
			</Container>
			<Box flexGrow={2} />
			<Flex
				direction="row"
				alignItems="center"
				position="absolute"
				color="pluto.independence.900"
				bottom="10px"
				left={{ base: 5, md: 10 }}>
				<Icon as={BiPyramid} mr={2} />
				<Text fontWeight="bold">fiat scientia.</Text>
			</Flex>
			<Box
				position="absolute"
				color="pluto.independence.900"
				bottom="10px"
				right={{ base: 5, md: 10 }}>
				<Text fontWeight="bold">.made by kai chang</Text>
			</Box>
		</Flex>
	)
}
