import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Course } from 'shared/models/course'
import { api } from 'shared/modules/api'

const CoursePage: NextPage<{ course: Course }> = ({ course }) => (
	<div>{JSON.stringify(course)}</div>
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
			params: { name: course.name.replace(' ', '_') },
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<
	{ course: Course },
	{ name: string }
> = async (ctx) => {
	const { course } = await api.request(
		`
    query($name: String!) {
      course(name: $name) {
        name
        classes {
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
		{ name: ctx.params.name.replace('_', ' ') }
	)

	return {
		props: {
			course,
		},
	}
}
