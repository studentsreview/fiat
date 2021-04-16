import { Page, Row, Link, Text } from '@geist-ui/react'
import RouterLink from 'next/link'

const Header: React.FC = () => (
	<Page.Header>
		<Row justify="space-between" align="middle">
			<RouterLink href="/">
				<Link>
					<Text h2>lowell database</Text>
				</Link>
			</RouterLink>
		</Row>
	</Page.Header>
)

export default Header
