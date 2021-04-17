import { Grid, Page, Spacer, Text } from '@geist-ui/react'
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
				<Grid
					xs={24}
					md={10}
					style={{ flexDirection: 'column', justifyContent: 'center' }}>
					<Text h3 style={{ marginBottom: 0 }}>
						Search ↴
					</Text>
					<Text b style={{ margin: 0 }}>
						10k+ reviews & 8k+ classes
					</Text>
					<Spacer y={0.5} />
					<AutosuggestSearch searchData={searchData} />
					<style global jsx>{`
						.react-autosuggest__container {
							width: 100%;
						}
					`}</style>
				</Grid>
				<Grid
					xs={24}
					md={14}
					style={{ flexDirection: 'column', alignItems: 'center' }}>
					<img
						src="/images/surr-come-back-later.svg"
						alt="Closed"
						style={{ height: 300 }}
					/>
					<Text h3>2019-2021</Text>
				</Grid>
			</Grid.Container>
		</Page.Content>
		<Page.Footer
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
			}}>
			<Text h5>by kai chang '21</Text>
		</Page.Footer>
	</Page>
)

export default Landing
