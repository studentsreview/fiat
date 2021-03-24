import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Teacher } from 'shared/models/teacher'
import { api } from 'shared/modules/api'

const TeacherPage: NextPage<{ teacher: Teacher }> = ({ teacher }) => (
	<div>{JSON.stringify(teacher)}</div>
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
        classes {
          name
        }
        reviews {
          text
        }
        rating
      }
    }
  `,
		{ name: ctx.params.name.replace(/_/g, ' ') }
	)

	console.log(course)

	return {
		props: {
			teacher,
		},
	}
}
