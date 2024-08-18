import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('/round/:id')
	async updateRound(@Body() dto: PomodoroRoundDto, @Param('id') id: string) {
		return this.pomodoroService.updateRound(id, dto)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateSession(
		@CurrentUser('id') userId: string,
		@Body() dto: PomodoroSessionDto,
		@Param('id') id: string
	) {
		return this.pomodoroService.update(id, dto, userId)
	}

	@Auth()
	@Delete(':id')
	@HttpCode(200)
	async deleteSession(
		@Param('id') id: string,
		@CurrentUser('id') userId: string
	) {
		return this.pomodoroService.deleteSession(id, userId)
	}
}
