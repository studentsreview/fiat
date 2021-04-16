import { useRef } from 'react'
import { Grid, Page, Text } from '@geist-ui/react'
import { Teacher } from 'shared/models/teacher'

import Header from 'shared/components/header'

import ReviewCard from './components/review-card'
import Sidebar from './components/sidebar'

const Teacher_: React.FC<{
	teacher: Teacher
	switchThemes: () => void
}> = ({ teacher, switchThemes }) => {
	const sidebarContainerRef = useRef<HTMLDivElement>(null)
	return (
		<Page size="large">
			<Header switchThemes={switchThemes} />
			<Page.Content>
				<Grid.Container gap={6}>
					<Grid xs={24} md={10}>
						<div ref={sidebarContainerRef} style={{ width: '100%' }}>
							<Sidebar
								sidebarContainerRef={sidebarContainerRef}
								teacher={teacher}
							/>
						</div>
					</Grid>
					<Grid xs={24} md={14}>
						<Grid.Container gap={2}>
							<Text
								h3
								style={{ marginTop: 16, marginLeft: 12, marginBottom: 0 }}>
								{teacher.reviews.length} Reviews
							</Text>
							{teacher.reviews.map((review, idx) => (
								<Grid key={idx} xs={24}>
									<ReviewCard review={review} />
								</Grid>
							))}
						</Grid.Container>
					</Grid>
				</Grid.Container>
			</Page.Content>
		</Page>
	)
}

export default Teacher_
