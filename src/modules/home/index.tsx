import { Course } from 'shared/models/course'
import { Teacher } from 'shared/models/teacher'
import { Hero } from './components/hero'

export const Home: React.FC<{
	searchData: ((Teacher | Course) & { type: string })[]
}> = ({ searchData }) => <Hero searchData={searchData} />
