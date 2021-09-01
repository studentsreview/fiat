import { Grid, Link, Page, Spacer, Text } from '@geist-ui/react'
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
		</Page.Content>
		<Page.Footer
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
			}}>
			<Link href="https://kaijchang.com" target="_blank">
				<Text h5>by kai chang '21</Text>
			</Link>
		</Page.Footer>
	</Page>
)

export default Landing
