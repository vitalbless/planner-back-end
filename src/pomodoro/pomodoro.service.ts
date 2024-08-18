import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroSessionDto, PomodoroRoundDto } from './dto/pomodoro.dto'

@Injectable()
export class PomodoroService {
	constructor(private prisma: PrismaService) {}
	async getTodaySession(userId: string) {
		const today = new Date().toISOString().split('T')[0]
		return this.prisma.pomodoroSession.findFirst({
			where: { createdAt: { gte: new Date(today) }, userId },
			include: {
				rounds: { orderBy: { id: 'desc' } }
			}
		})
	}

	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId)
		if (todaySession) return todaySession

		//С помощью select забираю только одно поле из user
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { intervalsCount: true }
		})

		if (!user) return new NotFoundException('User not found')

		return this.prisma.pomodoroSession.create({
			data: {
				rounds: {
					createMany: {
						data: Array.from({ length: user.intervalsCount }, () => ({
							totalSeconds: 0
						}))
					}
				},
				user: { connect: { id: userId } }
			},
			include: { rounds: true }
		})
	}
	//Partial переводит все в типе PomodoroDto в опциональные поля
	async update(
		pomodoroId: string,
		dto: Partial<PomodoroSessionDto>,
		userId: string
	) {
		return this.prisma.pomodoroSession.update({
			where: {
				id: pomodoroId,
				userId
			},
			data: dto
		})
	}
	async updateRound(roundId: string, dto: Partial<PomodoroRoundDto>) {
		return this.prisma.pomodoroRound.update({
			where: {
				id: roundId
			},
			data: dto
		})
	}
	async deleteSession(sessionId: string, userId: string) {
		return this.prisma.pomodoroSession.delete({
			where: { id: sessionId, userId }
		})
	}
}
