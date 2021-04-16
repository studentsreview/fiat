import { Grid, Page, Text } from '@geist-ui/react'
import { Course } from 'shared/models/course'
import { Teacher } from 'shared/models/teacher'

import Header from 'shared/components/header'

const Landing: React.FC<{
	searchData: ((Teacher | Course) & { type: string })[]
}> = ({ searchData }) => (
	<Page size="large">
		<Header />
		<Page.Content>
			<Grid.Container>
				<Grid>
					<Text>{JSON.stringify(searchData)}</Text>
				</Grid>
			</Grid.Container>
		</Page.Content>
	</Page>
)

export default Landing
