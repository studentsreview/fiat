import {
	Page,
	Button,
	ButtonGroup,
	Row,
	Link,
	Text,
	useTheme,
} from '@geist-ui/react'
import * as Icon from '@geist-ui/react-icons'
import RouterLink from 'next/link'

const Header: React.FC<{ switchThemes: () => void }> = ({ switchThemes }) => {
	const theme = useTheme()

	return (
		<Page.Header>
			<Row justify="space-between" align="middle">
				<RouterLink href="/">
					<Link>
						<Text h2>lowell database</Text>
					</Link>
				</RouterLink>
				<ButtonGroup type="secondary">
					<Button
						icon={theme.type === 'light' ? <Icon.Moon /> : <Icon.Sun />}
						onClick={switchThemes}>
						{theme.type === 'light' ? 'Dark Mode' : 'Light Mode'}
					</Button>
				</ButtonGroup>
			</Row>
		</Page.Header>
	)
}

export default Header
