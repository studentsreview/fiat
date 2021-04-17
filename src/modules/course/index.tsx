import { useRef } from 'react'
import { Grid, Page } from '@geist-ui/react'
import { Course } from 'shared/models/course'

import Header from 'shared/components/header'
import Sidebar from './components/sidebar'

const Course_: React.FC<{
	course: Course
}> = ({ course }) => {
	const sidebarContainerRef = useRef<HTMLDivElement>(null)
	return (
		<Page size="large">
			<Header />
			<Page.Content>
				<Grid.Container gap={6}>
					<Grid xs={24} md={11}>
						<div ref={sidebarContainerRef} style={{ width: '100%' }}>
							<Sidebar
								sidebarContainerRef={sidebarContainerRef}
								course={course}
							/>
						</div>
					</Grid>
					<Grid xs={24} md={13} style={{ flexDirection: 'column' }} />
				</Grid.Container>
			</Page.Content>
		</Page>
	)
}

export default Course_
