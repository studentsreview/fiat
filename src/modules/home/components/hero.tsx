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
				clipPath={{ md: 'url(#curve1)' }}
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
						<Heading fontSize="3xl">data from 2014-2021</Heading>
						<Heading fontSize="3xl">10,000+ reviews.</Heading>
						<Heading fontSize="3xl">8,000+ classes.</Heading>
						<Heading fontSize="3xl">arena seat stats.</Heading>
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
			<svg width="0" height="0">
				<defs>
					<clipPath id="curve1" clipPathUnits="objectBoundingBox">
						<path d="M 0 1 L 0 0 L 1 0 L 1 0.92 c -0.1 -0.2 -0.17 -0.1 -0.28 0.03 c -0.05 0.06 -0.18 -0.06 -0.22 0.05 Z" />
					</clipPath>
				</defs>
			</svg>
		</Flex>
	)
}
