import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
	Button,
	Card,
	Select,
	Spacer,
	Table,
	Text,
	useMediaQuery,
} from '@geist-ui/react'

import _ from 'lodash'
import { Course } from 'shared/models/course'
import {
	formatSemester,
	formatSemesterRange,
	semesterValue,
} from 'shared/utils'

import DepartmentTag from 'shared/components/department-tag'

const Sidebar: React.FC<{
	course: Course
	sidebarContainerRef: React.MutableRefObject<HTMLDivElement>
}> = ({ course, sidebarContainerRef }) => {
	const [semester, setSemester] = useState('')
	const [top, setTop] = useState(0)
	const isAboveMd = useMediaQuery('md', { match: 'up' })

	const scrollHandler = useCallback(() => {
		const containerTop = sidebarContainerRef.current.offsetTop
		if (window.scrollY > containerTop) {
			setTop(window.scrollY - containerTop + 16)
		} else {
			setTop(0)
		}
	}, [sidebarContainerRef])

	const semesters = useMemo(
		() =>
			_.uniq(
				course.classes
					.map((class_) => class_.semester)
					.sort((a, b) => semesterValue(a) - semesterValue(b))
			),
		[course]
	)

	useEffect(() => {
		setSemester(semesters[semesters.length - 1])
	}, [semesters])

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler)
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [scrollHandler])

	const scheduleData = useMemo(() => {
		const semesterClasses = course.classes.filter(
			(_class) => _class.semester === semester
		)
		const blocks = _.uniq(
			[1, 2, 3, 4, 5, 6, 7, 8].concat(
				semesterClasses.map((_class) => Number(_class.block))
			)
		)
		return blocks.map((block) => ({
			block,
			classes: semesterClasses
				.filter((_class) => Number(_class.block) === block)
				.map((class_, idx) => (
					<Link href={`/teacher/${class_.teacher.name.replace(/ /g, '_')}`}>
						<Button
							key={idx}
							auto
							ghost
							size="mini"
							type="secondary"
							style={{ marginRight: 2 }}>
							{class_.teacher.name}
						</Button>
					</Link>
				)),
		}))
	}, [semester, course.classes])

	return (
		<Card
			shadow
			style={{
				alignSelf: 'start',
				position: 'relative',
				top: isAboveMd ? top : 0,
			}}>
			<Text h3 style={{ marginBottom: 0 }}>
				{course.name}
			</Text>
			<Text type="secondary" style={{ marginTop: 0 }}>
				{formatSemesterRange(semesters)}
			</Text>
			<DepartmentTag
				department={course.department}
				style={{ marginRight: 4, marginBottom: 4 }}
			/>
			<Spacer y={0.5} />
			<Select
				initialValue={semesters[semesters.length - 1]}
				size="large"
				onChange={(val) => setSemester(val as string)}>
				{semesters
					.slice()
					.reverse()
					.map((semester) => (
						<Select.Option key={semester} value={semester}>
							<Text h5 style={{ marginBottom: 0 }}>
								{formatSemester(semester)}
							</Text>
						</Select.Option>
					))}
			</Select>
			<Spacer y={0.5} />
			<Table data={scheduleData}>
				<Table.Column width={50} prop="block">
					<Text b>Block</Text>
				</Table.Column>
				<Table.Column prop="classes">
					<Text b>Classes</Text>
				</Table.Column>
			</Table>
		</Card>
	)
}

export default Sidebar
