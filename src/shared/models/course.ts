import { Class } from './class'

export interface Course {
	_id?: string
	name?: string
	department?: string
	sectioned?: boolean
	prerequisites?: string[]
	notes?: string
	length?: string
	AtoG?: string
	description?: string
	classes?: Class[]
}
