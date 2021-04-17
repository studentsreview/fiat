import { Class } from './class'

export interface Course {
	_id?: string
	name?: string
	department?: string
	sectioned?: boolean
	prerequisites?: Course[]
	notes?: string
	length?: string
	AtoG?: string
	description?: string
	classes?: Class[]
}
