import { useRef } from 'react'
import { Grid, Page, Row, Text } from '@geist-ui/react'
import { Teacher } from 'shared/models/teacher'

import Header from 'shared/components/header'
import ReviewCard from './components/review-card'
import Sidebar from './components/sidebar'

const Teacher_: React.FC<{
	teacher: Teacher
}> = ({ teacher }) => {
	const sidebarContainerRef = useRef<HTMLDivElement>(null)
	return (
		<Page size="large">
			<Header />
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
					<Grid xs={24} md={14} style={{ flexDirection: 'column' }}>
						<Row style={{ marginBottom: 12 }}>
							<Text
								h3
								style={{ marginTop: 16, marginLeft: 12, marginBottom: 0 }}>
								{teacher.reviews.length} Review
								{teacher.reviews.length !== 1 && 's'}
							</Text>
						</Row>
						{teacher.reviews.map((review, idx) => (
							<Row
								key={idx}
								style={{
									marginBottom: teacher.reviews.length - 1 === idx ? 0 : 12,
								}}>
								<ReviewCard review={review} />
							</Row>
						))}
					</Grid>
				</Grid.Container>
			</Page.Content>
		</Page>
	)
}

export default Teacher_
