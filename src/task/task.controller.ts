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
import { TaskService } from './task.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TaskDto } from './dto/task.dto'

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: string, @Body() dto: TaskDto) {
		return this.taskService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(
		@CurrentUser('id') userId: string,
		@Body() dto: TaskDto,
		@Param('id') id: string
	) {
		return this.taskService.update(id, dto, userId)
	}

	@Auth()
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.taskService.delete(id)
	}
}
