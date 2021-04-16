import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Teacher } from 'shared/models/teacher'
import { api } from 'shared/modules/api'

import TeacherMod from 'modules/teacher'

const TeacherPage: NextPage<{ teacher: Teacher; switchThemes: () => void }> = ({
	teacher,
	switchThemes,
}) => (
	<>
		<Head>
			<title>{teacher.name}</title>
		</Head>
		<TeacherMod teacher={teacher} switchThemes={switchThemes} />
	</>
)

export default TeacherPage

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
	const { teachers }: { teachers: Teacher[] } = await api.request(`
    query {
      teachers(take: 1000) {
        name
      }
    }
  `)

	return {
		paths: teachers.map((teacher) => ({
			params: { name: teacher.name.replace(/ /g, '_') },
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<
	{ teacher: Teacher },
	{ name: string }
> = async (ctx) => {
	const { teacher }: { teacher: Teacher } = await api.request(
		`
    query($name: String!) {
      teacher(name: $name) {
        name
        departments
        semesters
        classes(take: 9999) {
          name
          block
          semester
        }
        reviews(take: 9999, timestampSort: DESC) {
          timestamp
          text
          rating
          version
        }
        rating
      }
    }
  `,
		{ name: ctx.params.name.replace(/_/g, ' ') }
	)

	return {
		props: {
			teacher,
		},
	}
}
