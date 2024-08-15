import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockDto } from './dto/time-block.dto'

@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) {}
	//orderby в данной функции возвращает timeblock в порядке возрастания(asc)
	async getAll(userId: string) {
		return this.prisma.timeBlock.findMany({
			where: { userId },
			orderBy: { order: 'asc' }
		})
	}

	async create(dto: TimeBlockDto, userId: string) {
		return this.prisma.timeBlock.create({
			data: {
				...dto,
				user: {
					connect: { id: userId }
				}
			}
		})
	}
	//Partial переводит все в типе TimeBlockDto в опциональные поля
	async update(
		timeBlockId: string,
		dto: Partial<TimeBlockDto>,
		userId: string
	) {
		return this.prisma.timeBlock.update({
			where: {
				id: timeBlockId,
				userId
			},
			data: dto
		})
	}
	async delete(timeBlockId: string, userId: string) {
		return this.prisma.timeBlock.delete({
			where: { id: timeBlockId, userId }
		})
	}
}
