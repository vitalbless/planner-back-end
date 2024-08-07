import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private userService: UserService
	) {
		super({
			jwtTokenFromHeader: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			jwtSecret: configService.get('JWT-SECRET')
		})
	}
	async validate({ id }: { id: string }) {
		return this.userService.getById(id)
	}
}
