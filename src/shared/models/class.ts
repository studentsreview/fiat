import { Course } from './course'
import { Teacher } from './teacher'

export interface Class {
	_id?: string
	name?: string
	code?: string
	block?: string
	room?: string
	semester?: string
	section?: string
	seats?: number[]
	course?: Course
	teacher?: Teacher
}
