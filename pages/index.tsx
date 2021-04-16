import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { api } from 'shared/modules/api'

const HomePage: NextPage<{ searchData: any }> = ({ searchData }) => (
	<>
		<Head>
			<title>Lowell Database</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		{/*	<Home searchData={searchData} /> */}
	</>
)

export const getStaticProps: GetStaticProps<{ searchData: any }> = async () => {
	const { teachers, courses } = await api.request(
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

	return {
		props: {
			searchData: teachers
				.map((suggestion) => ({ type: 'TEACHER', ...suggestion }))
				.concat(
					courses
						.filter(({ classes }) => classes.length > 0)
						.map((suggestion) => ({ type: 'COURSE', ...suggestion }))
				),
		},
	}
}

export default HomePage
