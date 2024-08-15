import { IsArray, IsString } from 'class-validator'

export class UpdateOrderDto {
	@IsArray()
	//each делает каждый элемент массива строкой
	@IsString({ each: true })
	ids: string[]
}
