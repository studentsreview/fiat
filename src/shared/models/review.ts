import { Teacher } from './teacher'

export interface Review {
	_id?: string
	text?: string
	timestamp?: string
	rating?: number
	version?: number
	teacher?: Teacher
}
