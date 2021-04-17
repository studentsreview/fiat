import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Course } from 'shared/models/course'
import { api } from 'shared/modules/api'

import CourseMod from 'modules/course'

const CoursePage: NextPage<{ course: Course }> = ({ course }) => (
	<>
		<Head>
			<title>{course.name}</title>
		</Head>
		<CourseMod course={course} />
	</>
)

export default CoursePage

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
	const { courses }: { courses: Course[] } = await api.request(`
    query {
      courses(take: 1000) {
        name
      }
    }
  `)

	return {
		paths: courses.map((course) => ({
			params: { name: course.name.replace(/ /g, '_') },
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<
	{ course: Course },
	{ name: string }
> = async (ctx) => {
	const { course }: { course: Course } = await api.request(
		`
    query($name: String!) {
      course(name: $name) {
        name
        department
        description
        AtoG
        classes(take: 9999) {
          name
          block
          semester
          teacher {
            name
          }
        }
      }
    }
  `,
		{ name: ctx.params.name.replace(/_/g, ' ') }
	)

	return {
		props: {
			course,
		},
	}
}
