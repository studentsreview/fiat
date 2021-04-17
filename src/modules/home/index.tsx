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
			<Grid.Container gap={2}>
				<Grid md={10}>
					<AutosuggestSearch searchData={searchData} />
					<style global jsx>{`
						.react-autosuggest__container {
							width: 100%;
						}
					`}</style>
				</Grid>
				<Grid md={14}>Hello</Grid>
			</Grid.Container>
		</Page.Content>
	</Page>
)

export default Landing
