import { ComponentProps } from 'react'
import { Badge, Card, Row, Spacer, Tag, Text, useTheme } from '@geist-ui/react'

import moment from 'moment'
import { Review } from 'shared/models/review'

export type ReviewCardProps = {
	review: Review
} & ComponentProps<typeof Card>

const ReviewCard: React.FC<ReviewCardProps> = ({ review, ...props }) => {
	const theme = useTheme()

	const isRMTLegacy = review.timestamp === '0001-01-01T00:00:00.000Z'
	const isV1Legacy = !isRMTLegacy && !!review.rating

	let sourceString
	if (isRMTLegacy) sourceString = 'RateMyTeachers Review'
	else if (isV1Legacy) sourceString = 'StudentsReview v1 Review'

	return (
		<Card shadow {...props}>
			<Row style={{ marginBottom: 6 }}>
				<Badge.Anchor>
					<Tag>{sourceString}</Tag>
					{isV1Legacy && (
						<Badge
							size="medium"
							style={{ backgroundColor: theme.palette.cyanDark }}>
							{review.rating}/5
						</Badge>
					)}
				</Badge.Anchor>
				{!isRMTLegacy && (
					<>
						<Spacer x={1} />
						<Tag type="lite">
							{moment
								.duration(moment(review.timestamp).diff(moment()))
								.humanize(true)}
						</Tag>
					</>
				)}
			</Row>
			<Text small>{review.text.replace('Submitted by a student', '')}</Text>
		</Card>
	)
}

export default ReviewCard
