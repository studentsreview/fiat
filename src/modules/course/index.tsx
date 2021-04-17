import Link from 'next/link'
import { Button, Card, Grid, Page, Text } from '@geist-ui/react'
import { Course } from 'shared/models/course'

import Header from 'shared/components/header'
import Sidebar from './components/sidebar'

const Course_: React.FC<{
	course: Course
}> = ({ course }) => (
	<Page size="large">
		<Header />
		<Page.Content>
			<Grid.Container gap={6}>
				<Grid xs={24} md={11}>
					<Sidebar course={course} />
				</Grid>
				<Grid xs={24} md={13} style={{ flexDirection: 'column' }}>
					<Card>
						<Text b>Prerequisites</Text>:{' '}
						{course.prerequisites.length > 0
							? course.prerequisites.map((prerequisite, idx) => (
									<Link
										key={idx}
										href={`/course/${prerequisite.name.replace(/ /g, '_')}`}>
										<Button
											auto
											ghost
											size="mini"
											type="secondary"
											style={{ marginRight: 2 }}>
											{prerequisite.name}
										</Button>
									</Link>
							  ))
							: 'None'}
						<Text>
							<Text b>A-G</Text>: {course.AtoG || 'None'}
						</Text>
						<Text>
							<Text b>Length</Text>: {course.length || 'None'}
						</Text>
						<Text>
							<Text b>Description</Text>: {course.description || 'None'}
						</Text>
					</Card>
				</Grid>
			</Grid.Container>
		</Page.Content>
	</Page>
)

export default Course_
