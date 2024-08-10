import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: { tasks: true }
		})
	}
	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}
	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			password: await hash(dto.password),
			name: ''
		}
		return this.prisma.user.create({ data: user })
	}
	async update(id: string, dto: UserDto) {
		let data = dto
		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}
		return this.prisma.user.update({ where: { id }, data })
	}
}
