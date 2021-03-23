import { Class } from './class'
import { Review } from './review'

export interface Teacher {
	_id?: string
	name?: string
	departments?: string[]
	semesters?: string[]
	classes?: Class[]
	reviews?: Review[]
	rating?: number
}
