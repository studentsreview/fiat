export const formatSemester = (semester: string): string =>
	/(Spring|Fall)(\d{4})/.exec(semester).slice(1).join(' ')
export const formatSemesterRange = (semesterRange: string[]): string => {
	if (semesterRange.length === 1) return formatSemester(semesterRange[0])
	let start = formatSemester(semesterRange[0])
	const end = formatSemester(semesterRange[semesterRange.length - 1])

	if (start === 'Fall 2014') start = 'Pre-Fall 2014'

	return `${start} - ${end}`
}
