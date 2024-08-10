import {
	IsNumber,
	IsOptional,
	Min,
	Max,
	MinLength,
	IsString,
	IsEmail
} from 'class-validator'

export class PomodoroSettingDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	workInterval?: number

	@IsOptional()
	@IsNumber()
	@Min(1)
	breakInterval?: number

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(10)
	intervalCount?: number
}

export class UserDto extends PomodoroSettingDto {
	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@IsString()
	password?: string
}
