import { ComponentProps } from 'react'
import { Tag } from '@geist-ui/react'

export type DepartmentTagProps = {
	department: string
} & ComponentProps<typeof Tag>

const DepartmentTag: React.FC<DepartmentTagProps> = ({
	department,
	style,
	...props
}) => (
	<Tag
		style={{
			backgroundColor: {
				Science: 'lightgreen',
				Math: 'lightblue',
				'Computer Science': 'orange',
				English: '#e0e0e0',
				'Physical Education': 'pink',
				JROTC: '#b5651d',
				'Visual Performing Arts': 'beige',
				'Social Science': 'gold',
				'Foreign Language': '#e6e6fa',
			}[department],
			color: 'black',
			...style,
		}}
		{...props}>
		{department}
	</Tag>
)

export default DepartmentTag
