import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.quard'

export const Auth = () => UseGuards(JwtAuthGuard)
