import { Grid, Page } from '@geist-ui/react'
import { Course } from 'shared/models/course'
import { Teacher } from 'shared/models/teacher'

import Header from 'shared/components/header'
import AutosuggestSearch from './components/autosuggest-search'

const Landing: React.FC<{
	searchData: ((Teacher | Course) & { type: string })[]
}> = ({ searchData }) => (
	<Page size="large">
		<Header />
		<Page.Content>
			<Grid.Container>
				<Grid>
					<AutosuggestSearch searchData={searchData} />
				</Grid>
			</Grid.Container>
		</Page.Content>
	</Page>
)

export default Landing
